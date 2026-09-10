// Web Audio API generator for ambient soundscapes & meditative chimes

let audioCtx: AudioContext | null = null;
let activeAmbientSource: AudioNode | null = null;
let activeGain: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTempleBell(pitch = 528) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.98, ctx.currentTime + 2.5);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 3.0);
  } catch (e) {
    console.warn('Audio playback error', e);
  }
}

export function playSoftChime() {
  playTempleBell(432);
}

export function startAmbientSound(type: 'rain' | 'library' | 'breeze', volume = 0.5) {
  try {
    stopAmbientSound();
    const ctx = getAudioContext();

    // Generate procedural pink/brown noise for rain or breeze
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter
    const filter = ctx.createBiquadFilter();
    if (type === 'rain') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
    } else if (type === 'breeze') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
    } else {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
    }

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.25, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
    activeAmbientSource = whiteNoise;
    activeGain = gain;
  } catch (e) {
    console.warn('Ambient start error', e);
  }
}

export function setAmbientVolume(volume: number) {
  if (activeGain && audioCtx) {
    activeGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.25)), audioCtx.currentTime);
  }
}

export function stopAmbientSound() {
  if (activeAmbientSource) {
    try {
      (activeAmbientSource as AudioScheduledSourceNode).stop();
      activeAmbientSource.disconnect();
    } catch {
      // ignore
    }
    activeAmbientSource = null;
    activeGain = null;
  }
}
