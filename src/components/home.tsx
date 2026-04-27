import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { BookMarked, Wrench } from "lucide-react";
import { Level, Lesson } from "@/data/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { ProgressHeader } from "./ProgressHeader";
import { LevelPath } from "./LevelPath";
import { LessonViewer } from "./LessonViewer";
import { GrammarSidebar } from "./GrammarSidebar";
import { ToolsHub } from "./ToolsHub";
import type { BadgeStats } from "@/data/extras";

export default function Home() {
  const { levels, streak, markLessonComplete, getTotalProgress, getCurrentLevel } = useProgress();
  const [expandedLevel, setExpandedLevel] = useState<string | null>("a1");
  const [activeLesson, setActiveLesson] = useState<{ level: Level; lesson: Lesson } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toolsHubOpen, setToolsHubOpen] = useState(false);

  // Badge stats tracking
  const [flashcardsReviewed, setFlashcardsReviewed] = useState(() =>
    parseInt(localStorage.getItem("romanap-flashcards") || "0", 10)
  );
  const [tongueTwistersCompleted, setTongueTwistersCompleted] = useState(() =>
    parseInt(localStorage.getItem("romanap-twisters") || "0", 10)
  );
  const [diacriticsCorrect, setDiacriticsCorrect] = useState(() =>
    parseInt(localStorage.getItem("romanap-diacritics") || "0", 10)
  );
  const [verbsDrilled, setVerbsDrilled] = useState(() =>
    parseInt(localStorage.getItem("romanap-verbs") || "0", 10)
  );

  const completedLessons = levels.reduce((acc, l) => acc + l.lessons.filter(ls => ls.completed).length, 0);
  const completedLevels = levels.filter(l => l.lessons.every(ls => ls.completed) && l.lessons.length > 0).length;

  const badgeStats: BadgeStats = {
    completedLessons,
    completedLevels,
    streak,
    flashcardsReviewed,
    tongueTwistersCompleted,
    diacriticsCorrect,
    verbsdrilled: verbsDrilled,
  };

  const handleToggleLevel = (levelId: string) => {
    setExpandedLevel(prev => (prev === levelId ? null : levelId));
  };

  const handleSelectLesson = (level: Level, lesson: Lesson) => {
    setActiveLesson({ level, lesson });
  };

  const handleLessonComplete = () => {
    if (!activeLesson) return;
    const { level, lesson } = activeLesson;
    markLessonComplete(level.id, lesson.id);

    const levelIdx = levels.findIndex(l => l.id === level.id);
    const currentLevelData = levels[levelIdx];
    const allDone = currentLevelData?.lessons
      .filter(l => l.id !== lesson.id)
      .every(l => l.completed) ?? false;

    if (allDone && levelIdx + 1 < levels.length) {
      setTimeout(() => {
        toast.success(`🎉 ${levels[levelIdx + 1].code} Unlocked!`, {
          description: `You've completed ${level.code} — ${levels[levelIdx + 1].title} is now available.`,
          duration: 5000,
        });
      }, 400);
    } else {
      toast.success("Lesson Complete! ✓", {
        description: `${lesson.title} marked as done.`,
        duration: 3000,
      });
    }
  };

  const currentLevel = getCurrentLevel();
  const totalProgress = getTotalProgress();

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#F5EFE0" }}
    >
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Progress Header */}
      <div className="relative z-10">
        <ProgressHeader
          currentLevel={currentLevel}
          streak={streak}
          totalProgress={totalProgress}
        />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <LevelPath
          levels={levels}
          expandedLevel={expandedLevel}
          onToggleLevel={handleToggleLevel}
          onSelectLesson={handleSelectLesson}
        />
      </main>

      {/* Lesson Viewer */}
      <AnimatePresence>
        {activeLesson && (
          <LessonViewer
            level={activeLesson.level}
            lesson={activeLesson.lesson}
            onClose={() => setActiveLesson(null)}
            onComplete={handleLessonComplete}
            onToggleSidebar={() => setSidebarOpen(s => !s)}
          />
        )}
      </AnimatePresence>

      {/* Grammar Sidebar */}
      <GrammarSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Tools Hub */}
      <ToolsHub
        isOpen={toolsHubOpen}
        onClose={() => setToolsHubOpen(false)}
        stats={badgeStats}
        onFlashcardReviewed={() => {
          setFlashcardsReviewed(n => { const v = n + 1; localStorage.setItem("romanap-flashcards", String(v)); return v; });
        }}
        onDiacriticsCorrect={() => {
          setDiacriticsCorrect(n => { const v = n + 1; localStorage.setItem("romanap-diacritics", String(v)); return v; });
        }}
        onTongueTwisterComplete={() => {
          setTongueTwistersCompleted(n => { const v = n + 1; localStorage.setItem("romanap-twisters", String(v)); return v; });
        }}
        onVerbDrilled={() => {
          setVerbsDrilled(n => { const v = n + 1; localStorage.setItem("romanap-verbs", String(v)); return v; });
        }}
      />

      {/* Persistent sidebar toggle tab */}
      <button
        onClick={() => setSidebarOpen(s => !s)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-[#8B1A1A] text-[#F5EFE0] px-2 py-4 rounded-l-xl shadow-lg hover:bg-[#6d1515] transition-colors"
        title="Grammar Reference"
      >
        <div className="flex flex-col items-center gap-1.5">
          <BookMarked className="w-4 h-4" />
          <span
            className="text-xs font-medium tracking-wide"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            Grammar
          </span>
        </div>
      </button>

      {/* Tools Hub floating button */}
      <button
        onClick={() => setToolsHubOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-2xl"
        style={{ backgroundColor: "#1E1A16", color: "#F5EFE0" }}
        title="Learning Tools"
      >
        <Wrench className="w-4 h-4" />
        Learning Tools
      </button>

      {/* Folk-pattern footer */}
      <footer className="relative z-10 py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-[#1E1A16]/10" />
            <svg width="80" height="16" viewBox="0 0 80 16" className="text-[#8B1A1A]/25 shrink-0">
              <path
                d="M0 8 L5 3 L10 8 L15 3 L20 8 L25 3 L30 8 L35 3 L40 8 L45 3 L50 8 L55 3 L60 8 L65 3 L70 8 L75 3 L80 8"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <div className="flex-1 h-px bg-[#1E1A16]/10" />
          </div>
          <p className="text-center text-xs text-[#1E1A16]/35">
            RomânăPath · A1–B2 Romanian Learning · Built for serious learners
          </p>
        </div>
      </footer>
    </div>
  );
}
