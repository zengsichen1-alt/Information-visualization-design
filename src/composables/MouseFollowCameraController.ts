import * as THREE from 'three';

interface MouseFollowOptions {
  maxYaw?: number;
  maxPitch?: number;
  lerpSpeed?: number;
}

export class MouseFollowCameraController {
  private lookTarget = new THREE.Vector2(0, 0);
  private lookCurrent = new THREE.Vector2(0, 0);
  private maxYaw: number;
  private maxPitch: number;
  private lerpSpeed: number;
  private baseDistance: number;

  constructor(private camera: THREE.PerspectiveCamera, options: MouseFollowOptions = {}) {
    this.maxYaw = options.maxYaw || Math.PI / 32;
    this.maxPitch = options.maxPitch || Math.PI / 32;
    this.lerpSpeed = options.lerpSpeed || 0.05;
    this.baseDistance = Math.sqrt(
      camera.position.x * camera.position.x +
        camera.position.y * camera.position.y +
        camera.position.z * camera.position.z,
    );

    this.onMouseMove = this.onMouseMove.bind(this);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onMouseMove(e: MouseEvent) {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    this.lookTarget.x = -nx * this.maxYaw;
    this.lookTarget.y = ny * this.maxPitch;
  }

  update() {
    this.lookCurrent.x += (this.lookTarget.x - this.lookCurrent.x) * this.lerpSpeed;
    this.lookCurrent.y += (this.lookTarget.y - this.lookCurrent.y) * this.lerpSpeed;

    this.camera.position.x = Math.sin(this.lookCurrent.x) * this.baseDistance;
    this.camera.position.y = Math.sin(this.lookCurrent.y) * this.baseDistance;
    this.camera.position.z = Math.cos(this.lookCurrent.x) * this.baseDistance;
    this.camera.lookAt(0, 0, 0);
  }

  dispose() {
    window.removeEventListener('mousemove', this.onMouseMove);
  }
}
