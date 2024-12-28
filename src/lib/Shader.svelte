<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  export let src: string;

  let container: HTMLElement;
  const clock = new THREE.Clock();

  const setUpShader = async (scene: THREE.Scene, camera: THREE.Camera, canvasAspect: number) => {
    // Vertex Shader (simple pass-through)
    const vertexShader = `
      uniform mat4 projectionMatrix;
      uniform mat4 viewMatrix;
      uniform mat4 modelMatrix;

      attribute vec3 position;

      void main()
      {
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
      }
    `;
    
    // Fragment Shader (simple red color)
    const fragmentShader = await fetch(src).then((res) => res.text());
    console.log(fragmentShader);
    
    // Create custom shader material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
      },
      vertexShader,
      fragmentShader,
    });
    
    // Create a plane geometry and mesh
    const geometry = new THREE.PlaneGeometry(2 * canvasAspect, 2);
    const mesh = new THREE.Mesh(geometry, material);
    
    // Add the mesh to the scene
    scene.add(mesh);
    
    // Set camera position
    camera.position.z = 1;
    return material;
  };
  
  onMount(() => {
    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer();
    let material: THREE.RawShaderMaterial | null = null;
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    setUpShader(scene, camera, aspect).then((mat) => {
      material = mat;
    });
    
    function animate() {
      if (material) {
        material.uniforms.u_time.value = clock.getElapsedTime();
      }
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    
    animate();

    window.addEventListener('resize', () => {
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  });
</script>

<div
  bind:this={container}
  {...$$restProps}
></div>
