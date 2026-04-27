// ─── Tongue Twisters ─────────────────────────────────────────────────────────
export interface TongueTwister {
  id: string;
  title: string;
  text: string;
  phonetic: string;
  english: string;
  difficulty: "easy" | "medium" | "hard";
  focusSound: string;
}

export const tongueTwisters: TongueTwister[] = [
  {
    id: "tt1",
    title: "Ș & Ț Drill",
    text: "Șapte șoricei șușoteau și-și șușoteau șușotelile.",
    phonetic: "[SHAHP-teh sho-REE-chay shoo-sho-TYOW shee-shee shoo-sho-TYOW shoo-sho-TEH-lee-leh]",
    english: "Seven mice were whispering and were whispering their whispers.",
    difficulty: "hard",
    focusSound: "ș",
  },
  {
    id: "tt2",
    title: "Capra / R-Roll",
    text: "Capra calcă piatra, piatra crapă-n patru.",
    phonetic: "[KAH-prah KAL-kuh PYAH-trah, PYAH-trah KRAH-puh-n PAH-troo]",
    english: "The goat steps on the stone, the stone cracks in four.",
    difficulty: "medium",
    focusSound: "r, p, a",
  },
  {
    id: "tt3",
    title: "Ă Vowel",
    text: "Ăla e ăla, ăla nu e ăla.",
    phonetic: "[UH-lah yeh UH-lah, UH-lah noo yeh UH-lah]",
    english: "That one is that one, that one is not that one.",
    difficulty: "easy",
    focusSound: "ă",
  },
  {
    id: "tt4",
    title: "Ce / Ci Sounds",
    text: "Ce caută cel ce calcă cecul celui ce-a cerut ceaiul?",
    phonetic: "[cheh KOW-tuh chel cheh KAL-kuh CHE-kool CHEH-loo-ee cheh-ah cheh-ROOT CHAH-yool]",
    english: "What is looking for the one who steps on the check of the one who asked for the tea?",
    difficulty: "hard",
    focusSound: "ce / ci = [che/chi]",
  },
  {
    id: "tt5",
    title: "Â / Î Vowel",
    text: "Îngână vântul vânt, vântul vântul îl îngână.",
    phonetic: "[ÎN-guh-nuh VUN-tool vunt, VUN-tool VUN-tool ul ÎN-guh-nuh]",
    english: "The wind mimics the wind, the wind mimics the wind.",
    difficulty: "medium",
    focusSound: "â / î = [ɨ]",
  },
  {
    id: "tt6",
    title: "O-A Diphthong",
    text: "Oaia albă bea apă albă, oaia neagră bea apă neagră.",
    phonetic: "[WAH-yah AL-buh byah AH-puh AL-buh, WAH-yah NYAH-gruh byah AH-puh NYAH-gruh]",
    english: "The white sheep drinks white water, the black sheep drinks black water.",
    difficulty: "easy",
    focusSound: "oa, ea",
  },
];

// ─── Flashcard Vocabulary ────────────────────────────────────────────────────
export interface Flashcard {
  id: string;
  romanian: string;
  phonetic: string;
  english: string;
  category: string;
  level: "A1" | "A2" | "B1" | "B2";
}

