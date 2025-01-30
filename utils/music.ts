export function createVisualizer(audioElement: HTMLAudioElement, canvas: HTMLCanvasElement) {
  let audioContext: AudioContext;
  let analyser: AnalyserNode;
  let source: MediaElementAudioSourceNode | null = null;

  // Function to initialize or reset the audio context
  const initializeAudioContext = () => {
    // Close the existing AudioContext if open
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
    }

    // Create a new AudioContext instance
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    analyser = audioContext.createAnalyser();

    // Disconnect any previous source if it's already connected
    if (source) {
      source.disconnect();
      source = null; // Reset source
    }

    try {
      // Create a new audio element to ensure no conflicts
      const newAudioElement = new Audio(audioElement.src);
      newAudioElement.crossOrigin = "anonymous"; // Handle CORS issues

      // Create the source node from the new audio element
      source = audioContext.createMediaElementSource(newAudioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      // Replace the old audio element in the DOM with the new one
      audioElement.parentNode?.replaceChild(newAudioElement, audioElement);
      audioElement = newAudioElement; // Use the new audio element
    } catch (error) {
      console.error('Error creating media element source:', error);
    }
  };

  initializeAudioContext();

  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const ctx = canvas.getContext('2d')!;
  const width = canvas.width;
  const height = canvas.height;

  // Create gradients
  const gradient1 = ctx.createLinearGradient(0, 0, 0, height);
  gradient1.addColorStop(0, '#00c6ff');
  gradient1.addColorStop(1, '#ff72e1');

  const gradient2 = ctx.createLinearGradient(0, 0, 0, height);
  gradient2.addColorStop(0, '#ff72e1');
  gradient2.addColorStop(1, '#00c6ff');

  let frameCount = 0;
  let animationFrameId: number;

  function draw() {
    animationFrameId = requestAnimationFrame(draw);
    frameCount++;

    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, width, height);

    // Draw two waveforms
    drawWaveform(gradient1, 1.5, 0);
    drawWaveform(gradient2, 1.2, 10);
  }

  function drawWaveform(gradient: CanvasGradient, amplitude: number, offset: number) {
    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;

    const sliceWidth = width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = (dataArray[i] / 128.0) * amplitude; // convert to percentage
      const y = (v * height) / 2 + offset;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    // Add some movement based on frameCount
    const wobble = Math.sin(frameCount * 0.02) * 5;
    ctx.transform(1, 0, 0, 1, 0, wobble);

    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.resetTransform();
  }

  draw();

  return () => {
    cancelAnimationFrame(animationFrameId);
    if (source) {
      source.disconnect();
    }
    analyser.disconnect();
    if (audioContext.state !== 'closed') {
      audioContext.close();
    }
  };
}
