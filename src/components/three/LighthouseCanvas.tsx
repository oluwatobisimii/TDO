import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LighthouseCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090c, 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 9.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.appendChild(renderer.domElement);

    // --- 2. Ambient & Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffedd7, 0.7);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xdbeafe, 1.4);
    moonLight.position.set(10, 14, 8);
    scene.add(moonLight);

    const warmFillLight = new THREE.DirectionalLight(0xf59e0b, 1.0);
    warmFillLight.position.set(-10, -2, -5);
    scene.add(warmFillLight);

    // Gentle cursor ambient fill (subtle, non-glaring)
    const cursorLight = new THREE.PointLight(0xffedd7, 0.35, 12);
    cursorLight.position.set(0, 2, 6);
    scene.add(cursorLight);

    // --- 3. Construct Detailed Procedural Lighthouse ---
    const lighthouseGroup = new THREE.Group();
    scene.add(lighthouseGroup);

    // Materials
    const darkStoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x18191d,
      roughness: 0.85,
      metalness: 0.12,
    });

    const warmStoneMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b2927,
      roughness: 0.78,
      metalness: 0.15,
    });

    const bronzeMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d3732,
      roughness: 0.32,
      metalness: 0.82,
    });

    const brassAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xcca043,
      roughness: 0.22,
      metalness: 0.88,
    });

    // Subdued, architectural smoked lantern glass (no white circular glare)
    const glowingGlassMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x92400e,
      emissiveIntensity: 0.12,
      roughness: 0.35,
      metalness: 0.1,
      transparent: true,
      opacity: 0.28,
    });

    // A. Foundation Plinth (Tiered stone rings)
    const plinth1 = new THREE.Mesh(
      new THREE.CylinderGeometry(2.3, 2.6, 0.45, 32),
      darkStoneMaterial
    );
    plinth1.position.y = -2.6;
    lighthouseGroup.add(plinth1);

    const plinth2 = new THREE.Mesh(
      new THREE.CylinderGeometry(2.0, 2.3, 0.45, 32),
      warmStoneMaterial
    );
    plinth2.position.y = -2.2;
    lighthouseGroup.add(plinth2);

    // B. Base Pedestal
    const baseMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.9, 0.85, 24),
      darkStoneMaterial
    );
    baseMesh.position.y = -1.6;
    lighthouseGroup.add(baseMesh);

    const baseRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.62, 0.055, 16, 48),
      brassAccentMaterial
    );
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -1.18;
    lighthouseGroup.add(baseRing);

    // C. Tapered Main Tower Column
    const towerMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.0, 1.55, 3.4, 24),
      warmStoneMaterial
    );
    towerMesh.position.y = 0.5;
    lighthouseGroup.add(towerMesh);

    // Architectural accent bands
    const bandHeights = [-0.5, 0.3, 1.1, 1.9];
    bandHeights.forEach((h) => {
      const radiusAtH = 1.55 - ((h + 1.2) / 3.4) * (1.55 - 1.0);
      const bandMesh = new THREE.Mesh(
        new THREE.TorusGeometry(radiusAtH + 0.025, 0.04, 12, 36),
        darkStoneMaterial
      );
      bandMesh.rotation.x = Math.PI / 2;
      bandMesh.position.y = h;
      lighthouseGroup.add(bandMesh);
    });

    // D. Gallery Deck & Cornice
    const corniceMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.0, 0.38, 24),
      darkStoneMaterial
    );
    corniceMesh.position.y = 2.25;
    lighthouseGroup.add(corniceMesh);

    const balconyMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.42, 1.42, 0.12, 32),
      bronzeMetalMaterial
    );
    balconyMesh.position.y = 2.48;
    lighthouseGroup.add(balconyMesh);

    // Balcony Railing
    const railingMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.38, 0.035, 12, 36),
      brassAccentMaterial
    );
    railingMesh.rotation.x = Math.PI / 2;
    railingMesh.position.y = 2.78;
    lighthouseGroup.add(railingMesh);

    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const barMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.016, 0.016, 0.3, 8),
        bronzeMetalMaterial
      );
      barMesh.position.set(Math.cos(angle) * 1.38, 2.63, Math.sin(angle) * 1.38);
      lighthouseGroup.add(barMesh);
    }

    // E. Lantern Room Cage
    const lanternBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.9, 0.22, 16),
      darkStoneMaterial
    );
    lanternBase.position.y = 2.64;
    lighthouseGroup.add(lanternBase);

    const glassMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.86, 0.86, 0.92, 16, 1, true),
      glowingGlassMaterial
    );
    glassMesh.position.y = 3.2;
    lighthouseGroup.add(glassMesh);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const strutMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.022, 0.022, 0.92, 8),
        bronzeMetalMaterial
      );
      strutMesh.position.set(Math.cos(angle) * 0.86, 3.2, Math.sin(angle) * 0.86);
      lighthouseGroup.add(strutMesh);
    }

    // F. Lantern Dome Roof & Spire
    const domeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      bronzeMetalMaterial
    );
    domeMesh.position.y = 3.66;
    lighthouseGroup.add(domeMesh);

    const spireMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.08, 0.9, 12),
      brassAccentMaterial
    );
    spireMesh.position.y = 4.5;
    lighthouseGroup.add(spireMesh);

    const pinnacleMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 16, 16),
      brassAccentMaterial
    );
    pinnacleMesh.position.y = 5.0;
    lighthouseGroup.add(pinnacleMesh);

    // --- 4. Rotating Beacon Core & Solid Volumetric Light Beam ---
    // The beaconHead swivels to track cursor and ambient rotation
    const beaconHead = new THREE.Group();
    beaconHead.position.set(0, 3.2, 0);
    lighthouseGroup.add(beaconHead);

    // Architectural bronze lamp mount/pedestal
    const lampMount = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.16, 0.2, 16),
      bronzeMetalMaterial
    );
    lampMount.position.y = -0.08;
    beaconHead.add(lampMount);

    // Subdued warm amber filament (small, non-glaring, physical material — NO white circle)
    const lampCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0xd97706,
        emissive: 0xb45309,
        emissiveIntensity: 0.45,
        roughness: 0.45,
        metalness: 0.1,
      })
    );
    beaconHead.add(lampCore);

    // Subdued warm ambient pointlight (gentle illumination, avoids specular blowout)
    const beaconPointLight = new THREE.PointLight(0xf59e0b, 0.85, 10, 1.4);
    beaconHead.add(beaconPointLight);

    // Dual directional spotlights along both beam directions
    const spotTargetForward = new THREE.Object3D();
    spotTargetForward.position.set(0, 0, -22);
    beaconHead.add(spotTargetForward);
    const spotLightForward = new THREE.SpotLight(0xf59e0b, 1.5, 28, Math.PI / 5, 0.65, 1.2);
    spotLightForward.position.set(0, 0, 0);
    spotLightForward.target = spotTargetForward;
    beaconHead.add(spotLightForward);

    const spotTargetBackward = new THREE.Object3D();
    spotTargetBackward.position.set(0, 0, 22);
    beaconHead.add(spotTargetBackward);
    const spotLightBackward = new THREE.SpotLight(0xf59e0b, 1.5, 28, Math.PI / 5, 0.65, 1.2);
    spotLightBackward.position.set(0, 0, 0);
    spotLightBackward.target = spotTargetBackward;
    beaconHead.add(spotLightBackward);

    // --- NON-HOLLOW VOLUMETRIC LIGHT BEAM SHADER ---
    // Pure vibrant gold-orange volumetric scattering shader.
    // Dense cone geometry calibrated for solid, rich, luminous beam presence on BOTH sides.
    const beamLength = 22.0;
    const beamRadius = 4.0;

    const solidBeamGeometry = new THREE.ConeGeometry(beamRadius, beamLength, 48, 32, true);
    // Align cone so apex is at beacon origin and points along -Z
    solidBeamGeometry.translate(0, -beamLength / 2, 0);
    solidBeamGeometry.rotateX(Math.PI / 2);

    const solidBeamMaterial = new THREE.ShaderMaterial({
      uniforms: {
        beamColor: { value: new THREE.Color(0xf59e0b) }, // Pure vibrant beacon gold
        ambientGlow: { value: new THREE.Color(0xd97706) }, // Deep warm honey-amber
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 beamColor;
        uniform vec3 ambientGlow;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;

        void main() {
          // Progress along beam length (0 at source, 1 at tip)
          float zProgress = clamp(abs(vPosition.z) / 22.0, 0.0, 1.0);

          // Radial distance from central axis
          float currentRadius = 4.0 * (zProgress + 0.04);
          float radialDist = length(vPosition.xy) / currentRadius;

          // Gaussian core density (brightest at center, soft falloff outward)
          float coreDensity = exp(-radialDist * radialDist * 3.6);

          // Axial falloff (strong at lantern, gently decaying with distance)
          float axialFalloff = pow(1.0 - zProgress, 1.15);

          // Atmospheric rim glow
          float rimGlow = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, -1.0))), 2.0) * 0.35;

          // Rich, vibrant, non-hollow solid intensity (restores glorious luminosity)
          float finalIntensity = (coreDensity * 0.85 + rimGlow) * axialFalloff;

          // Pure gold-orange light: blend warm honey-amber with vibrant beacon gold
          vec3 finalColor = mix(ambientGlow, beamColor, coreDensity);

          gl_FragColor = vec4(finalColor, finalIntensity * 0.70);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    // Primary beam (sweeps forward)
    const primaryBeam = new THREE.Mesh(solidBeamGeometry, solidBeamMaterial);
    beaconHead.add(primaryBeam);

    // Secondary beam (180° opposite twin beam, identical pure gold-orange light)
    const secondaryBeam = new THREE.Mesh(solidBeamGeometry, solidBeamMaterial);
    secondaryBeam.rotation.y = Math.PI;
    beaconHead.add(secondaryBeam);

    // G. Atmospheric Floating Particles
    const particleCount = 320;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14 + 1;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffedd7,
      size: 0.09,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 5. Mouse Interaction & Cursor Tracking ---
    // The beacon tracks cursor movement dynamically in real time
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      hasMoved: false,
      lastMoveTime: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
      mouse.hasMoved = true;
      mouse.lastMoveTime = performance.now();
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- 6. Scroll Choreography (GSAP ScrollTrigger) ---
    lighthouseGroup.position.set(1.5, -0.6, 0.2);
    lighthouseGroup.rotation.set(0.08, -0.4, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    // Zone 1: About / Foundation (12m)
    tl.to(lighthouseGroup.position, { x: 2.3, y: -0.3, z: -0.4, ease: 'power1.inOut' }, 0.12);
    tl.to(lighthouseGroup.rotation, { x: 0.1, y: 1.0, z: 0.03, ease: 'power1.inOut' }, 0.12);

    // Zone 2: What I Do / Pillars (28m)
    tl.to(lighthouseGroup.position, { x: -2.2, y: -0.7, z: -0.1, ease: 'power1.inOut' }, 0.28);
    tl.to(lighthouseGroup.rotation, { x: -0.05, y: 2.3, z: -0.04, ease: 'power1.inOut' }, 0.28);

    // Zone 3: Ideas Worth Building (40m)
    tl.to(lighthouseGroup.position, { x: 1.9, y: -1.2, z: 0.5, ease: 'power1.inOut' }, 0.45);
    tl.to(lighthouseGroup.rotation, { x: 0.2, y: 3.7, z: 0.06, ease: 'power1.inOut' }, 0.45);

    // Zone 4: Keynotes & Speaking (60m)
    tl.to(lighthouseGroup.position, { x: -1.5, y: -2.0, z: 2.3, ease: 'power1.inOut' }, 0.62);
    tl.to(lighthouseGroup.rotation, { x: -0.12, y: 5.1, z: -0.06, ease: 'power1.inOut' }, 0.62);

    // Zone 5: Deep Systems & Impact (75m)
    tl.to(lighthouseGroup.position, { x: 2.1, y: -0.5, z: -0.3, ease: 'power1.inOut' }, 0.78);
    tl.to(lighthouseGroup.rotation, { x: 0.08, y: 6.4, z: 0.03, ease: 'power1.inOut' }, 0.78);

    // Zone 6: Final CTA (Summit)
    tl.to(lighthouseGroup.position, { x: 0.0, y: -0.85, z: 1.3, ease: 'power1.inOut' }, 0.95);
    tl.to(lighthouseGroup.rotation, { x: 0.04, y: 8.0, z: 0.0, ease: 'power1.inOut' }, 0.95);

    // --- 7. Main Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Cursor reaction logic:
      // If user recently moved mouse (within last 3 seconds), beacon actively aims toward cursor!
      // Otherwise, beacon continues its continuous 360° rotational sweep.
      const timeSinceMouseMove = performance.now() - mouse.lastMoveTime;
      const isActivelyHovering = mouse.hasMoved && timeSinceMouseMove < 3200;

      if (isActivelyHovering) {
        // Calculate target angle to point the light beam toward the cursor
        // Target in screen space: mouse.x (-1 to 1), mouse.y (-1 to 1)
        const targetYaw = -mouse.x * 1.4 + Math.PI / 2;
        const targetPitch = mouse.y * 0.6;

        // Smoothly swivel the beaconHead toward the cursor
        beaconHead.rotation.y += (targetYaw - beaconHead.rotation.y) * 0.08;
        beaconHead.rotation.x += (targetPitch - beaconHead.rotation.x) * 0.08;
      } else {
        // Autonomous continuous sweeping rotation
        beaconHead.rotation.x += (0 - beaconHead.rotation.x) * 0.04;
        beaconHead.rotation.y += delta * 1.1;
      }

      // Parallax camera tilt
      camera.position.x = mouse.x * 0.45;
      camera.position.y = 1.2 + mouse.y * 0.35;
      camera.lookAt(0, 0.4, 0);

      // Cursor point light follows mouse
      cursorLight.position.x = mouse.x * 5;
      cursorLight.position.y = 2 + mouse.y * 3.5;

      // Floating motes animation
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsedTime * 0.8 + i) * 0.003;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- 8. Window Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
};
