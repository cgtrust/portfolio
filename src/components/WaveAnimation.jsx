import React, { useEffect, useRef } from 'react';
import Snap from 'snapsvg-cjs';

const WaveAnimation = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const s = Snap(svgRef.current);

    // Get the paths
    const path1 = s.select('#path1');
    const path2 = s.select('#path2');
    const path3 = s.select('#path3');
    const path4 = s.select('#path4');

    // Define keyframe-like values for the wave animation
    const wavePath1 = [
      "M875.7,213.6c-68.9,0-125.2,15-125.2,15,0,0-56.1,12.6-125,12.6s-180.9-27.6-249.8-27.6-125.2,15-125.2,15c0,0-56.1,12.6-125,12.6S.5,226.2.5,226.2v70.9s56.1,15,125,15,125-12.6,125-12.6c0,0,56.3-15,125.2-15s180.9,27.6,249.8,27.6,125-12.6,125-12.6c0,0,56.3-15,125.2-15s124.8,6.7,124.8,15v-70.9c0-8.3-55.9-15-124.8-15Z",
      "M875.7,213.6c-68.9,0-125.2,25-125.2,25,0,0-56.1,2.6-125,2.6s-180.9-37.6-249.8-37.6-125.2,25-125.2,25c0,0-56.1,2.6-125,2.6S.5,226.2.5,226.2v70.9s56.1,5,125,5,125-2.6,125-2.6c0,0,56.3-25,125.2-25s180.9,37.6,249.8,37.6,125-2.6,125-2.6c0,0,56.3-5,125.2-5s124.8,6.7,124.8,15v-70.9c0-8.3-55.9-15-124.8-15Z"
    ];
    
    const wavePath2 = [
      "M875.7,144.4c-68.9,0-125.2,15-125.2,15,0,0-56.1,12.6-125,12.6s-180.9-27.6-249.8-27.6-125.2,15-125.2,15c0,0-56.1,12.6-125,12.6S.5,157,.5,157v69.2s56.1,15,125,15,125-12.6,125-12.6c0,0,56.3-15,125.2-15s180.9,27.6,249.8,27.6,125-12.6,125-12.6c0,0,56.3-15,125.2-15s124.8,6.7,124.8,15v-69.2c0-8.3-55.9-15-124.8-15Z",
      "M875.7,144.4c-68.9,0-125.2,25-125.2,25,0,0-56.1,2.6-125,2.6s-180.9-37.6-249.8-37.6-125.2,25-125.2,25c0,0-56.1,2.6-125,2.6S.5,157,.5,157v69.2s56.1,5,125,5,125-2.6,125-2.6c0,0,56.3-25,125.2-25s180.9,37.6,249.8,37.6,125-2.6,125-2.6c0,0,56.3-5,125.2-5s124.8,6.7,124.8,15v-69.2c0-8.3-55.9-15-124.8-15Z"
    ];
    
    const wavePath3 = [
      "M875.7,75.5c-68.9,0-125.2,15-125.2,15,0,0-56.1,12.6-125,12.6s-180.9-27.6-249.8-27.6-125.2,15-125.2,15c0,0-56.1,12.6-125,12.6S.5,88.1.5,88.1v68.9s56.1,15,125,15,125-12.6,125-12.6c0,0,56.3-15,125.2-15s180.9,27.6,249.8,27.6,125-12.6,125-12.6c0,0,56.3-15,125.2-15s124.8,6.7,124.8,15v-68.9c0-8.3-55.9-15-124.8-15Z",
      "M875.7,75.5c-68.9,0-125.2,25-125.2,25,0,0-56.1,2.6-125,2.6s-180.9-37.6-249.8-37.6-125.2,25-125.2,25c0,0-56.1,2.6-125,2.6S.5,88.1.5,88.1v68.9s56.1,5,125,5,125-2.6,125-2.6c0,0,56.3-25,125.2-25s180.9,37.6,249.8,37.6,125-2.6,125-2.6c0,0,56.3-5,125.2-5s124.8,6.7,124.8,15v-68.9c0-8.3-55.9-15-124.8-15Z"
    ];
    
    const wavePath4 = [
      "M875.5.5c-68.9,0-125,15-125,15,0,0-55.9,12.6-124.8,12.6s-125.2-15-125.2-15c0,0-56.1-12.6-125-12.6s-125,15-125,15c0,0-55.9,12.6-124.8,12.6S.5,13.1.5,13.1v75s56.1,15,125,15,125-12.6,125-12.6c0,0,56.3-15,125.2-15s180.9,27.6,249.8,27.6,125-12.6,125-12.6c0,0,56.3-15,125.2-15s124.8,6.7,124.8,15V15.5S944.4.5,875.5.5Z",
      "M875.5.5c-68.9,0-125,25-125,25,0,0-55.9,2.6-124.8,2.6s-125.2-25-125.2-25c0,0-56.1-2.6-125-2.6s-125,25-125,25c0,0-55.9,2.6-124.8,2.6S.5,13.1.5,13.1v75s56.1,15,125,15,125-12.6,125-12.6c0,0,56.3-15,125.2-15s180.9,27.6,249.8,27.6,125-12.6,125-12.6c0,0,56.3-15,125.2-15s124.8,6.7,124.8,15V15.5S944.4.5,875.5.5Z"
    ];         

    // Function to create the wave animation
    const animateWave = (path, wavePaths) => {
      let index = 0;
      const animate = () => {
        index = (index + 1) % wavePaths.length;
        path.animate({ d: wavePaths[index] }, 3000, mina.easeinout, animate);
      };
      animate();
    };

    // Start the animation for each path
    animateWave(path1, wavePath1);
    animateWave(path2, wavePath2);
    animateWave(path3, wavePath3);
    animateWave(path4, wavePath4);
  }, []);

  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 1001 312.6"
      ref={svgRef}
      style={{ width: '100%', height: '25vh' }}
    >
      <defs>
        <style>
          {`.cls-1 {
            fill: #F9F7F3;
            stroke: #191C19;
            stroke-miterlimit: 10;
          }`}
        </style>
        <mask id="top-mask">
          <rect x="0" y="0" width="1201" height="20" fill="#191C19" />
          <rect x="0" y="20" width="1201" height="292.6" fill="#F9F7F3" />
        </mask>
      </defs>
      <path id="path1" className="cls-1" d="M875.7,213.6c-68.9,0-125.2,15-125.2,15,0,0-56.1,12.6-125,12.6s-180.9-27.6-249.8-27.6-125.2,15-125.2,15c0,0-56.1,12.6-125,12.6S.5,226.2.5,226.2v70.9s56.1,15,125,15,125-12.6,125-12.6c0,0,56.3-15,125.2-15s180.9,27.6,249.8,27.6,125-12.6,125-12.6c0,0,56.3-15,125.2-15s124.8,6.7,124.8,15v-70.9c0-8.3-55.9-15-124.8-15Z" mask="url(#top-mask)" />
      <path id="path2" className="cls-1" d="M875.7,144.4c-68.9,0-125.2,15-125.2,15,0,0-56.1,12.6-125,12.6s-180.9-27.6-249.8-27.6-125.2,15-125.2,15c0,0-56.1,12.6-125,12.6S.5,157,.5,157v69.2s56.1,15,125,15,125-12.6,125-12.6c0,0,56.3-15,125.2-15s180.9,27.6,249.8,27.6,125-12.6,125-12.6c0,0,56.3-15,125.2-15s124.8,6.7,124.8,15v-69.2c0-8.3-55.9-15-124.8-15Z" mask="url(#top-mask)" />
      <path id="path3" className="cls-1" d="M875.7,75.5c-68.9,0-125.2,15-125.2,15,0,0-56.1,12.6-125,12.6s-180.9-27.6-249.8-27.6-125.2,15-125.2,15c0,0-56.1,12.6-125,12.6S.5,88.1.5,88.1v68.9s56.1,15,125,15,125-12.6,125-12.6c0,0,56.3-15,125.2-15s180.9,27.6,249.8,27.6,125-12.6,125-12.6c0,0,56.3-15,125.2-15s124.8,6.7,124.8,15v-68.9c0-8.3-55.9-15-124.8-15Z" mask="url(#top-mask)" />
      <path id="path4" className="cls-1" d="M875.5.5c-68.9,0-125,15-125,15,0,0-55.9,12.6-124.8,12.6s-125.2-15-125.2-15c0,0-56.1-12.6-125-12.6s-125,15-125,15c0,0-55.9,12.6-124.8,12.6S.5,13.1.5,13.1v75s56.1,15,125,15,125-12.6,125-12.6c0,0,56.3-15,125.2-15s180.9,27.6,249.8,27.6,125-12.6,125-12.6c0,0,56.3-15,125.2-15s124.8,6.7,124.8,15V15.5S944.4.5,875.5.5Z" mask="url(#top-mask)" />
    </svg>
  );
};

export default WaveAnimation;
