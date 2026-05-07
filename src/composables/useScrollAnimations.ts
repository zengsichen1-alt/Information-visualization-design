// @ts-nocheck
import { onBeforeUnmount, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type { LenisInstance } from '../types/legacy';

gsap.registerPlugin(ScrollTrigger, SplitText);

declare global {
  interface Window {
    __lenis?: LenisInstance;
  }
}

export function useScrollAnimations() {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    const lenis = window.__lenis;
    ctx = gsap.context(() => {
      //#region section1-2
      const section1Animations = [];
      
      const line1Spans = document.querySelectorAll('.title-map-1 span');
      line1Spans.forEach((span, i) => {
      const L1SYAni = gsap.fromTo(span,
              { y: '8vw' },
              { y: 0, ease: 'power1.inOut', duration: 0.7, delay: i * 0.1,
                  scrollTrigger: { trigger: '.section2', start: 'top bottom',toggleActions: "play none none reset" }
              }
          );
      const L1SXAni = gsap.fromTo(span,
              { x: 0 },
              { x: '7vw', ease: 'expo.inOut', duration: 0.8, delay: 1.2 - i * 0.1,
                  scrollTrigger: { trigger: '.section2', start: 'top bottom',toggleActions: "play none none reset" }
              }
          );
      
          section1Animations.push(L1SYAni, L1SXAni);
      });
      
      const line2Spans = document.querySelectorAll('.title-map-2 span');
      line2Spans.forEach((span, i) => {
      const L2SYAni = gsap.fromTo(span,
              { y: '-9vw' },
              { y: 0, ease: 'power1.inOut', duration: 0.7, delay: 0.5 + i * 0.1,
                  scrollTrigger: { trigger: '.section2', start: 'top bottom',toggleActions: "play none none reset" }
              }
          );
          section1Animations.push(L2SYAni);
      });
      
      document.querySelectorAll('[class^="introduce-p"]').forEach((p, i) => {
      const introducePAni = gsap.fromTo(p,
              { y: '1vw', opacity: 0 },
              { y: 0, opacity: 1, ease: 'power1.inOut', duration: 1, delay: i * 0.12,
                  scrollTrigger: { trigger: '.section2', start: 'top bottom',toggleActions: "play none none reset" }
              }
          );
          section1Animations.push(introducePAni);
      });
      
      
      const videoContainer = document.querySelector('.worldmap-container');
      const worldmapVideo = document.querySelector('.worldmap-video');
      let isVideoInFocusState = false;
      
      function setVideoFocusPlaybackState(isFocused) {
          if (!worldmapVideo || isVideoInFocusState === isFocused) {
              return;
          }
          isVideoInFocusState = isFocused;
      
          if (isFocused) {
              // 恢复声音并播放，显示原生控件
              worldmapVideo.muted = false;
              worldmapVideo.controls = true;
              worldmapVideo.removeAttribute('autoplay');
              const playPromise = worldmapVideo.play();
              if (playPromise && typeof playPromise.catch === 'function') {
                  playPromise.catch(() => {});
              }
          } else {
              // 暂停视频，隐藏控件，恢复静音
              worldmapVideo.pause();
              worldmapVideo.controls = false;
              worldmapVideo.muted = true;
          }
      }
      
      let snapReached = false;
      let videoPlaying = false;
      
      gsap.fromTo(videoContainer,
          {
              left: '5%',
              xPercent: 0,
              yPercent: 0,
              y: '0vh',
      
          },
          {
              width: '70vw',
              left: '50%',
              xPercent: -50,
              yPercent: -40,
              ease: 'power2.out',
              duration: 2,
              y: '70vh',
      
              scrollTrigger: {
                  trigger: '.worldmap-container',
                  start: 'center center',
                  //end: '+=70vh',
                  scrub: true,
                  snap: {
                      snapTo: 0.7,
                      duration: 1,
                      ease: 'none'
                  },
                  onUpdate: (self) => {
                      if (!snapReached && self.progress >= 0.69) {
                          snapReached = true;
                          videoPlaying = true;
                          setVideoFocusPlaybackState(true);
                          console.log('Snap 完成，视频已恢复声音并开始播放');
                      }
                      if (snapReached && self.progress < 0.69) {
                          snapReached = false;
                          if (videoPlaying) {
                              videoPlaying = false;
                              setVideoFocusPlaybackState(false);
                          }
                          console.log('Snap 退出，视频已暂停并静音');
                      }
                  },
                  onLeave: () => {
                      if (snapReached) {
                          snapReached = false;
                          if (videoPlaying) {
                              videoPlaying = false;
                              setVideoFocusPlaybackState(false);
                          }
                          console.log('向下离开 section2，视频已暂停并静音');
                      }
                  },
                  onLeaveBack: () => {
                      if (snapReached) {
                          snapReached = false;
                          if (videoPlaying) {
                              videoPlaying = false;
                              setVideoFocusPlaybackState(false);
                          }
                          console.log('向上离开 section2，视频已暂停并静音');
                      }
                  }
              }
          }
      );
      
      //#endregion section1-2
      
      //#region section2 按键/点击播放视频
      function toggleVideoControl() {
          if (!snapReached) return;
          videoPlaying = !videoPlaying;
          setVideoFocusPlaybackState(videoPlaying);
          console.log(videoPlaying ? '视频控制已开启' : '视频已恢复静音循环');
      }
      
      document.addEventListener('keydown', (e) => {
          if (e.code === 'Space') {
              e.preventDefault();
              toggleVideoControl();
          }
      });
      
      videoContainer.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleVideoControl();
      });
      //#endregion section2 按键/点击播放视频
      
      //#region section3
      const spans = document.querySelectorAll('.nation-title-span');
      spans.forEach((span, i) => {
          gsap.fromTo(span,
              { y: '8vw', rotation: 10 },
              { y: 0, rotation: 0, ease: 'power1.inOut', duration: 0.8, delay: i * 0.2,
                  scrollTrigger: { trigger: '.section3', start: 'top bottom',toggleActions: "play none none reset" }
              }
          );
      });
      
      document.querySelectorAll('.nation-introduce-p').forEach((p, i) => {
          gsap.fromTo(p,
              { y: '1vw', opacity: 0 },
              { y: 0, opacity: 1, ease: 'power1.inOut', duration: 1, delay: i * 0.12,
                  scrollTrigger: { trigger: '.section3', start: 'top bottom',toggleActions: "play none none reset" }
              });
      });
      //back btn
      const backBtn = document.querySelector('.header-center-back-btn');
      const backBtnArrow = backBtn.querySelector('.back-btn-arrow');
      const backBtnArrowClone = backBtn.querySelector('.back-btn-arrow-clone');
      const backBtnText = backBtn.querySelector('.back');
      
      const backBtnHoverArrowAni = gsap.fromTo(backBtnArrow,
          { x: '0.4vw' },
          { x: '-1.9vw', ease: 'power1.inOut', duration: 0.2, paused: true }
      );
      
      const backBtnHoverArrowCloneAni = gsap.fromTo(backBtnArrowClone,
          { x: '4vw' },
          { x: '0vw', ease: 'power1.inOut', duration: 0.18, paused: true }
      );
      
      const backBtnHoverTextAni = gsap.fromTo(backBtnText,
          { x: '0.4vw' },
          { x: '-0.7vw', ease: 'power1.inOut', duration: 0.2, paused: true }
      );
      
      backBtn.addEventListener('mouseenter', () => {
          backBtnHoverArrowAni.play();
          backBtnHoverArrowCloneAni.play();
          backBtnHoverTextAni.play();
      });
      
      backBtn.addEventListener('mouseleave', () => {
          backBtnHoverArrowAni.reverse();
          backBtnHoverArrowCloneAni.reverse();
          backBtnHoverTextAni.reverse();
      });
      
      const backBtnAppearAni = gsap.fromTo(backBtn,
          { opacity: 0, y: '3.5vw' ,pointerEvents: 'none' ,display: 'none'},
          { opacity: 1, y: 0,pointerEvents: 'auto', display: 'flex', ease: 'power1.inOut', duration: 0.5,paused: true,delay: 1 });
      
      
      //back btn end
      
      //nationregion
      const CR = document.querySelectorAll('.culture-region'); //
      const regionContents = document.querySelectorAll('.region-content');
      const turningScreen = document.querySelector('.turning-screen');
      const ARegions = document.querySelectorAll('.a-region');
      CR.forEach((cr) => {
          const RPC = cr.querySelectorAll('.region-pic-container');
      
          gsap.fromTo(RPC,
              { clipPath: 'inset(10% 10% 10% 10% round 20px)' },
              { clipPath: 'inset(0% 0% 0% 0% round 20px)', ease: 'power1.inOut', duration: 0.8,
                  scrollTrigger: { trigger: cr, start: 'top bottom',end:'bottom top',toggleActions: "play reset play reset" }
              });
      
          const textElement = cr.querySelectorAll('.location');
          const split = new SplitText(textElement, { type: 'chars' });
      
          gsap.fromTo(split.chars, 
              {opacity: 0,}, 
              {opacity: 1, rotationY: 360, ease: 'power1.inOut', duration: 0.2, stagger: 0.05,
                  scrollTrigger: { trigger: cr, start: 'top bottom',end: 'bottom top',toggleActions: "play reset play reset" }
          });
      
      });
      
      CR.forEach((la) => {
          const LAA = la.querySelectorAll('.L-A-A');
          const LAL = la.querySelectorAll('.L-A-L');
          const LAAni = gsap.fromTo(LAA,
              { x: 0 , opacity: 0 },
              { x: '5vw', opacity: 1, ease: 'power1.inOut', duration: 0.3, paused: true }
          );
      
          const LALAni = gsap.fromTo(LAL,
              { x: '1vw' },
              { x: '7vw', ease: 'power1.inOut', duration: 0.4, paused: true }
          );
      
           la.addEventListener('mouseenter', () => {
              LAAni.play();
              LALAni.play(); 
          });
          la.addEventListener('mouseleave', () => {
              LAAni.reverse();
              LALAni.reverse();
          });
      });
      
      let activeContent = null;
      let currentScrollX = 0;
      let wheelHandler = null;
      let activeRegionCarousel = null;
      let regionCarouselTimer = null;

      function stopRegionCarousel() {
          if (regionCarouselTimer) {
              window.clearInterval(regionCarouselTimer);
              regionCarouselTimer = null;
          }
          if (activeRegionCarousel?.playButton) {
              activeRegionCarousel.playButton.classList.remove('is-playing');
              activeRegionCarousel.playButton.setAttribute('aria-label', 'Play region pages');
          }
      }

      function setRegionCarouselIndex(carousel, index, animate = true) {
          if (!carousel || carousel.pages.length === 0) {
              return;
          }

          const nextIndex = gsap.utils.wrap(0, carousel.pages.length, index);
          carousel.currentIndex = nextIndex;
          carousel.content.dataset.regionCarouselIndex = String(nextIndex);
          currentScrollX = nextIndex * window.innerWidth;

          carousel.dots.forEach((dot, dotIndex) => {
              const isActive = dotIndex === nextIndex;
              dot.classList.toggle('is-active', isActive);
              dot.setAttribute('aria-current', isActive ? 'true' : 'false');
          });

          gsap.to(carousel.container, {
              x: -currentScrollX,
              duration: animate ? 0.55 : 0,
              ease: 'power2.out',
              overwrite: true
          });
      }

      function syncRegionCarouselFromScroll(carousel) {
          if (!carousel || carousel.pages.length === 0) {
              return;
          }

          const index = Math.max(0, Math.min(carousel.pages.length - 1, Math.round(currentScrollX / window.innerWidth)));
          carousel.currentIndex = index;
          carousel.content.dataset.regionCarouselIndex = String(index);
          carousel.dots.forEach((dot, dotIndex) => {
              const isActive = dotIndex === index;
              dot.classList.toggle('is-active', isActive);
              dot.setAttribute('aria-current', isActive ? 'true' : 'false');
          });
      }

      function getRegionCarousel(content) {
          const container = content.querySelector('.content-container');
          if (!container) {
              return null;
          }

          const pages = Array.from(container.querySelectorAll(':scope > .moonT'));
          if (pages.length === 0) {
              return null;
          }

          let controls = content.querySelector('.region-carousel-controls');
          if (!controls) {
              controls = document.createElement('div');
              controls.className = 'region-carousel-controls';
              controls.setAttribute('aria-label', 'Region page controls');

              const dotsWrap = document.createElement('div');
              dotsWrap.className = 'region-carousel-dots';

              pages.forEach((page, pageIndex) => {
                  const label = page.querySelector('.moonTtitle, .Story-name')?.textContent?.trim() || `Page ${pageIndex + 1}`;
                  const dot = document.createElement('button');
                  dot.type = 'button';
                  dot.className = 'region-carousel-dot';
                  dot.setAttribute('aria-label', `Go to ${label}`);
                  dot.addEventListener('click', (event) => {
                      event.stopPropagation();
                      const carousel = getRegionCarousel(content);
                      setRegionCarouselIndex(carousel, pageIndex);
                  });
                  dotsWrap.appendChild(dot);
              });

              const playButton = document.createElement('button');
              playButton.type = 'button';
              playButton.className = 'region-carousel-play';
              playButton.setAttribute('aria-label', 'Play region pages');
              playButton.addEventListener('click', (event) => {
                  event.stopPropagation();
                  const carousel = getRegionCarousel(content);
                  if (!carousel) {
                      return;
                  }

                  if (regionCarouselTimer) {
                      stopRegionCarousel();
                      return;
                  }

                  activeRegionCarousel = carousel;
                  carousel.playButton.classList.add('is-playing');
                  carousel.playButton.setAttribute('aria-label', 'Pause region pages');
                  regionCarouselTimer = window.setInterval(() => {
                      setRegionCarouselIndex(carousel, carousel.currentIndex + 1);
                  }, 3500);
              });

              controls.appendChild(dotsWrap);
              controls.appendChild(playButton);
              content.appendChild(controls);
          }

          const dots = Array.from(controls.querySelectorAll('.region-carousel-dot'));
          const playButton = controls.querySelector('.region-carousel-play');
          return {
              content,
              container,
              pages,
              dots,
              playButton,
              currentIndex: Number(content.dataset.regionCarouselIndex || 0)
          };
      }
      
      CR.forEach((cr, index) => {
          cr.addEventListener('click', () => {
              const content = regionContents[index];
              if (content) 
              {
                  stopRegionCarousel();
                  activeContent = content; // è®°å½•å½“å‰æ´»åŠ¨å¡ç‰‡
                  
                  // èŽ·å–å¯¹åº”ç‰ˆå—é‡Œ Story çš„æ ‡é¢˜é¢œè‰²å¹¶èµ‹ç»™ logo-text
                  const storyTitle = content.querySelector('.story > span:first-child');
                  const logoText = document.querySelector('.logo-text');
                  if (storyTitle && logoText) {
                      gsap.to(logoText, { color: window.getComputedStyle(storyTitle).color, duration: 0.5, ease: 'power1.inOut', delay: 0.8 });
                  }
      
                  // é˜»éš”èƒŒæ™¯æ»šåŠ¨
                  document.body.style.overflow = 'hidden';
                  if (typeof lenis !== 'undefined') lenis.stop();
      
                  turningScreen.style.backgroundColor = window.getComputedStyle(content).backgroundColor;
      
                      gsap.fromTo(turningScreen,
                          { opacity: 0, display: 'none' },
                          { opacity: 1, display: 'flex', ease: 'power1.inOut', duration: 0.5 ,
                              onComplete: () => {
                                  gsap.to(turningScreen, {
                                      opacity: 0,
                                      duration: 0.5,
                                      ease: 'power1.inOut',
                                      delay: 0.5,
                                  });
                              }
                          });
                      
      
                      gsap.fromTo(content,
                          {display: 'none', pointerEvents: 'none', opacity: 0},
                          {display: 'flex', pointerEvents: 'auto', opacity: 1, ease: 'power1.inOut', duration: 0.5, delay: 0.3});
      
                      // ç»‘å®šæ»šè½®æ¨ªå‘æ»šåŠ¨
                      const container = content.querySelector('.content-container');
                      if (container) {
                          activeRegionCarousel = getRegionCarousel(content);
                          currentScrollX = 0;
                          gsap.set(container, { x: 0 });
                          setRegionCarouselIndex(activeRegionCarousel, 0, false);
      
                          wheelHandler = (e) => {
                              e.preventDefault();
                              const maxScroll = container.scrollWidth - window.innerWidth;
                              currentScrollX += e.deltaY;
                              currentScrollX = Math.max(0, Math.min(currentScrollX, maxScroll));
                              syncRegionCarouselFromScroll(activeRegionCarousel);
                              gsap.to(container, {
                                  x: -currentScrollX,
                                  duration: 0.5,
                                  ease: 'power2.out',
                                  overwrite: true
                              });
                          };
      
                          content.addEventListener('wheel', wheelHandler, { passive: false });
                      }
              }
              backBtnAppearAni.restart(true);
          });
      });
      
      backBtn.addEventListener('click', () => {
          if (activeContent) {
              stopRegionCarousel();
              // æ¢å¤ logo é¢œè‰²
              const logoText = document.querySelector('.logo-text');
              if (logoText) {
                  gsap.to(logoText, { color: '#E6E9EE', duration: 0.5, ease: 'power1.inOut' });
              }
      
              // ç§»é™¤æ»šè½®ç›‘å¬å¹¶é‡ç½®ä½ç½®
              if (wheelHandler) {
                  activeContent.removeEventListener('wheel', wheelHandler);
                  wheelHandler = null;
              }
              const container = activeContent.querySelector('.content-container');
              if (container) {
                  gsap.set(container, { x: 0 });
              }
              currentScrollX = 0;
              activeRegionCarousel = null;
      
              // å…³é—­å½“å‰æ˜¾ç¤ºçš„ content
              gsap.to(activeContent, { display: 'none', duration: 0.8, opacity: 0, ease: 'power1.inOut' });
              activeContent = null; // é‡ç½®
          }
      
          // æ¢å¤èƒŒæ™¯æ»šåŠ¨
          document.body.style.overflow = 'auto';
          if (typeof lenis !== 'undefined') {
              lenis.start();
          }
      
          // éšè— backBtn æœ¬èº«
          backBtnAppearAni.reverse(); 
      });
      
      //#endregion section3
      
      //#region section4
      const section4 = document.querySelector('.section4');
      const section4Kicker = document.querySelector('.section4-kicker');
      const section4Title = document.querySelector('.section4-title');
      const section4Desc = document.querySelector('.section4-desc');
      const section4Footer = document.querySelector('.section4-footer');
      
      if (section4 && section4Kicker && section4Title && section4Desc && section4Footer) {
          const section4Trigger = {
              trigger: section4,
              start: 'top 75%',
              toggleActions: 'play none none reset'
          };
      
          gsap.fromTo(
              section4Kicker,
              { y: '2.4vw', opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0, scrollTrigger: section4Trigger }
          );
      
          gsap.fromTo(
              section4Title,
              { y: '2.8vw', opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.25, scrollTrigger: section4Trigger }
          );
      
          gsap.fromTo(
              section4Desc,
              { y: '2.2vw', opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.5, scrollTrigger: section4Trigger }
          );
      
          gsap.fromTo(
              section4Footer,
              { y: '1.6vw', opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.75, scrollTrigger: section4Trigger }
          );
      }
      
      const satellite = document.querySelectorAll('.satellite-pic');
      
      //#endregion section4
      
      //#region section5
      
      const satelliteTextBlocks = gsap.utils.toArray('.three-s');
      
      if (satelliteTextBlocks.length > 0) {
          gsap.set(satelliteTextBlocks, {
              position: 'fixed',
              top: '35vh',
              left: '5vw',
              autoAlpha: 0,
              pointerEvents: 'none'
          });
      
          satelliteTextBlocks.forEach((textBlock, index) => {
              const page = textBlock.closest('.explore-page');
              const pictureBlock = page.querySelector('.satellite-pic');
              const nextTextBlock = satelliteTextBlocks[index + 1];
              const nextPage = nextTextBlock ? nextTextBlock.closest('.explore-page') : null;
              const splitText = new SplitText(textBlock, { type: 'chars' });
      
              if (pictureBlock) {
                  gsap.set(pictureBlock, {
                      position: 'fixed',
                      top: '35vh',
                      right: '5vw',
                      autoAlpha: 0,
                      pointerEvents: 'none'
                  });
              }
      
              gsap.set(splitText.chars, {
                  display: 'inline-block',
                  y: '1.2em',
                  autoAlpha: 0
              });
      
              function showSatelliteText() {
                  gsap.killTweensOf(textBlock);
                  gsap.killTweensOf(splitText.chars);
                  if (pictureBlock) {
                      gsap.killTweensOf(pictureBlock);
                  }
                  gsap.set(textBlock, { autoAlpha: 1 });
                  if (pictureBlock) {
                      gsap.set(pictureBlock, { autoAlpha: 1 });
                  }
                  gsap.fromTo(splitText.chars,
                      { y: '1.2em', autoAlpha: 0 },
                      {
                          y: 0,
                          autoAlpha: 1,
                          duration: 0.55,
                          ease: 'power3.out',
                          stagger: 0.012,
                          overwrite: true
                      }
                  );
              }
      
              function hideSatelliteText(direction = 1) {
                  gsap.killTweensOf(textBlock);
                  gsap.killTweensOf(splitText.chars);
                  if (pictureBlock) {
                      gsap.killTweensOf(pictureBlock);
                      gsap.to(pictureBlock, {
                          autoAlpha: 0,
                          duration: 0.28,
                          ease: 'power2.in',
                          overwrite: true
                      });
                  }
                  gsap.to(splitText.chars, {
                      y: direction > 0 ? '-0.8em' : '1.2em',
                      autoAlpha: 0,
                      duration: 0.28,
                      ease: 'power2.in',
                      stagger: 0.006,
                      overwrite: true,
                      onComplete: () => {
                          gsap.set(textBlock, { autoAlpha: 0 });
                      }
                  });
              }
      
              ScrollTrigger.create({
                  trigger: page,
                  start: 'top top',
                  onEnter: showSatelliteText,
                  onEnterBack: showSatelliteText,
                  onLeaveBack: () => hideSatelliteText(-1)
              });
      
              if (nextPage) {
                  ScrollTrigger.create({
                      trigger: nextPage,
                      start: 'top top',
                      onEnter: () => hideSatelliteText(1),
                      onLeaveBack: showSatelliteText
                  });
              }
          });
      }

      const apolloPic = document.querySelector('.apolloPic');
      const apolloPicWrap = apolloPic?.parentElement;
      const apolloPage = document.querySelector('.divPage14');
      const endingPage = document.querySelector('.divPage25');
      const endingLine = document.querySelector('.moon-ending-line');

      if (apolloPicWrap && apolloPage && endingPage) {
          gsap.fromTo(apolloPicWrap,
              { y: 0, autoAlpha: 1 },
              {
                  y: '45vh',
                  autoAlpha: 0,
                  ease: 'none',
                  scrollTrigger: {
                      trigger: apolloPage,
                      start: 'top top',
                      endTrigger: endingPage,
                      end: 'top top',
                      scrub: true
                  }
              }
          );
      }

      if (endingPage && endingLine) {
          gsap.set(endingLine, {
              y: '2vh',
              autoAlpha: 0
          });

          ScrollTrigger.create({
              trigger: endingPage,
              start: 'top 72%',
              onEnter: () => {
                  gsap.to(satelliteTextBlocks, {
                      autoAlpha: 0,
                      duration: 0.35,
                      ease: 'power2.out',
                      overwrite: true
                  });
                  gsap.to(endingLine, {
                      y: 0,
                      autoAlpha: 1,
                      duration: 1.2,
                      ease: 'power2.out',
                      overwrite: true
                  });
              },
              onLeaveBack: () => {
                  gsap.to(endingLine, {
                      y: '2vh',
                      autoAlpha: 0,
                      duration: 0.35,
                      ease: 'power2.in',
                      overwrite: true
                  });
              }
          });
      }

      //#endregion section5
      
      
      
    });
  });

  onBeforeUnmount(() => {
    ctx?.revert();
    ctx = null;
  });
}
