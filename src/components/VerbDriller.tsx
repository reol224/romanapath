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
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-xl rounded-3xl overflow-hidden"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 0 #E5E5E5, 0 0 0 2px #E5E5E5" }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "2px solid #F0F0F0" }}>
          <div>
            <h2 className="font-black text-xl tracking-tight" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C" }}>🔤 Verb Conjugation Driller</h2>
            <p className="text-xs font-bold mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>All 6 persons, multiple tenses</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
            <X className="w-4 h-4" style={{ color: "#AFAFAF" }} />
          </button>
        </div>

        <div className="p-6">
          {/* Verb selector */}
          <div className="relative mb-4">
            <button
              onClick={() => setVerbOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl font-black transition-all"
              style={{ border: "2px solid #E5E5E5", color: "#3C3C3C", backgroundColor: "white", boxShadow: "0 4px 0 #E5E5E5", fontFamily: "Nunito, sans-serif" }}
            >
              <span>
                <span style={{ color: "#1CB0F6" }}>{verb.infinitive}</span>
                <span className="ml-2 text-sm font-bold" style={{ color: "#AFAFAF" }}>— {verb.english} ({verb.group})</span>
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${verbOpen ? "rotate-180" : ""}`} style={{ color: "#AFAFAF" }} />
            </button>
            <AnimatePresence>
              {verbOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-0 right-0 mt-1 rounded-2xl overflow-hidden z-10"
                  style={{ backgroundColor: "white", border: "2px solid #E5E5E5", boxShadow: "0 8px 0 #E5E5E5" }}
                >
                  {verbs.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => { setSelectedVerb(i); setVerbOpen(false); setSelectedTense(null); setQuizMode(false); }}
                      className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-[#F7F7F7] transition-colors"
                    >
                      <span className="font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#1CB0F6" }}>{v.infinitive}</span>
                      <span className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>{v.english}</span>
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
                className="px-3 py-1.5 rounded-full text-xs font-black border-2 transition-all"
                style={{
                  backgroundColor: activeTense === tense ? "#1CB0F6" : "white",
                  color: activeTense === tense ? "white" : "#AFAFAF",
                  borderColor: activeTense === tense ? "#1CB0F6" : "#E5E5E5",
                  fontFamily: "Nunito, sans-serif",
                  boxShadow: activeTense === tense ? "0 3px 0 #0A90D0" : "0 3px 0 #E5E5E5",
                }}
              >
                {tense}
              </button>
            ))}
          </div>

          {/* Reference table */}
          {!quizMode ? (
            <>
              <div className="rounded-2xl overflow-hidden mb-5" style={{ border: "2px solid #E5E5E5" }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: "#F7F7F7" }}>
                      <th className="px-4 py-2.5 text-left text-xs font-black uppercase tracking-wider" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Person</th>
                      <th className="px-4 py-2.5 text-left text-xs font-black uppercase tracking-wider" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>English</th>
                      <th className="px-4 py-2.5 text-left text-xs font-black uppercase tracking-wider" style={{ fontFamily: "Nunito, sans-serif", color: "#1CB0F6" }}>Romanian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PERSONS.map((person, i) => (
                      <tr key={person} style={{ backgroundColor: i % 2 === 0 ? "white" : "#FAFAFA", borderTop: "1px solid #F0F0F0" }}>
                        <td className="px-4 py-2.5">
                          <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#FF4B4B" }}>{person}</span>
                        </td>
                        <td className="px-4 py-2.5 text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                          {personLabels[person]}
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#3C3C3C", fontSize: "15px" }}>
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
                className="w-full py-3 rounded-2xl font-black text-sm transition-all"
                style={{ backgroundColor: "#58CC02", color: "white", fontFamily: "Nunito, sans-serif", border: "none", boxShadow: "0 4px 0 #46A302" }}
              >
                Quiz Me on This Tense
              </button>
            </>
          ) : (
            /* Quiz mode */
            <div>
              <div className="rounded-2xl p-5 mb-4 text-center" style={{ backgroundColor: "#F7F7F7", border: "2px solid #E5E5E5" }}>
                <p className="text-xs font-black mb-2" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                  {quizPersonIdx + 1} of {PERSONS.length} · Score: {quizScore}/{quizTotal}
                </p>
                <p className="text-lg font-bold mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>Conjugate in {activeTense}:</p>
                <p className="text-3xl font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#1CB0F6" }}>
                  {verb.infinitive}
                </p>
                <p className="text-sm font-bold mt-1" style={{ fontFamily: "Nunito, sans-serif", color: "#AFAFAF" }}>
                  {quizPerson} — {personLabels[quizPerson]}
                </p>
              </div>

              <input
                value={quizInput}
                onChange={e => { if (!quizSubmitted) setQuizInput(e.target.value); }}
                onKeyDown={e => { if (e.key === "Enter") quizSubmitted ? nextQuiz() : submitQuiz(); }}
                placeholder="Type the conjugated form…"
                autoFocus
                className="w-full px-4 py-3 rounded-2xl text-lg outline-none transition-all mb-3 font-bold"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  backgroundColor: quizSubmitted
                    ? quizInput.trim().toLowerCase() === correctAnswer.toLowerCase() ? "#E6F9E8" : "#FFECEC"
                    : "white",
                  border: quizSubmitted
                    ? `2px solid ${quizInput.trim().toLowerCase() === correctAnswer.toLowerCase() ? "#58CC02" : "#FF4B4B"}`
                    : "2px solid #E5E5E5",
                  color: "#3C3C3C",
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
                      className="rounded-2xl p-3"
                      style={{
                        backgroundColor: quizInput.trim().toLowerCase() === correctAnswer.toLowerCase()
                          ? "#E6F9E8" : "#FFECEC",
                        border: `2px solid ${quizInput.trim().toLowerCase() === correctAnswer.toLowerCase() ? "#58CC02" : "#FF4B4B"}`,
                      }}
                    >
                      {quizInput.trim().toLowerCase() !== correctAnswer.toLowerCase() && (
                        <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#FF4B4B" }}>
                          Correct: <span className="font-black">{correctAnswer}</span>
                        </p>
                      )}
                      {quizInput.trim().toLowerCase() === correctAnswer.toLowerCase() && (
                        <p className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#58CC02" }}>✓ Correct!</p>
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
                    className="flex-1 py-3 rounded-2xl font-black text-sm transition-all disabled:opacity-40"
                    style={{ backgroundColor: "#58CC02", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #46A302" }}
                  >
                    Check
                  </button>
                ) : (
                  <button
                    onClick={nextQuiz}
                    className="flex-1 py-3 rounded-2xl font-black text-sm transition-all"
                    style={{ backgroundColor: "#1CB0F6", color: "white", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #0A90D0" }}
                  >
                    {quizPersonIdx + 1 < PERSONS.length ? "Next Person →" : `Done! ${quizScore}/${PERSONS.length} correct`}
                  </button>
                )}
                <button
                  onClick={() => setQuizMode(false)}
                  className="px-4 py-3 rounded-2xl font-bold text-sm transition-all"
                  style={{ border: "2px solid #E5E5E5", color: "#AFAFAF", fontFamily: "Nunito, sans-serif", boxShadow: "0 4px 0 #E5E5E5" }}
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
