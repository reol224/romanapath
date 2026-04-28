import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Check, ChevronRight, Shuffle } from "lucide-react";

interface SentenceChallenge {
  id: string;
  english: string;
  words: { id: string; text: string; role: string }[];
  correct: string[];
  hint: string;
  explanation: string;
}

const challenges: SentenceChallenge[] = [
  {
    id: "s1",
    english: "The girl drinks water.",
    words: [
      { id: "w1", text: "Fata", role: "subject" },
      { id: "w2", text: "bea", role: "verb" },
      { id: "w3", text: "apă", role: "object" },
      { id: "w4", text: "mănâncă", role: "distractor" },
    ],
    correct: ["w1", "w2", "w3"],
    hint: "Subject + Verb + Object (SVO)",
    explanation: "Romanian typically follows SVO order. 'Fata' (the girl) + 'bea' (drinks) + 'apă' (water).",
  },
  {
    id: "s2",
    english: "I want to go to Bucharest.",
    words: [
      { id: "w1", text: "Eu", role: "subject" },
      { id: "w2", text: "vreau", role: "verb" },
      { id: "w3", text: "să", role: "particle" },
      { id: "w4", text: "merg", role: "subj-verb" },
      { id: "w5", text: "la", role: "prep" },
      { id: "w6", text: "București", role: "place" },
      { id: "w7", text: "în", role: "distractor" },
    ],
    correct: ["w1", "w2", "w3", "w4", "w5", "w6"],
    hint: "Eu + vreau + să + merg + la + București",
    explanation: "'Vreau să merg' uses the subjunctive — infinitives don't exist in Romanian. 'La' is used before cities.",
  },
  {
    id: "s3",
    english: "Mom's book is on the table.",
    words: [
      { id: "w1", text: "Cartea", role: "subject" },
      { id: "w2", text: "mamei", role: "genitive" },
      { id: "w3", text: "este", role: "verb" },
      { id: "w4", text: "pe", role: "prep" },
      { id: "w5", text: "masă", role: "object" },
      { id: "w6", text: "a", role: "distractor" },
    ],
    correct: ["w1", "w2", "w3", "w4", "w5"],
    hint: "Cartea mamei + este + pe masă",
    explanation: "'Mamei' is the genitive form of 'mama' — no 'of' needed. 'Pe' means 'on'.",
  },
  {
    id: "s4",
    english: "He has already eaten.",
    words: [
      { id: "w1", text: "El", role: "subject" },
      { id: "w2", text: "a", role: "aux" },
      { id: "w3", text: "mâncat", role: "participle" },
      { id: "w4", text: "deja", role: "adverb" },
      { id: "w5", text: "am", role: "distractor" },
    ],
    correct: ["w1", "w2", "w4", "w3"],
    hint: "El + a + deja + mâncat",
    explanation: "In Romanian, adverbs like 'deja' (already) often go between the auxiliary and the participle.",
  },
  {
    id: "s5",
    english: "We speak Romanian a little.",
    words: [
      { id: "w1", text: "Noi", role: "subject" },
      { id: "w2", text: "vorbim", role: "verb" },
      { id: "w3", text: "românește", role: "object" },
      { id: "w4", text: "puțin", role: "adverb" },
      { id: "w5", text: "vorbești", role: "distractor" },
    ],
    correct: ["w1", "w2", "w3", "w4"],
    hint: "Noi + vorbim + românește + puțin",
    explanation: "'Românește' is an adverbial form meaning 'in Romanian / the Romanian way'. 'Puțin' (a little) comes at the end.",
  },
];

const roleColors: Record<string, { color: string; bg: string }> = {
  subject: { color: "#1A3A6B", bg: "#E3EAF9" },
  verb: { color: "#8B1A1A", bg: "#F9E8E8" },
  object: { color: "#2D5A27", bg: "#E8F5E3" },
  particle: { color: "#C9922A", bg: "#FFF3DC" },
  "subj-verb": { color: "#8B1A1A", bg: "#F9E8E8" },
  prep: { color: "#C9922A", bg: "#FFF3DC" },
  place: { color: "#2D5A27", bg: "#E8F5E3" },
  genitive: { color: "#1A3A6B", bg: "#E3EAF9" },
  aux: { color: "#8B1A1A", bg: "#F9E8E8" },
  participle: { color: "#2D5A27", bg: "#E8F5E3" },
  adverb: { color: "#C9922A", bg: "#FFF3DC" },
  distractor: { color: "#1E1A16", bg: "rgba(30,26,22,0.06)" },
};

