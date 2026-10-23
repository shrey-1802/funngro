/**
 * FUNNGRO ENTERPRISE HERO - NATURAL 3D GLOBAL TALENT ARC NETWORK
 * Built with Three.js r128 to Principal Creative Frontend Standards
 * 
 * Features:
 * - Interactive 3D Holographic Globe with Latitude/Longitude vectors and translucent ocean core
 * - Global corporate & talent hubs (SF, London, Mumbai, Bangalore, Singapore, Tokyo, Berlin)
 * - Dynamic 3D Quadratic Bezier ballistic talent arcs with streaming energy data packets
 * - Natural Drag-to-Rotate physics with momentum, angular velocity, and friction damping
 * - Click-triggered network telemetry shockwaves
 * - Auto-responsive high-DPI WebGL render pipeline
 */

(function () {
  'use strict';

  function initCompanyHero3D() {
    const container = document.getElementById('company-hero-webgl');
    if (!container) return;

    if (typeof THREE === 'undefined') {
      console.warn('Three.js library unavailable.');
      return;
    }

    // ==========================================
    // 1. SCENE, CAMERA & HIGH-DPI RENDERER
    // ==========================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0B132B, 0.0018);

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    camera.position.set(0, 0, 390);

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
    // 2. LIGHTING SETUP
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x06B6D4, 2.4);
    keyLight.position.set(150, 180, 250);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x10B981, 2.8, 600);
    fillLight.position.set(-160, -120, 220);
    scene.add(fillLight);

    // Main Interactive Assembly Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // ==========================================
    // 3. 3D HOLOGRAPHIC GLOBE & WIREFRAME GRID
    // ==========================================
    const globeRadius = 115;

    // Layer A: Dark Solid Ocean Core
    const oceanGeo = new THREE.SphereGeometry(globeRadius - 2, 48, 48);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x071329,
      roughness: 0.8,
      metalness: 0.3
    });
    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    globeGroup.add(oceanMesh);

    // Layer B: Holographic Geodesic Wireframe
    const wireGeo = new THREE.IcosahedronGeometry(globeRadius, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Layer C: Outer Latitude/Longitude Rings
    const latRingGeo = new THREE.TorusGeometry(globeRadius + 18, 0.8, 16, 100);
    const latRingMat = new THREE.MeshBasicMaterial({
      color: 0x10B981,
      transparent: true,
      opacity: 0.45
    });
    const latRing = new THREE.Mesh(latRingGeo, latRingMat);
    latRing.rotation.x = Math.PI / 2.3;
    globeGroup.add(latRing);

    const latRing2 = new THREE.Mesh(latRingGeo, latRingMat);
    latRing2.rotation.x = -Math.PI / 3;
    globeGroup.add(latRing2);

    // ==========================================
    // 4. GLOBAL TALENT & ENTERPRISE HUBS (BEACONS)
    // ==========================================
    // Spherical coordinates converter
    function latLngToVector3(lat, lng, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    const hubs = [
      { name: 'Mumbai/Bangalore', lat: 18.9, lng: 72.8, color: 0x10B981 },
      { name: 'Delhi NCR', lat: 28.6, lng: 77.2, color: 0x10B981 },
      { name: 'Singapore', lat: 1.35, lng: 103.8, color: 0x34D399 },
      { name: 'Tokyo', lat: 35.6, lng: 139.6, color: 0x06B6D4 },
      { name: 'London', lat: 51.5, lng: -0.1, color: 0x10B981 },
      { name: 'San Francisco', lat: 37.7, lng: -122.4, color: 0x06B6D4 },
      { name: 'New York', lat: 40.7, lng: -74.0, color: 0x34D399 },
      { name: 'Berlin', lat: 52.5, lng: 13.4, color: 0x10B981 },
      { name: 'Sydney', lat: -33.8, lng: 151.2, color: 0x06B6D4 }
    ];

    const hubPinGeo = new THREE.SphereGeometry(2.8, 12, 12);

    hubs.forEach(hub => {
      const pos = latLngToVector3(hub.lat, hub.lng, globeRadius);
      const pinMat = new THREE.MeshBasicMaterial({ color: hub.color });
      const pinMesh = new THREE.Mesh(hubPinGeo, pinMat);
      pinMesh.position.copy(pos);
      globeGroup.add(pinMesh);

      // Vertical Beacon Ray
      const beaconLineGeo = new THREE.BufferGeometry();
      const outerPos = latLngToVector3(hub.lat, hub.lng, globeRadius + 22);
      const points = new Float32Array([
        pos.x, pos.y, pos.z,
        outerPos.x, outerPos.y, outerPos.z
      ]);
      beaconLineGeo.setAttribute('position', new THREE.BufferAttribute(points, 3));
      const beaconMat = new THREE.LineBasicMaterial({
        color: hub.color,
        transparent: true,
        opacity: 0.65
      });
      const beaconLine = new THREE.Line(beaconLineGeo, beaconMat);
      globeGroup.add(beaconLine);
    });

    // ==========================================
    // 5. QUADRATIC BEZIER TALENT ARCS & DATA PACKETS
    // ==========================================
    const arcPairs = [
      [0, 1], // Mumbai -> Delhi
      [0, 4], // Mumbai -> London
      [0, 2], // Mumbai -> Singapore
      [1, 5], // Delhi -> SF
      [2, 3], // Singapore -> Tokyo
      [4, 7], // London -> Berlin
      [5, 6], // SF -> NY
      [2, 8]  // Singapore -> Sydney
    ];

    const dataPackets = [];

    arcPairs.forEach(pair => {
      const startVec = latLngToVector3(hubs[pair[0]].lat, hubs[pair[0]].lng, globeRadius);
      const endVec = latLngToVector3(hubs[pair[1]].lat, hubs[pair[1]].lng, globeRadius);

      // Midpoint pulled outward radially for great-circle arc curvature
      const midVec = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
      const dist = startVec.distanceTo(endVec);
      midVec.normalize().multiplyScalar(globeRadius + dist * 0.35);

      const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
      const arcPoints = curve.getPoints(45);

      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x10B981,
        transparent: true,
        opacity: 0.32
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Streaming Data Packet Mesh
      const packetGeo = new THREE.SphereGeometry(2.2, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      globeGroup.add(packetMesh);

      dataPackets.push({
        curve: curve,
        mesh: packetMesh,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.006
      });
    });

    // ==========================================
    // 6. SHOCKWAVE PULSE SYSTEM
    // ==========================================
    const shockwaveGeo = new THREE.RingGeometry(globeRadius, globeRadius + 3, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.rotation.x = Math.PI / 2;
    globeGroup.add(shockwaveMesh);

    let shockwaveActive = false;
    let shockwaveScale = 1;

    function triggerGlobePulse() {
      shockwaveActive = true;
      shockwaveScale = 1;
      shockwaveMat.opacity = 0.9;
      wireMat.opacity = 0.7;
    }

    // ==========================================
    // 7. NATURAL DRAG-TO-ROTATE & MOMENTUM PHYSICS
    // ==========================================
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let angularVelocity = { x: 0, y: 0 };
    const friction = 0.94;

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
      triggerGlobePulse();
    };

    const onPointerMove = (e) => {
      targetX = (e.clientX - windowHalfX) * 0.25;
      targetY = (e.clientY - windowHalfY) * 0.22;

      if (!isDragging) return;

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      angularVelocity.x = deltaY * 0.006;
      angularVelocity.y = deltaX * 0.006;

      globeGroup.rotation.x += angularVelocity.x;
      globeGroup.rotation.y += angularVelocity.y;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // ==========================================
    // 8. AUTO-RESPONSIVE RESIZE
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
    // 9. ANIMATION LOOP (60 FPS)
    // ==========================================
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Parallax Lerp
      mouseX += (targetX - mouseX) * 0.045;
      mouseY += (targetY - mouseY) * 0.045;

      // Apply drag momentum physics
      if (!isDragging) {
        globeGroup.rotation.x += angularVelocity.x;
        globeGroup.rotation.y += angularVelocity.y;

        angularVelocity.x *= friction;
        angularVelocity.y *= friction;

        // Steady natural planetary rotation
        globeGroup.rotation.y += 0.0035;
      }

      camera.position.x = mouseX * 0.3;
      camera.position.y = -mouseY * 0.3;
      camera.lookAt(0, 0, 0);

      // Ring rotations
      latRing.rotation.z = elapsedTime * 0.25;
      latRing2.rotation.z = -elapsedTime * 0.2;

      // Restore wireframe opacity
      if (wireMat.opacity > 0.28) {
        wireMat.opacity -= 0.01;
      }

      // Shockwave ring expansion
      if (shockwaveActive) {
        shockwaveScale += 0.04;
        shockwaveMesh.scale.set(shockwaveScale, shockwaveScale, shockwaveScale);
        shockwaveMat.opacity *= 0.94;

        if (shockwaveMat.opacity < 0.02) {
          shockwaveActive = false;
          shockwaveMat.opacity = 0;
        }
      }

      // Stream data packets along arcs
      dataPackets.forEach(dp => {
        dp.progress += dp.speed;
        if (dp.progress > 1) dp.progress = 0;
        const pt = dp.curve.getPoint(dp.progress);
        dp.mesh.position.copy(pt);
      });

      renderer.render(scene, camera);
    };

    animate();
    setTimeout(onWindowResize, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompanyHero3D);
  } else {
    initCompanyHero3D();
  }
})();
