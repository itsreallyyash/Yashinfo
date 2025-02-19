'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Play, Pause, SkipForward } from 'lucide-react';
import { getRandomSong } from '../utils/songs';
import { createVisualizer } from '../utils/music';

// Extend the Window interface to include webkitAudioContext
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

interface VisualizerProps {
  onClose: () => void;
}

export function Visualizer({ onClose }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(getRandomSong());
  const cleanupRef = useRef<(() => void) | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext
  useEffect(() => {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (AudioContextConstructor) {
      audioContextRef.current = new AudioContextConstructor();
    } else {
      console.error('Web Audio API is not supported in this browser.');
    }

    // Clean up on unmount
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      // Pause and reset audio when the visualizer is closed
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset to the start
      }
    };
  }, []);

  // Define event handlers outside useEffect to maintain stable references
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const playAudio = useCallback(async () => {
    try {
      if (audioRef.current && audioContextRef.current) {
        // Resume AudioContext if it's suspended
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        await audioRef.current.play();
        setIsPlaying(true);
        console.log('Audio playback started successfully');
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !audioRef.current || !audioContextRef.current) return;

    // Clean up previous visualizer
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    // Resume AudioContext on user interaction (if suspended)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    // Create the visualizer
    const cleanup = createVisualizer(audioRef.current, canvasRef.current);
    cleanupRef.current = cleanup;

    // Add event listeners
    const audioElement = audioRef.current;
    audioElement.addEventListener('canplay', playAudio);
    audioElement.addEventListener('ended', handleEnded);

    // Load the audio only when song changes
    audioElement.src = currentSong.url;
    audioElement.load(); // To reload the audio source

    // Capture the current audioRef for cleanup
    const currentAudio = audioElement;

    return () => {
      currentAudio.removeEventListener('canplay', playAudio);
      currentAudio.removeEventListener('ended', handleEnded);
      currentAudio.pause();
      currentAudio.currentTime = 0;
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [currentSong.url, playAudio, handleEnded]);

  const handlePlayPause = async () => {
    if (!audioRef.current || !audioContextRef.current) return;

    try {
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const handleNext = () => {
    let nextSong;
    do {
      nextSong = getRandomSong();
    } while (nextSong.url === currentSong.url);
    setCurrentSong(nextSong);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="relative bg-gradient-to-br from-blue-500/10 to-pink-500/10 p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl max-w-4xl w-full mx-4">
        <button
          onClick={() => {
            onClose();
            // Manually stop the audio when closing the visualizer
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0; // Reset to the start
            }
          }}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={1200}
            height={400}
            className="rounded-2xl bg-black/20 w-full"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h3 className="font-semibold text-lg">{currentSong.title}</h3>
                <p className="text-white/60 text-sm">{currentSong.artist}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <SkipForward className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
          <audio
            ref={audioRef}
            src={currentSong.url}
            className="hidden"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
  );
}