interface SentenceBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SentenceBuilder({ isOpen, onClose }: SentenceBuilderProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const challenge = challenges[current];
  const shuffledWords = useCallback(
    () => [...challenge.words].sort(() => Math.random() - 0.5),
    [challenge]
  );
  const [wordOrder, setWordOrder] = useState(() => shuffledWords());

  const toggleWord = (wordId: string) => {
    if (submitted) return;
    setSelected(prev =>
      prev.includes(wordId)
        ? prev.filter(id => id !== wordId)
        : [...prev, wordId]
    );
  };

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(selected) === JSON.stringify(challenge.correct);
    setCorrect(isCorrect);
    setSubmitted(true);
    if (isCorrect) setScore(s => s + 1);
  };

  const nextChallenge = () => {
    const next = (current + 1) % challenges.length;
    setCurrent(next);
    setSelected([]);
    setSubmitted(false);
    setCorrect(false);
    setWordOrder([...challenges[next].words].sort(() => Math.random() - 0.5));
  };

  const reset = () => {
    setSelected([]);
    setSubmitted(false);
    setCorrect(false);
    setWordOrder(shuffledWords());
  };

  if (!isOpen) return null;

  const selectedWords = selected.map(id => challenge.words.find(w => w.id === id)!).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 0 #E5E5E5, 0 0 0 2px #E5E5E5" }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "2px solid #F0F0F0" }}>
          <div>
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>🧩 Sentence Builder</h2>
            <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Tap words to build the correct Romanian sentence</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#58CC02" }}>{score}/{challenges.length}</span>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
              <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Progress */}
          <div className="flex gap-1.5 mb-5">
            {challenges.map((_, i) => (
              <div key={i} className="h-2 flex-1 rounded-full" style={{ backgroundColor: i < current ? "#58CC02" : i === current ? "#FF9600" : "#F0F0F0" }} />
            ))}
          </div>

          {/* English prompt */}
          <div className="rounded-2xl p-4 mb-4" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
            <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Translate to Romanian</p>
            <p className="text-xl font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>
              "{challenge.english}"
            </p>
            <p className="text-xs mt-1 font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Hint: {challenge.hint}</p>
          </div>

          {/* Construction area */}
          <div
            className="min-h-[64px] rounded-2xl p-3 mb-4 flex flex-wrap gap-2 items-center"
            style={{
              backgroundColor: submitted ? (correct ? "#E6F9E8" : "#FFECEC") : "white",
              border: submitted ? `2px solid ${correct ? "#58CC02" : "#FF4B4B"}` : "2px dashed #E5E5E5",
            }}
          >
            {selectedWords.length === 0 ? (
              <span className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Tap words below to build the sentence…</span>
            ) : (
              selectedWords.map(word => {
                const rc = roleColors[word.role] || roleColors.distractor;
                return (
                  <motion.button
                    key={word.id}
                    layout
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    onClick={() => toggleWord(word.id)}
                    className="px-3 py-1.5 rounded-full font-black text-sm transition-all"
                    style={{ backgroundColor: rc.bg, color: rc.color, border: `2px solid ${rc.color}`, fontFamily: "Nunito, sans-serif" }}
                  >
                    {word.text}
                  </motion.button>
                );
              })
            )}
          </div>

          {/* Word bank */}
          <div className="flex flex-wrap gap-2 mb-4">
            {wordOrder.filter(w => !selected.includes(w.id)).map(word => {
              return (
                <motion.button
                  key={word.id}
                  layout
                  onClick={() => toggleWord(word.id)}
                  className="px-3 py-1.5 rounded-full font-black text-sm transition-all border-2"
                  style={{
                    backgroundColor: "white",
                    color: "#3C3C3C",
                    borderColor: "#E5E5E5",
                    fontFamily: "Nunito, sans-serif",
                    boxShadow: "0 3px 0 #E5E5E5",
                  }}
                >
                  {word.text}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-4 mb-4"
                style={{
                  backgroundColor: correct ? "#E6F9E8" : "#FFECEC",
                  border: `2px solid ${correct ? "#58CC02" : "#FF4B4B"}`,
                }}
              >
                {correct
                  ? <p className="text-sm font-black mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#58CC02" }}>✓ Correct sentence!</p>
                  : (
                    <div>
                      <p className="text-sm font-black mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#FF4B4B" }}>
                        Correct order:{" "}
                        <span>
                          {challenge.correct.map(id => challenge.words.find(w => w.id === id)?.text).join(" ")}
                        </span>
                      </p>
                    </div>
                  )}
                <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>{challenge.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={reset} className="p-3 rounded-xl transition-all" style={{ border: "2px solid #E5E5E5", boxShadow: "0 3px 0 #E5E5E5" }}>
              <Shuffle className="w-5 h-5" style={{ color: "#AFAFAF" }} />
            </button>
            {!submitted ? (
              <button
                onClick={checkAnswer}
                disabled={selected.length === 0}
                className="flex-1 py-3 rounded-2xl font-black text-sm transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#58CC02", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #46A302" }}
              >
                <Check className="w-4 h-4" /> Check Sentence
              </button>
            ) : (
              <button
                onClick={nextChallenge}
                className="flex-1 py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: "#1CB0F6", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #0A90D0" }}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
