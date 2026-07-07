import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, AlertCircle, Play, Pause } from 'lucide-react';
import YouTube from 'react-youtube';
import { useContent } from '../contexts/ContentContext';

interface AudioPlayerProps {
  url?: string;
}

const AudioPlayer = ({ url: propUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const playerRef = useRef<any>(null);
  const { data } = useContent();

  const extractYoutubeId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    if (match) return match[1];
    
    // Check for youtu.be format
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return shortMatch[1];

    return 'Ch3l_Q9PxpQ'; // default ID
  };

  let rawUrl = propUrl || data?.backgroundMusicUrl || "https://youtu.be/Ch3l_Q9PxpQ";
  if (rawUrl.includes("soundcloud.com")) {
    rawUrl = "https://youtu.be/Ch3l_Q9PxpQ";
  }
  const videoId = extractYoutubeId(rawUrl);

  const handleStartExperience = () => {
    setHasInteracted(true);
  };

  const handleReady = (event: any) => {
    playerRef.current = event.target;
    event.target.playVideo();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (error || !playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (error || !playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleStateChange = (event: any) => {
    // 1 = playing, 2 = paused, 0 = ended
    if (event.data === 1) {
      setIsPlaying(true);
    } else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false);
    }
  };

  const handleError = (e: any) => {
    console.error("YouTube Player Error:", e);
    setError("Lagu ini tidak dapat diputar. Coba gunakan link video lirik atau audio resmi lainnya.");
    setIsPlaying(false);
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playlist: videoId,
      origin: typeof window !== 'undefined' ? window.location.origin : ''
    },
  };

  return (
    <>
      {!hasInteracted && !error && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/90 backdrop-blur-sm transition-opacity duration-500 overflow-hidden">
          {data?.introVideoUrl && (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
            >
              <source src={data.introVideoUrl} type="video/mp4" />
            </video>
          )}
          <div className="text-center p-8 relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-paper-200 mb-6 drop-shadow-md">
              Siap Bernostalgia?
            </h2>
            <p className="text-paper-400 font-serif mb-8 max-w-md mx-auto text-lg">
              Klik tombol di bawah untuk memulai pengalaman dengan iringan musik.
            </p>
            <button
              onClick={handleStartExperience}
              className="px-10 py-5 bg-paper-200 text-navy-900 font-serif font-bold text-xl uppercase tracking-widest border-2 border-navy-900 shadow-[8px_8px_0px_#1e293b] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#1e293b] transition-all"
            >
              Mulai Pengalaman
            </button>
          </div>
        </div>
      )}

      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 group ${!hasInteracted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {error && (
        <div className="absolute bottom-20 right-0 w-64 bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-200 shadow-lg mb-2">
          <div className="flex gap-2 items-start">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        </div>
      )}
      
      <div className={`bg-paper-100/70 backdrop-blur-md border border-navy-900/50 rounded-full p-1.5 flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(30,41,59,0.5)] transition-transform ${error ? '' : 'hover:-translate-y-1'}`}>
        
        {/* Play/Pause Button inside Cassette Animation */}
        <button 
          onClick={togglePlay}
          className={`relative w-16 h-11 rounded bg-navy-800 border-2 border-navy-900 flex items-center justify-center p-2 shadow-inner overflow-hidden ${error ? 'opacity-50 cursor-not-allowed' : ''} transition-transform hover:-translate-y-0.5`}
          title={error ? "Error" : (isPlaying ? "Jeda Musik" : "Putar Musik")}
          disabled={!!error}
        >
          {/* Tape Sticker */}
          <div className="w-full h-full bg-white rounded-sm flex flex-col items-center justify-center px-1 py-0.5">
            <div className="flex w-full items-center justify-between relative">
              {/* Overlay Play/Pause Icon for better UX */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 bg-navy-900/40 rounded transition-opacity">
                {isPlaying ? <Pause className="w-4 h-4 text-paper-100" fill="currentColor" /> : <Play className="w-4 h-4 text-paper-100" fill="currentColor" />}
              </div>

              {/* Left reel */}
              <div className={`w-2.5 h-2.5 bg-navy-900 rounded-full flex items-center justify-center relative ${isPlaying && !error ? 'animate-[spin_2s_linear_infinite]' : ''}`}>
                <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                <div className="absolute w-[3px] h-[3px] bg-white top-[0.5px] left-[5px]"></div>
                <div className="absolute w-[3px] h-[3px] bg-white bottom-[0.5px] left-[5px]"></div>
                <div className="absolute w-[3px] h-[3px] bg-white left-[0.5px] top-[5px]"></div>
                <div className="absolute w-[3px] h-[3px] bg-white right-[0.5px] top-[5px]"></div>
              </div>
              
              {/* Middle window */}
              <div className="w-4 h-1.5 bg-navy-800 rounded-sm flex items-center justify-center overflow-hidden border border-navy-900">
                <div className="w-full h-[2px] bg-navy-900/80"></div>
              </div>

              {/* Right reel */}
              <div className={`w-2.5 h-2.5 bg-navy-900 rounded-full flex items-center justify-center relative ${isPlaying && !error ? 'animate-[spin_2s_linear_infinite]' : ''}`}>
                <div className="w-[3px] h-[3px] bg-white rounded-full"></div>
                <div className="absolute w-[3px] h-[3px] bg-white top-[0.5px] left-[5px]"></div>
                <div className="absolute w-[3px] h-[3px] bg-white bottom-[0.5px] left-[5px]"></div>
                <div className="absolute w-[3px] h-[3px] bg-white left-[0.5px] top-[5px]"></div>
                <div className="absolute w-[3px] h-[3px] bg-white right-[0.5px] top-[5px]"></div>
              </div>
            </div>
            {/* Cassette label lines */}
            <div className="w-full mt-0.5 space-y-[2px] px-0.5">
              <div className="h-[2px] w-full bg-navy-900/20"></div>
              <div className="h-[2px] w-3/4 bg-navy-900/20"></div>
            </div>
          </div>
          {/* Bottom trapezium shape effect */}
          <div className="absolute -bottom-1 w-12 h-2 bg-navy-800 rounded-t border-t border-navy-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center w-full h-full px-2">
               <div className="w-1 h-1 bg-navy-900 rounded-full"></div>
               <div className="w-1 h-1 bg-navy-900 rounded-full"></div>
            </div>
          </div>
        </button>

        {/* Mute/Unmute Toggle Button */}
        <button 
          onClick={toggleMute}
          className={`text-navy-900 transition-colors px-2 flex items-center justify-center ${error ? 'opacity-50 cursor-not-allowed' : 'hover:text-navy-700'}`}
          title={error ? "Error" : (isMuted ? "Bunyikan Musik" : "Bisukan Musik")}
          disabled={!!error}
        >
          {isMuted || !isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {!hasInteracted && !error && (
          <span className="absolute -top-12 right-0 bg-paper-200 text-navy-900 text-xs font-bold font-serif px-3 py-2 rounded border border-navy-900 shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Putar Musik Background
          </span>
        )}
      </div>
      </div>
      
      {/* Hidden YouTube Player Wrapper */}
      {hasInteracted && (
        <div className="hidden">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={handleReady}
            onStateChange={handleStateChange}
            onError={handleError}
          />
        </div>
      )}
    </>
  );
};

export default AudioPlayer;

