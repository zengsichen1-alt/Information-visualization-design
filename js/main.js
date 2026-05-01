gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const lenis = new Lenis({
  autoRaf: true,
  lerp: 0.05,
});

lenis.on('scroll', (e) => {
  //console.log(e);
});
//#region       LoadingAnimation
window.addEventListener('load', () => {
    
    
    gsap.to("#loading-screen", {
        opacity: 0,
        duration: 0.5, 
        ease: "power2.inOut",
        delay: 1,
        onComplete: () => {
            document.getElementById("loading-screen").style.display = "none";
        }
    });

});
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
// 目前没有交互功能，后续可以添加一些动画效果或者跳转链接
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

    const menuBtnC1Ani = gsap.fromTo(menuContent1, //斜向菜单动画
        { rotation: -10, opacity: 0, y: '2.5vw' },
        {rotation: 0, opacity: 1, y: 0, ease: 'power1.inOut', duration: 0.5, paused: true }
    ); 

    const menuBtnC2Ani = gsap.fromTo(menuContent2, //斜向菜单动画
        { rotation: 20, opacity: 0, y: '6vw' },
        {rotation: 0, opacity: 1, y: 0, ease: 'power1.inOut', duration: 0.5, paused: true }
    );

    const menuBtnDotAni = gsap.to(menuBtnDots, //90度两点转向
    { rotation: 90, ease: 'power1.inOut', duration: 0.2, paused: true, yoyo: false }
    );

    const menuAArrow45Ani = gsap.fromTo(menuAArrow45, //45度箭头
        { x: 0 , y: 0 },
        { x: '1.5vw', y: '-1.5vw', opacity: 0, ease: 'power1.inOut', duration: 0.1, paused: true}
    );

    const menuText2Ani = gsap.fromTo(menuTexts2, //维基百科
        { y: 0, opacity: 1 },
        { y: '-1.3vw', opacity: 1, ease: 'power1.inOut', duration: 0.2, paused: true }
    );

    const menuTextClone2Ani = gsap.fromTo(menuTextsClone2, //维基百科克隆
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


//#endregion section1-2

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

CR.forEach((cr, index) => {
    cr.addEventListener('click', () => {
        const content = regionContents[index];
        if (content) 
        {
            activeContent = content; // 记录当前活动卡片
            
            // 获取对应版块里 Story 的标题颜色并赋给 logo-text
            const storyTitle = content.querySelector('.story > span:first-child');
            const logoText = document.querySelector('.logo-text');
            if (storyTitle && logoText) {
                gsap.to(logoText, { color: window.getComputedStyle(storyTitle).color, duration: 0.5, ease: 'power1.inOut', delay: 0.8 });
            }

            // 阻隔背景滚动
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

                // 绑定滚轮横向滚动
                const container = content.querySelector('.content-container');
                if (container) {
                    currentScrollX = 0;
                    gsap.set(container, { x: 0 });

                    wheelHandler = (e) => {
                        e.preventDefault();
                        const maxScroll = container.scrollWidth - window.innerWidth;
                        currentScrollX += e.deltaY;
                        currentScrollX = Math.max(0, Math.min(currentScrollX, maxScroll));
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
        // 恢复 logo 颜色
        const logoText = document.querySelector('.logo-text');
        if (logoText) {
            gsap.to(logoText, { color: '#E6E9EE', duration: 0.5, ease: 'power1.inOut' });
        }

        // 移除滚轮监听并重置位置
        if (wheelHandler) {
            activeContent.removeEventListener('wheel', wheelHandler);
            wheelHandler = null;
        }
        const container = activeContent.querySelector('.content-container');
        if (container) {
            gsap.set(container, { x: 0 });
        }
        currentScrollX = 0;

        // 关闭当前显示的 content
        gsap.to(activeContent, { display: 'none', duration: 0.8, opacity: 0, ease: 'power1.inOut' });
        activeContent = null; // 重置
    }

    // 恢复背景滚动
    document.body.style.overflow = 'auto';
    if (typeof lenis !== 'undefined') {
        lenis.start();
    }

    // 隐藏 backBtn 本身
    backBtnAppearAni.reverse(); 
});

//#endregion section3

