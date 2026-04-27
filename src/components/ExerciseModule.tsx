import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Trophy } from "lucide-react";
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
        <div className="w-16 h-16 bg-[#C9922A]/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-[#C9922A]" />
        </div>
        <h3
          className="text-2xl font-bold text-[#1E1A16] mb-2"
          style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
        >
          Exercise Complete!
        </h3>
        <p className="text-[#1E1A16]/60 mb-2">
          {correctCount} of {exercises.length} correct
        </p>
        <div className="flex items-center justify-center gap-1 mb-8">
          {exercises.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < correctCount ? "bg-green-500" : "bg-red-400"
              }`}
            />
          ))}
        </div>
        <button
          onClick={onComplete}
          className="inline-flex items-center gap-2 bg-[#8B1A1A] text-[#F5EFE0] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#6d1515] transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" />
          Mark Lesson Complete
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress dots */}
      <div className="flex items-center gap-2 justify-center">
        {exercises.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIdx
                ? "w-6 bg-[#8B1A1A]"
                : i < currentIdx
                ? "w-3 bg-green-500"
                : "w-3 bg-[#1E1A16]/15"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Exercise type badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-[#8B1A1A] bg-[#8B1A1A]/8 px-2.5 py-1 rounded-full capitalize">
              {exercise.type === "fill-blank"
                ? "Fill in the Blank"
                : exercise.type === "multiple-choice"
                ? "Multiple Choice"
                : "Audio Match"}
            </span>
            <span className="text-xs text-[#1E1A16]/40">
              {currentIdx + 1} / {exercises.length}
            </span>
          </div>

          {/* Question */}
          <h3
            className="text-lg font-semibold text-[#1E1A16] mb-6 leading-snug"
            style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
          >
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
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      showCorrect
                        ? "bg-green-50 border-green-400 text-green-800"
                        : showWrong
                        ? "bg-red-50 border-red-400 text-red-800"
                        : isSelected
                        ? "bg-[#8B1A1A]/8 border-[#8B1A1A] text-[#8B1A1A]"
                        : "bg-white border-[#1E1A16]/12 text-[#1E1A16]/80 hover:border-[#8B1A1A]/40 hover:bg-[#8B1A1A]/3"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full border text-xs flex items-center justify-center font-bold shrink-0 ${
                          showCorrect
                            ? "border-green-400 bg-green-400 text-white"
                            : showWrong
                            ? "border-red-400 bg-red-400 text-white"
                            : isSelected
                            ? "border-[#8B1A1A] bg-[#8B1A1A] text-white"
                            : "border-[#1E1A16]/20 text-[#1E1A16]/40"
                        }`}
                      >
                        {option.id.toUpperCase()}
                      </span>
                      {option.text}
                      {showCorrect && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />}
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
                  className="text-lg text-center p-4 bg-[#1E1A16]/3 rounded-xl border border-[#1E1A16]/8"
                  style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
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
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                  submitted
                    ? isCorrect
                      ? "bg-green-50 border-green-400 text-green-800"
                      : "bg-red-50 border-red-400 text-red-800"
                    : "bg-white border-[#1E1A16]/15 focus:border-[#8B1A1A] text-[#1E1A16]"
                }`}
                style={{ fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}
              />
            </div>
          )}

          {/* Feedback */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-4 p-4 rounded-xl border ${
                  isCorrect
                    ? "bg-green-50 border-green-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p
                      className={`text-sm font-semibold mb-1 ${
                        isCorrect ? "text-green-800" : "text-amber-800"
                      }`}
                    >
                      {isCorrect ? "Correct!" : `Correct answer: ${exercise.correctAnswer}`}
                    </p>
                    <p className="text-xs text-[#1E1A16]/70 leading-relaxed">
                      {exercise.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit / Next button */}
          <div className="mt-6 flex justify-end">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  canSubmit
                    ? "bg-[#8B1A1A] text-[#F5EFE0] hover:bg-[#6d1515] shadow-sm hover:shadow"
                    : "bg-[#1E1A16]/8 text-[#1E1A16]/30 cursor-not-allowed"
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#8B1A1A] text-[#F5EFE0] hover:bg-[#6d1515] transition-colors"
              >
                {currentIdx + 1 >= exercises.length ? "Finish" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