export const flashcards: Flashcard[] = [
  // A1 – Everyday
  { id: "fc1", romanian: "casă", phonetic: "[KAH-suh]", english: "house", category: "Home", level: "A1" },
  { id: "fc2", romanian: "masă", phonetic: "[MAH-suh]", english: "table", category: "Home", level: "A1" },
  { id: "fc3", romanian: "apă", phonetic: "[AH-puh]", english: "water", category: "Food", level: "A1" },
  { id: "fc4", romanian: "pâine", phonetic: "[PUY-neh]", english: "bread", category: "Food", level: "A1" },
  { id: "fc5", romanian: "mâncare", phonetic: "[mun-KAH-reh]", english: "food", category: "Food", level: "A1" },
  { id: "fc6", romanian: "prieten", phonetic: "[PRYEH-ten]", english: "friend (m.)", category: "People", level: "A1" },
  { id: "fc7", romanian: "prietenă", phonetic: "[pryeh-TEH-nuh]", english: "friend (f.)", category: "People", level: "A1" },
  { id: "fc8", romanian: "copil", phonetic: "[ko-PEEL]", english: "child", category: "People", level: "A1" },
  { id: "fc9", romanian: "carte", phonetic: "[KAR-teh]", english: "book", category: "Objects", level: "A1" },
  { id: "fc10", romanian: "mașină", phonetic: "[mah-SHEE-nuh]", english: "car", category: "Transport", level: "A1" },
  { id: "fc11", romanian: "a merge", phonetic: "[ah MER-jeh]", english: "to go", category: "Verbs", level: "A1" },
  { id: "fc12", romanian: "a fi", phonetic: "[ah fee]", english: "to be", category: "Verbs", level: "A1" },
  { id: "fc13", romanian: "a avea", phonetic: "[ah ah-VYAH]", english: "to have", category: "Verbs", level: "A1" },
  { id: "fc14", romanian: "a mânca", phonetic: "[ah mun-KAH]", english: "to eat", category: "Verbs", level: "A1" },
  { id: "fc15", romanian: "frumos", phonetic: "[froo-MOS]", english: "beautiful / handsome", category: "Adjectives", level: "A1" },
  // A2
  { id: "fc16", romanian: "a cumpăra", phonetic: "[ah koom-puh-RAH]", english: "to buy", category: "Verbs", level: "A2" },
  { id: "fc17", romanian: "piață", phonetic: "[PYAH-tsuh]", english: "market / square", category: "Places", level: "A2" },
  { id: "fc18", romanian: "bilet", phonetic: "[bee-LET]", english: "ticket", category: "Transport", level: "A2" },
  { id: "fc19", romanian: "a întreba", phonetic: "[ah un-treh-BAH]", english: "to ask", category: "Verbs", level: "A2" },
  { id: "fc20", romanian: "răspuns", phonetic: "[ruh-SPOONS]", english: "answer", category: "Communication", level: "A2" },
  // B1
  { id: "fc21", romanian: "a reuși", phonetic: "[ah reh-oo-SHEE]", english: "to succeed", category: "Verbs", level: "B1" },
  { id: "fc22", romanian: "putere", phonetic: "[poo-TEH-reh]", english: "power / strength", category: "Abstract", level: "B1" },
  { id: "fc23", romanian: "a înțelege", phonetic: "[ah un-tsuh-LEH-jeh]", english: "to understand", category: "Verbs", level: "B1" },
  { id: "fc24", romanian: "creștere", phonetic: "[KRESH-teh-reh]", english: "growth / increase", category: "Abstract", level: "B1" },
  { id: "fc25", romanian: "a hotărî", phonetic: "[ah ho-tuh-RUY]", english: "to decide", category: "Verbs", level: "B1" },
  // B2
  { id: "fc26", romanian: "conștiință", phonetic: "[kon-shtee-IN-tsuh]", english: "conscience / awareness", category: "Abstract", level: "B2" },
  { id: "fc27", romanian: "a presupune", phonetic: "[ah preh-soo-POO-neh]", english: "to suppose / assume", category: "Verbs", level: "B2" },
  { id: "fc28", romanian: "meșteșug", phonetic: "[mesh-teh-SHOOG]", english: "craft / skill", category: "Culture", level: "B2" },
  { id: "fc29", romanian: "dăinui", phonetic: "[duh-ee-NOOY]", english: "to endure / persist", category: "Verbs", level: "B2" },
  { id: "fc30", romanian: "împrejurimi", phonetic: "[um-preh-zhoo-REEMEE]", english: "surroundings", category: "Places", level: "B2" },
];

// ─── Diacritics Practice ─────────────────────────────────────────────────────
export interface DiacriticsExercise {
  id: string;
  prompt: string;
  hint: string;
  answer: string;
  explanation: string;
}

