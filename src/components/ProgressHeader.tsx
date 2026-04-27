import { Flame, BookOpen } from "lucide-react";
import { Level } from "@/data/curriculum";

interface ProgressHeaderProps {
  currentLevel: Level;
  streak: number;
  totalProgress: number;
}

export function ProgressHeader({ currentLevel, streak, totalProgress }: ProgressHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1E1A16]/10 bg-[#F5EFE0]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#8B1A1A] flex items-center justify-center">
            <span className="text-[#F5EFE0] text-xs font-bold font-serif">Ro</span>
          </div>
          <span
            className="text-xl font-bold text-[#1E1A16] hidden sm:block"
            style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
          >
            RomânăPath
          </span>
        </div>

        {/* Center: Progress bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#1E1A16]/60 font-medium whitespace-nowrap">
              Path Progress
            </span>
            <div className="flex-1 h-2 bg-[#1E1A16]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8B1A1A] to-[#C9922A] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#8B1A1A] whitespace-nowrap">
              {totalProgress}%
            </span>
          </div>
        </div>

        {/* Right: Level badge + streak */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Current level badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${currentLevel.badgeColor}`}>
            {currentLevel.code}
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-[#C9922A]/10 border border-[#C9922A]/20 rounded-full px-3 py-1">
            <Flame className="w-3.5 h-3.5 text-[#C9922A]" />
            <span className="text-xs font-bold text-[#C9922A]">{streak}</span>
          </div>

          {/* Lessons icon */}
          <div className="flex items-center gap-1.5 text-[#1E1A16]/50 hidden sm:flex">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mobile progress bar */}
      <div className="md:hidden px-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-[#1E1A16]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8B1A1A] to-[#C9922A] rounded-full transition-all duration-1000"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#8B1A1A]">{totalProgress}%</span>
        </div>
      </div>
    </header>
  );
}
