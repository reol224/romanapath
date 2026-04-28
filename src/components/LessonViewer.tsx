import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, BookMarked, Dumbbell, Mic, BookOpen, Clock, Zap } from "lucide-react";
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

const duoColors: Record<string, { main: string; light: string; shadow: string }> = {
  a1: { main: "#58CC02", light: "#D7FFB8", shadow: "#49A800" },
  a2: { main: "#FF9600", light: "#FFE0B2", shadow: "#CC7800" },
  b1: { main: "#1CB0F6", light: "#C5EEFF", shadow: "#0A92D0" },
  b2: { main: "#CE82FF", light: "#F0D9FF", shadow: "#A855F7" },
};

export function LessonViewer({
  level,
  lesson,
  onClose,
  onComplete,
  onToggleSidebar,
}: LessonViewerProps) {
  const [view, setView] = useState<"lesson" | "exercises">("lesson");
  const colors = duoColors[level.id] ?? duoColors.a1;
  const isPronunciation = lesson.type === "pronunciation";

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-40 flex"
    >
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/40 hidden lg:block"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="w-full lg:w-[680px] xl:w-[720px] bg-white flex flex-col h-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className="shrink-0 px-6 py-4 border-b-2 border-gray-100"
          style={{ backgroundColor: colors.light }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 font-bold">
            <span
              className="font-black px-2 py-0.5 rounded-lg text-white text-xs"
              style={{ backgroundColor: colors.main }}
            >
              {level.code}
            </span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-500">{level.title}</span>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="font-black text-gray-700">{lesson.title}</span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Type badge */}
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full mb-2 ${
                  isPronunciation
                    ? "bg-violet-100 text-violet-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {isPronunciation ? (
                  <Mic className="w-3 h-3" />
                ) : (
                  <BookOpen className="w-3 h-3" />
                )}
                {isPronunciation ? "Pronunciation" : "Grammar"}
              </span>

              <h1 className="text-2xl font-black text-gray-800 leading-tight tracking-tight">
                {lesson.title}
              </h1>

              <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400 font-bold">
                <Clock className="w-3 h-3" />
                <span>{lesson.estimatedMinutes} min</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Grammar sidebar toggle */}
              <button
                onClick={onToggleSidebar}
                className="flex items-center gap-1.5 text-xs font-black text-gray-600 bg-white hover:bg-gray-50 border-2 border-gray-200 px-3 py-1.5 rounded-xl transition-colors"
                style={{ boxShadow: "0 3px 0 #d1d5db" }}
                title="Open Grammar Reference"
              >
                <BookMarked className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grammar</span>
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/70 transition-colors border-2 border-gray-200 bg-white"
                style={{ boxShadow: "0 3px 0 #d1d5db" }}
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab switcher — Duolingo style */}
        <div className="shrink-0 flex border-b-2 border-gray-100 px-6 bg-white">
          {[
            { key: "lesson", label: "Lesson", icon: BookOpen },
            { key: "exercises", label: "Practice", icon: Dumbbell },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setView(key as "lesson" | "exercises")}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-black border-b-4 transition-all -mb-0.5 ${
                view === key
                  ? "border-current"
                  : "text-gray-400 border-transparent hover:text-gray-600"
              }`}
              style={view === key ? { color: colors.main, borderColor: colors.main } : undefined}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <AnimatePresence mode="wait">
            {view === "lesson" ? (
              <motion.div
                key="lesson"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="px-6 py-6 space-y-6"
              >
                {lesson.sections.map((section, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border-2 border-gray-100 p-5" style={{ boxShadow: "0 2px 0 #e5e7eb" }}>
                    <h2 className="text-base font-black text-gray-800 mb-2 tracking-tight">
                      {section.title}
                    </h2>

                    <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                      {section.content}
                    </p>

                    {section.examples && section.examples.length > 0 && (
                      <div className="space-y-2">
                        {section.examples.map((example, eIdx) => (
                          <div
                            key={eIdx}
                            className="border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50"
                          >
                            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
                              <PronunciationPlayer
                                text={example.romanian}
                                phonetic={example.phonetic}
                                size="sm"
                              />
                              <div className="sm:ml-auto">
                                <span className="text-xs text-gray-400 font-bold italic">
                                  {example.english}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Practice CTA */}
                <div className="pt-2 pb-8">
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 text-center" style={{ boxShadow: "0 2px 0 #e5e7eb" }}>
                    <p className="text-sm text-gray-500 font-bold mb-1">Ready to test yourself?</p>
                    <h3 className="text-lg font-black text-gray-800 mb-4 tracking-tight">
                      {lesson.exercises.length} practice exercises
                    </h3>
                    <button
                      onClick={() => setView("exercises")}
                      className="inline-flex items-center gap-2 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all active:scale-[0.98]"
                      style={{
                        backgroundColor: colors.main,
                        boxShadow: `0 4px 0 ${colors.shadow}`,
                      }}
                    >
                      <Zap className="w-4 h-4" />
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
                transition={{ duration: 0.15 }}
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

