import React, { useEffect, useRef } from 'react';
import Snap from 'snapsvg-cjs';

const WaveAnimation = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const s = Snap(svgRef.current);

    const animatePath = (path, from, to, duration) => {

      path.animate(
        {
          d: to,
        },
        duration,
        mina.easeinout,
        () => {
          path.animate(
            {
              d: from,
            },
            duration,
            mina.easeinout,
            () => {
              animatePath(path, from, to, duration);
            }
          );
        }
      );
    };

    // Imported custom SVG and changed numbers in the to path
    // to simulate constant movement
    const pathData = [
      {
        element: s.select('#path1'),
        from: 'M1891.6,19c-74.6-6.1-149.1-11.5-204.3-14.5c-151.6-9.5-287.6-1.1-450.2,12.1c-45.3,3.5-92,7.5-138,10.4c-48.7,3.1-93,4.2-139.8,4.1c-46.8,0.1-91-1-139.8-4.1c-46-3-92.7-6.9-138-10.4C519,3.5,383-4.9,231.4,4.6C176.1,7.5,101.7,12.9,27.1,19c-9.3,0.8-18.2,1.6-26.6,2.7v38c14.6-0.6,33.2-2.2,48.6-3.3c338.8-28.9,437.3-15.9,768.1,9.9c47.7,2.9,94.7,4.4,142.2,4.3c47.5,0.1,94.4-1.4,142.2-4.3c330.7-25.8,429.3-38.7,768.1-9.9c15.4,1.2,34,2.8,48.6,3.3v-38C1909.9,20.6,1900.9,19.8,1891.6,19z',
        to: 'M1891.6,24c-74.6-6.1-149.1-11.5-204.3-14.5c-151.6-9.5-287.6-1.1-450.2,12.1c-45.3,3.5-92,7.5-138,10.4c-48.7,3.1-93,4.2-139.8,4.1c-46.8,0.1-91-1-139.8-4.1c-46-3-92.7-6.9-138-10.4C514,8.5,378-0.9,226.4,8.6C171.1,11.5,96.7,16.9,22.1,24c-9.3,0.8-18.2,1.6-26.6,2.7v38c14.6-0.6,33.2-2.2,48.6-3.3c338.8-28.9,437.3-15.9,768.1,9.9c47.7,2.9,94.7,4.4,142.2,4.3c47.5,0.1,94.4-1.4,142.2-4.3c330.7-25.8,429.3-38.7,768.1-9.9c15.4,1.2,34,2.8,48.6,3.3v-38C1899.9,25.6,1890.9,24.8,1891.6,24z'
      },
      {
        element: s.select('#path2'),
        from: 'M1687.3,46.8c-151.6-9.5-287.6-1.1-450.2,12.1c-45.3,3.5-92,7.5-138,10.4c-48.7,3.1-93,4.2-139.8,4.1c-46.8,0.1-91-1-139.8-4.1c-46-3-92.7-6.9-138-10.4C519,45.7,383,37.3,231.4,46.8c-55.3,2.9-129.7,8.4-204.3,14.5C17.8,62,8.8,62.8,0.5,63.9v38c14.6-0.6,33.2-2.2,48.6-3.3c338.8-28.9,437.3-15.9,768.1,9.9c47.7,2.9,94.7,4.4,142.2,4.3c47.5,0.1,94.4-1.4,142.2-4.3c330.7-25.8,429.3-38.7,768.1-9.9c15.4,1.2,34,2.8,48.6,3.3v-38c-8.3-1.1-17.3-1.9-26.6-2.7C1817,55.1,1742.6,49.7,1687.3,46.8z',
        to: 'M1682.3,51.8c-151.6-9.5-287.6-1.1-450.2,12.1c-45.3,3.5-92,7.5-138,10.4c-48.7,3.1-93,4.2-139.8,4.1c-46.8,0.1-91-1-139.8-4.1c-46-3-92.7-6.9-138-10.4C514,50.7,378,42.3,226.4,51.8c-55.3,2.9-129.7,8.4-204.3,14.5c-9.3,0.8-18.2,1.6-26.6,2.7v38c14.6-0.6,33.2-2.2,48.6-3.3c338.8-28.9,437.3-15.9,768.1,9.9c47.7,2.9,94.7,4.4,142.2,4.3c47.5,0.1,94.4-1.4,142.2-4.3c330.7-25.8,429.3-38.7,768.1-9.9c15.4,1.2,34,2.8,48.6,3.3v-38c-8.3-1.1-17.3-1.9-26.6-2.7C1812,60.1,1737.6,54.6,1682.3,51.8z'
      },
      {
        element: s.select('#path3'),
        from: 'M1687.3,89.7c-151.6-9.5-287.6-1.1-450.2,12.1c-45.3,3.5-92,7.5-138,10.4c-48.7,3.1-93,4.2-139.8,4.1c-46.8,0.1-91-1-139.8-4.1c-46-3-92.7-6.9-138-10.4C519,88.6,383,80.2,231.4,89.7c-55.3,2.9-129.7,8.4-204.3,14.5c-9.3,0.8-18.2,1.6-26.6,2.7v38c14.6-0.6,33.2-2.2,48.6-3.3c338.8-28.9,437.3-15.9,768.1,9.9c47.7,2.9,94.7,4.4,142.2,4.3c47.5,0.1,94.4-1.4,142.2-4.3c330.7-25.8,429.3-38.7,768.1-9.9c15.4,1.2,34,2.8,48.6,3.3v-38c-8.3-1.1-17.3-1.9-26.6-2.7C1817,98.1,1742.6,92.6,1687.3,89.7z',
        to: 'M1682.3,94.7c-151.6-9.5-287.6-1.1-450.2,12.1c-45.3,3.5-92,7.5-138,10.4c-48.7,3.1-93,4.2-139.8,4.1c-46.8,0.1-91-1-139.8-4.1c-46-3-92.7-6.9-138-10.4C514,93.6,378,85.2,226.4,94.7c-55.3,2.9-129.7,8.4-204.3,14.5c-9.3,0.8-18.2,1.6-26.6,2.7v38c14.6-0.6,33.2-2.2,48.6-3.3c338.8-28.9,437.3-15.9,768.1,9.9c47.7,2.9,94.7,4.4,142.2,4.3c47.5,0.1,94.4-1.4,142.2-4.3c330.7-25.8,429.3-38.7,768.1-9.9c15.4,1.2,34,2.8,48.6,3.3v-38c-8.3-1.1-17.3-1.9-26.6-2.7C1812,103.1,1737.6,97.6,1682.3,94.7z'
      },
      {
        element: s.select('#path4'),
        from: 'M1687.3,132.2c-151.6-9.5-287.6-1.1-450.2,12.1c-45.3,3.5-92,7.5-138,10.4c-48.7,3.1-93,4.2-139.8,4.1c-46.8,0.1-91-1-139.8-4.1c-46-3-92.7-6.9-138-10.4C519,131.1,383,122.7,231.4,132.2c-55.3,2.9-129.7,8.4-204.3,14.5c-9.3,0.8-18.2,1.6-26.6,2.7v38c14.6-0.6,33.2-2.2,48.6-3.3c338.8-28.9,437.3-15.9,768.1,9.9c47.7,2.9,94.7,4.4,142.2,4.3c47.5,0.1,94.4-1.4,142.2-4.3c330.7-25.8,429.3-38.7,768.1-9.9c15.4,1.2,34,2.8,48.6,3.3v-38c-8.3-1.1-17.3-1.9-26.6-2.7C1817,140.6,1742.6,135.1,1687.3,132.2z',
        to: 'M1682.3,137.2c-151.6-9.5-287.6-1.1-450.2,12.1c-45.3,3.5-92,7.5-138,10.4c-48.7,3.1-93,4.2-139.8,4.1c-46.8,0.1-91-1-139.8-4.1c-46-3-92.7-6.9-138-10.4C514,136.1,378,127.7,226.4,137.2c-55.3,2.9-129.7,8.4-204.3,14.5c-9.3,0.8-18.2,1.6-26.6,2.7v38c14.6-0.6,33.2-2.2,48.6-3.3c338.8-28.9,437.3-15.9,768.1,9.9c47.7,2.9,94.7,4.4,142.2,4.3c47.5,0.1,94.4-1.4,142.2-4.3c330.7-25.8,429.3-38.7,768.1-9.9c15.4,1.2,34,2.8,48.6,3.3v-38c-8.3-1.1-17.3-1.9-26.6-2.7C1812,145.6,1737.6,140.1,1682.3,137.2z'
      }
    ];       

    pathData.forEach(({ element, from, to }) => {
      animatePath(element, from, to, 2000);
    });

    // Cleanup function to stop animations if component unmounts
    return () => {
      pathData.forEach(({ element }) => {
        element.stop();
      });
    };
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 1920 220" preserveAspectRatio="none">
      <path id="path1" fill="#F9F7F3" stroke="#191C19" />
      <path id="path2" fill="#F9F7F3" stroke="#191C19" />
      <path id="path3" fill="#F9F7F3" stroke="#191C19" />
      <path id="path4" fill="#F9F7F3" stroke="#191C19" />
    </svg>
  );
};

export default WaveAnimation;