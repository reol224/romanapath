import { useState, useCallback } from "react";
import { curriculum as initialCurriculum, Level } from "@/data/curriculum";

export function useProgress() {
  const [levels, setLevels] = useState<Level[]>(() => {
    const saved = localStorage.getItem("romanap-progress");
    if (saved) {
      try {
        return JSON.parse(saved);
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
