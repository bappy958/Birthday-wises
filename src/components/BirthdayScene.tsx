import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface BirthdaySceneProps {
  candlesBlown: boolean;
}

const BirthdayScene: React.FC<BirthdaySceneProps> = ({ candlesBlown }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const flamesRef = useRef<THREE.Group[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff69b4, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Cake Group
    const cakeGroup = new THREE.Group();

    // Bottom Layer
    const bottomLayerGeo = new THREE.CylinderGeometry(2, 2, 1.2, 32);
    const bottomLayerMat = new THREE.MeshStandardMaterial({ color: 0xffb6c1 }); // Light pink
    const bottomLayer = new THREE.Mesh(bottomLayerGeo, bottomLayerMat);
    cakeGroup.add(bottomLayer);

    // Top Layer
    const topLayerGeo = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
    const topLayerMat = new THREE.MeshStandardMaterial({ color: 0xff69b4 }); // Hot pink
    const topLayer = new THREE.Mesh(topLayerGeo, topLayerMat);
    topLayer.position.y = 1.1;
    cakeGroup.add(topLayer);

    // Candles
    const candleCount = 5;
    const flames: THREE.Group[] = [];
    for (let i = 0; i < candleCount; i++) {
      const angle = (i / candleCount) * Math.PI * 2;
      const radius = 1;
      
      const candleGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 12);
      const candleMat = new THREE.MeshStandardMaterial({ color: 0xffd700 });
      const candle = new THREE.Mesh(candleGeo, candleMat);
      
      candle.position.x = Math.cos(angle) * radius;
      candle.position.z = Math.sin(angle) * radius;
      candle.position.y = 1.8;
      cakeGroup.add(candle);

      // Flame
      const flameGroup = new THREE.Group();
      const flameGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const flameMat = new THREE.MeshBasicMaterial({ color: 0xffa500 });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.scale.set(0.6, 1.2, 0.6);
      flameGroup.add(flame);
      flameGroup.position.copy(candle.position);
      flameGroup.position.y += 0.3;
      cakeGroup.add(flameGroup);
      flames.push(flameGroup);
    }
    flamesRef.current = flames;

    scene.add(cakeGroup);

    // Floating Hearts
    const heartsGroup = new THREE.Group();
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0.5, 0.5, 1, 1, 1);
    heartShape.bezierCurveTo(1.5, 1, 2, 0.5, 2, 0);
    heartShape.bezierCurveTo(2, -0.5, 1.5, -1, 1, -1.5);
    heartShape.lineTo(0, -2.5);
    heartShape.lineTo(-1, -1.5);
    heartShape.bezierCurveTo(-1.5, -1, -2, -0.5, -2, 0);
    heartShape.bezierCurveTo(-2, 0.5, -1.5, 1, -1, 1);
    heartShape.bezierCurveTo(-0.5, 1, 0, 0.5, 0, 0);

    const heartGeo = new THREE.ShapeGeometry(heartShape);
    const heartMat = new THREE.MeshStandardMaterial({ color: 0xff0000, transparent: true, opacity: 0.6 });

    for (let i = 0; i < 50; i++) {
      const heart = new THREE.Mesh(heartGeo, heartMat);
      heart.scale.set(0.05, 0.05, 0.05);
      heart.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      heart.rotation.z = Math.PI;
      heartsGroup.add(heart);
    }
    scene.add(heartsGroup);

    camera.position.z = 8;
    camera.position.y = 2;
    camera.lookAt(0, 1, 0);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getElapsedTime();

      cakeGroup.rotation.y += 0.01;
      
      // Animate flames
      flames.forEach((f, i) => {
        f.scale.y = 1 + Math.sin(delta * 10 + i) * 0.2;
        f.position.y += Math.sin(delta * 5 + i) * 0.001;
      });

      // Animate hearts
      heartsGroup.children.forEach((h, i) => {
        h.position.y += 0.02;
        if (h.position.y > 10) h.position.y = -10;
        h.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (candlesBlown) {
      flamesRef.current.forEach(f => {
        gsap.to(f.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: 'power2.in' });
      });
    }
  }, [candlesBlown]);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default BirthdayScene;
