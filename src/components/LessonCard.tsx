import { Clock, CheckCircle2, Mic, BookOpen } from "lucide-react";
import { Lesson } from "@/data/curriculum";

interface LessonCardProps {
  lesson: Lesson;
  levelColor: string;
  onClick: () => void;
}

export function LessonCard({ lesson, levelColor, onClick }: LessonCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left group relative bg-white border rounded-xl p-4 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 ${
        lesson.completed
          ? "border-green-200 bg-green-50/50"
          : "border-[#1E1A16]/10 hover:border-current"
      }`}
      style={!lesson.completed ? { "--tw-ring-color": levelColor } as React.CSSProperties : undefined}
    >
      {/* Left accent border */}
      <div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full transition-all duration-200 group-hover:top-0 group-hover:bottom-0"
        style={{ backgroundColor: lesson.completed ? "#22c55e" : levelColor }}
      />

      <div className="pl-3">
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
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

          {lesson.completed && (
            <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />
          )}
        </div>

        {/* Title */}
        <h3
          className="font-semibold text-[#1E1A16] text-sm leading-snug mb-2 group-hover:text-[#8B1A1A] transition-colors"
          style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
        >
          {lesson.title}
        </h3>

        {/* Footer */}
        <div className="flex items-center gap-1 text-xs text-[#1E1A16]/45">
          <Clock className="w-3 h-3" />
          <span>{lesson.estimatedMinutes} min</span>
        </div>
      </div>
    </button>
  );
}
