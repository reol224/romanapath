import { useState, useCallback } from "react";
import { curriculum as initialCurriculum, Level } from "@/data/curriculum";

// Bump this version whenever the curriculum structure changes significantly
const CURRICULUM_VERSION = "v2-15lessons";

export function useProgress() {
  const [levels, setLevels] = useState<Level[]>(() => {
    const savedVersion = localStorage.getItem("romanap-curriculum-version");
    if (savedVersion !== CURRICULUM_VERSION) {
      // Curriculum updated — clear old progress and use fresh data
      localStorage.removeItem("romanap-progress");
      localStorage.setItem("romanap-curriculum-version", CURRICULUM_VERSION);
      return initialCurriculum;
    }
    const saved = localStorage.getItem("romanap-progress");
    if (saved) {
      try {
        const parsed: Level[] = JSON.parse(saved);
        // Ensure lesson count matches (safety check)
        const a1 = parsed.find(l => l.id === "a1");
        const a1Current = initialCurriculum.find(l => l.id === "a1");
        if (a1 && a1Current && a1.lessons.length !== a1Current.lessons.length) {
          localStorage.removeItem("romanap-progress");
          return initialCurriculum;
        }
        return parsed;
      } catch {
        return initialCurriculum;
      }
    }
    return initialCurriculum;
  });

  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("romanap-streak") || "3", 10);
  });

  const saveProgress = useCallback((newLevels: Level[]) => {
    localStorage.setItem("romanap-progress", JSON.stringify(newLevels));
    setLevels(newLevels);
  }, []);

  const markLessonComplete = useCallback((levelId: string, lessonId: string) => {
    setLevels(prev => {
      const updated = prev.map(level => {
        if (level.id !== levelId) return level;
        const updatedLessons = level.lessons.map(lesson =>
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        );
        return { ...level, lessons: updatedLessons };
      });

      // Check if all lessons in level completed → unlock next
      const levelIndex = updated.findIndex(l => l.id === levelId);
      if (levelIndex >= 0) {
        const level = updated[levelIndex];
        const allDone = level.lessons.every(l => l.completed);
        if (allDone && levelIndex + 1 < updated.length) {
          updated[levelIndex + 1] = { ...updated[levelIndex + 1], unlocked: true };
        }
      }

      localStorage.setItem("romanap-progress", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getTotalProgress = useCallback(() => {
    const total = levels.reduce((acc, l) => acc + l.lessons.length, 0);
    const completed = levels.reduce(
      (acc, l) => acc + l.lessons.filter(lesson => lesson.completed).length,
      0
    );
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [levels]);

  const getCurrentLevel = useCallback(() => {
    for (const level of levels) {
      if (level.unlocked) {
        const hasIncomplete = level.lessons.some(l => !l.completed);
        if (hasIncomplete) return level;
      }
    }
    return levels[0];
  }, [levels]);

  return {
    levels,
    streak,
    markLessonComplete,
    getTotalProgress,
    getCurrentLevel,
    saveProgress,
  };
}
