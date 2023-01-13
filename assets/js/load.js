import * as THREE from 'three';

console.log("loadjs実行");
// const loader = document.querySelector('.js-loader');
// const body = document.querySelector('.is-home');

// // //-----------------------------------------------------------------------
// // //拡大禁止
// // document.body.addEventListener('touchmove', (e) => {
// //   if (e.touches.length > 1) {
// //     e.preventDefault();
// //   }
// // }, {passive: false});

// // document.body?.addEventListener(
// //   "wheel",
// //   (e) => {
// //     e.preventDefault();
// //   },
// //   { passive: false }
// //   );
// //----------------------------------------------------------------

// function loadPage() {
//   loader.classList.add('is-loaded');
//   console.log("loadがおわたよ");
// }

// if (!sessionStorage.getItem('visited')) {
//   console.log("初回だよ");
//   init();
//   sessionStorage.setItem('visited', 'first');
//   window.addEventListener('load', function () {
//     setTimeout(loadPage, 4200);
// });
// } else {
//   loadPage();
//   console.log("初回じゃないよ");
// }

// async function init() {
//   console.log("ローディングアニメだよ");
//   const renderer = new THREE.WebGLRenderer({ 
//     antialias: true,
//     alpha:true,
//   });

//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setClearColor(0xffffff,0);
//   loader.appendChild(renderer.domElement);
//   renderer.domElement.classList.add('loader-canvas');
//   const canvas = document.querySelector('.loader-canvas');
//   const canvasW = canvas.clientWidth;
//   const canvasH = canvas.clientHeight;
  
//   const scene = new THREE.Scene();
//   const fov = 60;
  
//   const fovRad = (fov / 2) * (Math.PI / 180);
//   const dist = canvasW / 2 / Math.tan(fovRad);
//   const camera = new THREE.PerspectiveCamera(
//     fov,
//     canvasW / canvasH,
//     0.1,
//     10000
//     );
//     camera.position.z = dist;
    
//     const geometry = new THREE.PlaneGeometry(canvasW * 2,canvasH * 2);
//     const material = new THREE.ShaderMaterial({
//       uniforms: {
//         uTick: { value: 0 },
//       },
//       vertexShader:document.getElementById('v-shader-loading').textContent,
//       fragmentShader:document.getElementById('f-shader-loading').textContent,
//       transparent: true,
//     });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);
  
//   let previousTime = 0;
//   let elapsed,id;
//   function animate() {
//     const currentTime = performance.now();
//     elapsed = ((currentTime - previousTime) / 1000).toFixed(2);
//     id= requestAnimationFrame(animate);
//     material.uniforms.uTick.value = elapsed;
//     renderer.render(scene, camera);
//   }
//   animate();
//   setTimeout(() => {
//     cancelAnimationFrame(id);
//   },10000)
// }