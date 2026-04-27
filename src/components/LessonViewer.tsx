import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, BookMarked, Dumbbell, Mic, BookOpen, Clock } from "lucide-react";
import { Level, Lesson } from "@/data/curriculum";
import { PronunciationPlayer } from "./PronunciationPlayer";
import { ExerciseModule } from "./ExerciseModule";

interface LessonViewerProps {
  level: Level;
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
  onToggleSidebar: () => void;
}

export function LessonViewer({
  level,
  lesson,
  onClose,
  onComplete,
  onToggleSidebar,
}: LessonViewerProps) {
  const [view, setView] = useState<"lesson" | "exercises">("lesson");

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-40 flex"
    >
      {/* Backdrop (click to close) */}
      <div
        className="flex-1 bg-black/30 hidden lg:block"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="w-full lg:w-[680px] xl:w-[720px] bg-[#F5EFE0] flex flex-col h-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className="shrink-0 border-b border-[#1E1A16]/8 px-6 py-4"
          style={{ borderTopWidth: 3, borderTopColor: level.color }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-[#1E1A16]/50 mb-3">
            <span
              className="font-bold px-1.5 py-0.5 rounded text-white text-xs"
              style={{ backgroundColor: level.color }}
            >
              {level.code}
            </span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1E1A16]/60">{level.title}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-medium text-[#1E1A16]">{lesson.title}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Type badge */}
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full mb-2 ${
                  lesson.type === "pronunciation"
                    ? "bg-purple-50 text-purple-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {lesson.type === "pronunciation" ? (
                  <Mic className="w-3 h-3" />
                ) : (
                  <BookOpen className="w-3 h-3" />
                )}
                {lesson.type === "pronunciation" ? "Pronunciation" : "Grammar"}
              </span>

              <h1
                className="text-2xl font-bold text-[#1E1A16] leading-tight"
                style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
              >
                {lesson.title}
              </h1>

              <div className="flex items-center gap-1.5 mt-1 text-xs text-[#1E1A16]/45">
                <Clock className="w-3 h-3" />
                <span>{lesson.estimatedMinutes} min</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Grammar sidebar toggle */}
              <button
                onClick={onToggleSidebar}
                className="flex items-center gap-1.5 text-xs text-[#8B1A1A] bg-[#8B1A1A]/8 hover:bg-[#8B1A1A]/15 border border-[#8B1A1A]/20 px-3 py-1.5 rounded-lg transition-colors"
                title="Open Grammar Reference"
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grammar</span>
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1E1A16]/8 transition-colors"
              >
                <X className="w-4 h-4 text-[#1E1A16]/60" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="shrink-0 flex border-b border-[#1E1A16]/8 px-6">
          {[
            { key: "lesson", label: "Lesson", icon: BookOpen },
            { key: "exercises", label: "Practice", icon: Dumbbell },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setView(key as "lesson" | "exercises")}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                view === key
                  ? "text-[#8B1A1A] border-[#8B1A1A]"
                  : "text-[#1E1A16]/50 border-transparent hover:text-[#1E1A16]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {view === "lesson" ? (
              <motion.div
                key="lesson"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-6 py-6 space-y-8"
              >
                {lesson.sections.map((section, idx) => (
                  <div key={idx}>
                    <h2
                      className="text-lg font-bold text-[#1E1A16] mb-3"
                      style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
                    >
                      {section.title}
                    </h2>

                    <p className="text-sm text-[#1E1A16]/80 leading-relaxed mb-5">
                      {section.content}
                    </p>

                    {section.examples && section.examples.length > 0 && (
                      <div className="space-y-3">
                        {section.examples.map((example, eIdx) => (
                          <div
                            key={eIdx}
                            className="border border-[#1E1A16]/8 rounded-xl overflow-hidden bg-white/60"
                          >
                            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
                              <PronunciationPlayer
                                text={example.romanian}
                                phonetic={example.phonetic}
                                size="sm"
                              />
                              <div className="sm:ml-auto">
                                <span className="text-xs text-[#1E1A16]/50 italic">
                                  {example.english}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Section divider */}
                    {idx < lesson.sections.length - 1 && (
                      <div className="mt-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-[#1E1A16]/8" />
                        <svg width="16" height="8" viewBox="0 0 16 8" className="text-[#8B1A1A]/20">
                          <path d="M0 4 L3 1 L6 4 L9 1 L12 4 L15 1" stroke="currentColor" strokeWidth="1" fill="none" />
                        </svg>
                        <div className="flex-1 h-px bg-[#1E1A16]/8" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Practice Now CTA */}
                <div className="pt-4 pb-8">
                  <div className="bg-gradient-to-br from-[#8B1A1A]/5 to-[#C9922A]/5 border border-[#8B1A1A]/15 rounded-2xl p-5 text-center">
                    <p className="text-sm text-[#1E1A16]/60 mb-1">Ready to test your knowledge?</p>
                    <h3
                      className="text-lg font-bold text-[#1E1A16] mb-4"
                      style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
                    >
                      {lesson.exercises.length} practice exercises
                    </h3>
                    <button
                      onClick={() => setView("exercises")}
                      className="inline-flex items-center gap-2 bg-[#8B1A1A] text-[#F5EFE0] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#6d1515] transition-colors shadow-md hover:shadow-lg"
                    >
                      <Dumbbell className="w-4 h-4" />
                      Practice Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="exercises"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-6 py-6"
              >
                <ExerciseModule
                  exercises={lesson.exercises}
                  onComplete={() => {
                    onComplete();
                    onClose();
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
