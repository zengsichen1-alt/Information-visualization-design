// @ts-nocheck
import { onBeforeUnmount, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MouseFollowCameraController } from './MouseFollowCameraController';

gsap.registerPlugin(ScrollTrigger);

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export function useMoonScenes() {
  let frameId = 0;
  let rendererRef: THREE.WebGLRenderer | null = null;

  onMounted(() => {
    
    
    
    
    //右手坐标系
    const canvas = document.querySelector('.main-canvas');
    const renderer = new THREE.WebGLRenderer( { antialias : true, canvas: canvas, alpha: true } );
        rendererRef = renderer;
    renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );//设置像素比
        renderer.setScissorTest(true);
        renderer.autoClear = false;
        renderer.outputColorSpace = THREE.SRGBColorSpace;//颜色空间
        renderer.toneMapping = THREE.ACESFilmicToneMapping;//色调映射
        renderer.toneMappingExposure = 1.0;//曝光度
    
    //#region backgroundscene    
    const backgroundScene = new THREE.Scene();
    const backgroundContainer = document.querySelector('.canvas-container');
    const backgroundCamera = new THREE.PerspectiveCamera(45,backgroundContainer.clientWidth/backgroundContainer.clientHeight,0.1,1000);
        backgroundCamera.position.set(0, 0, 80);
        backgroundCamera.fov = 45;//设置相机视野
        window.addEventListener('resize', function() {
            renderer.setSize( canvas.clientWidth, canvas.clientHeight , false);
            renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );//设置像素比
        });
        
    const backgroundCameraController = new MouseFollowCameraController(backgroundCamera);
        
    const textureLoader = new HDRLoader();
        textureLoader.load(assetUrl('/pic/HDR_subdued_blue_nebulae.hdr'),
            function(texture) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                backgroundScene.background = texture;
                backgroundScene.environment = texture;
            }
        );
    //#endregion backgroundscene
    
    //#region moonmeteorite scene
    const moonmeteoriteScene = new THREE.Scene();
    const moonmeteoriteContainer = document.querySelector('.moonmeteorite-container');
    const moonmeteoriteCamera = new THREE.PerspectiveCamera(45,moonmeteoriteContainer.clientWidth/moonmeteoriteContainer.clientHeight,0.1,1000);
    
        moonmeteoriteCamera.fov = 45;//设置相机视野
        moonmeteoriteCamera.position.set(0, 0, 20);
        moonmeteoriteCamera.lookAt(0, 0, 0);
    
    const moonmeteoriteCameraController = new MouseFollowCameraController(moonmeteoriteCamera, { maxYaw: Math.PI / 48, maxPitch: Math.PI / 48, lerpSpeed: 0.3 });
    
    let moon4;
    const gltfLoader = new GLTFLoader();
        gltfLoader.load(assetUrl('/model/moon4.glb'), function(gltf){
                gltf.scene.position.set(-3,0,10);
                gltf.scene.rotation.set(0,0,0);
                moon4 = gltf.scene;
                moonmeteoriteScene.add(gltf.scene);
        });
    
    const axis = new THREE.Vector3(
        Math.sin(THREE.MathUtils.degToRad(10)), // X 分量
        Math.cos(THREE.MathUtils.degToRad(10)), // Y 分量
        0                                       // Z 分量
        ).normalize();
    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 3);
        sunLight.position.set(0, 0, 20);
        sunLight.target.position.set(10, 0, 0);
        sunLight.castShadow = true;
        sunLight.shadow.camera.near = 0.5;//近端
        sunLight.shadow.mapSize.width = 1024;//阴影质量
        sunLight.shadow.mapSize.height = 1024;//阴影质量
        sunLight.shadow.bias = -0.0001;
    
        moonmeteoriteScene.add(sunLight);
        moonmeteoriteScene.add(sunLight.target);
    
    //#endregion moonmeteorite scene
    
    //#region moon explore
    const moonExploreScene = new THREE.Scene();
    const moonExploreContainer = document.querySelector('.moonExplore-container');
    const moonExploreCamera = new THREE.PerspectiveCamera(45,moonExploreContainer.clientWidth/moonExploreContainer.clientHeight,0.1,1000);
    
        moonExploreCamera.fov = 45;//设置相机视野
        moonExploreCamera.position.set(0, 0, 8);
        moonExploreCamera.lookAt(0, 0, 0);
    
    let moonRadius;
    let moon4C;
        gltfLoader.load(assetUrl('/model/moon4.glb'), function(gltf){
                gltf.scene.position.set(0,0,0);
                gltf.scene.rotation.set(0,0,0);
                moon4C = gltf.scene;
                        //计算模型大小start
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const size = new THREE.Vector3();
    
                box.getSize(size);
                moonRadius = size.x * 0.5;
                window.moonRadius = moonRadius;
                console.log('moonRadius:', moonRadius);
                console.log('gltf.scene.position:', gltf.scene.position);
                //计算模型大小end
    
                //根据经纬度计算位置start
                function getRotationForLatLon(targetLat, targetLon) {
                    // 纬度旋转：正值向下转 (抵消北纬)
                    const rotX = targetLat * (Math.PI / 180);
                    
                    // 负值向右转 (抵消东经)
                    const rotY = -targetLon * (Math.PI / 180) - Math.PI / 2; 
                    
                    return { x: rotX, y: rotY };
                }
                
                const Luna2R = getRotationForLatLon(29.1, 0.0);//29.1°N, 0.0°
                const Ranger7R = getRotationForLatLon(-10.35, -20.58);//10.35°S, 20.58°W
                const Luna9R = getRotationForLatLon(7.13, -64.37);//7.13°N, 64.37°W
                const Surveyor1R = getRotationForLatLon(-2.45, -43.22);//2.45°S, 43.22°W
                const Apollo11R = getRotationForLatLon(0.67, 23.47);//00.67°N, 23.47°E
                const Apollo12R = getRotationForLatLon(-3.01, -23.42);//3.01°S, 23.42°W
                const Apollo14R = getRotationForLatLon(-3.65, -17.47);//3.65°S, 17.47°W
                const Apollo15R = getRotationForLatLon(26.13, 3.63);//26.13°N, 3.63°E
                const Apollo16R = getRotationForLatLon(-8.973, 15.5);//8.973°S, 15.5°E
                const Apollo17R = getRotationForLatLon(20.19, 30.77);//20.19°N, 30.77°E
                const ChangE3R = getRotationForLatLon(44.12, 19.51);//44.12°N, 19.51°E
                const ChangE5R = getRotationForLatLon(43.1, -51.8);//43.1°N, 51.8°W
                    
                //根据经纬度计算位置end
    
                //根据经纬度计算位置start    
                function getPositionFromLatLon(lat, lon, radius) {
                    const phi = (90 - lat) * (Math.PI / 180);
                    const theta = (lon + 180) * (Math.PI / 180); 
    
                    const x = -(radius * Math.sin(phi) * Math.cos(theta));
                    const z = (radius * Math.sin(phi) * Math.sin(theta));
                    const y = (radius * Math.cos(phi));
    
                    return new THREE.Vector3(x, y, z);
                }
    
                    const Luna2P = getPositionFromLatLon(29.1, 0.0, moonRadius);//29.1°N, 0.0°
                    const Ranger7P = getPositionFromLatLon(-10.35, -20.58, moonRadius);//10.35°S, 20.58°W
                    const Luna9P = getPositionFromLatLon(7.13, -64.37, moonRadius);//7.13°N, 64.37°W
                    const Surveyor1P = getPositionFromLatLon(-2.45, -43.22, moonRadius);//2.45°S, 43.22°W
                    const Apollo11P = getPositionFromLatLon(0.67, 23.47, moonRadius);//00.67°N, 23.47°E
                    const Apollo12P = getPositionFromLatLon(-3.01, -23.42, moonRadius);//3.01°S, 23.42°W
                    const Apollo14P = getPositionFromLatLon(-3.65, -17.47, moonRadius);//3.65°S, 17.47°W
                    const Apollo15P = getPositionFromLatLon(26.13, 3.63, moonRadius);//26.13°N, 3.63°E
                    const Apollo16P = getPositionFromLatLon(-8.973, 15.5, moonRadius);//8.973°S, 15.5°E
                    const Apollo17P = getPositionFromLatLon(20.19, 30.77, moonRadius);//20.19°N, 30.77°E
                    const ChangE3P = getPositionFromLatLon(44.12, 19.51, moonRadius);//44.12°N, 19.51°E
                    const ChangE5P = getPositionFromLatLon(43.1, -51.8, moonRadius);//43.1°N, 51.8°W
    
                //根据经纬度计算位置end
    
                //添加标记start
                const markerGeometry = new THREE.SphereGeometry(moonRadius * 0.005, 16, 16); 
                const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 红色
    
                function addMarker(position, triggerId1, triggerId2){ {
                    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
                    marker.position.copy(position);
                    marker.scale.set(0, 0, 0);
                    
                    gltf.scene.add(marker);
    
                    if (triggerId1) {
                        gsap.to(marker.scale, {
                            x: 1, 
                            y: 1, 
                            z: 1,
                            scrollTrigger: {
                                trigger: triggerId1,
                                start: "top top", 
                                end: "center center", 
                                scrub: 1, 
                            }
                        });
                    }
    
                    if (triggerId2) {
                        gsap.to(marker.scale, {
                            x: 0, 
                            y: 0, 
                            z: 0,
                            scrollTrigger: {
                                trigger: triggerId2,
                                start: "top top", 
                                end: "center center", 
                                scrub: 1, 
                            }
                        });
                    }
                }}
    
                addMarker(Luna2P, ".divPage1", ".divPage3");
                addMarker(Ranger7P, ".divPage3", ".divPage5");
                addMarker(Luna9P, ".divPage5", ".divPage7");
                addMarker(Surveyor1P, ".divPage7" , ".divPage9");
                addMarker(ChangE3P, ".divPage9", ".divPage11");
                addMarker(ChangE5P, ".divPage11", ".divPage12");
                addMarker(Apollo11P, ".divPage13", ".divPage24");
                addMarker(Apollo12P, ".divPage15", ".divPage24");
                addMarker(Apollo14P, ".divPage17", ".divPage24");
                addMarker(Apollo15P, ".divPage19", ".divPage24");
                addMarker(Apollo16P, ".divPage21", ".divPage24");
                addMarker(Apollo17P, ".divPage23", ".divPage24");
    
                // 添加各个任务的标记
    
                function rotateModelOnScroll(modelRatation1, modelRatation2, triggerId1) {
                        gsap.fromTo(gltf.scene.rotation,
                        { 
                            x:modelRatation1.x,                          
                            y:modelRatation1.y,
                        },
                        {
                            x:modelRatation2.x,
                            y:modelRatation2.y,
                            immediateRender: false,
                            scrollTrigger:{
                                trigger: triggerId1,
                                start:"top top",
                                end:"bottom top",
                                scrub:true,
    
                                snap: {
                                    snapTo: 1, // 1 表示吸附到动画结束点 (0 是起点，0.5 是中间)
                                    duration: 0, // 吸附过程的动画时长（秒）
                                    delay: 0.00, // 滚动停止后多久开始吸附
                                    ease: "none" // 吸附过程的缓动效果
                                }
                                
                            }
                        })
                }
    
                rotateModelOnScroll(gltf.scene.rotation, Luna2R, ".divPage1");
                rotateModelOnScroll(Luna2R, Ranger7R, ".divPage3");
                rotateModelOnScroll(Ranger7R, Luna9R, ".divPage5");
                rotateModelOnScroll(Luna9R, Surveyor1R, ".divPage7");
                rotateModelOnScroll(Surveyor1R, ChangE3R, ".divPage9");
                rotateModelOnScroll(ChangE3R, ChangE5R, ".divPage11");
                rotateModelOnScroll(ChangE5R, Apollo11R, ".divPage13");
                rotateModelOnScroll(Apollo11R, Apollo12R, ".divPage15");
                rotateModelOnScroll(Apollo12R, Apollo14R, ".divPage17");
                rotateModelOnScroll(Apollo14R, Apollo15R, ".divPage19");
                rotateModelOnScroll(Apollo15R, Apollo16R, ".divPage21");
                rotateModelOnScroll(Apollo16R, Apollo17R, ".divPage23");
    
                
    
                moonExploreScene.add(gltf.scene);
        });
    
    const exploreLight = new THREE.DirectionalLight(0xFFFFFF, 3);
        exploreLight.position.set(0, 0, 20);
        exploreLight.target.position.set(10, 0, 0);
        exploreLight.castShadow = true;
        exploreLight.shadow.camera.near = 0.5;//近端
        exploreLight.shadow.mapSize.width = 1024;//阴影质量
        exploreLight.shadow.mapSize.height = 1024;//阴影质量
        exploreLight.shadow.bias = -0.0001;
    
        moonExploreScene.add(exploreLight);
        moonExploreScene.add(exploreLight.target);
        
    
    //#endregion moon explore
    const sceneList = [
        {
            scene:backgroundScene,
            camera:backgroundCamera,
            container:backgroundContainer,
    
        }, 
        {
            scene:moonmeteoriteScene,
            camera:moonmeteoriteCamera,
            container:moonmeteoriteContainer
        },
        {
            scene:moonExploreScene,
            camera:moonExploreCamera,
            container:moonExploreContainer
        }
    ];
       
        function animate() {
        frameId = requestAnimationFrame(animate);
    
        // 更新 renderer 为全屏尺寸
        const fullWidth = canvas.clientWidth;
        const fullHeight = canvas.clientHeight;
        if (canvas.width !== fullWidth || canvas.height !== fullHeight) {
            renderer.setSize(fullWidth, fullHeight, false);
        }
    
        backgroundCameraController.update();
        moonmeteoriteCameraController.update();
        backgroundScene.backgroundRotation.y += 0.00006;
    
        if (moon4) {
            moon4.rotateOnAxis(axis, 0.0006);
        }
    
        renderer.setClearColor(0x000000, 0);
        renderer.clear();
    
        // 逐个场景渲染到对应区域
        for (const item of sceneList) {
            const rect = item.container.getBoundingClientRect();
    
            // 容器不在视口内则跳过
            if (rect.bottom < 0 || rect.top > fullHeight ||
                rect.right < 0 || rect.left > fullWidth) {
                continue;
            }
            
            
            const left   = rect.left;
            const bottom = fullHeight - rect.bottom;
            const width  = rect.width;
            const height = rect.height;
    
            renderer.setViewport(left, bottom, width, height);
            renderer.setScissor(left, bottom, width, height);
    
            if (item === sceneList[0]) {
            // 背景场景：正常清除
            renderer.clear(true, true, true);
            } else {
            // 叠加场景：只清除深度缓冲，保留背景颜色
            renderer.clearDepth();
            }
            // 更新相机宽高比
            item.camera.aspect = width / height;
            item.camera.updateProjectionMatrix();
    
            renderer.render(item.scene, item.camera);
        }
    }
    animate();
  });

  onBeforeUnmount(() => {
    if (frameId) cancelAnimationFrame(frameId);
    rendererRef?.dispose();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });
}