export const diacriticsExercises: DiacriticsExercise[] = [
  { id: "de1", prompt: "Type the Romanian word for 'house'", hint: "cas_", answer: "casă", explanation: "'ă' sounds like the 'u' in 'butter'. Use Alt+A or your special keyboard." },
  { id: "de2", prompt: "Type the Romanian word for 'scissors'", hint: "foarfec_", answer: "foarfecă", explanation: "The final 'ă' is the feminine noun ending, a soft unrounded vowel." },
  { id: "de3", prompt: "Type 'shoe' in Romanian", hint: "pantof _", answer: "pantof", explanation: "This one needs no diacritics — but watch out for the next ones!" },
  { id: "de4", prompt: "Type the word for 'night' — no accent on first vowel!", hint: "noap_e bun_", answer: "noapte bună", explanation: "'ă' appears on the adjective 'bună'. Pay attention to which word takes the diacritic." },
  { id: "de5", prompt: "Type 'she' / 'it' in Romanian (feminine pronoun)", hint: "e_", answer: "ea", explanation: "'ea' — no diacritics here. Not every word needs them!" },
  { id: "de6", prompt: "Type the word for 'cheese'", hint: "brnz_", answer: "brânză", explanation: "'â' is the central vowel [ɨ], and 'ă' is the soft final vowel. Both appear here." },
  { id: "de7", prompt: "Type the command 'Look!' (tu form)", hint: "Prive_te!", answer: "Privește!", explanation: "'ș' is always [sh] — it's the letter with a comma below, not a cedilla." },
  { id: "de8", prompt: "Type the word for 'knowledge / science'", hint: "_tiin__", answer: "știință", explanation: "'ș' + 'ț' + 'ă' — this word has all three common diacritics in one word." },
];

// ─── Word Gender Trainer ─────────────────────────────────────────────────────
export interface GenderWord {
  id: string;
  romanian: string;
  phonetic: string;
  english: string;
  gender: "masculine" | "feminine" | "neuter";
  ending: string;
  tip: string;
}

export const genderWords: GenderWord[] = [
  { id: "gw1", romanian: "băiat", phonetic: "[buh-YAHT]", english: "boy", gender: "masculine", ending: "consonant", tip: "Most masculine nouns end in a consonant" },
  { id: "gw2", romanian: "fată", phonetic: "[FAH-tuh]", english: "girl", gender: "feminine", ending: "-ă", tip: "Most feminine nouns end in -ă" },
  { id: "gw3", romanian: "scaun", phonetic: "[SKOWN]", english: "chair", gender: "neuter", ending: "consonant", tip: "Neuter = masculine singular, feminine plural" },
  { id: "gw4", romanian: "casă", phonetic: "[KAH-suh]", english: "house", gender: "feminine", ending: "-ă", tip: "Ends in -ă → feminine" },
  { id: "gw5", romanian: "câine", phonetic: "[KUY-neh]", english: "dog", gender: "masculine", ending: "-e", tip: "Some masculine nouns end in -e" },
  { id: "gw6", romanian: "pisică", phonetic: "[pee-SEE-kuh]", english: "cat (f.)", gender: "feminine", ending: "-ă", tip: "Ends in -ă → feminine" },
  { id: "gw7", romanian: "teatru", phonetic: "[TYAH-troo]", english: "theatre", gender: "neuter", ending: "-u", tip: "Neuter nouns often end in -u or consonant" },
  { id: "gw8", romanian: "om", phonetic: "[om]", english: "man / person", gender: "masculine", ending: "consonant", tip: "Short consonant-ending nouns are often masculine" },
  { id: "gw9", romanian: "munte", phonetic: "[MOON-teh]", english: "mountain", gender: "masculine", ending: "-e", tip: "Mountains are masculine in Romanian" },
  { id: "gw10", romanian: "carte", phonetic: "[KAR-teh]", english: "book", gender: "feminine", ending: "-e", tip: "Some -e ending nouns are feminine (check the article: o carte)" },
  { id: "gw11", romanian: "oraș", phonetic: "[o-RAHSH]", english: "city", gender: "neuter", ending: "consonant", tip: "Many places are neuter" },
  { id: "gw12", romanian: "inimă", phonetic: "[EE-nee-muh]", english: "heart", gender: "feminine", ending: "-ă", tip: "Ends in -ă → feminine" },
];

