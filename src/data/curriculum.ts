export type LessonType = "grammar" | "pronunciation";
export type ExerciseType = "fill-blank" | "multiple-choice" | "audio-match";

export interface ExerciseOption {
  id: string;
  text: string;
  audio?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  romanianWord?: string;
  phonetic?: string;
  options?: ExerciseOption[];
  correctAnswer: string;
  explanation: string;
  blankSentence?: string;
}

export interface ExampleSentence {
  romanian: string;
  phonetic: string;
  english: string;
  audioId?: string;
}

export interface GrammarSection {
  title: string;
  content: string;
  examples?: ExampleSentence[];
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  estimatedMinutes: number;
  completed: boolean;
  sections: GrammarSection[];
  exercises: Exercise[];
}

export interface Level {
  id: string;
  code: "A1" | "A2" | "B1" | "B2";
  title: string;
  description: string;
  color: string;
  badgeColor: string;
  unlocked: boolean;
  lessons: Lesson[];
}

export const curriculum: Level[] = [
  {
    id: "a1",
    code: "A1",
    title: "Absolute Beginner",
    description: "Master the foundations: alphabet, basic greetings, and essential vocabulary.",
    color: "#8B1A1A",
    badgeColor: "bg-[#8B1A1A] text-[#F5EFE0]",
    unlocked: true,
    lessons: [
      {
        id: "a1-l1",
        title: "The Romanian Alphabet",
        type: "pronunciation",
        estimatedMinutes: 15,
        completed: false,
        sections: [
          {
            title: "Overview",
            content: "Romanian uses the Latin alphabet with 31 letters, including five special characters: ă, â, î, ș, ț. These letters are unique to Romanian and distinguish it from other Romance languages.",
            examples: [
              { romanian: "ă", phonetic: "[uh]", english: "like 'u' in 'butter'" },
              { romanian: "â / î", phonetic: "[ɨ]", english: "a central vowel, no English equivalent" },
              { romanian: "ș", phonetic: "[sh]", english: "like 'sh' in 'shoe'" },
              { romanian: "ț", phonetic: "[ts]", english: "like 'ts' in 'cats'" },
            ]
          },
          {
            title: "Vowel Sounds",
            content: "Romanian has seven vowel sounds: a, e, i, o, u, ă, and â/î. Each has a distinct, consistent pronunciation unlike the varied vowel sounds in English.",
            examples: [
              { romanian: "casă", phonetic: "[KAH-suh]", english: "house" },
              { romanian: "elev", phonetic: "[eh-LEV]", english: "student" },
              { romanian: "inimă", phonetic: "[EE-nee-muh]", english: "heart" },
            ]
          }
        ],
        exercises: [
          {
            id: "a1-l1-e1",
            type: "multiple-choice",
            question: "What sound does the Romanian letter 'ș' make?",
            options: [
              { id: "a", text: "like 'z' in 'zebra'" },
              { id: "b", text: "like 'sh' in 'shoe'" },
              { id: "c", text: "like 's' in 'sun'" },
              { id: "d", text: "like 'ch' in 'church'" },
            ],
            correctAnswer: "b",
            explanation: "The letter 'ș' produces the 'sh' sound, as in the English word 'shoe'. It is always consistent — never varies like English 's' can."
          },
          {
            id: "a1-l1-e2",
            type: "fill-blank",
            question: "Complete the phonetic transcription of 'casă' (house):",
            blankSentence: "[KAH-___]",
            correctAnswer: "suh",
            explanation: "'casă' is pronounced [KAH-suh]. The 'ă' sounds like the 'u' in 'butter' — a short, unstressed central vowel."
          }
        ]
      },
      {
        id: "a1-l2",
        title: "Basic Greetings",
        type: "grammar",
        estimatedMinutes: 12,
        completed: false,
        sections: [
          {
            title: "Formal vs. Informal",
            content: "Romanian distinguishes between formal and informal registers. Use formal greetings with strangers, elders, and in professional settings. Informal greetings are for friends and family.",
            examples: [
              { romanian: "Bună ziua", phonetic: "[BOO-nuh ZEE-wah]", english: "Good day (formal)" },
              { romanian: "Bună", phonetic: "[BOO-nuh]", english: "Hi / Hello (informal)" },
              { romanian: "Salut", phonetic: "[sah-LOOT]", english: "Hey (informal)" },
              { romanian: "La revedere", phonetic: "[lah reh-veh-DEH-reh]", english: "Goodbye (formal)" },
              { romanian: "Pa", phonetic: "[pah]", english: "Bye (informal)" },
            ]
          },
          {
            title: "Time-Based Greetings",
            content: "Romanian has specific greetings for different times of day, much like French or Spanish.",
            examples: [
              { romanian: "Bună dimineața", phonetic: "[BOO-nuh dee-mee-NYAH-tsah]", english: "Good morning" },
              { romanian: "Bună seara", phonetic: "[BOO-nuh SYAH-rah]", english: "Good evening" },
              { romanian: "Noapte bună", phonetic: "[NWAHP-teh BOO-nuh]", english: "Good night" },
            ]
          }
        ],
        exercises: [
          {
            id: "a1-l2-e1",
            type: "multiple-choice",
            question: "Which greeting would you use when meeting your professor for the first time?",
            options: [
              { id: "a", text: "Salut!" },
              { id: "b", text: "Pa!" },
              { id: "c", text: "Bună ziua!" },
              { id: "d", text: "Hey!" },
            ],
            correctAnswer: "c",
            explanation: "'Bună ziua' is the appropriate formal greeting for new acquaintances, professionals, and elders. 'Salut' is too casual for a first professional meeting."
          },
          {
            id: "a1-l2-e2",
            type: "fill-blank",
            question: "How do you say 'Good morning' in Romanian?",
            blankSentence: "Bună ___",
            correctAnswer: "dimineața",
            explanation: "'Bună dimineața' literally translates to 'Good morning'. 'Bună' means good, and 'dimineața' means morning."
          }
        ]
      },
      {
        id: "a1-l3",
        title: "Nouns & Gender",
        type: "grammar",
        estimatedMinutes: 20,
        completed: false,
        sections: [
          {
            title: "Three Genders",
            content: "Romanian is unique among Romance languages — it has three grammatical genders: masculine, feminine, and neuter. Neuter nouns act masculine in singular and feminine in plural. This is one of Romanian's most distinctive features.",
            examples: [
              { romanian: "băiat", phonetic: "[buh-YAHT]", english: "boy (masculine)" },
              { romanian: "fată", phonetic: "[FAH-tuh]", english: "girl (feminine)" },
              { romanian: "scaun", phonetic: "[SKOWN]", english: "chair (neuter)" },
            ]
          },
          {
            title: "Recognizing Gender by Ending",
            content: "Most masculine nouns end in a consonant. Most feminine nouns end in -ă or -e. Neuter nouns are tricky — they often end in a consonant (like masculine) but become feminine in plural.",
            examples: [
              { romanian: "un scaun / două scaune", phonetic: "[skown / SKOW-neh]", english: "a chair / two chairs (neuter)" },
              { romanian: "un om / doi oameni", phonetic: "[om / WAH-meh-nee]", english: "a man / men (masculine)" },
              { romanian: "o casă / două case", phonetic: "[KAH-suh / KAH-seh]", english: "a house / two houses (feminine)" },
            ]
          }
        ],
        exercises: [
          {
            id: "a1-l3-e1",
            type: "multiple-choice",
            question: "How many grammatical genders does Romanian have?",
            options: [
              { id: "a", text: "Two (masculine and feminine)" },
              { id: "b", text: "One (no gender)" },
              { id: "c", text: "Three (masculine, feminine, and neuter)" },
              { id: "d", text: "Four" },
            ],
            correctAnswer: "c",
            explanation: "Romanian uniquely has three genders — masculine, feminine, and neuter. Neuter nouns follow masculine patterns in singular and feminine patterns in plural."
          }
        ]
      },
      {
        id: "a1-l4",
        title: "Definite Articles",
        type: "grammar",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Enclitic Articles",
            content: "One of Romanian's most interesting features: the definite article is attached to the END of the noun, not placed before it like in French (le/la) or Spanish (el/la). This is called an enclitic article and is shared with Bulgarian and Albanian.",
            examples: [
              { romanian: "casă → casa", phonetic: "[KAH-suh → KAH-sah]", english: "house → the house" },
              { romanian: "băiat → băiatul", phonetic: "[buh-YAHT → buh-YAH-tool]", english: "boy → the boy" },
              { romanian: "scaun → scaunul", phonetic: "[SKOWN → SKOW-nool]", english: "chair → the chair" },
            ]
          },
          {
            title: "Indefinite Articles",
            content: "Indefinite articles come before the noun like in English. 'Un' for masculine/neuter singular, 'o' for feminine singular.",
            examples: [
              { romanian: "un băiat", phonetic: "[oon buh-YAHT]", english: "a boy" },
              { romanian: "o fată", phonetic: "[oh FAH-tuh]", english: "a girl" },
              { romanian: "un scaun", phonetic: "[oon SKOWN]", english: "a chair" },
            ]
          }
        ],
        exercises: [
          {
            id: "a1-l4-e1",
            type: "fill-blank",
            question: "Add the definite article to 'casă' (house) to get 'the house':",
            blankSentence: "cas___",
            correctAnswer: "a",
            explanation: "The feminine noun 'casă' becomes 'casa' (the house) by replacing the final 'ă' with 'a' as the enclitic article."
          },
          {
            id: "a1-l4-e2",
            type: "multiple-choice",
            question: "What makes Romanian's definite article unique among Romance languages?",
            options: [
              { id: "a", text: "It has no definite article" },
              { id: "b", text: "The article is attached to the end of the noun" },
              { id: "c", text: "The article always comes before the noun" },
              { id: "d", text: "It uses 'the' like English" },
            ],
            correctAnswer: "b",
            explanation: "Romanian attaches the definite article to the end of the noun (enclitic), unlike other Romance languages which place it before. This feature is shared with Bulgarian and Albanian."
          }
        ]
      }
    ]
  },
  {
    id: "a2",
    code: "A2",
    title: "Elementary",
    description: "Build fluency in present tense, expand vocabulary, and tackle case endings.",
    color: "#C9922A",
    badgeColor: "bg-[#C9922A] text-white",
    unlocked: false,
    lessons: [
      {
        id: "a2-l1",
        title: "Present Tense Verbs",
        type: "grammar",
        estimatedMinutes: 25,
        completed: false,
        sections: [
          {
            title: "Four Conjugation Groups",
            content: "Romanian verbs are divided into four conjugation groups based on their infinitive endings: -a, -ea, -e, and -i/-î. Each group follows distinct patterns for all persons.",
            examples: [
              { romanian: "a vorbi", phonetic: "[ah vor-BEE]", english: "to speak" },
              { romanian: "eu vorbesc", phonetic: "[yew vor-BESK]", english: "I speak" },
              { romanian: "tu vorbești", phonetic: "[too vor-BEHSHTS]", english: "you speak" },
              { romanian: "el/ea vorbește", phonetic: "[yel/yah vor-BEHSH-teh]", english: "he/she speaks" },
            ]
          }
        ],
        exercises: [
          {
            id: "a2-l1-e1",
            type: "multiple-choice",
            question: "How many conjugation groups do Romanian verbs have?",
            options: [
              { id: "a", text: "Two" },
              { id: "b", text: "Three" },
              { id: "c", text: "Four" },
              { id: "d", text: "Five" },
            ],
            correctAnswer: "c",
            explanation: "Romanian verbs have four conjugation groups based on their infinitive ending: -a, -ea, -e, and -i/-î."
          }
        ]
      },
      {
        id: "a2-l2",
        title: "Pronunciation: Diphthongs",
        type: "pronunciation",
        estimatedMinutes: 15,
        completed: false,
        sections: [
          {
            title: "Common Diphthongs",
            content: "Romanian has several diphthongs — combinations of two vowel sounds gliding together. Mastering these is key to sounding natural.",
            examples: [
              { romanian: "iarbă", phonetic: "[YAHR-buh]", english: "grass (ia diphthong)" },
              { romanian: "seară", phonetic: "[SYAH-ruh]", english: "evening (ea diphthong)" },
              { romanian: "oameni", phonetic: "[WAH-meh-nee]", english: "people (oa diphthong)" },
            ]
          }
        ],
        exercises: [
          {
            id: "a2-l2-e1",
            type: "fill-blank",
            question: "The Romanian 'oa' diphthong sounds like the English word beginning with:",
            blankSentence: "___ater",
            correctAnswer: "w",
            explanation: "The 'oa' diphthong sounds like the beginning of 'water' in English — a glide from 'w' into 'a'."
          }
        ]
      },
      {
        id: "a2-l3",
        title: "Numbers 1–100",
        type: "grammar",
        estimatedMinutes: 20,
        completed: false,
        sections: [
          {
            title: "Cardinal Numbers",
            content: "Romanian numbers 1–19 are unique forms. From 20 onwards, Romanian uses a system meaning 'twenty with one', 'twenty with two', etc. — unique among Romance languages.",
            examples: [
              { romanian: "unu, doi, trei", phonetic: "[OO-noo, doy, tray]", english: "one, two, three" },
              { romanian: "zece", phonetic: "[ZEH-cheh]", english: "ten" },
              { romanian: "douăzeci și unu", phonetic: "[DWAH-zeh-chee shee OO-noo]", english: "twenty-one" },
            ]
          }
        ],
        exercises: [
          {
            id: "a2-l3-e1",
            type: "multiple-choice",
            question: "How does Romanian construct numbers like 21, 22, etc.?",
            options: [
              { id: "a", text: "twenty-one, twenty-two (like English)" },
              { id: "b", text: "twenty with one, twenty with two" },
              { id: "c", text: "one-twenty, two-twenty" },
              { id: "d", text: "Uses the French system" },
            ],
            correctAnswer: "b",
            explanation: "Romanian uniquely constructs compound numbers as 'twenty WITH one' (douăzeci și unu), where 'și' means 'and/with'."
          }
        ]
      }
    ]
  },
  {
    id: "b1",
    code: "B1",
    title: "Intermediate",
    description: "Master case system, past tenses, and complex sentence structures.",
    color: "#2D5A27",
    badgeColor: "bg-[#2D5A27] text-white",
    unlocked: false,
    lessons: [
      {
        id: "b1-l1",
        title: "The Case System",
        type: "grammar",
        estimatedMinutes: 30,
        completed: false,
        sections: [
          {
            title: "Five Cases",
            content: "Romanian has five cases: Nominative, Accusative, Genitive, Dative, and Vocative. Unlike Latin, Romanian simplified by merging Nominative/Accusative and Genitive/Dative into the same form for most nouns.",
            examples: [
              { romanian: "Mama vine.", phonetic: "[MAH-mah VEE-neh]", english: "Mom is coming. (Nominative)" },
              { romanian: "O văd pe mama.", phonetic: "[oh vuhd peh MAH-mah]", english: "I see mom. (Accusative)" },
              { romanian: "Cartea mamei.", phonetic: "[KAR-tyah MAH-meh-ee]", english: "Mom's book. (Genitive)" },
            ]
          }
        ],
        exercises: [
          {
            id: "b1-l1-e1",
            type: "multiple-choice",
            question: "How many cases does Romanian have?",
            options: [
              { id: "a", text: "Three" },
              { id: "b", text: "Four" },
              { id: "c", text: "Five" },
              { id: "d", text: "Seven" },
            ],
            correctAnswer: "c",
            explanation: "Romanian has five cases: Nominative, Accusative, Genitive, Dative, and Vocative. The N/A and G/D pairs share the same forms for most nouns."
          }
        ]
      },
      {
        id: "b1-l2",
        title: "Past Tenses",
        type: "grammar",
        estimatedMinutes: 28,
        completed: false,
        sections: [
          {
            title: "Perfect Compus",
            content: "The most commonly used past tense is the perfect compus (compound perfect), equivalent to both simple past and present perfect in English. It is formed with the auxiliary 'a avea' (to have) + past participle.",
            examples: [
              { romanian: "Am mâncat.", phonetic: "[am mun-KAHT]", english: "I ate / I have eaten." },
              { romanian: "Ai vorbit cu el?", phonetic: "[ay vor-BEET koo yel]", english: "Did you speak / Have you spoken to him?" },
              { romanian: "A plecat.", phonetic: "[ah pleh-KAHT]", english: "He/she left / has left." },
            ]
          }
        ],
        exercises: [
          {
            id: "b1-l2-e1",
            type: "fill-blank",
            question: "Form the past tense: 'I ate' using the verb 'a mânca':",
            blankSentence: "___ mâncat",
            correctAnswer: "Am",
            explanation: "The perfect compus is formed with the auxiliary 'a avea': 'am' (I have) + past participle 'mâncat' = 'am mâncat' (I ate / have eaten)."
          }
        ]
      },
      {
        id: "b1-l3",
        title: "Stress Patterns",
        type: "pronunciation",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Variable Word Stress",
            content: "Romanian word stress is not fixed — it can fall on different syllables and sometimes changes meaning. While there are patterns, learners must memorize stress for each word.",
            examples: [
              { romanian: "copíl", phonetic: "[ko-PEEL]", english: "child (stress on 2nd syllable)" },
              { romanian: "cópil", phonetic: "[KOH-peel]", english: "not a word — wrong stress!" },
              { romanian: "mobilă", phonetic: "[MOH-bee-luh]", english: "furniture (stress on 1st syllable)" },
            ]
          }
        ],
        exercises: [
          {
            id: "b1-l3-e1",
            type: "multiple-choice",
            question: "Where does the stress fall in 'copil' (child)?",
            options: [
              { id: "a", text: "First syllable: COpil" },
              { id: "b", text: "Second syllable: coPIL" },
              { id: "c", text: "Both syllables equally" },
              { id: "d", text: "No stress" },
            ],
            correctAnswer: "b",
            explanation: "'copil' (child) is stressed on the second syllable: co-PIL. Getting Romanian stress wrong can make words unrecognizable to native speakers."
          }
        ]
      }
    ]
  },
  {
    id: "b2",
    code: "B2",
    title: "Upper Intermediate",
    description: "Navigate subjunctive mood, complex discourse, and idiomatic expressions.",
    color: "#1A3A6B",
    badgeColor: "bg-[#1A3A6B] text-white",
    unlocked: false,
    lessons: [
      {
        id: "b2-l1",
        title: "Subjunctive Mood",
        type: "grammar",
        estimatedMinutes: 35,
        completed: false,
        sections: [
          {
            title: "The Conjunctiv",
            content: "The Romanian subjunctive (conjunctiv) is used far more frequently than in English. It appears after verbs of wanting, wishing, necessity, and many conjunctions. It is formed with 'să' + present or past form.",
            examples: [
              { romanian: "Vreau să merg.", phonetic: "[vryow suh merg]", english: "I want to go." },
              { romanian: "Trebuie să înveți.", phonetic: "[TREH-boo-yeh suh un-VEHTS]", english: "You must study." },
              { romanian: "E important să știi.", phonetic: "[yeh eem-por-TAHNT suh shtyee]", english: "It's important to know." },
            ]
          }
        ],
        exercises: [
          {
            id: "b2-l1-e1",
            type: "multiple-choice",
            question: "What particle introduces the subjunctive in Romanian?",
            options: [
              { id: "a", text: "că" },
              { id: "b", text: "să" },
              { id: "c", text: "de" },
              { id: "d", text: "pe" },
            ],
            correctAnswer: "b",
            explanation: "The particle 'să' introduces the subjunctive (conjunctiv) in Romanian. It's equivalent to 'to' in English infinitives: 'vreau să merg' = 'I want to go'."
          }
        ]
      },
      {
        id: "b2-l2",
        title: "Idiomatic Expressions",
        type: "grammar",
        estimatedMinutes: 22,
        completed: false,
        sections: [
          {
            title: "Common Romanian Idioms",
            content: "Romanian idioms reflect the culture's humor, pragmatism, and Latin roots mixed with Slavic influences. Learning idioms helps you sound natural and understand native speakers.",
            examples: [
              { romanian: "A da cu bâta-n baltă", phonetic: "[ah dah koo BUH-tah un BAL-tuh]", english: "To stir up trouble (lit. to hit the pond with a stick)" },
              { romanian: "A tăia frunze la câini", phonetic: "[ah tuh-YAH FROON-zeh lah KUY-nee]", english: "To waste time (lit. to cut leaves for dogs)" },
              { romanian: "Capul face, capul trage", phonetic: "[KAH-pool FAH-cheh, KAH-pool TRAH-geh]", english: "Actions have consequences (lit. the head does, the head bears)" },
            ]
          }
        ],
        exercises: [
          {
            id: "b2-l2-e1",
            type: "multiple-choice",
            question: "What does 'a tăia frunze la câini' mean?",
            options: [
              { id: "a", text: "To work very hard" },
              { id: "b", text: "To waste time doing nothing useful" },
              { id: "c", text: "To care for animals" },
              { id: "d", text: "To cut vegetables" },
            ],
            correctAnswer: "b",
            explanation: "Literally 'to cut leaves for dogs' — this idiom describes wasting time on pointless activities, since dogs don't eat leaves."
          }
        ]
      },
      {
        id: "b2-l3",
        title: "Conditional & Hypothetical",
        type: "grammar",
        estimatedMinutes: 30,
        completed: false,
        sections: [
          {
            title: "Conditional Mood",
            content: "Romanian uses the conditional-optative mood for hypothetical situations, polite requests, and wishes. It is formed with the auxiliary 'ar' + infinitive stem.",
            examples: [
              { romanian: "Aș vrea un ceai.", phonetic: "[ash vryah oon chay]", english: "I would like a tea. (polite request)" },
              { romanian: "Dacă aș putea, aș veni.", phonetic: "[DAH-kuh ash poo-TYAH, ash veh-NEE]", english: "If I could, I would come." },
              { romanian: "Ar trebui să pleci.", phonetic: "[ar TREH-boo-ee suh PLETCH]", english: "You should leave." },
            ]
          }
        ],
        exercises: [
          {
            id: "b2-l3-e1",
            type: "fill-blank",
            question: "Complete the polite request: '___ vrea un ceai' (I would like a tea):",
            blankSentence: "___ vrea un ceai",
            correctAnswer: "Aș",
            explanation: "'Aș' is the conditional auxiliary for the first person singular. It combines with the infinitive stem: 'aș vrea' (I would want/like)."
          }
        ]
      }
    ]
  }
];

