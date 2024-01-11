import React, { useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from "@tweenjs/tween.js";
import * as CONFIG_DATA from "../KurtiConfigData";
import { AiOutlineZoomOut, AiOutlineZoomIn } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import GlobalContext from "../Context/GlobalContext";
let threeContainer;
let mKurtiObj;
const model_setting = {
  max_scale: 0.045,
  max_y: -4,
  min_y: 0,
  max_x: 0,
  min_x: 0,
};

export const CurrentType = { value: CONFIG_DATA.StyleMenuList.kurti };
export const GRID_SEL = {
  front: 0,
  back: 0,
  sleeves: 0,
  bottom_wear: 0,
  length: {
    long: 0,
    short: -1,
    curve: -1,
    w_o_slit: -1,
    w_o_slit_l: -1,
    w_o_slit_m: -1,
  },
  accessories_sel: 0,
};
const Web3D = () => {
  // console.log(CONFIG_DATA.kurtiList[0]);
  threeContainer = useRef(null);
  const setLogIn = React.useContext(GlobalContext);
  React.useEffect(() => {
    if (threeContainer.current) return;
    mKurtiObj = new Kurti3d();
    //init3D();
  }, []);
  const logOut = () => {
    setLogIn(false);
    localStorage.setItem("app_token", "");
    localStorage.setItem("user_login", JSON.stringify({ user_login: false }));
  };
  return (
    <Wrapper>
      <div className="threejs-container" id="3d-container"></div>
      <div className="zoom_icon">
        <AiOutlineZoomIn
          onClick={() => {
            mKurtiObj.zoomScene(0); //zoom-in
          }}
        />
        <AiOutlineZoomOut
          onClick={() => {
            mKurtiObj.zoomScene(1); //zoom-out
          }}
        />
      </div>
      <div
        className="log_out"
        onClick={() => {
          logOut();
        }}
      >
        <FiLogOut className="icons" />
      </div>
    </Wrapper>
  );
};
export default Web3D;

export class Kurti3d {
  constructor() {
    threeContainer.current = document.getElementById("3d-container");
    this.scene = null;
    this.camera = null;
    this.render = null;
    this.textureLoader = null;
    this.glbLoader = null;
    this.dirLight = null;
    this.hemiSphereLight = null;
    this.orbitController = null;
    this.canvasW = 0;
    this.canvasH = 0;
    this.loadingManager = null;
    this.rootObject = null;
    this.ladyModel = null;
    this.allInOneTexture = null;
    this.kurti = { model: null, texture: null, isContrast: false };
    this.frontNeck = { model: null, texture: null, isContrast: false };
    this.backNeck = { model: null, texture: null, isContrast: false };
    this.sleeves = { model: null, texture: null, isContrast: false };
    this.laggie = { model: null, texture: null, isContrast: false };
    this.accessories = { model: null, texture: null, isContrast: false };

    const menuChild = document.getElementById("main-menu-container").children;
    this.contrastDiv = menuChild[menuChild.length - 1];
    this.init();
  }
  init() {
    document.getElementsByClassName("loader")[0].style.backgroundColor =
      "rgba(0,0,0,.8)";
    console.log(
      "   threeContainer.current.clientWidth  ",
      threeContainer.current.clientWidth
    );
    this.canvasW = threeContainer.current.clientWidth;
    this.canvasH = threeContainer.current.clientHeight;
    this.scene = new THREE.Scene("kurti_scene");
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.canvasW / this.canvasH,
      0.1,
      1000
    );
    this.zoom = { far: 10, near: 2, current: 10 };
    this.camera.position.set(0, 0, this.zoom.far);
    this.render = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.render.outputColorSpace = THREE.SRGBColorSpace;
    this.render.toneMapping = THREE.ACESFilmicToneMapping;
    this.render.toneMappingExposure = 1;
    this.render.setPixelRatio(window.devicePixelRatio);
    this.render.setClearColor(0x000000, 0);
    this.render.setSize(this.canvasW, this.canvasH);
    // this.render.shadowMap.enabled=true;
    // this.render.shadowMap.type = THREE.PCFSoftShadowMap;
    threeContainer.current.appendChild(this.render.domElement);
    this.loadingManager = new THREE.LoadingManager();
    this.rootObject = new THREE.Object3D();

    this.initLight();
    this.loadAsset();
    this.initOrbitController();
    this.render.setAnimationLoop(() => this.renderScene());
    window.addEventListener("resize", () => {
      this.resize();
    });
    const container = document.getElementById("3d-container");
    container.addEventListener("resize", () => {
      this.resize();
      console.log("^^^^^^^^^^^^^^^");
    });
  }
  initLight() {
    this.dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.dirLight.position.set(0, 20, 20);
    this.scene.add(this.dirLight);

    this.dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    this.dirLight2.position.set(0, 20, -20);
    this.scene.add(this.dirLight2);
    // this.dirLight.shadow.mapSize.width = 512;
    // this.dirLight.shadow.mapSize.height= 512;
    // this.dirLight.shadow.camera.near=.1;
    // this.dirLight.shadow.camera.far=1000;

    this.hemiSphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4);
    this.hemiSphereLight.position.set(0, 10, 0);
    this.scene.add(this.hemiSphereLight);
  }
  initOrbitController() {
    this.orbitController = new OrbitControls(
      this.camera,
      this.render.domElement
    );
    this.orbitController.target.set(0, 0, 0);
    this.orbitController.enablePan = false;
    this.orbitController.minDistance = 2;
    this.orbitController.maxDistance = 10;
    // this.orbitController.enableDamping = true;
    // this.orbitController.dampingFactor=1;
    this.orbitController.minPolarAngle = 0;
    this.orbitController.maxPolarAngle = Math.PI / 2.5;
    this.orbitController.zoomSpeed = 0.5;
    this.orbitController.enableZoom = true;
    this.orbitController.rotateSpeed = 1;
    this.orbitController.update();
    // this.orbitController.enabled=false;
  }
  renderScene() {
    this.render.render(this.scene, this.camera);
    this.orbitController.update();
    TWEEN.update();
  }
  resize() {
    this.canvasW = threeContainer.current.clientWidth;
    this.canvasH = threeContainer.current.clientHeight;
    this.camera.aspect = this.canvasW / this.canvasH;
    this.camera.updateProjectionMatrix();
    this.render.setSize(this.canvasW, this.canvasH);
  }
  zoomScene(type) {
    const value = 0.5;
    if (type === 0) {
      console.log("!! zoom in!! ", this.zoom.current);
      if (this.zoom.current > this.zoom.near) {
        this.zoom.current -= value;
        new TWEEN.Tween(this.orbitController)
          .to(
            { maxDistance: this.zoom.current, minDistance: this.zoom.current },
            200
          )
          .easing(TWEEN.Easing.Linear.None)
          .onComplete(() => {
            this.orbitController.update();
          })
          .start();
      }
    } else {
      console.log("!! zoom out!! ", this.zoom.current);
      if (this.zoom.current < this.zoom.far) {
        this.zoom.current += value;
        new TWEEN.Tween(this.orbitController)
          .to(
            { maxDistance: this.zoom.current, minDistance: this.zoom.current },
            200
          )
          .easing(TWEEN.Easing.Linear.None)
          .onComplete(() => {
            this.orbitController.update();
          })
          .start();
      }
    }
  }
  loadAsset() {
    this.glbLoader = new GLTFLoader(this.loadingManager);
    this.glbLoader.setCrossOrigin("anonymous");
    this.dracoLoader = new DRACOLoader(this.loadingManager);
    this.dracoLoader.setDecoderPath("./draco/gltf/");
    // this.dracoLoader.setDecoderConfig( { type: 'js' } );

    this.glbLoader.setDRACOLoader(this.dracoLoader);
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.textureLoader.setCrossOrigin("anonymous");
    this.rootObject.scale.set(
      model_setting.max_scale,
      model_setting.max_scale,
      model_setting.max_scale
    );
    this.rootObject.position.set(0, model_setting.max_y, 0);
    this.scene.add(this.rootObject);
    this.glbLoader.load("./3dmodel/girl_model.glb", (gltf) => {
      this.ladyModel = gltf.scene;
      this.rootObject.add(this.ladyModel);
      this.ladyModel.traverse((child) => {
        if (child.isMesh) {
          // child.receiveShadow = true;
          if (child.material) {
            child.material.roughness = 0.5;
            // if(child.material.name.includes("hair")){
            //     child.material.color = new THREE.Color(1,1,1);
            // }
            // else
            // {
            child.material.color = new THREE.Color(1, 1, 1);
            // }
            child.material.map = null;
            child.material.normalMap = null;
          }
        }
      });
      this.ladyModel.scale.set(1, 1, 1);
      this.ladyModel.position.set(0, 0, 0);
      this.notCheck = false;
      this.changeModel(
        CONFIG_DATA.LengthMenuList.long,
        `./3dmodel/kurtistyle/kurti/length/long/${CONFIG_DATA.KurtiLongModels[0]}.glb`
      );
      this.changeModel(
        CONFIG_DATA.KurtiStyleMenuList.front,
        `./3dmodel/kurtistyle/kurti/neck/front/${CONFIG_DATA.FrontNeckModels[0]}.glb`
      );
      this.changeModel(
        CONFIG_DATA.KurtiStyleMenuList.back,
        `./3dmodel/kurtistyle/kurti/neck/back/${CONFIG_DATA.BackNeckModels[0]}.glb`
      );
      this.notCheck = true;
    });
    this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
      // console.log('Loading started');
      document.getElementsByClassName("loader")[0].style.display = "flex";
      document.getElementsByClassName("loader")[0].style.backgroundColor =
        "rgba(0,0,0,.85)";
    };
    this.loadingManager.onLoad = () => {
      // console.log('Loading completed');
      document.getElementsByClassName("loader")[0].style.display = "none";
    };
  }
  cleanObject(model) {
    if (!model) return;
    model.traverse((child) => {
      if (child.material) child.material.dispose();
      if (child.geometry) child.geometry.dispose();
    });
    this.rootObject.remove(model);
    model = null;
  }
  changeModel(type, url) {
    switch (type) {
      case CONFIG_DATA.KurtiStyleMenuList.sleeves:
        this.cleanObject(this.sleeves.model);
        break;
      case CONFIG_DATA.KurtiStyleMenuList.front:
        this.cleanObject(this.frontNeck.model);
        break;
      case CONFIG_DATA.KurtiStyleMenuList.back:
        this.cleanObject(this.backNeck.model);
        break;
      case CONFIG_DATA.StyleMenuList.bottom_wear:
        this.cleanObject(this.laggie.model);
        break;
      case CONFIG_DATA.KurtiStyleMenuList.accessories:
        this.cleanObject(this.accessories.model);
        break;
      default:
        this.cleanObject(this.kurti.model);
        break;
    }
    this.glbLoader.load(url, (gltf) => {
      const tmpModel = gltf.scene;
      switch (type) {
        case CONFIG_DATA.KurtiStyleMenuList.sleeves:
          this.sleeves.model = tmpModel;
          this.sleeves.isContrast = this.checkContrast(tmpModel);
          if (this.sleeves.texture)
            this.applyTexture(this.sleeves.model, this.sleeves.texture);
          if (this.notCheck) this.enableContrastDiv(this.sleeves.isContrast);

          break;
        case CONFIG_DATA.KurtiStyleMenuList.front:
          this.frontNeck.model = tmpModel;
          this.frontNeck.isContrast = this.checkContrast(tmpModel);
          if (this.frontNeck.texture)
            this.applyTexture(this.frontNeck.model, this.frontNeck.texture);
          if (this.notCheck) this.enableContrastDiv(this.frontNeck.isContrast);
          break;
        case CONFIG_DATA.KurtiStyleMenuList.back:
          this.backNeck.model = tmpModel;
          this.backNeck.isContrast = this.checkContrast(tmpModel);
          if (this.backNeck.texture)
            this.applyTexture(this.backNeck.model, this.backNeck.texture);
          if (this.notCheck) this.enableContrastDiv(this.backNeck.isContrast);
          break;
        case CONFIG_DATA.StyleMenuList.bottom_wear:
          this.laggie.model = tmpModel;
          this.laggie.isContrast = this.checkContrast(tmpModel);
          if (this.laggie.texture)
            this.applyTexture(this.laggie.model, this.laggie.texture);
          if (this.notCheck) this.enableContrastDiv(this.laggie.isContrast);
          break;
        case CONFIG_DATA.KurtiStyleMenuList.accessories:
          this.accessories.model = tmpModel;
          this.accessories.isContrast = this.checkContrast(tmpModel);
          if (this.accessories.texture)
            this.applyTexture(this.accessories.model, this.accessories.texture);
          if (this.notCheck)
            this.enableContrastDiv(this.accessories.isContrast);
          break;
        default:
          this.kurti.model = tmpModel;
          this.kurti.isContrast = this.checkContrast(tmpModel);
          if (this.kurti.texture)
            this.applyTexture(this.kurti.model, this.kurti.texture);
          if (this.notCheck) this.enableContrastDiv(this.kurti.isContrast);
          break;
      }
      this.rootObject.add(tmpModel);
    });
  }
  checkContrast(model) {
    let isTrue = false;
    model.traverse((child) => {
      if (child.name.includes("contrast")) {
        isTrue = true;
      }
    });
    return isTrue;
  }
  setEnableModel(model, isEnable) {
    if (model) model.visible = isEnable;
  }
  changeTexture(tex, type) {
    const texture = this.textureLoader.load(tex);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.offset.x = 0.5;
    texture.offset.y = 0.5;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.repeat.set(0.003, 0.003);
    console.log("typeeeeeeeeeee", type);
    switch (type) {
      case CONFIG_DATA.KurtiStyleMenuList.front:
        if (!this.frontNeck.model) return;
        if (this.frontNeck.texture) this.frontNeck.texture = null;
        this.frontNeck.texture = texture;
        this.applyTexture(this.frontNeck.model, this.frontNeck.texture);
        break;
      case CONFIG_DATA.KurtiStyleMenuList.back:
        if (!this.backNeck.model) return;
        if (this.backNeck.texture) this.backNeck.texture = null;
        this.backNeck.texture = texture;
        this.applyTexture(this.backNeck.model, this.backNeck.texture);
        break;
      case CONFIG_DATA.KurtiStyleMenuList.sleeves:
        if (!this.sleeves.model) return;
        if (this.sleeves.texture) this.sleeves.texture = null;
        this.sleeves.texture = texture;
        this.applyTexture(this.sleeves.model, this.sleeves.texture);
        break;
      case CONFIG_DATA.StyleMenuList.bottom_wear:
        if (!this.laggie.model) return;
        if (this.laggie.texture) this.laggie.texture = null;
        this.laggie.texture = texture;
        this.applyTexture(this.laggie.model, this.laggie.texture);
        break;
      case CONFIG_DATA.StyleMenuList.kurti:
        if (this.allInOneTexture) this.allInOneTexture = null;

        this.allInOneTexture = texture;

        this.frontNeck.texture = null;
        this.frontNeck.texture = this.allInOneTexture;
        this.applyTexture(this.frontNeck.model, this.allInOneTexture);

        this.backNeck.texture = null;
        this.backNeck.texture = this.allInOneTexture;
        this.applyTexture(this.backNeck.model, this.allInOneTexture);

        this.kurti.texture = null;
        this.kurti.texture = this.allInOneTexture;
        this.applyTexture(this.kurti.model, this.allInOneTexture);

        this.sleeves.texture = null;
        this.sleeves.texture = this.allInOneTexture;
        if (this.sleeves.model) {
          this.applyTexture(this.sleeves.model, this.allInOneTexture);
        }
        this.laggie.texture = null;
        this.laggie.texture = texture;
        if (this.laggie.model) {
          this.applyTexture(this.laggie.model, this.allInOneTexture);
        }
        break;
      case CONFIG_DATA.KurtiStyleMenuList.accessories:
        if (!this.accessories.model) return;
        if (this.accessories.texture) this.accessories.texture = null;
        this.accessories.texture = texture;
        this.applyTexture(this.accessories.model, this.accessories.texture);
        break;
      default:
        if (!this.kurti.model) return;
        if (this.kurti.texture) this.kurti.texture = null;
        this.kurti.texture = texture;
        this.applyTexture(this.kurti.model, this.kurti.texture);

        break;
    }
  }
  applyTexture(model, texture) {
    model.traverse((child) => {
      // if(child.isMesh)
      //     child.receiveShadow = true;
      if (child.material) {
        child.material.map = texture;
        child.material.map.flipY = true;
        child.material.needsUpdate = true;
      }
    });
    if (document.getElementById("my-file"))
      document.getElementById("my-file").value = "";
  }
  changeContrastColor(model, color) {
    model.traverse((child) => {
      // if(child.isMesh)
      //     child.receiveShadow = true;
      if (child.name.includes("contrast")) {
        child.traverse((contrast_child) => {
          if (contrast_child.material) {
            contrast_child.material.color = new THREE.Color(color);
            contrast_child.material.needsUpdate = true;
          }
        });
      }
    });
  }
  enableContrastDiv(isShow) {
    this.contrastDiv.style.display = isShow ? "block" : "none";
  }
  setModelAnim(isBig, _type) {
    if (!this.rootObject) return;
    const value = isBig
      ? model_setting.max_scale
      : model_setting.max_scale * 0.5;
    const posY = isBig ? model_setting.max_y : model_setting.min_y;
    const posX = isBig ? model_setting.max_x : model_setting.min_x;
    if (_type === 0) {
      new TWEEN.Tween(this.rootObject.position)
        .to({ x: posX }, 500)
        .easing(TWEEN.Easing.Cubic.Out)
        .onComplete(() => {})
        .start();
    } else {
      new TWEEN.Tween(this.rootObject.scale)
        .to({ x: value, y: value, z: value }, 500)
        .easing(TWEEN.Easing.Cubic.Out)
        .onComplete(() => {})
        .start();
      new TWEEN.Tween(this.rootObject.position)
        .to({ y: posY }, 500)
        .easing(TWEEN.Easing.Cubic.Out)
        .onComplete(() => {})
        .start();
    }
  }
  setAnim(value) {
    if (!this.rootObject) return;
    // new TWEEN.Tween(this.rootObject.rotation).to({y:value},500).easing(TWEEN.Easing.Cubic.Out).onComplete(()=>{}).start();
    this.orbitController.minAzimuthAngle =
      this.orbitController.getAzimuthalAngle();
    this.orbitController.maxAzimuthAngle =
      this.orbitController.getAzimuthalAngle();
    new TWEEN.Tween(this.orbitController)
      .to({ minAzimuthAngle: value, maxAzimuthAngle: value }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        this.orbitController.minAzimuthAngle = undefined;
        this.orbitController.maxAzimuthAngle = undefined;
        this.orbitController.update();
      })
      .start();

    new TWEEN.Tween(this.orbitController)
      .to({ minPolarAngle: Math.PI / 2.5 }, 500)
      .easing(TWEEN.Easing.Cubic.Out)
      .onComplete(() => {
        this.orbitController.minPolarAngle = 0;
        this.orbitController.maxPolarAngle = Math.PI / 2.5;
        this.orbitController.update();
      })
      .start();
  }
}
const Wrapper = styled.div`
  position: relative;
  pointer-events: none;
  width: 100%;
  height: 92rem;
  overflow: hidden;
  z-index: 0;
  transition: all linear 0.2s;
  display: flex;
  .zoom_icon {
    display: flex;
    gap: 1rem;
    position: absolute;
    bottom: 5%;
    right: 20%;
    font-size: 4rem;
    color: aliceblue;
    cursor: pointer;
    pointer-events: all;
    * {
      color: ${({ theme }) => theme.colors.text_highlight_color};
      transition: all linear 0.2s;
      &:active {
        transform: scale(0.9);
      }
    }
  }
  .log_out {
    /* display: none; */
    width: 4rem;
    height: 4rem;
    margin: 2rem;
    color: ${({ theme }) => theme.colors.light_color2};
    pointer-events: all;
    cursor: pointer;
    position: absolute;
    top: 1.2rem;
    right: 14rem;
    @media screen and (max-width: ${({ theme }) => theme.media.laptop}) {
      right: 0.5rem;
    }
    @media screen and (max-width: ${({ theme }) => theme.media.tab}) {
      /* top: unset;
      bottom: 3rem; */
    }
    .icons {
      width: 100%;
      height: 100%;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.text_highlight_color};
    }
  }

  .threejs-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: all;
  }
  @media screen and (max-width: ${({ theme }) => theme.media.laptop}) {
    height: 92rem;
  }
  @media screen and (max-width: ${({ theme }) => theme.media.mobile}),
    (max-width: ${({ theme }) => theme.media.tab}) {
    position: absolute;
    width: 100%;
    height: 100%;
    .threejs-container {
      overflow: hidden;
    }
    .zoom_icon {
      display: none;
    }
  }
`;
export { mKurtiObj };