// ─── Case Declension ──────────────────────────────────────────────────────────
export interface CaseRow {
  noun: string;
  english: string;
  gender: "masculine" | "feminine" | "neuter";
  forms: {
    nominative: string;
    accusative: string;
    genitive: string;
    dative: string;
    vocative: string;
  };
  definite: {
    nominative: string;
    accusative: string;
    genitive: string;
    dative: string;
    vocative: string;
  };
}

export const caseExamples: CaseRow[] = [
  {
    noun: "casă",
    english: "house",
    gender: "feminine",
    forms: {
      nominative: "o casă",
      accusative: "o casă",
      genitive: "unei case",
      dative: "unei case",
      vocative: "casă!",
    },
    definite: {
      nominative: "casa",
      accusative: "casa",
      genitive: "casei",
      dative: "casei",
      vocative: "caso!",
    },
  },
  {
    noun: "băiat",
    english: "boy",
    gender: "masculine",
    forms: {
      nominative: "un băiat",
      accusative: "un băiat",
      genitive: "unui băiat",
      dative: "unui băiat",
      vocative: "băiatule!",
    },
    definite: {
      nominative: "băiatul",
      accusative: "băiatul",
      genitive: "băiatului",
      dative: "băiatului",
      vocative: "băiatule!",
    },
  },
  {
    noun: "scaun",
    english: "chair",
    gender: "neuter",
    forms: {
      nominative: "un scaun",
      accusative: "un scaun",
      genitive: "unui scaun",
      dative: "unui scaun",
      vocative: "scaune!",
    },
    definite: {
      nominative: "scaunul",
      accusative: "scaunul",
      genitive: "scaunului",
      dative: "scaunului",
      vocative: "scaunule!",
    },
  },
];

// ─── Verb Conjugation ────────────────────────────────────────────────────────
export interface VerbConjugation {
  id: string;
  infinitive: string;
  english: string;
  group: string;
  tenses: {
    [tense: string]: {
      eu: string;
      tu: string;
      "el/ea": string;
      noi: string;
      voi: string;
      "ei/ele": string;
    };
  };
}

export const verbs: VerbConjugation[] = [
  {
    id: "v1",
    infinitive: "a fi",
    english: "to be",
    group: "irregular",
    tenses: {
      "Present": { eu: "sunt", tu: "ești", "el/ea": "este", noi: "suntem", voi: "sunteți", "ei/ele": "sunt" },
      "Imperfect": { eu: "eram", tu: "erai", "el/ea": "era", noi: "eram", voi: "erați", "ei/ele": "erau" },
      "Subjunctive": { eu: "să fiu", tu: "să fii", "el/ea": "să fie", noi: "să fim", voi: "să fiți", "ei/ele": "să fie" },
    },
  },
  {
    id: "v2",
    infinitive: "a vorbi",
    english: "to speak",
    group: "-i verbs",
    tenses: {
      "Present": { eu: "vorbesc", tu: "vorbești", "el/ea": "vorbește", noi: "vorbim", voi: "vorbiți", "ei/ele": "vorbesc" },
      "Perfect Compus": { eu: "am vorbit", tu: "ai vorbit", "el/ea": "a vorbit", noi: "am vorbit", voi: "ați vorbit", "ei/ele": "au vorbit" },
      "Subjunctive": { eu: "să vorbesc", tu: "să vorbești", "el/ea": "să vorbească", noi: "să vorbim", voi: "să vorbiți", "ei/ele": "să vorbească" },
    },
  },
  {
    id: "v3",
    infinitive: "a mânca",
    english: "to eat",
    group: "-a verbs",
    tenses: {
      "Present": { eu: "mănânc", tu: "mănânci", "el/ea": "mănâncă", noi: "mâncăm", voi: "mâncați", "ei/ele": "mănâncă" },
      "Perfect Compus": { eu: "am mâncat", tu: "ai mâncat", "el/ea": "a mâncat", noi: "am mâncat", voi: "ați mâncat", "ei/ele": "au mâncat" },
      "Conditional": { eu: "aș mânca", tu: "ai mânca", "el/ea": "ar mânca", noi: "am mânca", voi: "ați mânca", "ei/ele": "ar mânca" },
    },
  },
  {
    id: "v4",
    infinitive: "a merge",
    english: "to go / walk",
    group: "-e verbs",
    tenses: {
      "Present": { eu: "merg", tu: "mergi", "el/ea": "merge", noi: "mergem", voi: "mergeți", "ei/ele": "merg" },
      "Perfect Compus": { eu: "am mers", tu: "ai mers", "el/ea": "a mers", noi: "am mers", voi: "ați mers", "ei/ele": "au mers" },
      "Imperfect": { eu: "mergeam", tu: "mergeai", "el/ea": "mergea", noi: "mergeam", voi: "mergeați", "ei/ele": "mergeau" },
    },
  },
  {
    id: "v5",
    infinitive: "a înțelege",
    english: "to understand",
    group: "-e verbs",
    tenses: {
      "Present": { eu: "înțeleg", tu: "înțelegi", "el/ea": "înțelege", noi: "înțelegem", voi: "înțelegeți", "ei/ele": "înțeleg" },
      "Perfect Compus": { eu: "am înțeles", tu: "ai înțeles", "el/ea": "a înțeles", noi: "am înțeles", voi: "ați înțeles", "ei/ele": "au înțeles" },
      "Subjunctive": { eu: "să înțeleg", tu: "să înțelegi", "el/ea": "să înțeleagă", noi: "să înțelegem", voi: "să înțelegeți", "ei/ele": "să înțeleagă" },
    },
  },
];

