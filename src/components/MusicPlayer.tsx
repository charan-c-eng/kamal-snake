import { useState, useEffect, useRef } from 'react';

const TRACKS = [
  { id: 1, title: "TRK_01.DAT // RAW", artist: "UNKNWN_SRC", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "SYS_CORRUPT.MP3", artist: "VOID_ENTITY", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: 3, title: "NULL_POINTER.WAV", artist: "NULL", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Audio playback restricted:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  const prevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  return (
    <footer className="h-24 sm:h-32 bg-black border-t-8 border-[#FF00FF] px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between shrink-0 select-none w-full z-30 relative font-mono text-[#00FFFF]">
      <audio ref={audioRef} src={currentTrack.url} onTimeUpdate={handleTimeUpdate} onEnded={handleTrackEnd} preload="metadata" />
      
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full">
        {/* Controls block */}
        <div className="flex gap-2 shrink-0 border-4 border-[#00FFFF] p-1 bg-black">
          <button onClick={prevTrack} className="px-3 py-2 bg-black hover:bg-[#FF00FF] border-2 border-[#00FFFF] hover:border-black text-[#00FFFF] hover:text-black font-bold">
            {'<<'}
          </button>
          <button onClick={togglePlay} className="px-6 py-2 bg-[#FF00FF] text-black font-black border-2 border-transparent hover:border-[#00FFFF] hover:bg-black hover:text-[#00FFFF] text-lg w-24 text-center glitch-text" data-text={isPlaying ? "HALT" : "EXEC"}>
            {isPlaying ? "HALT" : "EXEC"}
          </button>
          <button onClick={nextTrack} className="px-3 py-2 bg-black hover:bg-[#FF00FF] border-2 border-[#00FFFF] hover:border-black text-[#00FFFF] hover:text-black font-bold">
            {'>>'}
          </button>
        </div>
        
        {/* Track Display */}
        <div className="flex-1 w-full flex flex-col gap-2">
          <div className="flex justify-between text-xs sm:text-sm uppercase bg-[#00FFFF] text-black font-bold px-2 py-1 border-2 border-[#FF00FF]">
            <span className="truncate">{currentTrack.title}</span>
            <span className="shrink-0">[{currentTrack.artist}]</span>
          </div>
          <div className="h-4 bg-black border-2 border-[#FF00FF] w-full relative">
            <div 
              className="absolute left-0 top-0 h-full bg-[#FF00FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Fake Eq */}
        <div className="hidden lg:flex flex-col gap-1 w-32 border-4 border-[#00FFFF] p-2 bg-black">
           <div className="text-[10px] text-[#FF00FF] uppercase font-bold text-center">SIG_OUT</div>
           <div className="flex gap-1 h-8 items-end">
              <div className="w-full bg-[#00FFFF] h-[20%] animate-pulse"></div>
              <div className="w-full bg-[#FF00FF] h-[60%]"></div>
              <div className="w-full bg-[#00FFFF] h-[100%] animate-pulse"></div>
              <div className="w-full bg-[#FF00FF] h-[40%]"></div>
           </div>
        </div>
      </div>
    </footer>
  );
}
