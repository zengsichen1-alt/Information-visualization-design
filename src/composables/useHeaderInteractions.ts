// @ts-nocheck
import { onBeforeUnmount, onMounted } from 'vue';
import gsap from 'gsap';
import type { LenisInstance } from '../types/legacy';

declare global {
  interface Window {
    __lenis?: LenisInstance;
  }
}

export function useHeaderInteractions() {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    const lenis = window.__lenis;
    ctx = gsap.context(() => {
      //#region       LoadingAnimation
      const hideLoadingScreen = () => {
          gsap.to("#loading-screen", {
              opacity: 0,
              duration: 0.5, 
              ease: "power2.inOut",
              delay: 1,
              onComplete: () => {
                  document.getElementById("loading-screen").style.display = "none";
              }
          });
      };

      if (document.readyState === 'complete') {
          hideLoadingScreen();
      } else {
          window.addEventListener('load', hideLoadingScreen, { once: true });
      }
      //#endregion    LoadingAnimation
      
      //#region UI-CONTAINER-RIGHT-SOUND-BTN-START
      const headerRight = document.querySelector('.header-right');
      const musicBtn = headerRight.querySelector('.header-right-sound-btn');
      const musicBtnIconAni = headerRight.querySelector('.header-right-sound-btn-pic');
      const silentAudio = document.querySelector('.silent-audio'); 
            silentAudio.volume = 0.2; 
            silentAudio.autoplay = false;
            silentAudio.loop = true;
      const musicAni = gsap.fromTo(musicBtnIconAni, 
          { scale: 1 }, 
          { scale: 1.2, repeat: -1, ease: 'bounce', yoyo: true, duration: 1.0 , paused: true}
      );
      
      let isPlaying = false;
      
      musicBtn.addEventListener('click', () => {
          if (isPlaying) {
              musicAni.pause();
              gsap.to(musicBtnIconAni, { scale: 1, duration: 0.2 });
              silentAudio.pause();
              isPlaying = false;
          } else {
              musicAni.resume();
              silentAudio.play();
              isPlaying = true;
          }
      });
      //#endregion UI-CONTAINER-RIGHT-SOUND-BTN-END
      
       //#region UI-CONTAINER-RIGHT-EXPLORE-BTN-START
      
       //#endregion UI-CONTAINER-RIGHT-EXPLORE-BTN-END
      
      //#region UI-CONTAINER-RIGHT-MENU-BTN-START
      const menuBtn = headerRight.querySelector('.header-right-menu-btn');
      const menuBtnDots = menuBtn.querySelectorAll('.header-right-menu-dots');
      const headerMenu = document.querySelector('.header-menu');
      const menuContent1 = headerMenu.querySelector('.header-menu-content1');
      const menuContent2 = headerMenu.querySelector('.header-menu-content2');
      const menuAnis2 = menuContent2.querySelector('.menu-ani2');
      const menuAArrow45 = menuAnis2.querySelector('.arrow45');
      const menuTexts2 = menuAnis2.querySelector('.content-display-text');
      const menuTextsClone2 = menuAnis2.querySelector('.content-display-text-clone');
      const menuAnis = document.querySelectorAll('.menu-ani1');
      
          const menuBtnC1Ani = gsap.fromTo(menuContent1, //æ–œå‘èœå•åŠ¨ç”»
              { rotation: -10, opacity: 0, y: '2.5vw' },
              {rotation: 0, opacity: 1, y: 0, ease: 'power1.inOut', duration: 0.5, paused: true }
          ); 
      
          const menuBtnC2Ani = gsap.fromTo(menuContent2, //æ–œå‘èœå•åŠ¨ç”»
              { rotation: 20, opacity: 0, y: '6vw' },
              {rotation: 0, opacity: 1, y: 0, ease: 'power1.inOut', duration: 0.5, paused: true }
          );
      
          const menuBtnDotAni = gsap.to(menuBtnDots, //90åº¦ä¸¤ç‚¹è½¬å‘
          { rotation: 90, ease: 'power1.inOut', duration: 0.2, paused: true, yoyo: false }
          );
      
          const menuAArrow45Ani = gsap.fromTo(menuAArrow45, //45åº¦ç®­å¤´
              { x: 0 , y: 0 },
              { x: '1.5vw', y: '-1.5vw', opacity: 0, ease: 'power1.inOut', duration: 0.1, paused: true}
          );
      
          const menuText2Ani = gsap.fromTo(menuTexts2, //ç»´åŸºç™¾ç§‘
              { y: 0, opacity: 1 },
              { y: '-1.3vw', opacity: 1, ease: 'power1.inOut', duration: 0.2, paused: true }
          );
      
          const menuTextClone2Ani = gsap.fromTo(menuTextsClone2, //ç»´åŸºç™¾ç§‘å…‹éš†
              { y: 0, opacity: 1 },
              { y: '-1.3vw', opacity: 1, ease: 'power1.inOut', duration: 0.2, paused: true }
          );
          
      
          gsap.set(headerMenu, { pointerEvents: 'none' });
          gsap.set(menuAnis2, { cursor: 'default' });
          gsap.set(menuAnis, { cursor: 'default' });
          let menuOpen = false;
          menuBtn.addEventListener('click', () => {
              if (menuOpen) {
                  menuBtnC1Ani.reverse();
                  menuBtnC2Ani.reverse();
                  gsap.set(headerMenu, { pointerEvents: 'none' });
                  gsap.set(menuAnis2, { cursor: 'default' });
                  gsap.set(menuAnis, { cursor: 'default' });
                  menuOpen = false;
              } else {
                  menuBtnC1Ani.play();
                  menuBtnC2Ani.play();
                  gsap.set(headerMenu, { pointerEvents: 'auto' });
                  gsap.set(menuAnis2, { cursor: 'pointer' });
                  gsap.set(menuAnis, { cursor: 'pointer' });
                  menuOpen = true;
              }
      
          });
      
          menuBtn.addEventListener('mouseenter', () => {
              menuBtnDotAni.play();
          });
      
          menuBtn.addEventListener('mouseleave', () => {
              if(menuOpen){
                  menuBtnDotAni.pause();
              }
              else{
                  menuBtnDotAni.reverse();
              }
          });
      
          menuContent2.addEventListener('mouseenter', () => {
              menuAArrow45Ani.play();
              menuText2Ani.play();
              menuTextClone2Ani.play();
          });
      
          menuContent2.addEventListener('mouseleave', () => {
              menuAArrow45Ani.reverse();
              menuText2Ani.reverse();
              menuTextClone2Ani.reverse();
          });
      
      
      menuAnis.forEach((menu) => {
      const menuAArrow = menu.querySelectorAll('.content-display-arrow');
      const menuTexts = menu.querySelectorAll('.content-display-text');
      const menuTextsClone = menu.querySelectorAll('.content-display-text-clone');
          const menuAArrowAni = gsap.fromTo(menuAArrow,
              { scale: 0 },
              { scale: 1, ease: 'power1.inOut', duration: 0.3, paused: true}
          );
      
          const textAnis = gsap.fromTo(menuTexts,
              { y: 0, opacity: 1 },
              { y: '-1.3vw', opacity: 1, ease: 'power1.inOut', duration: 0.2, paused: true }
          );
      
          const textAnisClone = gsap.fromTo(menuTextsClone,
              { y: 0, opacity: 1 },
              { y: '-1.3vw', opacity: 1, ease: 'power1.inOut', duration: 0.2, paused: true }
          );
      
          
      
          menu.addEventListener('mouseenter', () => {
              menuAArrowAni.play();
              textAnis.play();
              textAnisClone.play();     
          });
          menu.addEventListener('mouseleave', () => {
              menuAArrowAni.reverse();
              textAnis.reverse();
              textAnisClone.reverse();
          });
      });
      //#endregion UI-CONTAINER-RIGHT-MENU-BTN-END
    });
  });

  onBeforeUnmount(() => {
    ctx?.revert();
    ctx = null;
  });
}
