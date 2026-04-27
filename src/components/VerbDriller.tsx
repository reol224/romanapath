import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { verbs, VerbConjugation } from "@/data/extras";

interface VerbDrillerProps {
  isOpen: boolean;
  onClose: () => void;
  onDrilled?: () => void;
}

const PERSONS = ["eu", "tu", "el/ea", "noi", "voi", "ei/ele"] as const;
type Person = typeof PERSONS[number];

const personLabels: Record<Person, string> = {
  eu: "I",
  tu: "you (sg.)",
  "el/ea": "he / she",
  noi: "we",
  voi: "you (pl.)",
  "ei/ele": "they",
};

export function VerbDriller({ isOpen, onClose, onDrilled }: VerbDrillerProps) {
  const [selectedVerb, setSelectedVerb] = useState(0);
  const [selectedTense, setSelectedTense] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizPersonIdx, setQuizPersonIdx] = useState(0);
  const [quizInput, setQuizInput] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [verbOpen, setVerbOpen] = useState(false);

  const verb: VerbConjugation = verbs[selectedVerb];
  const tenses = Object.keys(verb.tenses);
  const activeTense = selectedTense || tenses[0];
  const conjugations = verb.tenses[activeTense];
  const quizPerson = PERSONS[quizPersonIdx];
  const correctAnswer = conjugations[quizPerson];

  const startQuiz = () => {
    setQuizMode(true);
    setQuizPersonIdx(0);
    setQuizInput("");
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizTotal(0);
    onDrilled?.();
  };

  const submitQuiz = () => {
    if (!quizInput.trim() || quizSubmitted) return;
    const correct = quizInput.trim().toLowerCase() === correctAnswer.toLowerCase();
    setQuizSubmitted(true);
    setQuizTotal(t => t + 1);
    if (correct) setQuizScore(s => s + 1);
  };

  const nextQuiz = () => {
    if (quizPersonIdx + 1 >= PERSONS.length) {
      setQuizMode(false);
    } else {
      setQuizPersonIdx(i => i + 1);
      setQuizInput("");
      setQuizSubmitted(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(30,26,22,0.7)", backdropFilter: "blur(4px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "#F5EFE0", border: "1px solid rgba(139,26,26,0.15)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(30,26,22,0.1)" }}>
          <div>
            <h2 className="font-bold text-xl" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16" }}>Verb Conjugation Driller</h2>
            <p className="text-xs mt-0.5" style={{ color: "#1E1A16", opacity: 0.5 }}>All 6 persons, multiple tenses</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-black/5 transition-colors">
            <X className="w-5 h-5" style={{ color: "#1E1A16" }} />
          </button>
        </div>

        <div className="p-6">
          {/* Verb selector */}
          <div className="relative mb-4">
            <button
              onClick={() => setVerbOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 font-semibold transition-all"
              style={{ borderColor: "#8B1A1A", color: "#1E1A16", backgroundColor: "white" }}
            >
              <span>
                <span style={{ fontFamily: "Fraunces, serif", color: "#8B1A1A" }}>{verb.infinitive}</span>
                <span className="ml-2 text-sm opacity-60">— {verb.english} ({verb.group})</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${verbOpen ? "rotate-180" : ""}`} style={{ color: "#8B1A1A" }} />
            </button>
            <AnimatePresence>
              {verbOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden shadow-xl z-10"
                  style={{ backgroundColor: "white", border: "1px solid rgba(30,26,22,0.15)" }}
                >
                  {verbs.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => { setSelectedVerb(i); setVerbOpen(false); setSelectedTense(null); setQuizMode(false); }}
                      className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-[#F5EFE0] transition-colors"
                    >
                      <span className="font-semibold" style={{ fontFamily: "Fraunces, serif", color: "#8B1A1A" }}>{v.infinitive}</span>
                      <span className="text-sm" style={{ color: "#1E1A16", opacity: 0.5 }}>{v.english}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tense tabs */}
          <div className="flex gap-1.5 mb-5 flex-wrap">
            {tenses.map(tense => (
              <button
                key={tense}
                onClick={() => { setSelectedTense(tense); setQuizMode(false); }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  backgroundColor: activeTense === tense ? "#1E1A16" : "transparent",
                  color: activeTense === tense ? "#F5EFE0" : "#1E1A16",
                  borderColor: "#1E1A16",
                  opacity: activeTense === tense ? 1 : 0.6,
                }}
              >
                {tense}
              </button>
            ))}
          </div>

          {/* Reference table */}
          {!quizMode ? (
            <>
              <div className="rounded-xl overflow-hidden mb-5" style={{ border: "1px solid rgba(30,26,22,0.12)" }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: "#1E1A16" }}>
                      <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "#F5EFE0", opacity: 0.6 }}>Person</th>
                      <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "#F5EFE0", opacity: 0.6 }}>English</th>
                      <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wider" style={{ color: "#C9922A" }}>Romanian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PERSONS.map((person, i) => (
                      <tr key={person} style={{ backgroundColor: i % 2 === 0 ? "white" : "rgba(30,26,22,0.02)" }}>
                        <td className="px-4 py-2.5">
                          <span className="text-sm font-bold" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#8B1A1A" }}>{person}</span>
                        </td>
                        <td className="px-4 py-2.5 text-sm" style={{ color: "#1E1A16", opacity: 0.5 }}>
                          {personLabels[person]}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="font-bold" style={{ fontFamily: "Fraunces, serif", color: "#1E1A16", fontSize: "15px" }}>
                            {conjugations[person]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={startQuiz}
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#8B1A1A", color: "#F5EFE0" }}
              >
                Quiz Me on This Tense
              </button>
            </>
          ) : (
            /* Quiz mode */
            <div>
              <div className="rounded-xl p-5 mb-4 text-center" style={{ backgroundColor: "rgba(139,26,26,0.04)", border: "1px solid rgba(139,26,26,0.12)" }}>
                <p className="text-xs font-semibold mb-2" style={{ color: "#1E1A16", opacity: 0.5 }}>
                  {quizPersonIdx + 1} of {PERSONS.length} · Score: {quizScore}/{quizTotal}
                </p>
                <p className="text-lg mb-1" style={{ color: "#1E1A16", opacity: 0.7 }}>Conjugate in {activeTense}:</p>
                <p className="text-3xl font-bold" style={{ fontFamily: "Fraunces, serif", color: "#8B1A1A" }}>
                  {verb.infinitive}
                </p>
                <p className="text-sm mt-1" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#1E1A16", opacity: 0.5 }}>
                  {quizPerson} — {personLabels[quizPerson]}
                </p>
              </div>

              <input
                value={quizInput}
                onChange={e => { if (!quizSubmitted) setQuizInput(e.target.value); }}
                onKeyDown={e => { if (e.key === "Enter") quizSubmitted ? nextQuiz() : submitQuiz(); }}
                placeholder="Type the conjugated form…"
                autoFocus
                className="w-full px-4 py-3 rounded-xl text-lg outline-none transition-all mb-3"
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  backgroundColor: quizSubmitted
                    ? quizInput.trim().toLowerCase() === correctAnswer.toLowerCase() ? "rgba(45,90,39,0.08)" : "rgba(139,26,26,0.06)"
                    : "white",
                  border: quizSubmitted
                    ? `2px solid ${quizInput.trim().toLowerCase() === correctAnswer.toLowerCase() ? "#2D5A27" : "#8B1A1A"}`
                    : "2px solid rgba(30,26,22,0.15)",
                  color: "#1E1A16",
                }}
              />

              <AnimatePresence>
                {quizSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-3 overflow-hidden"
                  >
                    <div
                      className="rounded-xl p-3"
                      style={{
                        backgroundColor: quizInput.trim().toLowerCase() === correctAnswer.toLowerCase()
                          ? "rgba(45,90,39,0.08)" : "rgba(139,26,26,0.06)",
                      }}
                    >
                      {quizInput.trim().toLowerCase() !== correctAnswer.toLowerCase() && (
                        <p className="text-sm" style={{ color: "#8B1A1A" }}>
                          Correct: <span className="font-bold" style={{ fontFamily: "Fraunces, serif" }}>{correctAnswer}</span>
                        </p>
                      )}
                      {quizInput.trim().toLowerCase() === correctAnswer.toLowerCase() && (
                        <p className="text-sm font-bold" style={{ color: "#2D5A27" }}>✓ Correct!</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-2">
                {!quizSubmitted ? (
                  <button
                    onClick={submitQuiz}
                    disabled={!quizInput.trim()}
                    className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40"
                    style={{ backgroundColor: "#8B1A1A", color: "#F5EFE0" }}
                  >
                    Check
                  </button>
                ) : (
                  <button
                    onClick={nextQuiz}
                    className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: "#1E1A16", color: "#F5EFE0" }}
                  >
                    {quizPersonIdx + 1 < PERSONS.length ? "Next Person →" : `Done! ${quizScore}/${PERSONS.length} correct`}
                  </button>
                )}
                <button
                  onClick={() => setQuizMode(false)}
                  className="px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:bg-black/5"
                  style={{ borderColor: "rgba(30,26,22,0.2)", color: "#1E1A16" }}
                >
                  Table
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
