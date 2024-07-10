// The following code is adapted into React from
// https://codepen.io/Kuutti-Siitonen/pen/KKJeOoQ
import React, { useEffect, useRef } from 'react';

const MusicNotesCanvas = () => {
  const canvasRef = useRef(null);
  const musicNotes = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class MusicNote {
      constructor(x, y, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.finalHeight = 10; // Final height of the music note in pixels
        this.initialHeight = this.finalHeight * 2; // Initial height is twice the final height
        this.width = (203.6 / 512) * this.initialHeight; // Proportional width based on the SVG aspect ratio
        this.height = this.initialHeight; // Initial height
        this.alpha = 1;
        this.velocityX = velocityX * 0.05;
        this.velocityY = 1 + Math.random() + velocityY * 0.05;
        this.gravity = 0.02;
        this.drag = 0.97;
        this.turbulence = () => Math.random() * 0.5 - 0.25;
        this.timeElapsed = 0; // Time since the music note was created
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.width / 203.6, this.height / 512); // Scale proportionally
        ctx.globalAlpha = this.alpha;
        const path = new Path2D(`M194.3,423.2v9.1c0,5-4.1,9.1-9.1,9.1s-9.1-4.1-9.1-9.1v-414.1c0-5,4.1-9.1,9.1-9.1s9.1,4.1,9.1,9.1v414.1
        Z M101.8,440.7c-58.2,0-105.7-29.2-105.7-65.3s47.6-65.3,105.7-65.3,105.7,29.2,105.7,65.3S160,440.7,101.8,440.7z`);
        ctx.fill(path);
        ctx.restore();
      }

      update(deltaTime) {
        this.x += this.velocityX + this.turbulence();
        this.velocityX *= this.drag;
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        this.alpha = Math.max(0, this.alpha - 0.005);

        this.timeElapsed += deltaTime;
        if (this.timeElapsed < 2000) { // 2000 milliseconds = 2 seconds
          const progress = this.timeElapsed / 2000;
          this.height = this.initialHeight - progress * (this.initialHeight - this.finalHeight);
          this.width = (203.6 / 512) * this.height; // Adjust width proportionally
        } else {
          this.height = this.finalHeight;
          this.width = (203.6 / 512) * this.finalHeight;
        }
      }
    }

    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;

    function addMusicNote(e) {
      // Calculate mouse velocity
      mouseVelocityX = e.clientX - lastMouseX;
      mouseVelocityY = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      // Random offset for mouse velocity
      let randomOffsetX = (Math.random() - 0.5) * 100; // Adjust the multiplier for more or less randomness
      let randomOffsetY = (Math.random() - 0.5) * 100;

      // Create new music note with modified velocity
      musicNotes.current.push(new MusicNote(e.clientX, e.clientY, mouseVelocityX + randomOffsetX, mouseVelocityY + randomOffsetY));
    }

    canvas.addEventListener('mousemove', addMusicNote);

    let lastTime = 0;

    function update(time = 0) {
      const deltaTime = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      musicNotes.current.forEach(note => note.update(deltaTime));
      musicNotes.current.forEach(note => note.draw());
      musicNotes.current = musicNotes.current.filter(note => note.alpha > 0 && note.y < height && note.x > 0 && note.x < width);
      requestAnimationFrame(update);
    }

    update();

    return () => {
      canvas.removeEventListener('mousemove', addMusicNote);
      window.removeEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default MusicNotesCanvas;
