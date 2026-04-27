import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Level, Lesson } from "@/data/curriculum";
import { LessonCard } from "./LessonCard";

interface LevelPathProps {
  levels: Level[];
  expandedLevel: string | null;
  onToggleLevel: (levelId: string) => void;
  onSelectLesson: (level: Level, lesson: Lesson) => void;
}

const levelColors: Record<string, { ring: string; bg: string; dot: string }> = {
  a1: { ring: "border-[#8B1A1A]", bg: "bg-[#8B1A1A]/5", dot: "bg-[#8B1A1A]" },
  a2: { ring: "border-[#C9922A]", bg: "bg-[#C9922A]/5", dot: "bg-[#C9922A]" },
  b1: { ring: "border-[#2D5A27]", bg: "bg-[#2D5A27]/5", dot: "bg-[#2D5A27]" },
  b2: { ring: "border-[#1A3A6B]", bg: "bg-[#1A3A6B]/5", dot: "bg-[#1A3A6B]" },
};

function LevelConnector({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center h-8">
      <div
        className={`w-0.5 transition-colors duration-500 ${
          active ? "bg-[#8B1A1A]/40" : "bg-[#1E1A16]/10"
        }`}
      />
    </div>
  );
}

export function LevelPath({ levels, expandedLevel, onToggleLevel, onSelectLesson }: LevelPathProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Section header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#8B1A1A] bg-[#8B1A1A]/8 border border-[#8B1A1A]/20 rounded-full px-4 py-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A] animate-pulse" />
          Learning Path
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold text-[#1E1A16] mb-3"
          style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
        >
          Your Romanian Journey
        </h1>
        <p className="text-[#1E1A16]/60 max-w-md mx-auto text-sm leading-relaxed">
          A structured path from beginner to upper intermediate. Complete each level to unlock the next.
        </p>
      </div>

      {/* Path */}
      {levels.map((level, idx) => {
        const colors = levelColors[level.id];
        const isExpanded = expandedLevel === level.id;
        const completedCount = level.lessons.filter(l => l.completed).length;
        const totalCount = level.lessons.length;
        const levelProgress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        return (
          <div key={level.id}>
            {idx > 0 && <LevelConnector active={levels[idx - 1].unlocked} />}

            {/* Level milestone card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative border rounded-2xl overflow-hidden transition-all duration-300 ${
                level.unlocked
                  ? `${colors.ring} cursor-pointer hover:shadow-lg`
                  : "border-[#1E1A16]/10 opacity-60 cursor-not-allowed"
              } ${isExpanded ? `${colors.bg} shadow-lg` : "bg-white/70"}`}
              onClick={() => level.unlocked && onToggleLevel(level.id)}
            >
              {/* Top colored bar */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: level.color }}
              />

              <div className="p-5">
                <div className="flex items-center gap-4">
                  {/* Level badge + icon */}
                  <div className="relative shrink-0">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-md"
                      style={{ backgroundColor: level.color, fontFamily: "'Fraunces', 'Georgia', serif" }}
                    >
                      {level.code}
                    </div>
                    {completedCount === totalCount && totalCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2
                        className="font-bold text-[#1E1A16] text-lg leading-tight"
                        style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
                      >
                        {level.title}
                      </h2>
                      {!level.unlocked && (
                        <Lock className="w-4 h-4 text-[#1E1A16]/40 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-[#1E1A16]/60 leading-relaxed mb-3">
                      {level.description}
                    </p>

                    {/* Progress bar */}
                    {level.unlocked && (
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-[#1E1A16]/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: level.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${levelProgress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-xs text-[#1E1A16]/50 whitespace-nowrap">
                          {completedCount}/{totalCount} lessons
                        </span>
                      </div>
                    )}

                    {!level.unlocked && (
                      <p className="text-xs text-[#1E1A16]/40 italic">
                        Complete the previous level to unlock
                      </p>
                    )}
                  </div>

                  {/* Expand icon */}
                  {level.unlocked && (
                    <div
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${level.color}15` }}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" style={{ color: level.color }} />
                      ) : (
                        <ChevronDown className="w-4 h-4" style={{ color: level.color }} />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Lesson cards */}
              <AnimatePresence>
                {isExpanded && level.unlocked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-[#1E1A16]/8 pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {level.lessons.map((lesson, lessonIdx) => (
                          <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: lessonIdx * 0.07, duration: 0.3 }}
                          >
                            <LessonCard
                              lesson={lesson}
                              levelColor={level.color}
                              onClick={() => onSelectLesson(level, lesson)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        );
      })}

      {/* Bottom decoration */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2 text-xs text-[#1E1A16]/30">
          <div className="w-8 h-px bg-[#1E1A16]/15" />
          <span>Complete all levels for B2 mastery</span>
          <div className="w-8 h-px bg-[#1E1A16]/15" />
        </div>
      </div>
    </div>
  );
}
