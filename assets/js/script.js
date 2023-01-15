import * as THREE from "//unpkg.com/three@0.148.0/build/three.module.js";
import { TextGeometry } from "//unpkg.com/three@0.148.0/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "//unpkg.com/three@0.148.0/examples/jsm/loaders/FontLoader.js";
import { ScrollObserver } from "./_class.js";
import { StickAnime } from "./_class.js";

let scrollY; //スクロール量格納用

window.addEventListener('DOMContentLoaded', function () {
  mediaQueryFunc();
  mediaReload();
  playgroundLink();
});


// //----------------------------------------------------------------
//背景ノイズ--------------------------------------------------------
const gradient = new Gradient();
gradient.initGradient("#canvas-bg");
//---------------------------------------------------------------------------------
//スクロール方向検知
let scrollDir = "down";
let set_position = 0;
window.addEventListener("scroll", function () {
  if (set_position < document.documentElement.scrollTop) {
    scrollDir = "down";
  } else {
    scrollDir = "up";
  }
  set_position = document.documentElement.scrollTop;
});
window.addEventListener("touchmove", function () {
  if (set_position < document.documentElement.scrollTop) {
    scrollDir = "down";
  } else {
    scrollDir = "up";
  }
  set_position = document.documentElement.scrollTop;
});
//---------------------------------------------------------------------------------
//fadeUpAnimation
const fadeUpCb = function fadeUpAnime(el, isIntersecting) {
  el.setAttribute('style', `opacity:0;transform:translateY(50px)`);
  if (isIntersecting) {
    let timings = {
      easing: "cubic-bezier(.19,.2,.1,.38)",
      fill: "forwards",
    };
    timings.duration = 1300;
    el.animate(
      [
        { transform: `translateY(30px)`, opacity: 0, },
        { transform: `translateY(-8px)`, opacity: 1, },
        { transform: `translateY(0px)`, opacity: 1, },
      ],
      timings
      );
    }
  }
  const fadeLtRCb = function fadeUpAnime(el, isIntersecting) {
    el.setAttribute('style', `opacity:0;transform:translateY(50px)`);
    if (isIntersecting) {
      let timings = {
        easing: "cubic-bezier(.19,.2,.1,.38)",
        fill: "forwards",
      };
      timings.duration = 1300;
      el.animate(
        [
          { transform: `translateX(-30px)`, opacity: 0, },
          { transform: `translateX(8px)`, opacity: 1, },
          { transform: `translateX(0px)`, opacity: 1, },
        ],
        timings
        );
      }
    }

    const fadeLtREls = document.querySelectorAll('.js-fadeLtRTarget')
    const fadeLtrSo = new ScrollObserver(fadeLtREls, fadeLtRCb, "0px 0px -150px 0px");
    const fadeUpEls = document.querySelectorAll('.js-fadeUpTarget')
    const fadeUpSo = new ScrollObserver(fadeUpEls, fadeUpCb, "0px 0px -150px 0px");


//-----------------------------------------------------------------------------------------
//吸い付くボタン
const stickAnimeInstance = new StickAnime(document.querySelectorAll(".js-stickOuter"),40);
const stickAnimeInstanceProfile = new StickAnime(document.querySelectorAll(".js-stickOuterProfile"),20);
// const stickAnimeInstanceTop = new StickAnime(document.querySelectorAll(".js-stickOuterTop"),20);
stickAnimeInstance.stickyMovePx();
stickAnimeInstanceProfile.stickyMovePx();
// stickAnimeInstanceTop.stickyMovePx();
//-


let mediaQueryPC, mediaQueryTablet, mediaQueryMobile,mediaFlag;

//メディアクエリ用関数
function mediaQueryFunc() {
  mediaFlag;
  mediaQueryPC = window.matchMedia("(min-width:1024px)");
  mediaQueryTablet = window.matchMedia("(max-width:1023px) and (min-width:768px)");
  mediaQueryMobile = window.matchMedia("(max-width:767px)");
  
  function mediaCheckPC(event) {
    if (event.matches) {
      mediaFlag = "pc";
    }
  }
  function mediaCheckTablet(event) {
    if (event.matches) {
      mediaFlag = "tablet";
    }
  }
  function mediaCheckMobile(event) {
    if (event.matches) {
      mediaFlag = "mobile";
    }
  }
  
  mediaQueryPC.addEventListener('change',mediaCheckPC);
  mediaQueryTablet.addEventListener('change',mediaCheckTablet);
  mediaQueryMobile.addEventListener('change', mediaCheckMobile);
  
  mediaCheckPC(mediaQueryPC);
  mediaCheckTablet(mediaQueryTablet);
  mediaCheckMobile(mediaQueryMobile);
}

function mediaReload(){
    //リサイズ時(ブレイクポイントを超える度に発火)
  mediaQueryPC.addEventListener('change', function () {
    if (mediaFlag === "pc") {
      //pcサイズ(1024px以上)
      window.location.reload();
    }
  });
  mediaQueryTablet.addEventListener('change', function () {
    if (mediaFlag === "tablet") {
      //タブレットサイズ(768px以上1024px未満)
      window.location.reload();
    }
  });
  mediaQueryMobile.addEventListener('change', function () {
    if (mediaFlag === "mobile") {
      //モバイルサイズ(768px未満)
      window.location.reload();
    }
  });
}




// ---------------------------------------------------------------
// three.js

function playgroundLink() {
  let text;
const canvas = document.getElementById('js-playgroundCanvas');
// Scene
  const scene = new THREE.Scene();
  if (!canvas) return;
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight / 3,
}
const camera = new THREE.PerspectiveCamera(
  70,
  sizes.width / sizes.height,
  0.001,
  10000
);
if (mediaFlag === "pcL" || mediaFlag === "pc") {
  camera.position.set(0, 0, 0.5);
} else {
  camera.position.set(0, 0, 0.7);
}
scene.add(camera);
canvas.addEventListener('mouseover', function () {
  gsap.to(camera.position, {
    z: 0.45,
    duration: 0.4,
    onComplete: () => {
      camera.updateProjectionMatrix();
    }
  })
});
canvas.addEventListener('mouseout', function () {
  gsap.to(camera.position, {
    z: 0.5,
    duration: 0.4,
    onComplete: () => {
      camera.updateProjectionMatrix();
    }
  })
});

//Fonts
const fontLoader = new FontLoader();
// fontLoader.load("assets/fonts/droid/droid_sans_bold.typeface.json", (font) => {
fontLoader.load("assets/fonts/optimer_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("PLAYGROUND", {
    font: font,
    size: 0.07,
    height: 0.01,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.0001,
    bevelSize: 0.000001,
    bevelOffset: 0,
    bevelSegments: 10,
    letterSpacing: 200
  });
  textGeometry.center();

  const textMaterial = new THREE.MeshNormalMaterial();
  text = new THREE.Mesh(textGeometry, textMaterial);
  text.position.set(0, 0, 0.3);
  text.rotation.z = (Math.PI / 2) / 10;
  scene.add(text);
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas:canvas,
  alpha:true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000,0);

// Animate
let rotateX = 0;
const animate = () => {
  if (text !== undefined && scrollDir === "down") {
    rotateX += 0.005;
    text.rotation.x += 0.005;
  } else if (text !== undefined && scrollDir === "up") {
    rotateX -= 0.005;
    text.rotation.x -= 0.005;
  }
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

window.addEventListener('scroll', function (e) {
  scrollY = window.pageYOffset;
  if (text !== undefined) {
    text.rotation.x = rotateX + scrollY * 0.003;
  }
})

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth / 2;
  sizes.height = window.innerHeight / 3;

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
animate();
}

