/**
 * FUNNGRO TEEN HERO - NATURAL 3D INTERACTIVE QUANTUM TALENT CORE
 * Built with Three.js r128 to Principal Creative Frontend Standards
 * 
 * Features:
 * - Multi-layered Quantum 3D Core with faceted crystal mesh, dual wireframe cages, and precession rings
 * - Natural Drag-to-Rotate physics with momentum, angular velocity, and friction damping
 * - Spring-damped mouse-tracking parallax inertia
 * - Click-triggered energy shockwave expansion
 * - 220 volumetric cosmic dust particles with organic Brownian drift
 * - High-DPI anti-aliased render pipeline with auto-resize handling
 */

(function () {
  'use strict';

  function initTeenHero3D() {
    const container = document.getElementById('teen-hero-webgl');
    if (!container) return;

    if (typeof THREE === 'undefined') {
      console.warn('Three.js library unavailable.');
      return;
    }

    // ==========================================
    // 1. SCENE, CAMERA & HIGH-DPI RENDERER
    // ==========================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0B132B, 0.0016);

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    camera.position.set(0, 0, 380);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // ==========================================
    // 2. LIGHTING RIG
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x10B981, 2.2);
    keyLight.position.set(150, 200, 250);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x06B6D4, 2.5, 600);
    fillLight.position.set(-180, -100, 200);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0x34D399, 1.8, 500);
    backLight.position.set(0, 180, -200);
    scene.add(backLight);

    // Main Interactive Assembly Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // 3. MULTI-LAYERED 3D QUANTUM CORE
    // ==========================================
    
    // Layer A: Central Faceted Crystal Mesh
    const crystalGeo = new THREE.IcosahedronGeometry(72, 0);
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x0B1F38,
      emissive: 0x059669,
      emissiveIntensity: 0.45,
      roughness: 0.18,
      metalness: 0.85,
      flatShading: true
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    mainGroup.add(crystalMesh);

    // Layer B: Outer Geometric Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(88, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x10B981,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    mainGroup.add(cageMesh);

    // Layer C: Secondary Translucent Gyro Cage
    const gyroGeo = new THREE.OctahedronGeometry(108, 0);
    const gyroMat = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const gyroMesh = new THREE.Mesh(gyroGeo, gyroMat);
    mainGroup.add(gyroMesh);

    // Layer D: Quantum Precession Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(125, 1.2, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x10B981,
      transparent: true,
      opacity: 0.65
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    mainGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(145, 0.8, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x34D399,
      transparent: true,
      opacity: 0.35
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = -Math.PI / 6;
    mainGroup.add(ringMesh2);

    // ==========================================
    // 4. VOLUMETRIC COSMIC DUST PARTICLES
    // ==========================================
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    const cyberGreen = new THREE.Color(0x10B981);
    const brightCyan = new THREE.Color(0x06B6D4);
    const pureWhite = new THREE.Color(0xFFFFFF);

    for (let i = 0; i < particleCount; i++) {
      const radius = 90 + Math.random() * 180;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const colChoice = Math.random();
      const col = colChoice > 0.6 ? cyberGreen : (colChoice > 0.25 ? brightCyan : pureWhite);
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
        z: (Math.random() - 0.5) * 0.3
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Programmatic circular particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    radGrad.addColorStop(0.3, 'rgba(16, 185, 129, 0.9)');
    radGrad.addColorStop(0.8, 'rgba(16, 185, 129, 0.2)');
    radGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    pCtx.fillStyle = radGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 6.5,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // ==========================================
    // 5. SHOCKWAVE PULSE RING
    // ==========================================
    const shockwaveGeo = new THREE.RingGeometry(1, 4, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x10B981,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.rotation.x = Math.PI / 2;
    mainGroup.add(shockwaveMesh);

    let shockwaveActive = false;
    let shockwaveScale = 1;

    function triggerShockwave() {
      shockwaveActive = true;
      shockwaveScale = 1;
      shockwaveMat.opacity = 0.85;
      
      // Temporarily expand crystal mesh
      crystalMesh.scale.set(1.15, 1.15, 1.15);
      crystalMat.emissiveIntensity = 0.9;
    }

    // ==========================================
    // 6. NATURAL DRAG-TO-ROTATE & MOUSE INERTIA PHYSICS
    // ==========================================
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let angularVelocity = { x: 0, y: 0 };
    const friction = 0.94; // Realistic momentum damping

    // Cursor Parallax Coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      angularVelocity = { x: 0, y: 0 };
      triggerShockwave();
    };

    const onPointerMove = (e) => {
      // General window parallax target
      targetX = (e.clientX - windowHalfX) * 0.28;
      targetY = (e.clientY - windowHalfY) * 0.24;

      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      angularVelocity.x = deltaY * 0.007;
      angularVelocity.y = deltaX * 0.007;

      mainGroup.rotation.x += angularVelocity.x;
      mainGroup.rotation.y += angularVelocity.y;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Attach drag events to canvas container
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // ==========================================
    // 7. RESPONSIVE RESIZE SYNCHRONIZATION
    // ==========================================
    const onWindowResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onWindowResize, { passive: true });

    // ==========================================
    // 8. 60FPS MATHEMATICAL ANIMATION LOOP
    // ==========================================
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Parallax Lerp
      mouseX += (targetX - mouseX) * 0.045;
      mouseY += (targetY - mouseY) * 0.045;

      // Apply drag momentum physics with friction damping
      if (!isDragging) {
        mainGroup.rotation.x += angularVelocity.x;
        mainGroup.rotation.y += angularVelocity.y;

        angularVelocity.x *= friction;
        angularVelocity.y *= friction;

        // Idle natural rotation
        mainGroup.rotation.y += 0.003;
        mainGroup.rotation.x += 0.001;
      }

      // Parallax inclination
      camera.position.x = mouseX * 0.35;
      camera.position.y = -mouseY * 0.35;
      camera.lookAt(0, 0, 0);

      // Precession of rings
      ringMesh1.rotation.z = elapsedTime * 0.4;
      ringMesh2.rotation.z = -elapsedTime * 0.3;

      cageMesh.rotation.y = -elapsedTime * 0.15;
      gyroMesh.rotation.x = elapsedTime * 0.12;

      // Breathing crystal scale & emissive recovery
      const currentScale = crystalMesh.scale.x;
      if (currentScale > 1.0) {
        const nextScale = currentScale - (currentScale - 1.0) * 0.08;
        crystalMesh.scale.set(nextScale, nextScale, nextScale);
        crystalMat.emissiveIntensity = 0.45 + (nextScale - 1.0) * 2;
      }

      // Shockwave ring expansion & fade
      if (shockwaveActive) {
        shockwaveScale += 5.5;
        shockwaveMesh.scale.set(shockwaveScale, shockwaveScale, shockwaveScale);
        shockwaveMat.opacity *= 0.94;

        if (shockwaveMat.opacity < 0.02) {
          shockwaveActive = false;
          shockwaveMat.opacity = 0;
        }
      }

      // Organic Brownian particle drift
      const pos = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const v = particleVelocities[i];

        pos[i3] += v.x + Math.sin(elapsedTime + i) * 0.12;
        pos[i3 + 1] += v.y + Math.cos(elapsedTime + i) * 0.12;
        pos[i3 + 2] += v.z;

        // Wrap particles within bounds
        const d = Math.sqrt(pos[i3] * pos[i3] + pos[i3 + 1] * pos[i3 + 1] + pos[i3 + 2] * pos[i3 + 2]);
        if (d > 280) {
          pos[i3] *= 0.5;
          pos[i3 + 1] *= 0.5;
          pos[i3 + 2] *= 0.5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();
    setTimeout(onWindowResize, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTeenHero3D);
  } else {
    initTeenHero3D();
  }
})();
