import { Flame, Zap } from "lucide-react";
import { Level } from "@/data/curriculum";

interface ProgressHeaderProps {
  currentLevel: Level;
  streak: number;
  totalProgress: number;
}

const levelAccentColors: Record<string, string> = {
  a1: "#58CC02",
  a2: "#FF9600",
  b1: "#1CB0F6",
  b2: "#CE82FF",
};

export function ProgressHeader({ currentLevel, streak, totalProgress }: ProgressHeaderProps) {
  const color = levelAccentColors[currentLevel.id] ?? "#58CC02";

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
            style={{ backgroundColor: color, boxShadow: `0 4px 0 ${color}88` }}
          >
            Ro
          </div>
          <span className="text-xl font-black text-gray-800 hidden sm:block tracking-tight">
            RomânăPath
          </span>
        </div>

        {/* Right: XP-style stats */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border-2 border-orange-200 bg-orange-50">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-black text-orange-500">{streak}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl border-2 border-yellow-200 bg-yellow-50">
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            <span className="text-sm font-black text-yellow-600">{totalProgress}%</span>
          </div>



          {/* Level badge */}
          <div
            className="px-3 py-2 rounded-2xl text-xs font-black text-white hidden sm:block"
            style={{ backgroundColor: color, boxShadow: `0 3px 0 ${color}88` }}
          >
            {currentLevel.code}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 w-full">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{ width: `${totalProgress}%`, backgroundColor: color }}
        />
      </div>
    </header>
  );
}
