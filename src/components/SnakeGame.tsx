import { useState, useEffect, useRef, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };

const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Point = { x: 0, y: -1 };
const INITIAL_FOOD: Point = { x: 5, y: 5 };

function randomFoodPosition(snake: Point[]): Point {
  let newFood: Point;
  let isOccupied = true;
  while (isOccupied) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // eslint-disable-next-line no-loop-func
    isOccupied = snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
  }
  return newFood!;
}

export function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>(INITIAL_FOOD);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const directionRef = useRef(INITIAL_DIRECTION);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(randomFoodPosition(INITIAL_SNAKE));
    setIsGameOver(false);
    setIsStarted(true);
    setScore(0);
    setTimeout(() => {
      containerRef.current?.focus();
    }, 10);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted || isGameOver) return;
      
      const key = e.key;
      // Prevent scrolling when using arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(key)) {
        e.preventDefault();
      }

      const currentDir = directionRef.current;

      if (key === 'ArrowUp' && currentDir.y !== 1) {
        directionRef.current = { x: 0, y: -1 };
      } else if (key === 'ArrowDown' && currentDir.y !== -1) {
        directionRef.current = { x: 0, y: 1 };
      } else if (key === 'ArrowLeft' && currentDir.x !== 1) {
        directionRef.current = { x: -1, y: 0 };
      } else if (key === 'ArrowRight' && currentDir.x !== -1) {
        directionRef.current = { x: 1, y: 0 };
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isGameOver]);

  useEffect(() => {
    if (!isStarted || isGameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newDirection = directionRef.current;
        const newHead = { x: head.x + newDirection.x, y: head.y + newDirection.y };

        // Check wall collisions
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Check self collisions
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => {
            const newScore = s + 10;
            if (newScore > highScore) setHighScore(newScore);
            return newScore;
          });
          setFood(randomFoodPosition(newSnake));
          // Snake grows: we do NOT pop the tail
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        // Sync direction state visually if needed (optional)
        setDirection(newDirection);
        return newSnake;
      });
    };

    // Calculate speed based on score (gets faster)
    const speed = Math.max(50, INITIAL_SPEED - Math.floor(score / 30) * 10);
    const intervalId = setInterval(moveSnake, speed);

    return () => clearInterval(intervalId);
  }, [isStarted, isGameOver, food, score, highScore]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-4 sm:p-8 screen-tear">
      {/* Score Header */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 flex gap-6 sm:gap-12 z-20 bg-black p-2 sm:p-4 border-4 border-[#00FFFF]">
        <div className="text-center font-mono">
          <p className="text-[10px] sm:text-xs text-[#FF00FF] mb-1">MAX_OVERFLOW</p>
          <p className="text-xl sm:text-2xl text-[#00FFFF] bg-[#FF00FF]/20 px-2">{String(highScore).padStart(5, '0')}</p>
        </div>
        <div className="text-center font-mono">
          <p className="text-[10px] sm:text-xs text-[#00FFFF] mb-1">MEM_ALLOC</p>
          <p className="text-xl sm:text-2xl text-[#FF00FF] bg-[#00FFFF]/20 px-2">{String(score).padStart(5, '0')}</p>
        </div>
      </div>

      <div className="absolute top-8 left-8 hidden sm:block text-xs font-mono text-[#FF00FF] z-10 bg-black p-1 border-l-4 border-[#00FFFF]">
        SECTOR: 0xFF<br />
        TRACE: ACTV
      </div>

      <div className="absolute bottom-8 right-8 hidden sm:flex gap-4 z-10 font-mono">
        <div className="px-3 py-1 border-2 border-[#FF00FF] text-[#00FFFF] bg-black">GRID: {GRID_SIZE}x{GRID_SIZE}</div>
        <div className="px-3 py-1 bg-[#00FFFF] text-black font-bold">MODE: SURVIVAL</div>
      </div>

      {/* Game Board Container */}
      <div 
        className="relative border-8 border-[#FF00FF] bg-black p-1 z-20"
        style={{ width: 'min(90vw, 480px)', height: 'min(90vw, 480px)' }}
      >
        <div 
          ref={containerRef}
          tabIndex={0}
          className="relative w-full h-full grid select-none outline-none overflow-hidden isolate"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
        >
          {/* subtle grid lines */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
               style={{
                 backgroundImage: 'linear-gradient(to right, #00FFFF 1px, transparent 1px), linear-gradient(to bottom, #FF00FF 1px, transparent 1px)',
                 backgroundSize: `${100/GRID_SIZE}% ${100/GRID_SIZE}%`
               }}
          />

          {!isStarted && !isGameOver && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm">
              <button 
                onClick={resetGame}
                className="group flex flex-col items-center gap-3 active:scale-95 border-4 border-[#00FFFF] p-4 sm:p-6 bg-black hover:bg-[#FF00FF] hover:border-[#FF00FF] transition-none"
              >
                <span className="text-xl sm:text-2xl text-[#00FFFF] group-hover:text-black font-mono font-bold glitch-text" data-text="EXECUTE.SH">EXECUTE.SH</span>
              </button>
            </div>
          )}

          {isGameOver && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/95 border-4 border-[#FF00FF] screen-tear">
              <h2 className="text-2xl sm:text-3xl font-mono text-[#00FFFF] mb-2 uppercase text-center bg-[#FF00FF] px-4 py-2 text-black font-bold">FATAL_ERROR</h2>
              <p className="text-base sm:text-lg text-[#FF00FF] mb-8 font-mono text-center glitch-text" data-text="SEGMENTATION FAULT">SEGMENTATION FAULT</p>
              <button 
                onClick={resetGame}
                className="group flex flex-col items-center outline-none active:scale-95 border-4 border-[#FF00FF] p-4 bg-black hover:bg-[#00FFFF] hover:border-[#00FFFF]"
              >
                <span className="text-lg sm:text-xl text-[#FF00FF] group-hover:text-black font-mono font-bold">REBOOT_SYS()</span>
              </button>
            </div>
          )}

          {/* Render Food & Snake */}
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isFood = food.x === x && food.y === y;
            const snakeIndex = snake.findIndex((s) => s.x === x && s.y === y);
            const isHead = snakeIndex === 0;
            const isSnake = snakeIndex !== -1;

            return (
              <div key={i} className="w-full h-full relative z-10 flex items-center justify-center">
                {isFood && (
                  <div className="w-[90%] h-[90%] bg-[#FF00FF] animate-pulse" />
                )}
                {isSnake && (
                  <div 
                    className={`absolute inset-[1px] ${isHead ? 'bg-[#00FFFF] z-20 border-2 border-black' : 'bg-[#00FFFF]/80 z-10'}`} 
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Simple instructions for mobile/smaller screens */}
      <div className="text-[#00FFFF] bg-black border-2 border-[#FF00FF] px-4 py-2 font-mono text-[10px] mt-4 sm:hidden uppercase">
        [ AWAITING INPUT_DIR ]
      </div>
    </div>
  );
}
