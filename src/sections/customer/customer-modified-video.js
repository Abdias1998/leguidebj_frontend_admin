import React, { useState, useEffect, useRef } from "react";

function VideoPlayer() {
  const videoRef = useRef(null);
  const captionsRef = useRef(null);
  const previewImgRef = useRef(null);
  const thumbnailImgRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Fonction togglePlay déplacée ici
  function togglePlay() {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  // Nouvelle fonction toggleMute
  function toggleMute() {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  }

  useEffect(() => {
    const video = videoRef.current;
    const captions = captionsRef.current;
    const timelineContainer = timelineContainerRef.current;
    const previewImg = previewImgRef.current;
    const thumbnailImg = thumbnailImgRef.current;

    function changePlaybackSpeed() {
      let newPlaybackRate = video.playbackRate + 0.25;
      if (newPlaybackRate > 2) newPlaybackRate = 0.25;
      video.playbackRate = newPlaybackRate;
    }

    video.addEventListener("play", () => {
      setIsPaused(false);
    });

    video.addEventListener("pause", () => {
      setIsPaused(true);
    });

    video.addEventListener("volumechange", () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    });

    return () => {
      video.removeEventListener("play", () => {});
      video.removeEventListener("pause", () => {});
      video.removeEventListener("volumechange", () => {});
    };
  }, []);

  const updateVolume = (value) => {
    videoRef.current.volume = value;
    videoRef.current.muted = value === 0;
  };

  return (
    <div
      className={`video-container ${isPaused ? "paused" : ""}`}
      data-volume-level={volume > 0 ? "high" : "muted"}
    >
      <img className="thumbnail-img" ref={thumbnailImgRef} />
      <div className="video-controls-container">
        <div className="timeline-container" ref={timelineContainerRef}>
          <div className="timeline">
            <img className="preview-img" ref={previewImgRef} />
            <div className="thumb-indicator"></div>
          </div>
        </div>
        <div className="controls">
          <button className="play-pause-btn" onClick={togglePlay}>
            {isPaused ? "Play" : "Pause"}
          </button>
          <div className="volume-container">
            <button className="mute-btn" onClick={toggleMute}>
              {isMuted ? "Unmute" : volume > 0.5 ? "Mute" : "Mute"}
            </button>
            <input
              className="volume-slider"
              type="range"
              min="0"
              max="1"
              step="any"
              value={volume}
              onChange={(e) => updateVolume(e.target.value)}
            />
          </div>
          {/* ... Autres éléments de contrôle */}
          <button className="speed-btn wide-btn" onClick={changePlaybackSpeed}>
            {videoRef.current.playbackRate}x
          </button>
          <button className="mini-player-btn">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0-2-.9-2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </button>
          {/* ... Autres boutons */}
        </div>
      </div>
      <video src="assets/Video.mp4" ref={videoRef}>
        <track kind="captions" srclang="en" src="assets/subtitles.vtt" ref={captionsRef} />
      </video>
    </div>
  );
}

export default VideoPlayer;
