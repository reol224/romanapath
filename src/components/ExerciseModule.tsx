import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Trophy, Zap } from "lucide-react";
import { Exercise } from "@/data/curriculum";
import { PronunciationPlayer } from "./PronunciationPlayer";

interface ExerciseModuleProps {
  exercises: Exercise[];
  onComplete: () => void;
}

export function ExerciseModule({ exercises, onComplete }: ExerciseModuleProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [fillValue, setFillValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const exercise = exercises[currentIdx];

  const handleSubmit = () => {
    if (submitted) return;

    let answer = "";
    if (exercise.type === "multiple-choice") {
      answer = selected || "";
    } else if (exercise.type === "fill-blank") {
      answer = fillValue.trim().toLowerCase();
    }

    const correct = answer.toLowerCase() === exercise.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= exercises.length) {
      setAllDone(true);
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setFillValue("");
      setSubmitted(false);
      setIsCorrect(false);
    }
  };

  const canSubmit =
    (exercise?.type === "multiple-choice" && selected !== null) ||
    (exercise?.type === "fill-blank" && fillValue.trim().length > 0);

  if (allDone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-300">
          <Trophy className="w-10 h-10 text-yellow-500" />
        </div>
        <h3 className="text-2xl font-black text-gray-800 mb-1 tracking-tight">
          Lesson Complete!
        </h3>
        <p className="text-gray-500 font-bold mb-2">
          {correctCount} of {exercises.length} correct
        </p>
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {exercises.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border-2 ${
                i < correctCount
                  ? "bg-[#58CC02] border-[#49A800]"
                  : "bg-red-400 border-red-500"
              }`}
            />
          ))}
        </div>
        <button
          onClick={onComplete}
          className="inline-flex items-center gap-2 text-white px-8 py-3 rounded-2xl font-black text-sm active:scale-[0.97] transition-transform"
          style={{ backgroundColor: "#58CC02", boxShadow: "0 4px 0 #49A800" }}
        >
          <Zap className="w-4 h-4" />
          Mark Lesson Complete
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progress bar (Duolingo style) */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
          <motion.div
            className="h-full rounded-full bg-[#58CC02]"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIdx / exercises.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-black text-gray-400">
          {currentIdx + 1}/{exercises.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Exercise type badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-black text-[#1CB0F6] bg-[#C5EEFF] px-3 py-1 rounded-full uppercase tracking-wide">
              {exercise.type === "fill-blank"
                ? "Fill in the Blank"
                : exercise.type === "multiple-choice"
                ? "Multiple Choice"
                : "Audio Match"}
            </span>
          </div>

          {/* Question */}
          <h3 className="text-lg font-black text-gray-800 mb-5 leading-snug tracking-tight">
            {exercise.question}
          </h3>

          {/* Multiple choice */}
          {exercise.type === "multiple-choice" && exercise.options && (
            <div className="grid gap-3">
              {exercise.options.map((option) => {
                const isSelected = selected === option.id;
                const showCorrect = submitted && option.id === exercise.correctAnswer;
                const showWrong = submitted && isSelected && !isCorrect;

                return (
                  <button
                    key={option.id}
                    onClick={() => !submitted && setSelected(option.id)}
                    disabled={submitted}
                    className="w-full text-left px-4 py-3.5 rounded-2xl border-2 text-sm font-bold transition-all duration-150 active:scale-[0.98]"
                    style={{
                      backgroundColor: showCorrect
                        ? "#D7FFB8"
                        : showWrong
                        ? "#FFD6D6"
                        : isSelected
                        ? "#C5EEFF"
                        : "white",
                      borderColor: showCorrect
                        ? "#49A800"
                        : showWrong
                        ? "#e53e3e"
                        : isSelected
                        ? "#1CB0F6"
                        : "#e5e7eb",
                      boxShadow: showCorrect
                        ? "0 3px 0 #49A800"
                        : showWrong
                        ? "0 3px 0 #c53030"
                        : isSelected
                        ? "0 3px 0 #0A92D0"
                        : "0 3px 0 #d1d5db",
                      color: showCorrect
                        ? "#3a8a00"
                        : showWrong
                        ? "#c53030"
                        : isSelected
                        ? "#0077b6"
                        : "#374151",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-7 h-7 rounded-xl border-2 text-xs flex items-center justify-center font-black shrink-0"
                        style={{
                          borderColor: showCorrect
                            ? "#49A800"
                            : showWrong
                            ? "#e53e3e"
                            : isSelected
                            ? "#1CB0F6"
                            : "#d1d5db",
                          backgroundColor: showCorrect
                            ? "#49A800"
                            : showWrong
                            ? "#e53e3e"
                            : isSelected
                            ? "#1CB0F6"
                            : "transparent",
                          color: (showCorrect || showWrong || isSelected) ? "white" : "#9ca3af",
                        }}
                      >
                        {option.id.toUpperCase()}
                      </span>
                      {option.text}
                      {showCorrect && <CheckCircle2 className="w-4 h-4 text-[#49A800] ml-auto" />}
                      {showWrong && <XCircle className="w-4 h-4 text-red-500 ml-auto" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Fill in the blank */}
          {exercise.type === "fill-blank" && (
            <div className="space-y-4">
              {exercise.blankSentence && (
                <div
                  className="text-base text-center p-4 bg-gray-50 rounded-2xl border-2 border-gray-200 font-mono font-bold text-gray-700"
                >
                  {exercise.blankSentence}
                </div>
              )}
              <input
                type="text"
                value={fillValue}
                onChange={(e) => !submitted && setFillValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canSubmit && !submitted && handleSubmit()}
                disabled={submitted}
                placeholder="Type your answer..."
                className="w-full px-4 py-3.5 rounded-2xl border-2 text-sm font-bold outline-none transition-all"
                style={{
                  borderColor: submitted
                    ? isCorrect ? "#49A800" : "#e53e3e"
                    : "#e5e7eb",
                  backgroundColor: submitted
                    ? isCorrect ? "#D7FFB8" : "#FFD6D6"
                    : "white",
                  color: submitted
                    ? isCorrect ? "#3a8a00" : "#c53030"
                    : "#374151",
                  boxShadow: submitted
                    ? isCorrect ? "0 3px 0 #49A800" : "0 3px 0 #c53030"
                    : "0 3px 0 #d1d5db",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              />
            </div>
          )}

          {/* Feedback banner */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 rounded-2xl border-2"
                style={{
                  backgroundColor: isCorrect ? "#D7FFB8" : "#FFD6D6",
                  borderColor: isCorrect ? "#49A800" : "#e53e3e",
                }}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-[#49A800] mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p
                      className="text-sm font-black mb-1"
                      style={{ color: isCorrect ? "#3a8a00" : "#c53030" }}
                    >
                      {isCorrect ? "Correct! 🎉" : `Correct answer: ${exercise.correctAnswer}`}
                    </p>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      {exercise.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit / Next */}
          <div className="mt-6 flex justify-end">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex items-center gap-2 px-7 py-3 rounded-2xl text-sm font-black transition-all active:scale-[0.97]"
                style={
                  canSubmit
                    ? { backgroundColor: "#58CC02", color: "white", boxShadow: "0 4px 0 #49A800" }
                    : { backgroundColor: "#e5e7eb", color: "#9ca3af", cursor: "not-allowed" }
                }
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-7 py-3 rounded-2xl text-sm font-black text-white active:scale-[0.97] transition-transform"
                style={{ backgroundColor: "#58CC02", boxShadow: "0 4px 0 #49A800" }}
              >
                {currentIdx + 1 >= exercises.length ? "Finish" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