// ─── Achievement Badges ───────────────────────────────────────────────────────
export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  condition: (stats: BadgeStats) => boolean;
}

export interface BadgeStats {
  completedLessons: number;
  completedLevels: number;
  streak: number;
  flashcardsReviewed: number;
  tongueTwistersCompleted: number;
  diacriticsCorrect: number;
  verbsdrilled: number;
}

export const badges: Badge[] = [
  {
    id: "b1", title: "First Steps", description: "Complete your first lesson",
    icon: "🌱", color: "#2D5A27", bgColor: "#E8F5E3",
    condition: (s) => s.completedLessons >= 1,
  },
  {
    id: "b2", title: "A1 Graduate", description: "Complete all A1 lessons",
    icon: "🎓", color: "#8B1A1A", bgColor: "#F9E8E8",
    condition: (s) => s.completedLevels >= 1,
  },
  {
    id: "b3", title: "Polyglot Ember", description: "Maintain a 7-day streak",
    icon: "🔥", color: "#C9922A", bgColor: "#FFF3DC",
    condition: (s) => s.streak >= 7,
  },
  {
    id: "b4", title: "Word Collector", description: "Review 20 flashcards",
    icon: "📚", color: "#1A3A6B", bgColor: "#E3EAF9",
    condition: (s) => s.flashcardsReviewed >= 20,
  },
  {
    id: "b5", title: "Tongue Twister", description: "Complete 3 tongue twisters",
    icon: "👅", color: "#8B1A1A", bgColor: "#F9E8E8",
    condition: (s) => s.tongueTwistersCompleted >= 3,
  },
  {
    id: "b6", title: "Diacritic Master", description: "Get 20 diacritics exercises correct",
    icon: "ș", color: "#2D5A27", bgColor: "#E8F5E3",
    condition: (s) => s.diacriticsCorrect >= 20,
  },
  {
    id: "b7", title: "Verb Virtuoso", description: "Drill 3 verb conjugation tables",
    icon: "📝", color: "#C9922A", bgColor: "#FFF3DC",
    condition: (s) => s.verbsdrilled >= 3,
  },
  {
    id: "b8", title: "Romanian Soul", description: "Complete all A1 and A2 lessons",
    icon: "🇷🇴", color: "#1A3A6B", bgColor: "#E3EAF9",
    condition: (s) => s.completedLevels >= 2,
  },
];

