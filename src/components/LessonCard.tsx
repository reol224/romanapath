import { Clock, CheckCircle2, Mic, BookOpen } from "lucide-react";
import { Lesson } from "@/data/curriculum";

interface LessonCardProps {
  lesson: Lesson;
  levelColor: string;
  onClick: () => void;
}

export function LessonCard({ lesson, levelColor, onClick }: LessonCardProps) {
  const isPronunciation = lesson.type === "pronunciation";

  return (
    <button
      onClick={onClick}
      className="w-full text-left group relative bg-white rounded-2xl p-4 transition-all duration-150 focus:outline-none active:scale-[0.98]"
      style={{
        border: `2px solid ${lesson.completed ? "#58CC02" : "#e5e7eb"}`,
        boxShadow: lesson.completed
          ? "0 4px 0 #49A800"
          : "0 4px 0 #d1d5db",
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon bubble */}
        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: lesson.completed ? "#D7FFB8" : isPronunciation ? "#EDE9FE" : "#DBEAFE",
          }}
        >
          {lesson.completed ? (
            <CheckCircle2 className="w-5 h-5 text-[#58CC02]" />
          ) : isPronunciation ? (
            <Mic className="w-5 h-5 text-violet-600" />
          ) : (
            <BookOpen className="w-5 h-5 text-blue-600" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Type badge */}
          <span
            className={`inline-block text-xs font-black px-2 py-0.5 rounded-full mb-1 ${
              lesson.completed
                ? "bg-[#D7FFB8] text-[#3a8a00]"
                : isPronunciation
                ? "bg-violet-100 text-violet-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {isPronunciation ? "Pronunciation" : "Grammar"}
          </span>

          {/* Title */}
          <h3 className="font-black text-gray-800 text-sm leading-snug mb-1.5 group-hover:text-gray-600 transition-colors">
            {lesson.title}
          </h3>

          {/* Footer */}
          <div className="flex items-center gap-1 text-xs text-gray-400 font-bold">
            <Clock className="w-3 h-3" />
            <span>{lesson.estimatedMinutes} min</span>
          </div>
        </div>
      </div>
    </button>
  );
}

