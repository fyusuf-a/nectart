<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { twMerge } from 'tailwind-merge';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';

  export let objectWidth: number = 204;
  const GLTF_PATH = '/models/bottle.glb'
  let isMouseDown = false;
  
  export let fov = 50;
  let canvas: HTMLCanvasElement;
  let renderer: THREE.WebGLRenderer;
  let camera: THREE.PerspectiveCamera;
  let gltf: THREE.Group<THREE.Object3DEventMap> | null = null;

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  onMount(() => {
    const scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', resize);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Camera
    camera = new THREE.PerspectiveCamera(fov, canvas.clientWidth / canvas.clientHeight, 1, 100 );
    scene.add(camera);
    resize();

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enabled = false;
    const animate = () => {
      controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const isIntersecting = (mouseX: number, mouseY: number) => {
      mouse.x = (mouseX / window.innerWidth) * 2 - 1;
      mouse.y = -(mouseY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      return intersects.length > 0;
    };


    canvas.addEventListener('mousemove', (event) => {
      if(!gltf) return;
      // var mousePosition = new THREE.Vector3(0, 0, 0.5);
      // mousePosition.x = 2 * (event.clientX / window.innerWidth) - 1;
      // mousePosition.y = 1 - 2 * (event.clientY / window.innerHeight);
      // mousePosition.unproject(camera);
      // var raycaster = new THREE.Raycaster(camera.position, mousePosition.sub(camera.position).normalize());
      // var intersects = raycaster.intersectObjects(scene.children);
      if (!isMouseDown) {
        controls.enabled = isIntersecting(event.clientX, event.clientY);
      }
    });
    document.addEventListener('mousedown', (event) => {
      isMouseDown = true;
    });
    document.addEventListener('mouseup', (event) => {
      isMouseDown = false;
      controls.enabled = isIntersecting(event.clientX, event.clientY);
    });

    // Lights
    const light1 = new THREE.AmbientLight(0xffffff, 100 * 0.3);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 5);
    light2.position.set(0.5, 0, 0.866);
    scene.add(light2);

    // Load environment
    const premGenerator = new THREE.PMREMGenerator(renderer);
    premGenerator.compileEquirectangularShader();
    new EXRLoader().load('/textures/sunset.exr', (texture) => {
      const envMap = premGenerator.fromEquirectangular(texture).texture;
      premGenerator.dispose();
      scene.environment = envMap;
    }, (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% EXR loaded');
    }, (error) => {
      console.error('An error happened while loading the EXR', error);
    });
  
    const loader = new GLTFLoader(new THREE.LoadingManager())
      .setCrossOrigin('anonymous')
    loader.load(GLTF_PATH, (gltf_) => {
      gltf = gltf_.scene;
      gltf.position.set(0, 0, 0);
      gltf.scale.set(1, 1, 1);
      scene.add(gltf);
      //const ratio = window.innerWidth / window.innerHeight;
      const box = new THREE.Box3().setFromObject(gltf);
      const size = box.getSize(new THREE.Vector3());
      //const boxRatio = size.x / size.y;
      const screenRatio = window.innerWidth / window.innerHeight;
      //const scaleRatio = 1;
      //const scaleRatio = screenRatio / boxRatio;
      //console.log(scaleRatio);

      //camera.position.z = size.y / (2 * scaleRatio * Math.tan(fov * Math.PI / 360)) + size.x * scaleRatio / 2;


      //console.log(scaleRatio);
      //cube.scale.set(scaleRatio, scaleRatio, scaleRatio);
      //gltf.scale.set(scaleRatio, scaleRatio, scaleRatio);

      camera.position.z = 5;

      const fov = camera.fov * (Math.PI / 180);
      const distance = camera.position.z - gltf.position.z;
      const visibleHeight = 2 * Math.tan(fov / 2) * distance;
      const aspect = window.innerWidth / window.innerHeight;
      const visibleWidth = visibleHeight * aspect;
      const scaleFactor = (objectWidth / window.innerWidth) * visibleWidth;
      const scale = scaleFactor / size.x;
      gltf.scale.set(scale, scale, scale);


      scene.add(gltf);
      //scene.add(cube);

      const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
      geometry.scale(scale, scale, scale);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      //scene.add(cube);

      // const edges = new THREE.EdgesGeometry(geometry);
      // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xff0000 }));
      // line.scale.set(scaleRatio, scaleRatio, scaleRatio);
      // scene.add(line);


      //const cube = new THREE.Mesh(geometry, material);
      // const boxRatio = size.x / size.y;
      //const scale = objectWidth / (window.innerHeight * boxRatio);
      //cube.scale.set(scale, scale, scale);
      //scene.add(cube);

      //scene.add(line);
    }, (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% GLTF loaded');
      animate();
    }, (error) => {
      console.error('An error happened while loading the GLTF', error);
    });

    return () => {
      renderer.dispose();
      window.removeEventListener('resize', resize);
    };
    //objectWidth = scene.gltf.
  });

 // onMount(() => {
 //   const scene = new GLTFScene(el, 'models/bottle.glb', {
 //     scale,
 //     position: new THREE.Vector3(0, 0, 0),
 //     rotation: new THREE.Euler(0, 0, 0),
 //   });

 //   //objectWidth = scene.gltf.


 // });
</script>

<canvas
  class={
    twMerge('h-full', $$props.class)
  }
  bind:this={canvas}
></canvas>