// ─── Cultural Notes ────────────────────────────────────────────────────────────
export interface CulturalNote {
  id: string;
  word: string;
  phonetic: string;
  category: string;
  shortDescription: string;
  fullNote: string;
  imageQuery: string;
}

export const culturalNotes: CulturalNote[] = [
  {
    id: "cn1",
    word: "mămăligă",
    phonetic: "[muh-muh-LEE-guh]",
    category: "Food",
    shortDescription: "The cornmeal staple of Romanian cuisine",
    fullNote: "Mămăligă is a thick porridge made from yellow maize flour — the Romanian equivalent of Italian polenta. For centuries it was the peasant's bread, eaten with sour cream (smântână), cheese (brânză), or fried eggs. Today it's a cultural symbol of Romanian identity, appearing at family tables and traditional restaurants alike. The phrase 'a trăi ca-n sânul lui Avram' (to live like in Abraham's bosom) sometimes evokes the simple abundance of mămăligă.",
    imageQuery: "Romanian polenta traditional food",
  },
  {
    id: "cn2",
    word: "doină",
    phonetic: "[DOY-nuh]",
    category: "Music",
    shortDescription: "The soul of Romanian folk song",
    fullNote: "Doina is a lyrical folk music genre unique to Romania and Moldova, recognized by UNESCO as Intangible Cultural Heritage. Unlike structured songs, doina is improvisational and expressive, traditionally sung solo to accompany shepherds in the mountains. The themes are longing (dor), love, exile, and nature. George Enescu wove doina elements into his classical compositions, and poet Mihai Eminescu described it as 'the Romanian soul set to melody'.",
    imageQuery: "Romanian folk music mountains",
  },
  {
    id: "cn3",
    word: "ie",
    phonetic: "[yeh]",
    category: "Clothing",
    shortDescription: "The iconic Romanian embroidered blouse",
    fullNote: "The ie is a traditional Romanian peasant blouse, usually white linen or cotton with intricate geometric embroidery around the collar, cuffs, and chest. Each region has its own embroidery style — the motifs are not merely decorative but carry symbolic meaning related to nature, protection, and identity. Henri Matisse and Pablo Picasso featured the ie in their paintings. June 24 is celebrated internationally as 'La Blouse Roumaine' day.",
    imageQuery: "Romanian traditional embroidered blouse ie",
  },
  {
    id: "cn4",
    word: "sarmale",
    phonetic: "[sar-MAH-leh]",
    category: "Food",
    shortDescription: "Stuffed cabbage rolls — Romania's national dish",
    fullNote: "Sarmale are minced meat and rice wrapped in pickled cabbage leaves, slow-cooked in tomato sauce. They are the centerpiece of every major Romanian holiday — Christmas, Easter, baptisms, weddings. The dish has Ottoman origins (dolma), but Romanians have made it their own over 500 years. In Transylvania, they're wrapped in vine leaves in summer. No Romanian holiday table is complete without sarmale.",
    imageQuery: "Romanian sarmale stuffed cabbage rolls",
  },
  {
    id: "cn5",
    word: "dor",
    phonetic: "[dor]",
    category: "Emotion",
    shortDescription: "The untranslatable Romanian longing",
    fullNote: "Dor is one of those words that resists direct translation. It describes a deep, bittersweet longing — for a person, a place, a time that has passed. Similar to the Portuguese 'saudade', dor is woven into Romanian poetry, music, and everyday speech. 'Mi-e dor de tine' (I miss you, literally 'I have dor of you') carries a weight that 'I miss you' cannot quite capture. Eminescu's poetry is saturated with dor.",
    imageQuery: "Romanian autumn countryside melancholy",
  },
  {
    id: "cn6",
    word: "colinde",
    phonetic: "[ko-LEEN-deh]",
    category: "Tradition",
    shortDescription: "Ancient Romanian Christmas caroling tradition",
    fullNote: "Colinde are Romanian Christmas carols, but they predate Christianity — their roots lie in pre-Christian Dacian winter solstice rituals. Unlike Western carols, colinde are chanted door-to-door by groups of children and young men carrying a special star-shaped lantern. The host family gives gifts (sweets, money, bread) in return for the blessing. The texts mix Christian imagery with ancient symbols of sun, nature, and fertility.",
    imageQuery: "Romanian Christmas carol tradition colinde",
  },
];

