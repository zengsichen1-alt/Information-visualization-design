import * as THREE from "../threejs/Three.js";

export class MouseFollowCameraController {
    constructor(camera, options = {}) {
        this.camera = camera;
        this.lookTarget = new THREE.Vector2(0, 0);
        this.lookCurrent = new THREE.Vector2(0, 0);
        
        // 允许通过 options 自定义最大偏移角和插值速度，默认值就是你原来的设定
        this.maxYaw = options.maxYaw || Math.PI / 32;
        this.maxPitch = options.maxPitch || Math.PI / 32;
        this.lerpSpeed = options.lerpSpeed || 0.05;

        // 【优化】：固定保存相机的初始距离，避免在动画循环中每帧重复计算导致位置发散
        this.baseDistance = Math.sqrt(
            camera.position.x * camera.position.x +
            camera.position.y * camera.position.y +
            camera.position.z * camera.position.z
        );

        // 绑定事件并确保 this 指向正确
        this.onMouseMove = this.onMouseMove.bind(this);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    onMouseMove(e) {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        this.lookTarget.x = -nx * this.maxYaw;
        this.lookTarget.y = ny * this.maxPitch;
    }

    // 在 requestAnimationFrame 中调用
    update() {
        this.lookCurrent.x += (this.lookTarget.x - this.lookCurrent.x) * this.lerpSpeed;
        this.lookCurrent.y += (this.lookTarget.y - this.lookCurrent.y) * this.lerpSpeed;

        this.camera.position.x = Math.sin(this.lookCurrent.x) * this.baseDistance;
        this.camera.position.y = Math.sin(this.lookCurrent.y) * this.baseDistance;
        this.camera.position.z = Math.cos(this.lookCurrent.x) * this.baseDistance;
        
        this.camera.lookAt(0, 0, 0);
    }

    // 销毁时清理事件监听，防止内存泄漏
    dispose() {
        window.removeEventListener('mousemove', this.onMouseMove);
    }
}

