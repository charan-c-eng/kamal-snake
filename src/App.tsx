import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="h-screen w-full bg-black text-[#00FFFF] flex flex-col font-sans overflow-hidden crt relative noise-bg sm:border-8 sm:border-[#FF00FF]">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b-4 border-[#00FFFF] bg-black shrink-0 relative z-20">
        <div className="flex items-center gap-3 sm:gap-4 screen-tear">
          <div className="w-4 h-4 bg-[#FF00FF] animate-pulse"></div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-[0.2em] font-mono uppercase glitch-text" data-text="OVR.RIDE // SYS.0XF">
            OVR.RIDE // SYS.0XF
          </h1>
        </div>
        <div className="text-[#FF00FF] font-mono text-xs hidden sm:block animate-pulse">
           &lt;WARNING: MEMORY CORRUPTION DETECTED&gt;
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative z-20">
        {/* Left Aside (Data Buffer) */}
        <aside className="w-72 hidden md:flex border-r-4 border-[#00FFFF] flex-col bg-black shrink-0 overflow-y-auto">
          <div className="p-6 border-b-4 border-[#FF00FF]">
            <h2 className="text-2xl text-[#FF00FF] font-mono uppercase mb-4 glitch-text" data-text="DATA.BUFFER">DATA.BUFFER</h2>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-3 p-2 bg-[#00FFFF] text-black">
                <div className="w-8 h-8 bg-black flex items-center justify-center shrink-0 border-2 border-black">
                  <div className="w-full h-1 bg-[#00FFFF] animate-pulse"></div>
                </div>
                <div className="min-w-0">
                  <p className="font-bold truncate uppercase">{'>'} TRK_01.DAT</p>
                  <p className="text-[10px] truncate uppercase bg-black text-[#00FFFF] px-1 mt-0.5 inline-block">SRC: UNKNWN</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 border-2 border-[#00FFFF] text-[#00FFFF]">
                <div className="w-8 h-8 bg-black shrink-0 border-2 border-[#FF00FF]"></div>
                <div className="min-w-0">
                  <p className="font-bold truncate uppercase">{'>'} SYS_CORRUPT.MP3</p>
                  <p className="text-[10px] truncate uppercase bg-[#FF00FF] text-black px-1 mt-0.5 inline-block">SRC: VOID</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 border-2 border-[#FF00FF] text-[#FF00FF]">
                <div className="w-8 h-8 bg-black shrink-0 border-2 border-[#00FFFF]"></div>
                <div className="min-w-0">
                  <p className="font-bold truncate uppercase">{'>'} NULL_POINTER.WAV</p>
                  <p className="text-[10px] truncate uppercase bg-[#00FFFF] text-black px-1 mt-0.5 inline-block">SRC: NULL</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 flex-1">
            <h2 className="text-2xl text-[#00FFFF] font-mono uppercase mb-4 glitch-text" data-text="SYS.DIAGNOSTICS">SYS.DIAGNOSTICS</h2>
            <div className="space-y-3 font-mono text-sm uppercase">
              <div className="flex justify-between items-center bg-[#FF00FF] text-black p-2 border-2 border-[#FF00FF]">
                <span>CPU_ERR</span>
                <span className="font-bold">0xFF</span>
              </div>
              <div className="flex justify-between items-center bg-[#00FFFF] text-black p-2 border-2 border-[#00FFFF]">
                <span>THERMAL</span>
                <span className="animate-pulse font-bold">CRITICAL</span>
              </div>
              <div className="flex justify-between items-center border-2 border-[#FF00FF] text-[#FF00FF] p-2 hover:bg-[#00FFFF] hover:text-black hover:border-[#00FFFF] transition-none border-dashed line-through decoration-2">
                <span>SAFEDECK</span>
                <span>UNKNOWN</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Game Section */}
        <section className="flex-1 relative flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #FF00FF 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.15 }}></div>
          <SnakeGame />
        </section>

        {/* Right Aside (Visualizer) */}
        <aside className="w-64 hidden xl:block border-l-4 border-[#FF00FF] bg-black p-6 shrink-0 overflow-y-auto">
          <h2 className="text-2xl text-[#FF00FF] font-mono uppercase mb-6 glitch-text" data-text="WAVE_FORM">WAVE_FORM</h2>
          <div className="flex items-end gap-1 h-32 mb-8 p-2 border-4 border-[#00FFFF] bg-black screen-tear">
            <div className="flex-1 bg-[#FF00FF] h-[30%] opacity-80"></div>
            <div className="flex-1 bg-[#00FFFF] h-[80%] opacity-90"></div>
            <div className="flex-1 bg-[#FF00FF] h-[100%] animate-pulse"></div>
            <div className="flex-1 bg-[#00FFFF] h-[20%] opacity-70"></div>
            <div className="flex-1 bg-[#FF00FF] h-[60%] opacity-100"></div>
            <div className="flex-1 bg-[#00FFFF] h-[40%] opacity-80"></div>
            <div className="flex-1 bg-[#FF00FF] h-[90%] opacity-90"></div>
          </div>
          <div className="space-y-4 font-mono">
            <div className="p-3 border-2 border-[#00FFFF] bg-black">
              <p className="text-xs text-[#FF00FF] mb-1">BITRATE_LOCK</p>
              <p className="text-lg text-[#00FFFF] font-bold">RAW_DATA</p>
            </div>
            <div className="p-3 bg-[#FF00FF] text-black">
              <p className="text-xs font-bold mb-1">OUT_PORT</p>
              <p className="text-lg font-bold">NEURAL_JACK</p>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer (Music Player Controls) */}
      <MusicPlayer />
    </div>
  );
}
