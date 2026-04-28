import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Star, ChevronDown, ChevronUp, CheckCircle2, Trophy, Eye, EyeOff } from "lucide-react";
import { Level, Lesson } from "@/data/curriculum";
import { LessonCard } from "./LessonCard";

interface LevelPathProps {
  levels: Level[];
  expandedLevel: string | null;
  onToggleLevel: (levelId: string) => void;
  onSelectLesson: (level: Level, lesson: Lesson) => void;
}

const duoColors: Record<string, { main: string; light: string; shadow: string; text: string }> = {
  a1: { main: "#58CC02", light: "#D7FFB8", shadow: "#49A800", text: "#3a8a00" },
  a2: { main: "#FF9600", light: "#FFE0B2", shadow: "#CC7800", text: "#a65e00" },
  b1: { main: "#1CB0F6", light: "#C5EEFF", shadow: "#0A92D0", text: "#0077b6" },
  b2: { main: "#CE82FF", light: "#F0D9FF", shadow: "#A855F7", text: "#7c3aed" },
};

export function LevelPath({ levels, expandedLevel, onToggleLevel, onSelectLesson }: LevelPathProps) {
  const [previewLevel, setPreviewLevel] = React.useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#58CC02] bg-[#D7FFB8] border-2 border-[#58CC02]/30 rounded-full px-4 py-1.5 mb-4">
          <Star className="w-3.5 h-3.5 fill-[#58CC02]" />
          Learning Path
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-3 tracking-tight">
          Your Romanian Journey
        </h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm font-medium leading-relaxed">
          A structured path from beginner to upper intermediate. Complete each level to unlock the next.
        </p>
      </div>

      {/* Path */}
      <div className="space-y-3">
        {levels.map((level, idx) => {
          const colors = duoColors[level.id] ?? duoColors.a1;
          const isExpanded = expandedLevel === level.id;
          const isPreviewing = previewLevel === level.id;
          const completedCount = level.lessons.filter(l => l.completed).length;
          const totalCount = level.lessons.length;
          const levelProgress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
          const isCompleted = completedCount === totalCount && totalCount > 0;

          return (
            <div key={level.id}>
              {/* Connector dot */}
              {idx > 0 && (
                <div className="flex justify-center my-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${levels[idx-1].unlocked ? 'bg-gray-300' : 'bg-gray-200'}`} />
                    <div className={`w-1.5 h-1.5 rounded-full ${levels[idx-1].unlocked ? 'bg-gray-300' : 'bg-gray-200'}`} />
                    <div className={`w-1.5 h-1.5 rounded-full ${levels[idx-1].unlocked ? 'bg-gray-300' : 'bg-gray-200'}`} />
                  </div>
                </div>
              )}

              {/* Level card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <div
                  className={`rounded-3xl border-2 overflow-hidden transition-all duration-200 ${
                    level.unlocked
                      ? "cursor-pointer"
                      : "opacity-60 cursor-not-allowed"
                  }`}
                  style={{
                    borderColor: level.unlocked ? colors.main : "#e5e7eb",
                    backgroundColor: isExpanded ? colors.light : "white",
                    boxShadow: level.unlocked ? `0 4px 0 ${colors.shadow}` : "0 4px 0 #d1d5db",
                  }}
                  onClick={() => level.unlocked && onToggleLevel(level.id)}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-4">
                      {/* Level icon node */}
                      <div className="relative shrink-0">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl text-white"
                          style={{
                            backgroundColor: level.unlocked ? colors.main : "#9ca3af",
                            boxShadow: level.unlocked ? `0 4px 0 ${colors.shadow}` : "0 4px 0 #6b7280",
                          }}
                        >
                          {isCompleted ? (
                            <Trophy className="w-7 h-7 text-white" />
                          ) : !level.unlocked ? (
                            <Lock className="w-7 h-7 text-white" />
                          ) : (
                            <span>{level.code}</span>
                          )}
                        </div>
                        {isCompleted && (
                          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                            <Star className="w-3 h-3 text-white fill-white" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-black text-gray-800 text-lg leading-tight tracking-tight">
                          {level.title}
                        </h2>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed mt-0.5 mb-3">
                          {level.description}
                        </p>

                        {/* Progress bar (Duolingo XP-style) */}
                        {level.unlocked && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: colors.main }}
                                initial={{ width: 0 }}
                                animate={{ width: `${levelProgress}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-xs font-black whitespace-nowrap" style={{ color: colors.text }}>
                              {completedCount}/{totalCount}
                            </span>
                          </div>
                        )}

                        {!level.unlocked && (
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400 font-bold">
                              🔒 Complete previous level to unlock
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewLevel(isPreviewing ? null : level.id);
                              }}
                              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all duration-150 hover:scale-105 active:scale-95"
                              style={{
                                borderColor: colors.main,
                                color: colors.text,
                                backgroundColor: isPreviewing ? colors.light : "white",
                              }}
                              title={isPreviewing ? "Hide lessons" : "Preview lessons"}
                            >
                              {isPreviewing ? (
                                <><EyeOff className="w-3.5 h-3.5" /> Hide</>
                              ) : (
                                <><Eye className="w-3.5 h-3.5" /> Preview</>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Expand toggle */}
                      {level.unlocked && (
                        <div
                          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: colors.light }}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" style={{ color: colors.shadow }} />
                          ) : (
                            <ChevronDown className="w-5 h-5" style={{ color: colors.shadow }} />
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
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-5 pb-5 pt-3 border-t"
                          style={{ borderColor: `${colors.main}33` }}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {level.lessons.map((lesson, lessonIdx) => (
                              <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: lessonIdx * 0.06, duration: 0.25 }}
                              >
                                <LessonCard
                                  lesson={lesson}
                                  levelColor={colors.main}
                                  onClick={() => onSelectLesson(level, lesson)}
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Preview cards for locked levels */}
                  <AnimatePresence>
                    {isPreviewing && !level.unlocked && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className="px-5 pb-5 pt-3 border-t"
                          style={{ borderColor: "#e5e7eb" }}
                        >
                          <p className="text-xs font-bold text-gray-400 mb-3 flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            Preview only — unlock to start learning
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {level.lessons.map((lesson, lessonIdx) => (
                              <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: lessonIdx * 0.06, duration: 0.25 }}
                                className="relative"
                              >
                                <div className="opacity-50 pointer-events-none select-none">
                                  <LessonCard
                                    lesson={lesson}
                                    levelColor={colors.main}
                                    onClick={() => {}}
                                  />
                                </div>
                                {/* Lock overlay */}
                                <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                                  <div className="bg-white/80 rounded-full p-1.5 shadow-sm">
                                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-400 font-bold">Complete all levels for B2 mastery 🏆</p>
      </div>
    </div>
  );
}

