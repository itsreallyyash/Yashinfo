export function playKeyboardSound() {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Create multiple oscillators for a richer mechanical sound
  const oscillators = [];
  const gainNodes = [];
  
  // Frequencies for mechanical click sound
  const frequencies = [2000, 3000, 4000];
  
  frequencies.forEach(freq => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.015, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    
    oscillators.push(oscillator);
    gainNodes.push(gainNode);
  });
  
  oscillators.forEach(osc => {
    osc.start();
    osc.stop(audioContext.currentTime + 0.05);
  });
}

