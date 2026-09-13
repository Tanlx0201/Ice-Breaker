// audio.js - Web Audio API Sound Synthesizer for Casino & Gambling FX
// Zero external dependencies, 100% offline and low-latency

class CasinoAudio {
    constructor() {
        this.ctx = null;
        this.muted = localStorage.getItem('icebreaker_muted') === 'true';
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('icebreaker_muted', this.muted);
        return this.muted;
    }

    // Peg click when wheel crosses a sector
    playTick(frequency = 900) {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.04);

            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.045);
        } catch (e) {}
    }

    // Card slide / whoosh & snap
    playCardFlip() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            // Noise burst for swoosh
            const bufferSize = this.ctx.sampleRate * 0.08;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(3000, this.ctx.currentTime + 0.08);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noise.start();

            // Crisp snap tone
            const snap = this.ctx.createOscillator();
            const snapGain = this.ctx.createGain();
            snap.type = 'sine';
            snap.frequency.setValueAtTime(1400, this.ctx.currentTime + 0.03);
            snap.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.07);

            snapGain.gain.setValueAtTime(0.2, this.ctx.currentTime + 0.03);
            snapGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

            snap.connect(snapGain);
            snapGain.connect(this.ctx.destination);

            snap.start(this.ctx.currentTime + 0.03);
            snap.stop(this.ctx.currentTime + 0.075);
        } catch (e) {}
    }

    // Mechanical thud when slot reel locks in
    playReelStop() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(160, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.085);
        } catch (e) {}
    }

    // Metallic poker chip clinking
    playChipClink() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const freqs = [2200, 2750];
            freqs.forEach((f, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, this.ctx.currentTime + idx * 0.02);
                osc.frequency.exponentialRampToValueAtTime(f * 0.8, this.ctx.currentTime + idx * 0.02 + 0.09);

                gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.02 + 0.09);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(this.ctx.currentTime + idx * 0.02);
                osc.stop(this.ctx.currentTime + idx * 0.02 + 0.1);
            });
        } catch (e) {}
    }

    // Positive victory chime
    playWin() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const startTime = this.ctx.currentTime + idx * 0.08;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.2, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.26);
            });
        } catch (e) {}
    }

    // Glorious casino Jackpot fanfare
    playJackpot() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const melody = [
                { f: 523.25, d: 0.1 },
                { f: 659.25, d: 0.1 },
                { f: 783.99, d: 0.1 },
                { f: 1046.50, d: 0.2 },
                { f: 880.00, d: 0.1 },
                { f: 1046.50, d: 0.15 },
                { f: 1318.51, d: 0.35 }
            ];

            let curTime = this.ctx.currentTime;
            melody.forEach(item => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(item.f, curTime);

                gain.gain.setValueAtTime(0.25, curTime);
                gain.gain.exponentialRampToValueAtTime(0.001, curTime + item.d + 0.05);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(curTime);
                osc.stop(curTime + item.d + 0.06);

                curTime += item.d;
            });
        } catch (e) {}
    }

    // Subtle UI button click
    playButtonClick() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.03);

            gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.035);
        } catch (e) {}
    }
}

window.CasinoAudio = CasinoAudio;
