import * as THREE from 'three';
this
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

type Environment = {
  id: string;
  name: string;
  path: null;
} | {
  id: string;
  name: string;
  path: string;
  format: string;
};

export const environments: Environment[] = [
	{
		id: '',
		name: 'None',
		path: null,
	},
	{
		id: 'neutral', // THREE.RoomEnvironment
		name: 'Neutral',
		path: null,
	},
	{
		id: 'venice-sunset',
		name: 'Venice Sunset',
		path: 'https://storage.googleapis.com/donmccurdy-static/venice_sunset_1k.exr',
		format: '.exr',
	},
	{
		id: 'footprint-court',
		name: 'Footprint Court (HDR Labs)',
		path: 'https://storage.googleapis.com/donmccurdy-static/footprint_court_2k.exr',
		format: '.exr',
	},
];

export class GLTFScene {
  renderer: THREE.WebGLRenderer
  camera;
  lights: THREE.Light[] = [];
  premGenerator: THREE.PMREMGenerator;
  scene = new THREE.Scene();
  gltf: THREE.Group<THREE.Object3DEventMap> | null = null;
  canvas: HTMLCanvasElement;
  neutralEnvironment: THREE.Texture;
  background: THREE.Texture | null = null;

  constructor(canvas: HTMLCanvasElement, GLTFPath: string, { position, rotation, scale }: { position?: THREE.Vector3, rotation?: THREE.Euler, scale?: number }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.canvas, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera = new THREE.PerspectiveCamera(50, this.canvas.clientWidth / this.canvas.clientHeight, 1, 100 );
    this.canvas.addEventListener('resize', this.resize);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.resize();
    const light1 = new THREE.AmbientLight(0xffffff, 100 * 0.3);
    light1.name = 'ambient_light';
    const light2 = new THREE.DirectionalLight(0xffffff, 5);
    light2.position.set(0.5, 0, 0.866);
    light2.name = 'main_light';
    this.lights.push(light1);
    this.lights.push(light2);
    const loader = new GLTFLoader(new THREE.LoadingManager())
      .setCrossOrigin('anonymous');
    this.premGenerator = new THREE.PMREMGenerator( this.renderer );
    this.premGenerator.compileEquirectangularShader();
    this.neutralEnvironment = this.premGenerator.fromScene(new RoomEnvironment()).texture;
    loader.load(GLTFPath, (gltf) => {
      this.gltf = gltf.scene;
      this.scene.add(gltf.scene);
      if (position) {
        this.gltf.position.set(position.x, position.y, position.z);
      }
      if (rotation) {
        this.gltf.rotation.set(rotation.x, rotation.y, rotation.z);
      }
      if (scale) {
        this.gltf.scale.set(scale, scale, scale);
      }
      this.setUpScene();
    }, (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, (error) => {
      console.error('An error happened', error);
    });
  }

  async setUpScene() {
    // for (const light of this.lights) {
    //   this.camera.add(light);
    // }
    this.camera.position.z = 2;
    this.scene.add(this.camera);
    this.scene.add(this.lights[0]);
    this.scene.add(this.lights[1]);
    await this.updateEnvironment();
    this.renderer.render(this.scene, this.camera);
    console.log('rendered');
  }

  destroyScene() {
    this.canvas.removeEventListener('resize', this.resize);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.updateEnvironment();
    this.renderer.render(this.scene, this.camera);
    //if (this.gltf)
      //this.gltf.rotation.y += 0.01;
  }

  resize = () => {
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  async updateEnvironment() {
    const environment = environments.filter(
            (entry) => entry.name === 'Venice Sunset'
    )[0];

    await this.getCubeMapTexture(environment).then(({ envMap }) => {
      console.log('encoding', envMap.format);
      //envMap!.format = THREE.AlphaFormat;
      this.scene.environment = envMap;
      //this.scene.background = envMap ? envMap : new THREE.Color(0x0000ff);
      console.log('updated background', envMap);
    });
  }

  async getCubeMapTexture(environment: Environment): Promise<{ envMap: THREE.Texture | null; }> {
    console.log(environment.name);
          const { id, path } = environment;

          // neutral (THREE.RoomEnvironment)
          if (id === 'neutral') {
                  return Promise.resolve({ envMap: this.neutralEnvironment });
          }

          // none
          if (id === '' || path == null) {
                  return Promise.resolve({ envMap: null });
          }

          return new Promise((resolve, reject) => {
                  new EXRLoader().load(
                          path,
                          (texture) => {
                                  const envMap = this.premGenerator.fromEquirectangular(texture).texture;
                                  this.premGenerator.dispose();

                                  resolve({ envMap });
                          },
                          undefined,
                          reject,
                  );
          });
  }
}