// ─── Proverbs ─────────────────────────────────────────────────────────────────
export interface Proverb {
  id: string;
  romanian: string;
  phonetic: string;
  literal: string;
  idiomatic: string;
  explanation: string;
  theme: string;
}

export const proverbs: Proverb[] = [
  {
    id: "p1",
    romanian: "Omul sfințește locul.",
    phonetic: "[O-mool sfin-TSESH-teh LO-kool]",
    literal: "The man sanctifies the place.",
    idiomatic: "It's not where you are, but who you are that matters.",
    explanation: "Used to say that a person's character and presence can elevate any situation or place. Often said when someone is modest about their role.",
    theme: "Character",
  },
  {
    id: "p2",
    romanian: "Grăbește-te încet.",
    phonetic: "[gruh-BESH-teh teh un-CHET]",
    literal: "Hurry slowly.",
    idiomatic: "More haste, less speed.",
    explanation: "The Romanian equivalent of 'festina lente'. Rushing things leads to mistakes — proceed quickly but carefully.",
    theme: "Patience",
  },
  {
    id: "p3",
    romanian: "Vorba dulce mult aduce.",
    phonetic: "[VOR-bah DOOL-cheh moolt ah-DOO-cheh]",
    literal: "Sweet words bring much.",
    idiomatic: "You catch more flies with honey than vinegar.",
    explanation: "Kind and gentle speech accomplishes more than harsh words. A reminder to speak with care and warmth.",
    theme: "Communication",
  },
  {
    id: "p4",
    romanian: "Cine se scoală de dimineață, departe ajunge.",
    phonetic: "[CHEE-neh seh SKWAH-luh deh dee-mee-NYAH-tsuh, deh-PAR-teh ah-YOON-jeh]",
    literal: "He who rises in the morning gets far.",
    idiomatic: "The early bird catches the worm.",
    explanation: "Hard work and early rising are rewarded. A popular folk wisdom encouraging industriousness.",
    theme: "Hard Work",
  },
  {
    id: "p5",
    romanian: "Nu tot ce zboară se mănâncă.",
    phonetic: "[noo tot cheh ZBWAH-ruh seh muh-NUN-kuh]",
    literal: "Not everything that flies gets eaten.",
    idiomatic: "Don't count your chickens before they hatch.",
    explanation: "Not every opportunity is what it appears. Don't celebrate prematurely or act on assumptions.",
    theme: "Caution",
  },
  {
    id: "p6",
    romanian: "Prietenul la nevoie se cunoaște.",
    phonetic: "[PRYEH-ten-ool lah neh-VOY-eh seh koo-NWASH-teh]",
    literal: "A friend is known in need.",
    idiomatic: "A friend in need is a friend indeed.",
    explanation: "True friendship reveals itself in difficult times. Fair-weather friends are not true friends.",
    theme: "Friendship",
  },
  {
    id: "p7",
    romanian: "Minciuna are picioare scurte.",
    phonetic: "[meen-CHYOO-nah AH-reh pee-CHYOH-ah-reh SKOOR-teh]",
    literal: "A lie has short legs.",
    idiomatic: "Lies don't travel far / the truth will always catch up.",
    explanation: "Deception cannot sustain itself — eventually the truth comes out. A warning against dishonesty.",
    theme: "Honesty",
  },
  {
    id: "p8",
    romanian: "Unde dai și unde crapă.",
    phonetic: "[OON-deh dah-ee shee OON-deh KRAH-puh]",
    literal: "Where you hit and where it cracks.",
    idiomatic: "Things don't always go as planned / unintended consequences.",
    explanation: "Used when an action produces unexpected results — you aimed one place but the impact landed somewhere else.",
    theme: "Consequences",
  },
];
