"use client";

import { useEffect, useRef, useState } from "react";

/*
 * The playlist is built automatically on the server from whatever MP3s
 * live in /public/music (see loadPlaylist in page.tsx). Name files
 * "Artist - Title.mp3" and drop a same-named image for cover art.
 */
export type Track = { name: string; artist: string; src: string; art: string };

export default function MusicPlayer({ tracks }: { tracks: Track[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const graphRef = useRef<{ ctx: AudioContext; analyser: AnalyserNode } | null>(null);
  const rafRef = useRef<number>(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showList, setShowList] = useState(false);

  const track = tracks[current];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, current]);

  // Real-time frequency visualizer driven by the actual audio.
  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    const cctx = canvas.getContext("2d");
    if (!cctx) return;

    // Build the Web Audio graph once, on first play (needs a user gesture).
    function ensureGraph() {
      if (graphRef.current) return graphRef.current;
      type WindowWithWebkit = Window & { webkitAudioContext?: typeof AudioContext };
      const Ctor = window.AudioContext ?? (window as WindowWithWebkit).webkitAudioContext;
      if (!Ctor || !audio) return null;
      const ctx = new Ctor();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.75;
      const source = ctx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      graphRef.current = { ctx, analyser };
      return graphRef.current;
    }

    const BARS = 14;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 48 * dpr;
    canvas.height = 28 * dpr;
    const W = canvas.width;
    const H = canvas.height;
    const gap = 1 * dpr;
    const barW = (W - gap * (BARS - 1)) / BARS;

    function drawIdle() {
      cctx!.clearRect(0, 0, W, H);
      cctx!.fillStyle = "#14532d";
      for (let i = 0; i < BARS; i++) {
        const x = i * (barW + gap);
        cctx!.fillRect(x, H - 2 * dpr, barW, 2 * dpr);
      }
    }

    if (!playing) {
      cancelAnimationFrame(rafRef.current);
      drawIdle();
      return;
    }

    const graph = ensureGraph();
    if (!graph) return;
    if (graph.ctx.state === "suspended") graph.ctx.resume();

    const bins = new Uint8Array(graph.analyser.frequencyBinCount);

    function frame() {
      graph!.analyser.getByteFrequencyData(bins);
      cctx!.clearRect(0, 0, W, H);
      for (let i = 0; i < BARS; i++) {
        const v = bins[i] / 255;
        const h = Math.max(2 * dpr, v * H);
        const x = i * (barW + gap);
        // Gradient spans the full height so quiet bars read green and
        // only loud peaks climb into yellow/red (VU-meter style).
        const grad = cctx!.createLinearGradient(0, H, 0, 0);
        grad.addColorStop(0, "#22c55e");
        grad.addColorStop(0.55, "#22c55e");
        grad.addColorStop(0.75, "#eab308");
        grad.addColorStop(1, "#ef4444");
        cctx!.fillStyle = grad;
        cctx!.fillRect(x, H - h, barW, h);
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    frame();

    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  function pad(n: number) {
    return Math.floor(n).toString().padStart(2, "0");
  }

  function stop() {
    if (audioRef.current) audioRef.current.currentTime = 0;
    setPlaying(false);
    setProgress(0);
  }

  function next() {
    setCurrent((c) => (c + 1) % tracks.length);
    setPlaying(true);
  }

  function prev() {
    setCurrent((c) => (c - 1 + tracks.length) % tracks.length);
    setPlaying(true);
  }

  function seek(e: React.MouseEvent<HTMLProgressElement>) {
    const el = e.currentTarget;
    const x = e.nativeEvent.offsetX;
    const pct = x / el.offsetWidth;
    if (audioRef.current && isFinite(duration)) {
      audioRef.current.currentTime = pct * duration;
      setProgress(pct * duration);
    }
  }

  const playedValue = duration ? progress / duration : 0;

  if (tracks.length === 0) {
    return (
      <section className="music-player">
        <div className="music-empty">
          No songs yet — drop <code>.mp3</code> files into <code>/public/music</code>
          {" "}(named <code>Artist - Title.mp3</code>) and they&apos;ll show up here.
        </div>
      </section>
    );
  }

  return (
    <section className="music-player">
      <div id="song-player" className="multi">
        <div className="control-container">
          <div className="meta-container">
            <div id="song-meta">
              <img
                className="album"
                src={track.art || "/pictures/tom-pic.jpg"}
                alt=""
              />
              <div className="song-text">
                <span className="song-name">{track.name}</span>
                <span className="song-artist">{track.artist}</span>
                <div className="time-container">
                  <span className="current-time">
                    {pad(progress / 60)}:{pad(progress % 60)}
                  </span>
                  <span className="divider">/</span>
                  <span className="duration">
                    {pad(duration / 60)}:{pad(duration % 60)}
                  </span>
                </div>
              </div>
              <div className="mmp-eq-container">
                <canvas ref={canvasRef} className="mmp-eq" aria-hidden />
              </div>
            </div>
          </div>

          <progress
            className="amplitude-song-played-progress"
            value={playedValue}
            max={1}
            onClick={seek}
          />

          <div id="button-controls" className="control-group">
            <button type="button" className="player multi" onClick={stop} aria-label="Stop">
              <i className="icon-stop multi" />
              <i className="icon-stop multi shadow" />
            </button>
            <button type="button" className="player multi" onClick={prev} aria-label="Previous">
              <i className="icon-prev multi" />
              <i className="icon-prev multi shadow" />
            </button>
            <button type="button" className="player multi" onClick={() => setPlaying((p) => !p)} aria-label="Play/Pause">
              <i className={`${playing ? "icon-pause" : "icon-play"} multi`} />
              <i className={`${playing ? "icon-pause" : "icon-play"} multi shadow`} />
            </button>
            <button type="button" className="player multi" onClick={next} aria-label="Next">
              <i className="icon-next multi" />
              <i className="icon-next multi shadow" />
            </button>
          </div>

          <div className="tracklist-toggle">
            <button
              type="button"
              className="tracklist-link"
              onClick={() => setShowList((s) => !s)}
              aria-expanded={showList}
            >
              {showList ? "hide tracklist" : "view tracklist"}
            </button>
          </div>

          {showList && (
            <ul className="tracklist">
              {tracks.map((t, i) => (
                <li key={t.src}>
                  <button
                    type="button"
                    className={`tracklist-item${i === current ? " current" : ""}`}
                    onClick={() => {
                      setCurrent(i);
                      setPlaying(true);
                    }}
                  >
                    <span className="tracklist-num">{i + 1}.</span>
                    <span className="tracklist-name">{t.name}</span>
                    <span className="tracklist-artist">{t.artist}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={next}
      />
    </section>
  );
}