export const grammarTables = {
  nounGenders: {
    title: "Noun Genders",
    headers: ["Gender", "Singular Article", "Plural Article", "Example"],
    rows: [
      ["Masculine", "un (indef.) / -ul (def.)", "niște (indef.) / -ii (def.)", "băiat / băiatul"],
      ["Feminine", "o (indef.) / -a (def.)", "niște (indef.) / -le (def.)", "casă / casa"],
      ["Neuter", "un (indef.) / -ul (def.)", "niște (indef.) / -le (def.)", "scaun / scaunul"],
    ]
  },
  verbEndings: {
    title: "Present Tense: -a Verbs",
    headers: ["Person", "Singular", "Example (a lucra)"],
    rows: [
      ["1st", "-ez / -", "lucrez (I work)"],
      ["2nd", "-ezi / -i", "lucrezi (you work)"],
      ["3rd", "-ează / -ă", "lucrează (he/she works)"],
    ]
  },
  cases: {
    title: "Case Uses",
    headers: ["Case", "Use", "Example"],
    rows: [
      ["Nominative", "Subject of sentence", "Mama pleacă. (Mom leaves.)"],
      ["Accusative", "Direct object", "Văd mama. (I see mom.)"],
      ["Genitive", "Possession", "Cartea mamei (Mom's book)"],
      ["Dative", "Indirect object", "Dau mamei (I give to mom)"],
      ["Vocative", "Direct address", "Mamă! (Mom!)"],
    ]
  }
};
