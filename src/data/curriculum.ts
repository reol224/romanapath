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
    description:
      "Master the foundations: alphabet, greetings, nouns & gender, articles, pronouns, essential verbs, numbers, colors, questions, family vocabulary, and time expressions.",
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
            content:
              "Romanian uses the Latin alphabet with 31 letters, including five special characters: ă, â, î, ș, ț. These letters are unique to Romanian and distinguish it from other Romance languages.",
            examples: [
              {
                romanian: "ă",
                phonetic: "[uh]",
                english: "like 'u' in 'butter'",
              },
              {
                romanian: "â / î",
                phonetic: "[ɨ]",
                english: "a central vowel, no English equivalent",
              },
              {
                romanian: "ș",
                phonetic: "[sh]",
                english: "like 'sh' in 'shoe'",
              },
              {
                romanian: "ț",
                phonetic: "[ts]",
                english: "like 'ts' in 'cats'",
              },
            ],
          },
          {
            title: "Vowel Sounds",
            content:
              "Romanian has seven vowel sounds: a, e, i, o, u, ă, and â/î. Each has a distinct, consistent pronunciation unlike the varied vowel sounds in English.",
            examples: [
              { romanian: "casă", phonetic: "[KAH-suh]", english: "house" },
              { romanian: "elev", phonetic: "[eh-LEV]", english: "student" },
              { romanian: "inimă", phonetic: "[EE-nee-muh]", english: "heart" },
            ],
          },
          {
            title: "Consonant Sounds",
            content:
              "Most Romanian consonants are similar to English. Key differences: 'c' before e/i sounds like 'ch'; 'g' before e/i sounds like 'j' in 'measure'; 'h' is always pronounced like English 'h'.",
            examples: [
              {
                romanian: "ceai",
                phonetic: "[chay]",
                english: "tea (c + e = 'ch')",
              },
              {
                romanian: "gem",
                phonetic: "[zhem]",
                english: "jam (g + e = soft 'j')",
              },
              {
                romanian: "hartă",
                phonetic: "[HAR-tuh]",
                english: "map (h always voiced)",
              },
            ],
          },
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
            explanation:
              "The letter 'ș' produces the 'sh' sound, as in the English word 'shoe'. It is always consistent — never varies like English 's' can.",
          },
          {
            id: "a1-l1-e2",
            type: "fill-blank",
            question: "Complete the phonetic transcription of 'casă' (house):",
            blankSentence: "[KAH-___]",
            correctAnswer: "suh",
            explanation:
              "'casă' is pronounced [KAH-suh]. The 'ă' sounds like the 'u' in 'butter' — a short, unstressed central vowel.",
          },
          {
            id: "a1-l1-e3",
            type: "multiple-choice",
            question: "How many letters does the Romanian alphabet have?",
            options: [
              { id: "a", text: "26 (same as English)" },
              { id: "b", text: "28" },
              { id: "c", text: "31" },
              { id: "d", text: "33" },
            ],
            correctAnswer: "c",
            explanation:
              "Romanian has 31 letters — the 26 standard Latin letters plus 5 special characters: ă, â, î, ș, ț.",
          },
        ],
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
            content:
              "Romanian distinguishes between formal and informal registers. Use formal greetings with strangers, elders, and in professional settings. Informal greetings are for friends and family.",
            examples: [
              {
                romanian: "Bună ziua",
                phonetic: "[BOO-nuh ZEE-wah]",
                english: "Good day (formal)",
              },
              {
                romanian: "Bună",
                phonetic: "[BOO-nuh]",
                english: "Hi / Hello (informal)",
              },
              {
                romanian: "Salut",
                phonetic: "[sah-LOOT]",
                english: "Hey (informal)",
              },
              {
                romanian: "La revedere",
                phonetic: "[lah reh-veh-DEH-reh]",
                english: "Goodbye (formal)",
              },
              { romanian: "Pa", phonetic: "[pah]", english: "Bye (informal)" },
            ],
          },
          {
            title: "Time-Based Greetings",
            content:
              "Romanian has specific greetings for different times of day, much like French or Spanish.",
            examples: [
              {
                romanian: "Bună dimineața",
                phonetic: "[BOO-nuh dee-mee-NYAH-tsah]",
                english: "Good morning",
              },
              {
                romanian: "Bună seara",
                phonetic: "[BOO-nuh SYAH-rah]",
                english: "Good evening",
              },
              {
                romanian: "Noapte bună",
                phonetic: "[NWAHP-teh BOO-nuh]",
                english: "Good night",
              },
            ],
          },
          {
            title: "Polite Expressions",
            content:
              "Essential polite phrases every Romanian learner needs from day one.",
            examples: [
              {
                romanian: "Vă rog",
                phonetic: "[vuh ROG]",
                english: "Please (formal)",
              },
              {
                romanian: "Te rog",
                phonetic: "[teh ROG]",
                english: "Please (informal)",
              },
              {
                romanian: "Mulțumesc",
                phonetic: "[mool-tsoo-MESK]",
                english: "Thank you",
              },
              {
                romanian: "Cu plăcere",
                phonetic: "[koo pluh-CHEH-reh]",
                english: "You're welcome",
              },
              {
                romanian: "Îmi pare rău",
                phonetic: "[uum PAH-reh ruh-OO]",
                english: "I'm sorry",
              },
              {
                romanian: "Scuzați",
                phonetic: "[skoo-ZAHTS]",
                english: "Excuse me (formal)",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l2-e1",
            type: "multiple-choice",
            question:
              "Which greeting would you use when meeting your professor for the first time?",
            options: [
              { id: "a", text: "Salut!" },
              { id: "b", text: "Pa!" },
              { id: "c", text: "Bună ziua!" },
              { id: "d", text: "Hey!" },
            ],
            correctAnswer: "c",
            explanation:
              "'Bună ziua' is the appropriate formal greeting for new acquaintances, professionals, and elders. 'Salut' is too casual for a first professional meeting.",
          },
          {
            id: "a1-l2-e2",
            type: "fill-blank",
            question: "How do you say 'Good morning' in Romanian?",
            blankSentence: "Bună ___",
            correctAnswer: "dimineața",
            explanation:
              "'Bună dimineața' literally translates to 'Good morning'. 'Bună' means good, and 'dimineața' means morning.",
          },
          {
            id: "a1-l2-e3",
            type: "multiple-choice",
            question: "How do you say 'Thank you' in Romanian?",
            options: [
              { id: "a", text: "Scuzați" },
              { id: "b", text: "Mulțumesc" },
              { id: "c", text: "Vă rog" },
              { id: "d", text: "Salut" },
            ],
            correctAnswer: "b",
            explanation:
              "'Mulțumesc' means 'thank you'. It comes from the verb 'a mulțumi' meaning 'to thank'.",
          },
        ],
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
            content:
              "Romanian is unique among Romance languages — it has three grammatical genders: masculine, feminine, and neuter. Neuter nouns act masculine in singular and feminine in plural. This is one of Romanian's most distinctive features.",
            examples: [
              {
                romanian: "băiat",
                phonetic: "[buh-YAHT]",
                english: "boy (masculine)",
              },
              {
                romanian: "fată",
                phonetic: "[FAH-tuh]",
                english: "girl (feminine)",
              },
              {
                romanian: "scaun",
                phonetic: "[SKOWN]",
                english: "chair (neuter)",
              },
            ],
          },
          {
            title: "Recognizing Gender by Ending",
            content:
              "Most masculine nouns end in a consonant. Most feminine nouns end in -ă or -e. Neuter nouns are tricky — they often end in a consonant (like masculine) but become feminine in plural.",
            examples: [
              {
                romanian: "un scaun / două scaune",
                phonetic: "[skown / SKOW-neh]",
                english: "a chair / two chairs (neuter)",
              },
              {
                romanian: "un om / doi oameni",
                phonetic: "[om / WAH-meh-nee]",
                english: "a man / men (masculine)",
              },
              {
                romanian: "o casă / două case",
                phonetic: "[KAH-suh / KAH-seh]",
                english: "a house / two houses (feminine)",
              },
            ],
          },
          {
            title: "More Gender Examples",
            content:
              "Building vocabulary with all three genders. Pay attention to the endings — they reveal the gender pattern.",
            examples: [
              {
                romanian: "câine (M) / pisică (F) / animal (N)",
                phonetic: "[KUY-neh / pee-SEE-kuh / ah-nee-MAHL]",
                english: "dog / cat / animal",
              },
              {
                romanian: "profesor (M) / profesoară (F) / birou (N)",
                phonetic: "[pro-feh-SOR / pro-feh-SWAH-ruh / bee-ROO]",
                english: "teacher (m) / teacher (f) / office",
              },
              {
                romanian: "copac (M) / floare (F) / lac (N)",
                phonetic: "[ko-PAHK / FWAH-reh / lahk]",
                english: "tree / flower / lake",
              },
            ],
          },
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
            explanation:
              "Romanian uniquely has three genders — masculine, feminine, and neuter. Neuter nouns follow masculine patterns in singular and feminine patterns in plural.",
          },
          {
            id: "a1-l3-e2",
            type: "multiple-choice",
            question: "What gender is 'casă' (house)?",
            options: [
              { id: "a", text: "Masculine" },
              { id: "b", text: "Feminine" },
              { id: "c", text: "Neuter" },
              { id: "d", text: "It has no gender" },
            ],
            correctAnswer: "b",
            explanation:
              "'casă' ends in -ă which is a typical feminine ending. Its plural 'case' also follows the feminine pattern.",
          },
        ],
      },
      {
        id: "a1-l4",
        title: "Definite & Indefinite Articles",
        type: "grammar",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Enclitic Definite Articles",
            content:
              "One of Romanian's most interesting features: the definite article is attached to the END of the noun, not placed before it like in French (le/la) or Spanish (el/la). This is called an enclitic article and is shared with Bulgarian and Albanian.",
            examples: [
              {
                romanian: "casă → casa",
                phonetic: "[KAH-suh → KAH-sah]",
                english: "house → the house",
              },
              {
                romanian: "băiat → băiatul",
                phonetic: "[buh-YAHT → buh-YAH-tool]",
                english: "boy → the boy",
              },
              {
                romanian: "scaun → scaunul",
                phonetic: "[SKOWN → SKOW-nool]",
                english: "chair → the chair",
              },
            ],
          },
          {
            title: "Indefinite Articles",
            content:
              "Indefinite articles come before the noun like in English. 'Un' for masculine/neuter singular, 'o' for feminine singular.",
            examples: [
              {
                romanian: "un băiat",
                phonetic: "[oon buh-YAHT]",
                english: "a boy",
              },
              {
                romanian: "o fată",
                phonetic: "[oh FAH-tuh]",
                english: "a girl",
              },
              {
                romanian: "un scaun",
                phonetic: "[oon SKOWN]",
                english: "a chair",
              },
            ],
          },
          {
            title: "Definite Article Patterns by Gender",
            content:
              "The definite article suffix varies by gender: masculine adds -ul or -le, feminine changes -ă to -a or adds -a, neuter adds -ul in singular.",
            examples: [
              {
                romanian: "om → omul",
                phonetic: "[om → OH-mool]",
                english: "man → the man (masc. + -ul)",
              },
              {
                romanian: "fată → fata",
                phonetic: "[FAH-tuh → FAH-tah]",
                english: "girl → the girl (fem. -ă → -a)",
              },
              {
                romanian: "munte → muntele",
                phonetic: "[MOON-teh → moon-TEH-leh]",
                english: "mountain → the mountain (masc. -e → -le)",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l4-e1",
            type: "fill-blank",
            question:
              "Add the definite article to 'casă' (house) to get 'the house':",
            blankSentence: "cas___",
            correctAnswer: "a",
            explanation:
              "The feminine noun 'casă' becomes 'casa' (the house) by replacing the final 'ă' with 'a' as the enclitic article.",
          },
          {
            id: "a1-l4-e2",
            type: "multiple-choice",
            question:
              "What makes Romanian's definite article unique among Romance languages?",
            options: [
              { id: "a", text: "It has no definite article" },
              {
                id: "b",
                text: "The article is attached to the end of the noun",
              },
              { id: "c", text: "The article always comes before the noun" },
              { id: "d", text: "It uses 'the' like English" },
            ],
            correctAnswer: "b",
            explanation:
              "Romanian attaches the definite article to the end of the noun (enclitic), unlike other Romance languages which place it before. This feature is shared with Bulgarian and Albanian.",
          },
          {
            id: "a1-l4-e3",
            type: "multiple-choice",
            question:
              "Which is the correct indefinite article for a feminine noun?",
            options: [
              { id: "a", text: "un" },
              { id: "b", text: "o" },
              { id: "c", text: "al" },
              { id: "d", text: "cel" },
            ],
            correctAnswer: "b",
            explanation:
              "'o' is the indefinite article for feminine singular nouns (e.g., o fată = a girl). 'un' is used for masculine and neuter singular nouns.",
          },
        ],
      },
      {
        id: "a1-l5",
        title: "Personal Pronouns",
        type: "grammar",
        estimatedMinutes: 16,
        completed: false,
        sections: [
          {
            title: "Subject Pronouns",
            content:
              "Romanian has subject pronouns for all persons. Unlike English, Romanian often drops the subject pronoun because the verb ending already tells you who is acting. However, pronouns are kept for emphasis.",
            examples: [
              { romanian: "eu", phonetic: "[yew]", english: "I" },
              {
                romanian: "tu",
                phonetic: "[too]",
                english: "you (singular, informal)",
              },
              {
                romanian: "el / ea",
                phonetic: "[yel / yah]",
                english: "he / she",
              },
              { romanian: "noi", phonetic: "[noy]", english: "we" },
              {
                romanian: "voi",
                phonetic: "[voy]",
                english: "you (plural / formal)",
              },
              {
                romanian: "ei / ele",
                phonetic: "[yay / EH-leh]",
                english: "they (m) / they (f)",
              },
            ],
          },
          {
            title: "Formal 'You' — Dumneavoastră",
            content:
              "In formal situations, Romanians use 'dumneavoastră' (abbreviated 'dvs.') instead of 'tu'. This is essential for professional settings, addressing elders, or strangers. The verb takes the plural form.",
            examples: [
              {
                romanian: "Dumneavoastră vorbiți română?",
                phonetic: "[doom-nyah-VWAS-truh vor-BEETS roh-MUH-nuh]",
                english: "Do you speak Romanian? (formal)",
              },
              {
                romanian: "Tu vorbești română?",
                phonetic: "[too vor-BEHSHTS roh-MUH-nuh]",
                english: "Do you speak Romanian? (informal)",
              },
            ],
          },
          {
            title: "Pro-drop: Dropping the Subject",
            content:
              "Romanian is a 'pro-drop' language — the subject pronoun is often omitted because verb endings indicate the subject. You'll hear both forms in natural speech.",
            examples: [
              {
                romanian: "Merg la școală.",
                phonetic: "[merg lah SHKWAH-luh]",
                english: "I go to school. (eu omitted)",
              },
              {
                romanian: "Eu merg la școală.",
                phonetic: "[yew merg lah SHKWAH-luh]",
                english: "I go to school. (eu kept for emphasis)",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l5-e1",
            type: "multiple-choice",
            question: "What is the Romanian word for 'she'?",
            options: [
              { id: "a", text: "el" },
              { id: "b", text: "eu" },
              { id: "c", text: "ea" },
              { id: "d", text: "ei" },
            ],
            correctAnswer: "c",
            explanation:
              "'ea' means 'she'. 'el' means 'he'. They are pronounced [yah] and [yel] respectively.",
          },
          {
            id: "a1-l5-e2",
            type: "fill-blank",
            question: "Complete: '___ sunt student.' (I am a student.)",
            blankSentence: "___ sunt student.",
            correctAnswer: "Eu",
            explanation:
              "'Eu' (I) is the first-person singular subject pronoun. In everyday speech it is often dropped, but here it emphasizes the subject.",
          },
        ],
      },
      {
        id: "a1-l6",
        title: "The Verb 'A Fi' (To Be)",
        type: "grammar",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Present Tense of 'A Fi'",
            content:
              "The most important verb in Romanian is 'a fi' (to be). It is irregular, just like 'to be' in English. Mastering it unlocks countless basic sentences.",
            examples: [
              { romanian: "eu sunt", phonetic: "[yew soont]", english: "I am" },
              {
                romanian: "tu ești",
                phonetic: "[too yeshts]",
                english: "you are",
              },
              {
                romanian: "el/ea este",
                phonetic: "[yel/yah YES-teh]",
                english: "he/she is",
              },
              {
                romanian: "noi suntem",
                phonetic: "[noy SOON-tem]",
                english: "we are",
              },
              {
                romanian: "voi sunteți",
                phonetic: "[voy SOON-tets]",
                english: "you (pl.) are",
              },
              {
                romanian: "ei/ele sunt",
                phonetic: "[yay/EH-leh soont]",
                english: "they are",
              },
            ],
          },
          {
            title: "Using 'A Fi' in Sentences",
            content:
              "With 'a fi' you can introduce yourself, describe people and things, and express nationality, profession, and origin.",
            examples: [
              {
                romanian: "Sunt român.",
                phonetic: "[soont roh-MUN]",
                english: "I am Romanian.",
              },
              {
                romanian: "Ea este profesoară.",
                phonetic: "[yah YES-teh pro-feh-SWAH-ruh]",
                english: "She is a teacher.",
              },
              {
                romanian: "Suntem acasă.",
                phonetic: "[SOON-tem ah-KAH-suh]",
                english: "We are at home.",
              },
            ],
          },
          {
            title: "Negation with 'Nu'",
            content:
              "To negate a verb in Romanian, simply place 'nu' (not) before it. This applies to all verbs, not just 'a fi'.",
            examples: [
              {
                romanian: "Nu sunt obosit.",
                phonetic: "[noo soont oh-boh-SEET]",
                english: "I am not tired.",
              },
              {
                romanian: "El nu este acasă.",
                phonetic: "[yel noo YES-teh ah-KAH-suh]",
                english: "He is not at home.",
              },
              {
                romanian: "Nu înțeleg.",
                phonetic: "[noo un-TSEH-leg]",
                english: "I don't understand.",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l6-e1",
            type: "multiple-choice",
            question: "How do you say 'She is a teacher' in Romanian?",
            options: [
              { id: "a", text: "Ea sunt profesoară." },
              { id: "b", text: "Ea este profesoară." },
              { id: "c", text: "Ea ești profesoară." },
              { id: "d", text: "Ea suntem profesoară." },
            ],
            correctAnswer: "b",
            explanation:
              "Third person singular uses 'este' (is). 'ea' = she, 'este' = is, 'profesoară' = teacher (f).",
          },
          {
            id: "a1-l6-e2",
            type: "fill-blank",
            question: "Complete: 'Noi ___ acasă.' (We are at home.)",
            blankSentence: "Noi ___ acasă.",
            correctAnswer: "suntem",
            explanation:
              "'suntem' is the first person plural form of 'a fi'. The full conjugation: sunt, ești, este, suntem, sunteți, sunt.",
          },
          {
            id: "a1-l6-e3",
            type: "multiple-choice",
            question: "How do you say 'I am not tired' in Romanian?",
            options: [
              { id: "a", text: "Sunt nu obosit." },
              { id: "b", text: "Nu sunt obosit." },
              { id: "c", text: "Sunt obosit nu." },
              { id: "d", text: "Fără sunt obosit." },
            ],
            correctAnswer: "b",
            explanation:
              "In Romanian, 'nu' (not) always goes directly before the verb: 'Nu sunt obosit' (I am not tired).",
          },
        ],
      },
      {
        id: "a1-l7",
        title: "The Verb 'A Avea' (To Have)",
        type: "grammar",
        estimatedMinutes: 16,
        completed: false,
        sections: [
          {
            title: "Present Tense of 'A Avea'",
            content:
              "'A avea' (to have) is the second most important verb in Romanian. It is also irregular and serves double duty — it is used both to express possession AND as a helping verb in past tenses.",
            examples: [
              { romanian: "eu am", phonetic: "[yew am]", english: "I have" },
              { romanian: "tu ai", phonetic: "[too eye]", english: "you have" },
              {
                romanian: "el/ea are",
                phonetic: "[yel/yah AH-reh]",
                english: "he/she has",
              },
              {
                romanian: "noi avem",
                phonetic: "[noy ah-VEM]",
                english: "we have",
              },
              {
                romanian: "voi aveți",
                phonetic: "[voy ah-VETS]",
                english: "you (pl.) have",
              },
              {
                romanian: "ei/ele au",
                phonetic: "[yay/EH-leh ow]",
                english: "they have",
              },
            ],
          },
          {
            title: "Expressing Possession",
            content:
              "Use 'a avea' to talk about what you own or possess. Note: Romanians say 'I have hunger' instead of 'I am hungry' — similar to French.",
            examples: [
              {
                romanian: "Am o mașină.",
                phonetic: "[am oh mah-SHEE-nuh]",
                english: "I have a car.",
              },
              {
                romanian: "Ai un câine?",
                phonetic: "[eye oon KUY-neh]",
                english: "Do you have a dog?",
              },
              {
                romanian: "Am foame.",
                phonetic: "[am FWAH-meh]",
                english: "I am hungry. (lit: I have hunger)",
              },
              {
                romanian: "Ai dreptate.",
                phonetic: "[eye drep-TAH-teh]",
                english: "You are right. (lit: You have rightness)",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l7-e1",
            type: "multiple-choice",
            question: "How do you say 'She has a cat' in Romanian?",
            options: [
              { id: "a", text: "Ea am o pisică." },
              { id: "b", text: "Ea ai o pisică." },
              { id: "c", text: "Ea are o pisică." },
              { id: "d", text: "Ea avem o pisică." },
            ],
            correctAnswer: "c",
            explanation:
              "Third person singular of 'a avea' is 'are'. 'ea' = she, 'are' = has, 'o pisică' = a cat.",
          },
          {
            id: "a1-l7-e2",
            type: "fill-blank",
            question:
              "How do you say 'I am hungry' in Romanian? (lit: I have hunger)",
            blankSentence: "___ foame.",
            correctAnswer: "Am",
            explanation:
              "Romanian expresses hunger with 'a fi' equivalent: 'Am foame' (I have hunger). The verb 'am' is first person singular of 'a avea'.",
          },
        ],
      },
      {
        id: "a1-l8",
        title: "Plural Nouns",
        type: "grammar",
        estimatedMinutes: 20,
        completed: false,
        sections: [
          {
            title: "Forming Plurals",
            content:
              "Romanian plural formation varies by gender. Masculine nouns often add -i. Feminine nouns change -ă to -e or add -i. Neuter nouns follow masculine in singular but feminine in plural — the so-called 'ambigenous' pattern.",
            examples: [
              {
                romanian: "băiat → băieți",
                phonetic: "[buh-YAHT → buh-YETS]",
                english: "boy → boys (masc. + -i)",
              },
              {
                romanian: "casă → case",
                phonetic: "[KAH-suh → KAH-seh]",
                english: "house → houses (fem. -ă → -e)",
              },
              {
                romanian: "scaun → scaune",
                phonetic: "[SKOWN → SKOW-neh]",
                english: "chair → chairs (neuter)",
              },
            ],
          },
          {
            title: "Irregular Plurals",
            content:
              "Some common nouns have irregular plurals that must be memorized. These are among the most frequently used words.",
            examples: [
              {
                romanian: "om → oameni",
                phonetic: "[om → WAH-meh-nee]",
                english: "man/person → people",
              },
              {
                romanian: "copil → copii",
                phonetic: "[ko-PEEL → ko-PEE]",
                english: "child → children",
              },
              {
                romanian: "mână → mâini",
                phonetic: "[MUH-nuh → MUY-nee]",
                english: "hand → hands",
              },
              {
                romanian: "ochi → ochi",
                phonetic: "[OH-kee → OH-kee]",
                english: "eye → eyes (unchanged!)",
              },
            ],
          },
          {
            title: "The Number Agreement",
            content:
              "Numbers affect how nouns are used. 'Doi/două' (two) and higher numbers require the indefinite plural. Numbers 1 use singular, 2-19 use 'de' + noun in some patterns.",
            examples: [
              {
                romanian: "un băiat / doi băieți",
                phonetic: "[oon buh-YAHT / doy buh-YETS]",
                english: "one boy / two boys",
              },
              {
                romanian: "o casă / două case",
                phonetic: "[oh KAH-suh / DWAH-uh KAH-seh]",
                english: "one house / two houses",
              },
              {
                romanian: "trei copii",
                phonetic: "[tray ko-PEE]",
                english: "three children",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l8-e1",
            type: "multiple-choice",
            question: "What is the plural of 'casă' (house)?",
            options: [
              { id: "a", text: "căși" },
              { id: "b", text: "case" },
              { id: "c", text: "casuri" },
              { id: "d", text: "casele" },
            ],
            correctAnswer: "b",
            explanation:
              "Feminine nouns ending in -ă form their plural by changing -ă to -e: casă → case.",
          },
          {
            id: "a1-l8-e2",
            type: "fill-blank",
            question: "Complete the plural: 'om' → '_____' (man → people)",
            blankSentence: "om → ___",
            correctAnswer: "oameni",
            explanation:
              "'oameni' is the irregular plural of 'om' (man/person). It literally means 'people' and its plural form is one of the most common words in Romanian.",
          },
        ],
      },
      {
        id: "a1-l9",
        title: "Essential Vocabulary: Family",
        type: "grammar",
        estimatedMinutes: 15,
        completed: false,
        sections: [
          {
            title: "Family Members",
            content:
              "Family vocabulary is essential for beginners. Note how Romanian distinguishes paternal and maternal grandparents with different words — a reflection of the culture's strong family bonds.",
            examples: [
              {
                romanian: "mamă / tată",
                phonetic: "[MAH-muh / TAH-tuh]",
                english: "mother / father",
              },
              {
                romanian: "frate / soră",
                phonetic: "[FRAH-teh / SOH-ruh]",
                english: "brother / sister",
              },
              {
                romanian: "bunic / bunică",
                phonetic: "[boo-NEEK / boo-NEE-kuh]",
                english: "grandfather / grandmother",
              },
              {
                romanian: "unchi / mătușă",
                phonetic: "[OONK-ee / muh-TOO-shuh]",
                english: "uncle / aunt",
              },
              {
                romanian: "văr / vară",
                phonetic: "[vur / VAH-ruh]",
                english: "male cousin / female cousin",
              },
            ],
          },
          {
            title: "Talking About Your Family",
            content:
              "Combine your knowledge of 'a avea' and 'a fi' to talk about your family members.",
            examples: [
              {
                romanian: "Am un frate și o soră.",
                phonetic: "[am oon FRAH-teh shee oh SOH-ruh]",
                english: "I have a brother and a sister.",
              },
              {
                romanian: "Mama mea este profesoară.",
                phonetic: "[MAH-mah myah YES-teh pro-feh-SWAH-ruh]",
                english: "My mother is a teacher.",
              },
              {
                romanian: "Fratele meu se numește Andrei.",
                phonetic: "[FRAH-teh-leh myew seh noo-MEYSH-teh ahn-DRAY]",
                english: "My brother's name is Andrei.",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l9-e1",
            type: "multiple-choice",
            question: "How do you say 'sister' in Romanian?",
            options: [
              { id: "a", text: "frate" },
              { id: "b", text: "mamă" },
              { id: "c", text: "soră" },
              { id: "d", text: "bunică" },
            ],
            correctAnswer: "c",
            explanation:
              "'soră' means sister. 'frate' is brother, 'mamă' is mother, and 'bunică' is grandmother.",
          },
          {
            id: "a1-l9-e2",
            type: "fill-blank",
            question:
              "Translate: 'I have a brother and a sister.' → 'Am un ___ și o ___.'",
            blankSentence: "Am un ___ și o soră.",
            correctAnswer: "frate",
            explanation:
              "'frate' (brother) is a masculine noun. The sentence is: 'Am un frate și o soră.'",
          },
        ],
      },
      {
        id: "a1-l10",
        title: "Numbers 1–20 & Basic Counting",
        type: "grammar",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Numbers 1–10",
            content:
              "The foundation of Romanian counting. Note that 'one' has different gender forms: 'unu' (m/n) and 'una' (f), but in counting we say 'unu' standalone.",
            examples: [
              {
                romanian: "unu, doi, trei, patru, cinci",
                phonetic: "[OO-noo, doy, tray, PAH-troo, cheench]",
                english: "one, two, three, four, five",
              },
              {
                romanian: "șase, șapte, opt, nouă, zece",
                phonetic: "[SHAH-seh, SHAHP-teh, opt, NOH-uh, ZEH-cheh]",
                english: "six, seven, eight, nine, ten",
              },
            ],
          },
          {
            title: "Numbers 11–20",
            content:
              "Numbers 11-19 follow a pattern: they add '-sprezece' (-spre- meaning 'over ten'). The exception is 11: 'unsprezece'.",
            examples: [
              {
                romanian: "unsprezece",
                phonetic: "[oon-SPREH-zeh-cheh]",
                english: "eleven",
              },
              {
                romanian: "doisprezece",
                phonetic: "[doys-PREH-zeh-cheh]",
                english: "twelve",
              },
              {
                romanian: "cincisprezece",
                phonetic: "[cheench-SPREH-zeh-cheh]",
                english: "fifteen",
              },
              {
                romanian: "nouăsprezece",
                phonetic: "[noh-uh-SPREH-zeh-cheh]",
                english: "nineteen",
              },
              {
                romanian: "douăzeci",
                phonetic: "[DWAH-uh-ZEH-chee]",
                english: "twenty",
              },
            ],
          },
          {
            title: "Gender with Numbers",
            content:
              "Romanian numbers 1 and 2 change form depending on the gender of the noun they modify. This is a key rule for correct speech.",
            examples: [
              {
                romanian: "un băiat / o fată",
                phonetic: "[oon buh-YAHT / oh FAH-tuh]",
                english: "one boy / one girl",
              },
              {
                romanian: "doi băieți / două fete",
                phonetic: "[doy buh-YETS / DWAH-uh FEH-teh]",
                english: "two boys / two girls",
              },
              {
                romanian: "două case / două scaune",
                phonetic: "[DWAH-uh KAH-seh / DWAH-uh SKOW-neh]",
                english: "two houses / two chairs",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l10-e1",
            type: "multiple-choice",
            question: "How do you say 'fifteen' in Romanian?",
            options: [
              { id: "a", text: "zececinci" },
              { id: "b", text: "cincizece" },
              { id: "c", text: "cincisprezece" },
              { id: "d", text: "cincisprece" },
            ],
            correctAnswer: "c",
            explanation:
              "'cincisprezece' = fifteen. The pattern is [number] + sprezece for 11-19: unsprezece, doisprezece, treisprezece…",
          },
          {
            id: "a1-l10-e2",
            type: "multiple-choice",
            question: "Which is correct for 'two girls'?",
            options: [
              { id: "a", text: "doi fete" },
              { id: "b", text: "două fete" },
              { id: "c", text: "doua fete" },
              { id: "d", text: "un fete" },
            ],
            correctAnswer: "b",
            explanation:
              "'două' is the feminine form of 'two'. 'fete' is the plural of 'fată' (girl). For masculine nouns you'd use 'doi băieți' (two boys).",
          },
        ],
      },
      {
        id: "a1-l11",
        title: "Colors & Adjective Agreement",
        type: "grammar",
        estimatedMinutes: 20,
        completed: false,
        sections: [
          {
            title: "Basic Colors",
            content:
              "Romanian adjectives must agree with the noun they modify in gender, number, and case. Let's start with colors — some have separate masculine and feminine forms.",
            examples: [
              {
                romanian: "roșu / roșie",
                phonetic: "[ROH-shoo / ROH-shyeh]",
                english: "red (m) / red (f)",
              },
              {
                romanian: "albastru / albastră",
                phonetic: "[al-BAS-troo / al-BAS-truh]",
                english: "blue (m) / blue (f)",
              },
              {
                romanian: "verde",
                phonetic: "[VER-deh]",
                english: "green (same for m/f)",
              },
              {
                romanian: "galben / galbenă",
                phonetic: "[GAL-ben / GAL-beh-nuh]",
                english: "yellow (m) / yellow (f)",
              },
              {
                romanian: "negru / neagră",
                phonetic: "[NEH-groo / NYAH-gruh]",
                english: "black (m) / black (f)",
              },
              {
                romanian: "alb / albă",
                phonetic: "[alb / AL-buh]",
                english: "white (m) / white (f)",
              },
            ],
          },
          {
            title: "Adjective Position & Agreement",
            content:
              "In Romanian, adjectives usually follow the noun (unlike English). The adjective must match the gender of the noun. Some adjectives like 'mare' (big) and 'mic' (small) are very common.",
            examples: [
              {
                romanian: "o casă roșie",
                phonetic: "[oh KAH-suh ROH-shyeh]",
                english: "a red house (fem.)",
              },
              {
                romanian: "un câine negru",
                phonetic: "[oon KUY-neh NEH-groo]",
                english: "a black dog (masc.)",
              },
              {
                romanian: "o mașină mare",
                phonetic: "[oh mah-SHEE-nuh MAH-reh]",
                english: "a big car (fem.)",
              },
              {
                romanian: "un apartament mic",
                phonetic: "[oon ah-par-tah-MENT meek]",
                english: "a small apartment (neuter)",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l11-e1",
            type: "multiple-choice",
            question:
              "Which is the correct form of 'red' for a feminine noun (e.g., 'casă')?",
            options: [
              { id: "a", text: "roșu" },
              { id: "b", text: "roșie" },
              { id: "c", text: "roșa" },
              { id: "d", text: "roșii" },
            ],
            correctAnswer: "b",
            explanation:
              "'roșie' is the feminine form of 'roșu' (red). Adjectives in Romanian agree with the gender of the noun: 'o casă roșie' (a red house).",
          },
          {
            id: "a1-l11-e2",
            type: "fill-blank",
            question:
              "Complete: 'un câine ___' (a black dog) — câine is masculine",
            blankSentence: "un câine ___",
            correctAnswer: "negru",
            explanation:
              "'negru' is the masculine form of 'black'. The feminine form is 'neagră'. 'un câine negru' = a black dog.",
          },
        ],
      },
      {
        id: "a1-l12",
        title: "Asking Questions",
        type: "grammar",
        estimatedMinutes: 16,
        completed: false,
        sections: [
          {
            title: "Question Words",
            content:
              "Romanian question words are called 'pronume interogative'. Questions are formed by placing the question word at the start, with the verb immediately following.",
            examples: [
              { romanian: "Ce?", phonetic: "[cheh]", english: "What?" },
              { romanian: "Cine?", phonetic: "[CHEE-neh]", english: "Who?" },
              { romanian: "Unde?", phonetic: "[OON-deh]", english: "Where?" },
              { romanian: "Când?", phonetic: "[kund]", english: "When?" },
              { romanian: "Cum?", phonetic: "[koom]", english: "How?" },
              { romanian: "De ce?", phonetic: "[deh cheh]", english: "Why?" },
              {
                romanian: "Cât / Câtă?",
                phonetic: "[kut / KUH-tuh]",
                english: "How much / How many?",
              },
            ],
          },
          {
            title: "Yes/No Questions",
            content:
              "To form a yes/no question in Romanian, you can either raise your intonation at the end or add a question tag. The word order stays the same as a statement.",
            examples: [
              {
                romanian: "Vorbești română?",
                phonetic: "[vor-BEHSHTS roh-MUH-nuh]",
                english: "Do you speak Romanian?",
              },
              {
                romanian: "Ești student?",
                phonetic: "[yeshts stoo-DENT]",
                english: "Are you a student?",
              },
              {
                romanian: "Da / Nu",
                phonetic: "[dah / noo]",
                english: "Yes / No",
              },
            ],
          },
          {
            title: "Useful Question Phrases",
            content:
              "These phrases are indispensable for a beginner navigating real conversations.",
            examples: [
              {
                romanian: "Cum te numești?",
                phonetic: "[koom teh noo-MEYHTS]",
                english: "What is your name? (informal)",
              },
              {
                romanian: "De unde ești?",
                phonetic: "[deh OON-deh yeshts]",
                english: "Where are you from?",
              },
              {
                romanian: "Cât costă?",
                phonetic: "[kut KOS-tuh]",
                english: "How much does it cost?",
              },
              {
                romanian: "Unde este...?",
                phonetic: "[OON-deh YES-teh]",
                english: "Where is...?",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l12-e1",
            type: "multiple-choice",
            question: "How do you ask 'Where are you from?' in Romanian?",
            options: [
              { id: "a", text: "Cum ești?" },
              { id: "b", text: "Cine ești?" },
              { id: "c", text: "De unde ești?" },
              { id: "d", text: "Ce ești?" },
            ],
            correctAnswer: "c",
            explanation:
              "'De unde ești?' uses 'de unde' (from where). 'De' = from/of, 'unde' = where, 'ești' = are you.",
          },
          {
            id: "a1-l12-e2",
            type: "fill-blank",
            question:
              "Complete the question: '___ te numești?' (What is your name?)",
            blankSentence: "___ te numești?",
            correctAnswer: "Cum",
            explanation:
              "'Cum te numești?' literally means 'How are you called?' — the standard way to ask someone's name in Romanian.",
          },
        ],
      },
      {
        id: "a1-l13",
        title: "Common Verbs: Present Tense Intro",
        type: "grammar",
        estimatedMinutes: 22,
        completed: false,
        sections: [
          {
            title: "The -A Conjugation Group",
            content:
              "The most common verb group ends in -a in the infinitive. Regular -a verbs follow a consistent pattern. The stem is formed by removing -a from the infinitive.",
            examples: [
              {
                romanian: "a lucra → lucrez",
                phonetic: "[ah loo-KRAH → loo-KREZ]",
                english: "to work → I work",
              },
              {
                romanian: "a vorbi → vorbesc",
                phonetic: "[ah vor-BEE → vor-BESK]",
                english: "to speak → I speak (irregular: -i group!)",
              },
              {
                romanian: "a mânca → mănânc",
                phonetic: "[ah MUN-kah → muh-NUNK]",
                english: "to eat → I eat",
              },
              {
                romanian: "a bea → beau",
                phonetic: "[ah byah → byow]",
                english: "to drink → I drink",
              },
            ],
          },
          {
            title: "10 Essential Verbs",
            content:
              "These 10 verbs will carry you through most basic A1 conversations. Memorize their 'eu' (I) forms first.",
            examples: [
              {
                romanian: "a merge → merg",
                phonetic: "[ah MER-geh → merg]",
                english: "to go → I go",
              },
              {
                romanian: "a veni → vin",
                phonetic: "[ah veh-NEE → veen]",
                english: "to come → I come",
              },
              {
                romanian: "a face → fac",
                phonetic: "[ah FAH-cheh → fahk]",
                english: "to do/make → I do",
              },
              {
                romanian: "a vrea → vreau",
                phonetic: "[ah vryah → vryow]",
                english: "to want → I want",
              },
              {
                romanian: "a putea → pot",
                phonetic: "[ah poo-TYAH → pot]",
                english: "to be able → I can",
              },
              {
                romanian: "a ști → știu",
                phonetic: "[ah shtyee → shtyoo]",
                english: "to know → I know",
              },
            ],
          },
          {
            title: "Simple Sentences with Verbs",
            content:
              "Put it all together with simple subject-verb-object sentences.",
            examples: [
              {
                romanian: "Merg la muncă.",
                phonetic: "[merg lah MOON-kuh]",
                english: "I go to work.",
              },
              {
                romanian: "Vreau apă.",
                phonetic: "[vryow AH-puh]",
                english: "I want water.",
              },
              {
                romanian: "Nu știu.",
                phonetic: "[noo shtyoo]",
                english: "I don't know.",
              },
              {
                romanian: "Pot să ajut.",
                phonetic: "[pot suh ah-ZHOOT]",
                english: "I can help.",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l13-e1",
            type: "multiple-choice",
            question: "What does 'Vreau apă' mean?",
            options: [
              { id: "a", text: "I have water." },
              { id: "b", text: "I want water." },
              { id: "c", text: "I drink water." },
              { id: "d", text: "Where is the water?" },
            ],
            correctAnswer: "b",
            explanation:
              "'vreau' = I want (from 'a vrea'), 'apă' = water. 'Vreau apă' is a common, direct way to ask for water.",
          },
          {
            id: "a1-l13-e2",
            type: "fill-blank",
            question: "Complete: '___ la muncă.' (I go to work.)",
            blankSentence: "___ la muncă.",
            correctAnswer: "Merg",
            explanation:
              "'Merg' is the first person singular of 'a merge' (to go). 'la muncă' = to work/to the workplace.",
          },
        ],
      },
      {
        id: "a1-l14",
        title: "Days, Months & Time Expressions",
        type: "grammar",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Days of the Week",
            content:
              "Romanian days of the week are not capitalized (unlike English). Most derive from Latin planet names, just like the Romance languages.",
            examples: [
              {
                romanian: "luni, marți, miercuri",
                phonetic: "[LOON, marts, MYER-koo-ree]",
                english: "Monday, Tuesday, Wednesday",
              },
              {
                romanian: "joi, vineri, sâmbătă, duminică",
                phonetic: "[zhoy, VEE-neh-ree, SUM-buh-tuh, doo-MEE-nee-kuh]",
                english: "Thursday, Friday, Saturday, Sunday",
              },
            ],
          },
          {
            title: "Months of the Year",
            content:
              "Romanian months are also not capitalized. They follow the Latin tradition closely.",
            examples: [
              {
                romanian: "ianuarie, februarie, martie, aprilie",
                phonetic:
                  "[yah-NWAH-ryeh, feh-BRWAH-ryeh, MAR-tyeh, ah-PREE-lyeh]",
                english: "January, February, March, April",
              },
              {
                romanian: "mai, iunie, iulie, august",
                phonetic: "[my, YOO-nyeh, YOO-lyeh, ow-GOOST]",
                english: "May, June, July, August",
              },
              {
                romanian: "septembrie, octombrie, noiembrie, decembrie",
                phonetic:
                  "[sep-TEM-bryeh, ok-TOM-bryeh, noy-EM-bryeh, deh-CHEM-bryeh]",
                english: "September, October, November, December",
              },
            ],
          },
          {
            title: "Useful Time Expressions",
            content:
              "These time expressions are essential for everyday conversation and making plans.",
            examples: [
              {
                romanian: "azi / astăzi",
                phonetic: "[ah-ZEE / ah-STUH-zee]",
                english: "today",
              },
              {
                romanian: "mâine / ieri",
                phonetic: "[MUY-neh / YER]",
                english: "tomorrow / yesterday",
              },
              {
                romanian: "acum / înainte / după",
                phonetic: "[ah-KOOM / uh-NAH-een-teh / DOO-puh]",
                english: "now / before / after",
              },
              {
                romanian: "dimineața / seara / noaptea",
                phonetic: "[dee-mee-NYAH-tsah / SYAH-rah / NWAHP-tyah]",
                english: "in the morning / in the evening / at night",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l14-e1",
            type: "multiple-choice",
            question: "How do you say 'tomorrow' in Romanian?",
            options: [
              { id: "a", text: "ieri" },
              { id: "b", text: "astăzi" },
              { id: "c", text: "mâine" },
              { id: "d", text: "acum" },
            ],
            correctAnswer: "c",
            explanation:
              "'mâine' = tomorrow. 'ieri' = yesterday, 'astăzi/azi' = today, 'acum' = now.",
          },
          {
            id: "a1-l14-e2",
            type: "multiple-choice",
            question: "What day comes after 'marți' (Tuesday)?",
            options: [
              { id: "a", text: "luni" },
              { id: "b", text: "joi" },
              { id: "c", text: "miercuri" },
              { id: "d", text: "vineri" },
            ],
            correctAnswer: "c",
            explanation:
              "The Romanian week goes: luni (Mon), marți (Tue), miercuri (Wed), joi (Thu), vineri (Fri), sâmbătă (Sat), duminică (Sun).",
          },
        ],
      },
      {
        id: "a1-l15",
        title: "Pronunciation: Stress & Rhythm",
        type: "pronunciation",
        estimatedMinutes: 14,
        completed: false,
        sections: [
          {
            title: "Word Stress Basics",
            content:
              "Romanian stress is mostly penultimate (second-to-last syllable) but this is not always the case. The good news: stress is often consistent within word families. Incorrect stress makes you sound unnatural but is still understood.",
            examples: [
              {
                romanian: "ma-MĂ",
                phonetic: "[muh-MUH]",
                english: "mother — stress on last syllable",
              },
              {
                romanian: "FRA-te",
                phonetic: "[FRAH-teh]",
                english: "brother — stress on first syllable",
              },
              {
                romanian: "pro-fe-SOAR-ă",
                phonetic: "[pro-feh-SWAH-ruh]",
                english: "teacher — stress on 3rd of 4 syllables",
              },
            ],
          },
          {
            title: "Rhythm & Flow",
            content:
              "Romanian has a syllable-timed rhythm — each syllable takes roughly equal time. This is similar to Spanish and French, quite different from stress-timed English. Practice speaking with even syllable beats.",
            examples: [
              {
                romanian: "Bu-nă zi-u-a",
                phonetic: "[BOO-nuh ZEE-wah]",
                english: "Good day — 4 even syllables",
              },
              {
                romanian: "Mul-țu-mesc",
                phonetic: "[mool-tsoo-MESK]",
                english: "Thank you — 3 even syllables",
              },
              {
                romanian: "La re-ve-de-re",
                phonetic: "[lah reh-veh-DEH-reh]",
                english: "Goodbye — 5 syllables, stress on 4th",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a1-l15-e1",
            type: "multiple-choice",
            question: "Romanian rhythm is most similar to which language?",
            options: [
              { id: "a", text: "English (stress-timed)" },
              { id: "b", text: "Spanish (syllable-timed)" },
              { id: "c", text: "Mandarin (tonal)" },
              { id: "d", text: "Japanese (mora-timed)" },
            ],
            correctAnswer: "b",
            explanation:
              "Romanian, like Spanish and French, is syllable-timed — each syllable has roughly equal duration. English is stress-timed, which makes Romanian rhythm feel quite different to English speakers.",
          },
        ],
      },
    ],
  },
  {
    id: "a2",
    code: "A2",
    title: "Elementary",
    description:
      "Build everyday fluency: master all present-tense conjugations, diphthongs, numbers, daily vocabulary, possessives, negation, the past tense, modal verbs, adjective agreement, prepositions, time expressions, and more.",
    color: "#C9922A",
    badgeColor: "bg-[#C9922A] text-white",
    unlocked: false,
    lessons: [
      // ─── Lesson 1 ───────────────────────────────────────────────────────────
      {
        id: "a2-l1",
        title: "Present Tense: All Four Conjugations",
        type: "grammar",
        estimatedMinutes: 25,
        completed: false,
        sections: [
          {
            title: "The Four Conjugation Groups",
            content:
              "Romanian verbs split into four groups by their infinitive ending: Group I (-a), Group II (-ea), Group III (-e), and Group IV (-i / -î). Each group has its own set of present-tense endings across six persons.",
            examples: [
              { romanian: "a lucra", phonetic: "[ah loo-KRAH]", english: "to work (Group I, -a)" },
              { romanian: "a vedea", phonetic: "[ah veh-DEH-ah]", english: "to see (Group II, -ea)" },
              { romanian: "a merge", phonetic: "[ah MEHR-jeh]", english: "to go/walk (Group III, -e)" },
              { romanian: "a dormi", phonetic: "[ah dor-MEE]", english: "to sleep (Group IV, -i)" },
            ],
          },
          {
            title: "Group I: -a Verbs (a lucra)",
            content:
              "Group I verbs drop the infinitive -a and add: eu -ez / lucr, tu -ezi / lucrezi, el/ea -ează / lucrează, noi -ăm, voi -ați, ei/ele -ează. Note: monosyllabic stems and some polysyllabic verbs use -ez- infix.",
            examples: [
              { romanian: "eu lucrez", phonetic: "[yew loo-KREZ]", english: "I work" },
              { romanian: "tu lucrezi", phonetic: "[too loo-KREH-zee]", english: "you work" },
              { romanian: "noi lucrăm", phonetic: "[noy loo-KRAHM]", english: "we work" },
              { romanian: "voi lucrați", phonetic: "[voy loo-KRAHTS]", english: "you (pl.) work" },
            ],
          },
          {
            title: "Groups II, III & IV",
            content:
              "Group II (-ea) verbs: eu văd, tu vezi, el vede, noi vedem, voi vedeți, ei văd. Group III (-e): eu merg, tu mergi, el merge, noi mergem, voi mergeți, ei merg. Group IV (-i): eu dorm, tu dormi, el doarme, noi dormim, voi dormiți, ei dorm.",
            examples: [
              { romanian: "eu văd", phonetic: "[yew vuhd]", english: "I see" },
              { romanian: "tu mergi", phonetic: "[too MEHR-jee]", english: "you walk" },
              { romanian: "el doarme", phonetic: "[yel DWAHR-meh]", english: "he sleeps" },
              { romanian: "ei dorm", phonetic: "[yay dorm]", english: "they sleep" },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l1-e1",
            type: "multiple-choice",
            question: "Which ending does 'eu' take for a Group I (-a) verb like 'a lucra'?",
            options: [
              { id: "a", text: "-ez (eu lucrez)" },
              { id: "b", text: "-esc (eu lucresc)" },
              { id: "c", text: "-em (eu lucrem)" },
              { id: "d", text: "-ăm (eu lucrăm)" },
            ],
            correctAnswer: "a",
            explanation: "Group I verbs with polysyllabic stems typically insert -ez- for the singular and third-person plural: eu lucrez, tu lucrezi, el/ea lucrează.",
          },
          {
            id: "a2-l1-e2",
            type: "fill-blank",
            question: "Complete the sentence: Noi _____ la birou. (We work at the office.)",
            blankSentence: "Noi _____ la birou.",
            correctAnswer: "lucrăm",
            explanation: "'Noi' (we) takes the -ăm ending in Group I: lucrăm.",
          },
          {
            id: "a2-l1-e3",
            type: "multiple-choice",
            question: "What is the correct 'tu' form of 'a dormi' (to sleep)?",
            options: [
              { id: "a", text: "tu doarmă" },
              { id: "b", text: "tu dormi" },
              { id: "c", text: "tu dormești" },
              { id: "d", text: "tu doarmi" },
            ],
            correctAnswer: "b",
            explanation: "Group IV (-i) verbs: tu keeps the stem + i ending — tu dormi.",
          },
        ],
      },
      // ─── Lesson 2 ───────────────────────────────────────────────────────────
      {
        id: "a2-l2",
        title: "Pronunciation: Diphthongs & Triphthongs",
        type: "pronunciation",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "What Is a Diphthong?",
            content:
              "A diphthong is two vowel sounds gliding together in a single syllable. Romanian has many diphthongs and is more vowel-rich than most European languages. The most common are: ia, ie, io, iu, ea, oa, ua, uă.",
            examples: [
              { romanian: "iarbă", phonetic: "[YAHR-buh]", english: "grass — ia diphthong" },
              { romanian: "seară", phonetic: "[SYAH-ruh]", english: "evening — ea diphthong" },
              { romanian: "oameni", phonetic: "[WAH-meh-nee]", english: "people — oa diphthong" },
              { romanian: "nouă", phonetic: "[NOH-wuh]", english: "nine / new — uă diphthong" },
            ],
          },
          {
            title: "The 'ea' and 'oa' Diphthongs",
            content:
              "'ea' sounds like a quick 'yah' — the glide starts on 'y' and opens into 'ah'. 'oa' sounds like the start of English 'water' — glide from 'w' into 'ah'. Both are very common in Romanian nouns and verb forms.",
            examples: [
              { romanian: "femeie", phonetic: "[feh-MEH-yeh]", english: "woman" },
              { romanian: "teamă", phonetic: "[TYAH-muh]", english: "fear" },
              { romanian: "coală", phonetic: "[KWAH-luh]", english: "sheet (of paper)" },
              { romanian: "doamnă", phonetic: "[DWAHM-nuh]", english: "lady / Mrs." },
            ],
          },
          {
            title: "Triphthongs",
            content:
              "Romanian also has triphthongs — three vowels in one syllable. Common ones: eau, iau, oai. They appear in verb endings and some nouns.",
            examples: [
              { romanian: "leau", phonetic: "[lyow]", english: "(they) took — triphthong eau" },
              { romanian: "iau", phonetic: "[yow]", english: "I take — triphthong iau" },
              { romanian: "pleoape", phonetic: "[PLYOH-ah-peh]", english: "eyelids" },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l2-e1",
            type: "multiple-choice",
            question: "The 'oa' diphthong in 'oameni' sounds like the beginning of which English word?",
            options: [
              { id: "a", text: "open" },
              { id: "b", text: "water" },
              { id: "c", text: "oak" },
              { id: "d", text: "awful" },
            ],
            correctAnswer: "b",
            explanation: "'oa' glides from a 'w' sound into 'ah' — exactly like the start of English 'water'.",
          },
          {
            id: "a2-l2-e2",
            type: "fill-blank",
            question: "Write the phonetic transcription of 'seară' (evening):",
            blankSentence: "[S___-ruh]",
            correctAnswer: "YAH",
            explanation: "'seară' = [SYAH-ruh]. The 'ea' diphthong sounds like a quick 'yah'.",
          },
          {
            id: "a2-l2-e3",
            type: "multiple-choice",
            question: "How many vowel sounds are in a triphthong?",
            options: [
              { id: "a", text: "One" },
              { id: "b", text: "Two" },
              { id: "c", text: "Three" },
              { id: "d", text: "Four" },
            ],
            correctAnswer: "c",
            explanation: "A triphthong combines three vowel sounds in a single syllable — e.g., 'iau' [yow] in 'iau' (I take).",
          },
        ],
      },
      // ─── Lesson 3 ───────────────────────────────────────────────────────────
      {
        id: "a2-l3",
        title: "Numbers 1–1000 & Counting",
        type: "grammar",
        estimatedMinutes: 20,
        completed: false,
        sections: [
          {
            title: "Numbers 1–20",
            content:
              "Numbers 1–19 are unique forms that must be memorized. From 11–19 Romanian uses the suffix -sprezece (meaning 'over ten'). Note that 1 and 2 have masculine/feminine forms: un/o (1), doi/două (2).",
            examples: [
              { romanian: "unu / o", phonetic: "[OO-noo / oh]", english: "one (m. / f.)" },
              { romanian: "doi / două", phonetic: "[doy / DWAH-wuh]", english: "two (m. / f.)" },
              { romanian: "unsprezece", phonetic: "[OON-spreh-zeh-cheh]", english: "eleven (one over ten)" },
              { romanian: "nouăsprezece", phonetic: "[NOH-wuh-spreh-zeh-cheh]", english: "nineteen" },
            ],
          },
          {
            title: "Tens & Compound Numbers (20–99)",
            content:
              "Tens: douăzeci (20), treizeci (30), patruzeci (40), cincizeci (50), șaizeci (60), șaptezeci (70), optzeci (80), nouăzeci (90). Compound numbers use 'și' (and): douăzeci și trei = 23.",
            examples: [
              { romanian: "douăzeci", phonetic: "[DWAH-zeh-chee]", english: "twenty" },
              { romanian: "treizeci și cinci", phonetic: "[TRAY-zeh-chee shee CHINCH]", english: "thirty-five" },
              { romanian: "optzeci și doi", phonetic: "[OPT-zeh-chee shee doy]", english: "eighty-two" },
            ],
          },
          {
            title: "Hundreds & Thousands",
            content:
              "100 = o sută, 200 = două sute, 300 = trei sute. 1000 = o mie, 2000 = două mii. Combine freely: 245 = două sute patruzeci și cinci.",
            examples: [
              { romanian: "o sută", phonetic: "[oh SOO-tuh]", english: "one hundred" },
              { romanian: "cinci sute", phonetic: "[CHINCH SOO-teh]", english: "five hundred" },
              { romanian: "o mie", phonetic: "[oh MEE-yeh]", english: "one thousand" },
              { romanian: "trei sute douăzeci și unu", phonetic: "[tray SOO-teh DWAH-zeh-chee shee OO-noo]", english: "three hundred and twenty-one" },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l3-e1",
            type: "multiple-choice",
            question: "How do you say 'thirty-five' in Romanian?",
            options: [
              { id: "a", text: "treizeci cinci" },
              { id: "b", text: "treizeci și cinci" },
              { id: "c", text: "cinci treizeci" },
              { id: "d", text: "cinci cu treizeci" },
            ],
            correctAnswer: "b",
            explanation: "Compound numbers above 20 use 'și' (and): treizeci și cinci = 35.",
          },
          {
            id: "a2-l3-e2",
            type: "fill-blank",
            question: "Write the Romanian for 'two hundred': ___ ___.",
            blankSentence: "___ ___",
            correctAnswer: "două sute",
            explanation: "100 = o sută; 200 = două sute. 'Sute' is the plural of 'sută'.",
          },
          {
            id: "a2-l3-e3",
            type: "multiple-choice",
            question: "What is the feminine form of the number 'two' in Romanian?",
            options: [
              { id: "a", text: "doi" },
              { id: "b", text: "două" },
              { id: "c", text: "doue" },
              { id: "d", text: "doa" },
            ],
            correctAnswer: "b",
            explanation: "Romanian 1 and 2 are gendered: un/o (1) and doi/două (2). Feminine: două.",
          },
        ],
      },
      // ─── Lesson 4 ───────────────────────────────────────────────────────────
      {
        id: "a2-l4",
        title: "Everyday Vocabulary: Home & Daily Routines",
        type: "grammar",
        estimatedMinutes: 20,
        completed: false,
        sections: [
          {
            title: "Rooms & Objects in the Home",
            content:
              "Knowing home vocabulary lets you describe your surroundings and daily life. Romanian nouns for rooms are mostly neuter or feminine. Always learn a noun with its gender article.",
            examples: [
              { romanian: "dormitorul", phonetic: "[dor-mee-TOH-rool]", english: "the bedroom (n.)" },
              { romanian: "bucătăria", phonetic: "[boo-kuh-TUH-ree-ah]", english: "the kitchen (f.)" },
              { romanian: "baia", phonetic: "[BAH-yah]", english: "the bathroom (f.)" },
              { romanian: "sufrageria", phonetic: "[soo-frah-JEH-ree-ah]", english: "the dining room (f.)" },
            ],
          },
          {
            title: "Daily Routine Verbs",
            content:
              "Reflexive verbs are common in daily routine vocabulary. They are conjugated with a reflexive pronoun: mă, te, se, ne, vă, se.",
            examples: [
              { romanian: "mă trezesc", phonetic: "[muh treh-ZESK]", english: "I wake up" },
              { romanian: "mă spăl", phonetic: "[muh spuhl]", english: "I wash (myself)" },
              { romanian: "mă îmbrac", phonetic: "[muh eem-BRAK]", english: "I get dressed" },
              { romanian: "mă culc", phonetic: "[muh koolch]", english: "I go to bed" },
            ],
          },
          {
            title: "Talking About Your Day",
            content:
              "Use time adverbs to sequence your routine: dimineața (in the morning), la prânz (at noon), seara (in the evening), noaptea (at night).",
            examples: [
              { romanian: "Dimineața beau cafea.", phonetic: "[dee-mee-NYAH-tsah byow kah-FEH-ah]", english: "In the morning I drink coffee." },
              { romanian: "Seara citesc o carte.", phonetic: "[SYAH-rah chee-TESK oh KAR-teh]", english: "In the evening I read a book." },
              { romanian: "Mă culc la unsprezece.", phonetic: "[muh koolch lah OON-spreh-zeh-cheh]", english: "I go to bed at eleven." },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l4-e1",
            type: "multiple-choice",
            question: "What does 'mă trezesc' mean?",
            options: [
              { id: "a", text: "I eat breakfast" },
              { id: "b", text: "I wake up" },
              { id: "c", text: "I get dressed" },
              { id: "d", text: "I go to sleep" },
            ],
            correctAnswer: "b",
            explanation: "'mă trezesc' is from 'a se trezi' (to wake up) — a reflexive verb conjugated with 'mă' for first person singular.",
          },
          {
            id: "a2-l4-e2",
            type: "fill-blank",
            question: "Complete: _____ beau cafea. (In the morning I drink coffee.)",
            blankSentence: "_____ beau cafea.",
            correctAnswer: "Dimineața",
            explanation: "'Dimineața' means 'in the morning'. Time adverbs come first in Romanian daily routine phrases.",
          },
          {
            id: "a2-l4-e3",
            type: "multiple-choice",
            question: "The reflexive pronoun for 'noi' (we) is:",
            options: [
              { id: "a", text: "mă" },
              { id: "b", text: "se" },
              { id: "c", text: "ne" },
              { id: "d", text: "vă" },
            ],
            correctAnswer: "c",
            explanation: "Reflexive pronouns: mă (I), te (you), se (he/she/they), ne (we), vă (you pl.).",
          },
        ],
      },
      // ─── Lesson 5 ───────────────────────────────────────────────────────────
      {
        id: "a2-l5",
        title: "Possessive Adjectives & Pronouns",
        type: "grammar",
        estimatedMinutes: 22,
        completed: false,
        sections: [
          {
            title: "Possessive Adjectives",
            content:
              "Romanian possessives agree with the noun they modify in gender and number, not with the owner. They follow the noun preceded by the definite article. Structure: [noun + article] + possessive.",
            examples: [
              { romanian: "cartea mea", phonetic: "[KAR-teh-ah MEH-ah]", english: "my book (f. noun)" },
              { romanian: "creionul meu", phonetic: "[kreh-YOH-nool MEH-oo]", english: "my pencil (m. noun)" },
              { romanian: "casa ta", phonetic: "[KAH-sah tah]", english: "your house (f. noun)" },
              { romanian: "fratele tău", phonetic: "[FRAH-teh-leh tuhw]", english: "your brother (m. noun)" },
            ],
          },
          {
            title: "All Possessive Forms",
            content:
              "Each person has masculine and feminine forms. Singular: meu/mea (my), tău/ta (your), său/sa (his/her). Plural nouns: mei/mele (my), tăi/tale (your), săi/sale (his/her). First-person plural: nostru/noastră / noștri/noastre (our). Second plural: vostru/voastră / voștri/voastre (your pl.).",
            examples: [
              { romanian: "colegii mei", phonetic: "[koh-LEH-jee may]", english: "my colleagues (m. pl.)" },
              { romanian: "prietenele mele", phonetic: "[pryeh-TEH-neh-leh MEH-leh]", english: "my friends (f. pl.)" },
              { romanian: "mașina noastră", phonetic: "[mah-SHEE-nah NWAS-truh]", english: "our car" },
            ],
          },
          {
            title: "Possessive Pronouns",
            content:
              "Possessive pronouns stand alone (replacing the noun). They use the same forms but are preceded by the definite article al/a/ai/ale: al meu, a mea, ai mei, ale mele.",
            examples: [
              { romanian: "Cartea este a mea.", phonetic: "[KAR-teh-ah YES-teh ah MEH-ah]", english: "The book is mine." },
              { romanian: "Creionul este al tău.", phonetic: "[kreh-YOH-nool YES-teh al tuhw]", english: "The pencil is yours." },
              { romanian: "Mașina este a lor.", phonetic: "[mah-SHEE-nah YES-teh ah lor]", english: "The car is theirs." },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l5-e1",
            type: "multiple-choice",
            question: "How do you say 'my book' if 'carte' is feminine?",
            options: [
              { id: "a", text: "cartea meu" },
              { id: "b", text: "cartea mea" },
              { id: "c", text: "carte mea" },
              { id: "d", text: "al meu carte" },
            ],
            correctAnswer: "b",
            explanation: "Feminine noun → feminine possessive: cartea mea. The possessive agrees with the noun's gender.",
          },
          {
            id: "a2-l5-e2",
            type: "fill-blank",
            question: "Complete: Mașina este _____ noastră. (The car is ours.)",
            blankSentence: "Mașina este _____ noastră.",
            correctAnswer: "a",
            explanation: "Possessive pronouns for feminine nouns use 'a': a noastră = ours (f.).",
          },
          {
            id: "a2-l5-e3",
            type: "multiple-choice",
            question: "What is the masculine plural possessive for 'my'?",
            options: [
              { id: "a", text: "mele" },
              { id: "b", text: "mea" },
              { id: "c", text: "mei" },
              { id: "d", text: "meu" },
            ],
            correctAnswer: "c",
            explanation: "meu (m. sg.) / mea (f. sg.) / mei (m. pl.) / mele (f. pl.).",
          },
        ],
      },
      // ─── Lesson 6 ───────────────────────────────────────────────────────────
      {
        id: "a2-l6",
        title: "Negation & Questions",
        type: "grammar",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Basic Negation with 'nu'",
            content:
              "'Nu' (no / not) is placed directly before the verb to negate a statement. There is no auxiliary verb needed. For reflexive verbs, 'nu' comes before the reflexive pronoun.",
            examples: [
              { romanian: "Nu vorbesc română.", phonetic: "[noo vor-BESK roh-MUH-nuh]", english: "I don't speak Romanian." },
              { romanian: "El nu vine.", phonetic: "[yel noo VEE-neh]", english: "He is not coming." },
              { romanian: "Nu mă trezesc devreme.", phonetic: "[noo muh treh-ZESK deh-VREH-meh]", english: "I don't wake up early." },
            ],
          },
          {
            title: "Question Formation",
            content:
              "Yes/no questions are formed simply by rising intonation — word order stays the same as in statements. Alternatively, use the tag 'nu-i așa?' (isn't it?) at the end.",
            examples: [
              { romanian: "Vorbești română?", phonetic: "[vor-BEHSH-tee roh-MUH-nuh]", english: "Do you speak Romanian?" },
              { romanian: "El vine, nu-i așa?", phonetic: "[yel VEE-neh, noo-ee ah-SHAH]", english: "He's coming, isn't he?" },
              { romanian: "Este acasă?", phonetic: "[YES-teh ah-KAH-suh]", english: "Is he/she home?" },
            ],
          },
          {
            title: "Question Words",
            content:
              "Wh-questions use interrogative pronouns at the start: cine (who), ce (what), unde (where), când (when), cum (how), de ce (why), cât / câtă / câți / câte (how much/many).",
            examples: [
              { romanian: "Unde locuiești?", phonetic: "[OON-deh loh-kwee-YESHTS]", english: "Where do you live?" },
              { romanian: "Cât costă?", phonetic: "[kuht KOS-tuh]", english: "How much does it cost?" },
              { romanian: "De ce pleci?", phonetic: "[deh cheh PLECH]", english: "Why are you leaving?" },
              { romanian: "Cum te cheamă?", phonetic: "[koom teh KYAH-muh]", english: "What is your name? (lit. How are you called?)" },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l6-e1",
            type: "multiple-choice",
            question: "Where does 'nu' go to negate 'el vine' (he comes)?",
            options: [
              { id: "a", text: "el vine nu" },
              { id: "b", text: "nu el vine" },
              { id: "c", text: "el nu vine" },
              { id: "d", text: "el nu-vine" },
            ],
            correctAnswer: "c",
            explanation: "'Nu' goes directly before the verb: el nu vine.",
          },
          {
            id: "a2-l6-e2",
            type: "fill-blank",
            question: "Ask 'where do you live?' in Romanian: _____ locuiești?",
            blankSentence: "_____ locuiești?",
            correctAnswer: "Unde",
            explanation: "'Unde' = where. Romanian question words come at the start of the sentence.",
          },
          {
            id: "a2-l6-e3",
            type: "multiple-choice",
            question: "How do you form a yes/no question in Romanian?",
            options: [
              { id: "a", text: "Add 'este' at the start" },
              { id: "b", text: "Invert subject and verb (like English)" },
              { id: "c", text: "Keep the same word order, use rising intonation" },
              { id: "d", text: "Use 'dacă' at the start" },
            ],
            correctAnswer: "c",
            explanation: "In Romanian, yes/no questions use the same word order as statements — only intonation changes.",
          },
        ],
      },
      // ─── Lesson 7 ───────────────────────────────────────────────────────────
      {
        id: "a2-l7",
        title: "Pronunciation: Stress & Intonation",
        type: "pronunciation",
        estimatedMinutes: 16,
        completed: false,
        sections: [
          {
            title: "Word Stress in Romanian",
            content:
              "Romanian word stress is not fixed — it can fall on different syllables and must be learned per word. However, stress most often falls on the second-to-last syllable (penultimate). Stress shifts in some verb conjugations and noun plurals.",
            examples: [
              { romanian: "FE-me-ie", phonetic: "[FEH-meh-yeh]", english: "woman — stress on first syllable" },
              { romanian: "ma-SI-nă", phonetic: "[mah-SHEE-nuh]", english: "car — stress on second syllable" },
              { romanian: "pri-E-ten", phonetic: "[pryEH-ten]", english: "friend — stress shifts in plural" },
            ],
          },
          {
            title: "Stress Shifts in Verb Forms",
            content:
              "Some verbs shift stress between persons. Group I verbs with -ez: the stress is on -ez- in singular and 3rd plural, but shifts to the stem in noi/voi forms.",
            examples: [
              { romanian: "eu lu-CREZ", phonetic: "[yew loo-KREZ]", english: "I work — stress on -CREZ" },
              { romanian: "noi LU-crăm", phonetic: "[noy LOO-kruhm]", english: "we work — stress on stem" },
              { romanian: "eu VOR-besc", phonetic: "[yew VOR-besk]", english: "I speak — stress on stem" },
            ],
          },
          {
            title: "Sentence Intonation",
            content:
              "Romanian statements have a falling intonation at the end. Yes/no questions rise at the end. Wh-questions start high and fall. This mirrors many European languages and feels natural to English speakers.",
            examples: [
              { romanian: "Eu merg acasă↘", phonetic: "[yew merg ah-KAH-suh]", english: "I'm going home. ↘ falling" },
              { romanian: "Mergi acasă?↗", phonetic: "[MEHR-jee ah-KAH-suh]", english: "Are you going home? ↗ rising" },
              { romanian: "Unde mergi?↘", phonetic: "[OON-deh MEHR-jee]", english: "Where are you going? ↘ falling" },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l7-e1",
            type: "multiple-choice",
            question: "Where does stress most commonly fall in Romanian words?",
            options: [
              { id: "a", text: "Always on the first syllable" },
              { id: "b", text: "Always on the last syllable" },
              { id: "c", text: "Most often on the second-to-last (penultimate) syllable" },
              { id: "d", text: "Romanian has no word stress" },
            ],
            correctAnswer: "c",
            explanation: "Penultimate (second-to-last) stress is the most common pattern in Romanian, though exceptions exist.",
          },
          {
            id: "a2-l7-e2",
            type: "multiple-choice",
            question: "What intonation pattern does a Romanian yes/no question use?",
            options: [
              { id: "a", text: "Falling intonation" },
              { id: "b", text: "Rising intonation" },
              { id: "c", text: "Flat intonation" },
              { id: "d", text: "Rising then falling" },
            ],
            correctAnswer: "b",
            explanation: "Yes/no questions in Romanian end with rising intonation — the same as in English.",
          },
          {
            id: "a2-l7-e3",
            type: "fill-blank",
            question: "In 'eu lucrez', the stress falls on: eu lu-___",
            blankSentence: "eu lu-___",
            correctAnswer: "CREZ",
            explanation: "Group I verbs with -ez insert the stressed -ez- syllable in the eu/tu/el/ei forms.",
          },
        ],
      },
      // ─── Lesson 8 ───────────────────────────────────────────────────────────
      {
        id: "a2-l8",
        title: "Adjective Agreement",
        type: "grammar",
        estimatedMinutes: 22,
        completed: false,
        sections: [
          {
            title: "Adjectives Must Agree",
            content:
              "In Romanian, adjectives agree with the noun they describe in gender, number, and case. Most adjectives come after the noun. Romanian adjectives have up to four forms: masculine singular, feminine singular, masculine plural, feminine plural.",
            examples: [
              { romanian: "băiat frumos", phonetic: "[buh-YAT froo-MOS]", english: "handsome boy (m. sg.)" },
              { romanian: "fată frumoasă", phonetic: "[FAH-tuh froo-MWAH-suh]", english: "beautiful girl (f. sg.)" },
              { romanian: "băieți frumoși", phonetic: "[buh-YETS froo-MOSH]", english: "handsome boys (m. pl.)" },
              { romanian: "fete frumoase", phonetic: "[FEH-teh froo-MWAH-seh]", english: "beautiful girls (f. pl.)" },
            ],
          },
          {
            title: "Common Adjective Patterns",
            content:
              "Pattern 1 (4 forms): m.sg -ø, f.sg -ă, m.pl -i, f.pl -e. E.g. mare/mare/mari/mari (big) — same for m/f singular but different plural. Pattern 2 (2 forms): same in m. and f. singular, e.g. verde/verzi (green).",
            examples: [
              { romanian: "casă mare", phonetic: "[KAH-suh MAH-reh]", english: "big house (f.)" },
              { romanian: "copii mari", phonetic: "[koh-PEE MAH-ree]", english: "big children (pl.)" },
              { romanian: "mașină verde", phonetic: "[mah-SHEE-nuh VEHR-deh]", english: "green car" },
              { romanian: "frunze verzi", phonetic: "[FROON-zeh VEHR-zee]", english: "green leaves (pl.)" },
            ],
          },
          {
            title: "Adjectives Before Nouns",
            content:
              "Some adjectives can precede the noun for emphasis or style (especially alt-, tot-, mult-). When an adjective precedes a definite noun, the article attaches to the adjective instead: 'frumoasa fată' (the beautiful girl).",
            examples: [
              { romanian: "alt student", phonetic: "[alt stoo-DENT]", english: "another student" },
              { romanian: "multă muncă", phonetic: "[MOOL-tuh MOON-kuh]", english: "much work" },
              { romanian: "toată ziua", phonetic: "[TWAH-tuh ZEE-wah]", english: "all day" },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l8-e1",
            type: "multiple-choice",
            question: "Which form of 'frumos' agrees with a feminine singular noun?",
            options: [
              { id: "a", text: "frumos" },
              { id: "b", text: "frumoasă" },
              { id: "c", text: "frumoși" },
              { id: "d", text: "frumoase" },
            ],
            correctAnswer: "b",
            explanation: "frumos (m.sg) → frumoasă (f.sg) → frumoși (m.pl) → frumoase (f.pl).",
          },
          {
            id: "a2-l8-e2",
            type: "fill-blank",
            question: "Complete: copii _____ (big children). 'mare' plural = ?",
            blankSentence: "copii _____",
            correctAnswer: "mari",
            explanation: "'mare' (big) has an irregular plural: mari. Used for both m. and f. plural.",
          },
          {
            id: "a2-l8-e3",
            type: "multiple-choice",
            question: "Where do most Romanian adjectives appear relative to the noun?",
            options: [
              { id: "a", text: "Always before the noun" },
              { id: "b", text: "Always after the noun" },
              { id: "c", text: "Most often after the noun, occasionally before" },
              { id: "d", text: "Position doesn't matter" },
            ],
            correctAnswer: "c",
            explanation: "Romanian adjectives usually follow the noun (fată frumoasă), but can precede for stylistic emphasis.",
          },
        ],
      },
      // ─── Lesson 9 ───────────────────────────────────────────────────────────
      {
        id: "a2-l9",
        title: "The Past Tense (Perfectul Compus)",
        type: "grammar",
        estimatedMinutes: 25,
        completed: false,
        sections: [
          {
            title: "Formation of the Perfect Compus",
            content:
              "The most common past tense in spoken Romanian is the perfectul compus (compound perfect). It is formed with the present tense of 'a avea' (to have) + the past participle of the main verb. Structure: am/ai/a/am/ați/au + past participle.",
            examples: [
              { romanian: "eu am mers", phonetic: "[yew am MERS]", english: "I went / I have gone" },
              { romanian: "tu ai vorbit", phonetic: "[too ay vor-BEET]", english: "you spoke / have spoken" },
              { romanian: "el a mâncat", phonetic: "[yel ah mun-KAT]", english: "he ate / has eaten" },
              { romanian: "noi am dormit", phonetic: "[noy am dor-MEET]", english: "we slept / have slept" },
            ],
          },
          {
            title: "Forming the Past Participle",
            content:
              "Past participle rules by group: Group I (-a) → -at (lucrat, mâncat); Group II (-ea) → -ut (văzut, crezut); Group III (-e) → -ut or -s (mersut → mers, scris); Group IV (-i) → -it (vorbit, dormit).",
            examples: [
              { romanian: "a lucra → lucrat", phonetic: "[ah loo-KRAH / loo-KRAT]", english: "to work → worked" },
              { romanian: "a vedea → văzut", phonetic: "[ah veh-DEH-ah / vuh-ZOOT]", english: "to see → seen" },
              { romanian: "a merge → mers", phonetic: "[ah MEHR-jeh / mers]", english: "to go → went" },
              { romanian: "a dormi → dormit", phonetic: "[ah dor-MEE / dor-MEET]", english: "to sleep → slept" },
            ],
          },
          {
            title: "Negation & Questions in the Past",
            content:
              "To negate: nu + auxiliary + participle. Nu am mers = I didn't go. For questions, rise intonation: Ai mâncat? (Did you eat?). In speech, the auxiliary often contracts: n-am mers.",
            examples: [
              { romanian: "Nu am văzut filmul.", phonetic: "[noo am vuh-ZOOT FEEL-mool]", english: "I didn't see the film." },
              { romanian: "Ai mâncat astăzi?", phonetic: "[ay mun-KAT as-TUH-zee]", english: "Did you eat today?" },
              { romanian: "N-am dormit bine.", phonetic: "[nam dor-MEET BEE-neh]", english: "I didn't sleep well. (contracted)" },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l9-e1",
            type: "multiple-choice",
            question: "What auxiliary verb is used to form the perfectul compus?",
            options: [
              { id: "a", text: "a fi (to be)" },
              { id: "b", text: "a avea (to have)" },
              { id: "c", text: "a vrea (to want)" },
              { id: "d", text: "a putea (to be able)" },
            ],
            correctAnswer: "b",
            explanation: "Perfectul compus = present of 'a avea' + past participle: am/ai/a/am/ați/au + participle.",
          },
          {
            id: "a2-l9-e2",
            type: "fill-blank",
            question: "Form the past: Eu _____ (I worked). Participle of 'a lucra' = lucrat.",
            blankSentence: "Eu _____ lucrat.",
            correctAnswer: "am",
            explanation: "'Eu' uses 'am' as the auxiliary: eu am lucrat.",
          },
          {
            id: "a2-l9-e3",
            type: "multiple-choice",
            question: "What is the past participle of 'a vedea' (to see)?",
            options: [
              { id: "a", text: "vedat" },
              { id: "b", text: "vedzut" },
              { id: "c", text: "văzut" },
              { id: "d", text: "vezut" },
            ],
            correctAnswer: "c",
            explanation: "Group II (-ea) verbs form the participle with -ut and often have vowel changes: vedea → văzut.",
          },
        ],
      },
      // ─── Lesson 10 ──────────────────────────────────────────────────────────
      {
        id: "a2-l10",
        title: "Modal Verbs: a putea, a vrea, a trebui",
        type: "grammar",
        estimatedMinutes: 20,
        completed: false,
        sections: [
          {
            title: "A putea — Can / To Be Able To",
            content:
              "'A putea' expresses ability or possibility. It is followed by a verb in the infinitive (with 'să' + subjunctive form in spoken Romanian). It is an irregular verb.",
            examples: [
              { romanian: "eu pot", phonetic: "[yew pot]", english: "I can" },
              { romanian: "tu poți", phonetic: "[too pots]", english: "you can" },
              { romanian: "el/ea poate", phonetic: "[yel/yah PWAH-teh]", english: "he/she can" },
              { romanian: "Pot să vin.", phonetic: "[pot suh veen]", english: "I can come." },
            ],
          },
          {
            title: "A vrea — To Want",
            content:
              "'A vrea' expresses desire or intention. In spoken Romanian, 'vreau să' + subjunctive is the standard structure. Conjugation: vreau, vrei, vrea, vrem, vreți, vor.",
            examples: [
              { romanian: "vreau", phonetic: "[vryow]", english: "I want" },
              { romanian: "tu vrei", phonetic: "[too vray]", english: "you want" },
              { romanian: "Vreau să merg.", phonetic: "[vryow suh merg]", english: "I want to go." },
              { romanian: "Vrei să mănânci?", phonetic: "[vray suh muh-NUNCH]", english: "Do you want to eat?" },
            ],
          },
          {
            title: "A trebui — Must / To Have To",
            content:
              "'A trebui' is an impersonal verb — it only conjugates in the third person singular: trebuie. It is always followed by 'să' + subjunctive.",
            examples: [
              { romanian: "Trebuie să merg.", phonetic: "[TREH-bwee-yeh suh merg]", english: "I must go. / I have to go." },
              { romanian: "Trebuie să studiezi.", phonetic: "[TREH-bwee-yeh suh stoo-DYEH-zee]", english: "You must study." },
              { romanian: "Nu trebuie să pleci.", phonetic: "[noo TREH-bwee-yeh suh PLECH]", english: "You don't have to leave." },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l10-e1",
            type: "multiple-choice",
            question: "How do you say 'I can come' in Romanian?",
            options: [
              { id: "a", text: "Eu putea vin." },
              { id: "b", text: "Pot să vin." },
              { id: "c", text: "Eu poate vin." },
              { id: "d", text: "Vreau vin." },
            ],
            correctAnswer: "b",
            explanation: "'A putea' present for 'eu' is 'pot'. Followed by 'să' + verb: pot să vin.",
          },
          {
            id: "a2-l10-e2",
            type: "fill-blank",
            question: "Complete: _____ să merg. (I must go.)",
            blankSentence: "_____ să merg.",
            correctAnswer: "Trebuie",
            explanation: "'A trebui' is always third-person singular 'trebuie', regardless of subject.",
          },
          {
            id: "a2-l10-e3",
            type: "multiple-choice",
            question: "What is the 'tu' form of 'a vrea' (to want)?",
            options: [
              { id: "a", text: "vreau" },
              { id: "b", text: "vrea" },
              { id: "c", text: "vrei" },
              { id: "d", text: "vor" },
            ],
            correctAnswer: "c",
            explanation: "Conjugation of 'a vrea': vreau, vrei, vrea, vrem, vreți, vor.",
          },
        ],
      },
      // ─── Lesson 11 ──────────────────────────────────────────────────────────
      {
        id: "a2-l11",
        title: "Prepositions & Spatial Expressions",
        type: "grammar",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Common Prepositions",
            content:
              "Romanian prepositions are used with the accusative case for most spatial and temporal relationships. Core prepositions: la (at/to), în (in), pe (on), de (of/from), cu (with), fără (without), pentru (for), între (between), lângă (next to), sub (under), deasupra (above).",
            examples: [
              { romanian: "la magazin", phonetic: "[lah mah-gah-ZEEN]", english: "at/to the store" },
              { romanian: "în casă", phonetic: "[een KAH-suh]", english: "in the house" },
              { romanian: "pe masă", phonetic: "[peh MAH-suh]", english: "on the table" },
              { romanian: "lângă fereastră", phonetic: "[LUN-guh feh-RYAHS-truh]", english: "next to the window" },
            ],
          },
          {
            title: "Direction vs. Location",
            content:
              "'La' can express both location (at) and direction (to). 'În' expresses being inside. 'Pe' expresses being on a surface. To ask where: 'unde?' For direction: 'încotro?' or simply 'unde mergi?'",
            examples: [
              { romanian: "Merg la școală.", phonetic: "[merg lah SHKWAH-luh]", english: "I go to school." },
              { romanian: "Sunt la școală.", phonetic: "[soont lah SHKWAH-luh]", english: "I am at school." },
              { romanian: "Cartea e pe raft.", phonetic: "[KAR-teh-ah yeh peh raft]", english: "The book is on the shelf." },
            ],
          },
          {
            title: "Contraction with Definite Articles",
            content:
              "Some prepositions contract with the masculine/neuter definite article: în + cel = 'în cel'; la + le does not contract. Note: 'de' + articulated noun gives genitive-like meanings.",
            examples: [
              { romanian: "în față casei", phonetic: "[een FAH-tsuh KAH-say]", english: "in front of the house" },
              { romanian: "în spatele biroului", phonetic: "[een SPAH-teh-leh bee-ROH-loo-ee]", english: "behind the office" },
              { romanian: "sub patul lui", phonetic: "[soob PAH-tool loo-ee]", english: "under his bed" },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l11-e1",
            type: "multiple-choice",
            question: "Which preposition means 'next to' in Romanian?",
            options: [
              { id: "a", text: "sub" },
              { id: "b", text: "deasupra" },
              { id: "c", text: "lângă" },
              { id: "d", text: "între" },
            ],
            correctAnswer: "c",
            explanation: "'Lângă' = next to. sub = under, deasupra = above, între = between.",
          },
          {
            id: "a2-l11-e2",
            type: "fill-blank",
            question: "Complete: Cartea e _____ masă. (The book is on the table.)",
            blankSentence: "Cartea e _____ masă.",
            correctAnswer: "pe",
            explanation: "'Pe' = on a surface. Cartea e pe masă = The book is on the table.",
          },
          {
            id: "a2-l11-e3",
            type: "multiple-choice",
            question: "How do you say 'I go to school' in Romanian?",
            options: [
              { id: "a", text: "Merg în școală." },
              { id: "b", text: "Merg pe școală." },
              { id: "c", text: "Merg la școală." },
              { id: "d", text: "Merg cu școală." },
            ],
            correctAnswer: "c",
            explanation: "'La' is used for movement toward a place: merg la școală.",
          },
        ],
      },
      // ─── Lesson 12 ──────────────────────────────────────────────────────────
      {
        id: "a2-l12",
        title: "Telling Time & Time Expressions",
        type: "grammar",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Asking and Telling the Time",
            content:
              "To ask the time: 'Ce oră este?' (What time is it?) or 'Cât e ceasul?' (What time is the clock?). The answer uses: 'Este ora...' or just the time. Hours use feminine agreement with 'una' (1:00) and 'două' (2:00).",
            examples: [
              { romanian: "Este ora trei.", phonetic: "[YES-teh OH-rah tray]", english: "It is three o'clock." },
              { romanian: "Este ora una.", phonetic: "[YES-teh OH-rah OO-nah]", english: "It is one o'clock." },
              { romanian: "Este ora douăsprezece.", phonetic: "[YES-teh OH-rah DWAH-spreh-zeh-cheh]", english: "It is twelve o'clock." },
            ],
          },
          {
            title: "Minutes & Half Hours",
            content:
              "Minutes past the hour: 'ora X și Y minute'. Half past: 'și jumătate'. Quarter past: 'și un sfert'. Quarter to: 'fără un sfert'. Minutes to: 'fără Y minute'.",
            examples: [
              { romanian: "ora trei și jumătate", phonetic: "[OH-rah tray shee zhoo-muh-TAH-teh]", english: "half past three / 3:30" },
              { romanian: "ora cinci și un sfert", phonetic: "[OH-rah chinch shee oon sfert]", english: "quarter past five / 5:15" },
              { romanian: "ora șase fără zece", phonetic: "[OH-rah SHAH-seh FUH-ruh ZEH-cheh]", english: "ten to six / 5:50" },
            ],
          },
          {
            title: "Time Adverbs & Frequency",
            content:
              "Key time expressions: ieri (yesterday), azi / astăzi (today), mâine (tomorrow), acum (now), imediat (immediately), mereu (always), uneori (sometimes), rar (rarely), niciodată (never).",
            examples: [
              { romanian: "Am mers ieri la film.", phonetic: "[am mers YEH-ree lah feelm]", english: "I went to the cinema yesterday." },
              { romanian: "Mâine am o întâlnire.", phonetic: "[MUY-neh am oh een-TUL-nee-reh]", english: "Tomorrow I have a meeting." },
              { romanian: "Merg uneori la sală.", phonetic: "[merg oo-nyeh-OH-ree lah SAH-luh]", english: "I sometimes go to the gym." },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l12-e1",
            type: "multiple-choice",
            question: "How do you say 'half past three' in Romanian?",
            options: [
              { id: "a", text: "ora trei fără jumătate" },
              { id: "b", text: "ora trei și jumătate" },
              { id: "c", text: "jumătate de trei" },
              { id: "d", text: "trei și treizeci" },
            ],
            correctAnswer: "b",
            explanation: "'Și jumătate' means 'and a half' — ora trei și jumătate = half past three.",
          },
          {
            id: "a2-l12-e2",
            type: "fill-blank",
            question: "Yesterday in Romanian is: _____",
            blankSentence: "_____ am mers la film.",
            correctAnswer: "Ieri",
            explanation: "'Ieri' = yesterday. Ieri am mers la film = I went to the cinema yesterday.",
          },
          {
            id: "a2-l12-e3",
            type: "multiple-choice",
            question: "'Niciodată' means:",
            options: [
              { id: "a", text: "sometimes" },
              { id: "b", text: "always" },
              { id: "c", text: "never" },
              { id: "d", text: "often" },
            ],
            correctAnswer: "c",
            explanation: "'Niciodată' = never. Mereu = always, uneori = sometimes, des = often.",
          },
        ],
      },
      // ─── Lesson 13 ──────────────────────────────────────────────────────────
      {
        id: "a2-l13",
        title: "Food, Eating Out & Shopping",
        type: "grammar",
        estimatedMinutes: 20,
        completed: false,
        sections: [
          {
            title: "Food & Drink Vocabulary",
            content:
              "Essential food vocabulary for ordering in a restaurant or shopping. Note that food nouns in Romanian can be masculine, feminine, or neuter — learn them with their gender.",
            examples: [
              { romanian: "pâinea", phonetic: "[PUY-nyeh-ah]", english: "the bread (f.)" },
              { romanian: "carnea", phonetic: "[KAR-nyeh-ah]", english: "the meat (f.)" },
              { romanian: "laptele", phonetic: "[LAP-teh-leh]", english: "the milk (n.)" },
              { romanian: "vinul", phonetic: "[VEE-nool]", english: "the wine (n.)" },
            ],
          },
          {
            title: "At the Restaurant",
            content:
              "Key phrases for ordering food and asking for the bill. Romanian restaurants use formal 'dumneavoastră' (you formal) in service, but 'voi' in casual settings.",
            examples: [
              { romanian: "Aș dori o masă pentru doi.", phonetic: "[ash doh-REE oh MAH-suh PEN-troo doy]", english: "I would like a table for two." },
              { romanian: "Ce recomandați?", phonetic: "[cheh reh-koh-man-DATS]", english: "What do you recommend?" },
              { romanian: "Nota de plată, vă rog.", phonetic: "[NOH-tah deh PLAH-tuh vuh rog]", english: "The bill, please." },
              { romanian: "Este delicios!", phonetic: "[YES-teh deh-lee-CHOS]", english: "It's delicious!" },
            ],
          },
          {
            title: "Shopping Phrases",
            content:
              "Key phrases for shopping. Prices use 'lei' (RON) — the Romanian currency. Use 'cât costă?' (how much does it cost?) and 'aș vrea să cumpăr' (I would like to buy).",
            examples: [
              { romanian: "Cât costă asta?", phonetic: "[kuht KOS-tuh AS-tah]", english: "How much does this cost?" },
              { romanian: "E prea scump.", phonetic: "[yeh PREH-ah skoomp]", english: "It's too expensive." },
              { romanian: "Aveți altă culoare?", phonetic: "[ah-VETS AL-tuh koo-LWAH-reh]", english: "Do you have another color?" },
              { romanian: "Plătesc cu cardul.", phonetic: "[pluh-TESK koo KAR-dool]", english: "I'm paying by card." },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l13-e1",
            type: "multiple-choice",
            question: "How do you ask for the bill in a Romanian restaurant?",
            options: [
              { id: "a", text: "Ce recomandați?" },
              { id: "b", text: "Nota de plată, vă rog." },
              { id: "c", text: "Cât costă mâncarea?" },
              { id: "d", text: "Aș dori desert." },
            ],
            correctAnswer: "b",
            explanation: "'Nota de plată, vă rog' = The bill, please. 'Nota' = bill/note, 'vă rog' = please.",
          },
          {
            id: "a2-l13-e2",
            type: "fill-blank",
            question: "How do you say 'how much does this cost?' in Romanian?",
            blankSentence: "Cât _____ asta?",
            correctAnswer: "costă",
            explanation: "'Cât costă asta?' = How much does this cost? 'Costă' is from 'a costa' (to cost).",
          },
          {
            id: "a2-l13-e3",
            type: "multiple-choice",
            question: "What does 'E prea scump' mean?",
            options: [
              { id: "a", text: "It's very cheap." },
              { id: "b", text: "It's too expensive." },
              { id: "c", text: "It's a good price." },
              { id: "d", text: "Do you have a discount?" },
            ],
            correctAnswer: "b",
            explanation: "'Prea' = too (excessively), 'scump' = expensive. E prea scump = It's too expensive.",
          },
        ],
      },
      // ─── Lesson 14 ──────────────────────────────────────────────────────────
      {
        id: "a2-l14",
        title: "Pronunciation: Consonant Clusters & Soft/Hard C & G",
        type: "pronunciation",
        estimatedMinutes: 16,
        completed: false,
        sections: [
          {
            title: "Soft C and G Before E and I",
            content:
              "In Romanian, 'c' before 'e' or 'i' sounds like English 'ch' in 'church'. 'G' before 'e' or 'i' sounds like the 's' in 'measure' (voiced 'zh' + 'j'). This is one of the most important pronunciation rules.",
            examples: [
              { romanian: "ceai", phonetic: "[chay]", english: "tea — c+e = 'ch'" },
              { romanian: "cine", phonetic: "[CHEE-neh]", english: "who — c+i = 'ch'" },
              { romanian: "gem", phonetic: "[zhem]", english: "jam — g+e = soft 'j'" },
              { romanian: "gingie", phonetic: "[ZHEEN-jyeh]", english: "gum (of teeth) — g+i = soft 'j'" },
            ],
          },
          {
            title: "Hard C and G with Che/Ghe & Chi/Ghi",
            content:
              "To keep 'c' or 'g' hard before 'e' or 'i', Romanian adds a silent 'h': 'che' = [keh], 'chi' = [kee], 'ghe' = [geh], 'ghi' = [gee]. This is very common in plurals and verb endings.",
            examples: [
              { romanian: "cheie", phonetic: "[KYE-yeh]", english: "key — che = [ke]" },
              { romanian: "ochi", phonetic: "[okee]", english: "eye — chi = [ki]" },
              { romanian: "unghi", phonetic: "[OON-gee]", english: "angle — ghi = [gi]" },
              { romanian: "gheață", phonetic: "[GYAH-tsuh]", english: "ice — ghe = [ge]" },
            ],
          },
          {
            title: "Consonant Clusters",
            content:
              "Romanian allows complex consonant clusters that can be challenging for English speakers. Practice these common ones: str- (stradă/street), pr- (primăvară/spring), br- (brat/arm), cr- (creion/pencil), tr- (tren/train).",
            examples: [
              { romanian: "stradă", phonetic: "[STRAH-duh]", english: "street — str- cluster" },
              { romanian: "primăvară", phonetic: "[pree-muh-VAH-ruh]", english: "spring — pr- cluster" },
              { romanian: "creion", phonetic: "[KREH-yon]", english: "pencil — cr- cluster" },
              { romanian: "tren", phonetic: "[tren]", english: "train — tr- cluster" },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l14-e1",
            type: "multiple-choice",
            question: "How is 'c' pronounced in 'cine' (who)?",
            options: [
              { id: "a", text: "Like 'k' as in 'key'" },
              { id: "b", text: "Like 'ch' as in 'church'" },
              { id: "c", text: "Like 's' as in 'sun'" },
              { id: "d", text: "Silent" },
            ],
            correctAnswer: "b",
            explanation: "'c' before 'i' (or 'e') in Romanian sounds like English 'ch': cine = [CHEE-neh].",
          },
          {
            id: "a2-l14-e2",
            type: "fill-blank",
            question: "In 'cheie' (key), 'che' is pronounced: [___-yeh]",
            blankSentence: "[___-yeh]",
            correctAnswer: "KYE",
            explanation: "'che' = [keh/ke] — the 'h' keeps the 'c' hard. So 'cheie' = [KYE-yeh].",
          },
          {
            id: "a2-l14-e3",
            type: "multiple-choice",
            question: "How is 'g' pronounced in 'gem' (jam)?",
            options: [
              { id: "a", text: "Like 'g' in 'go'" },
              { id: "b", text: "Like 'g' in 'gem' (English)" },
              { id: "c", text: "Like 's' in 'measure' (soft zh-j)" },
              { id: "d", text: "Like 'sh' in 'shoe'" },
            ],
            correctAnswer: "c",
            explanation: "'g' before 'e' or 'i' becomes a soft palatal consonant — like the 's' in English 'measure' (IPA: [ʒ]).",
          },
        ],
      },
      // ─── Lesson 15 ──────────────────────────────────────────────────────────
      {
        id: "a2-l15",
        title: "The Future Tense & Conditional",
        type: "grammar",
        estimatedMinutes: 22,
        completed: false,
        sections: [
          {
            title: "The Colloquial Future with 'O Să'",
            content:
              "In everyday spoken Romanian, the future is most commonly formed with 'o să' + the subjunctive form (which looks like the present tense). This is the form you will hear most in natural speech.",
            examples: [
              { romanian: "O să merg.", phonetic: "[oh suh merg]", english: "I will go." },
              { romanian: "O să vorbești bine.", phonetic: "[oh suh vor-BEHSH-tee BEE-neh]", english: "You will speak well." },
              { romanian: "O să plece mâine.", phonetic: "[oh suh PLEH-cheh MUY-neh]", english: "He/she will leave tomorrow." },
            ],
          },
          {
            title: "The Formal Future with 'Voi'",
            content:
              "The literary/formal future uses the auxiliary 'voi' (will) + infinitive. Conjugation: voi, vei, va, vom, veți, vor. This form appears in writing, news, and formal speech.",
            examples: [
              { romanian: "Voi merge.", phonetic: "[voy MEHR-jeh]", english: "I will go. (formal)" },
              { romanian: "Vei vedea.", phonetic: "[vay veh-DEH-ah]", english: "You will see." },
              { romanian: "Vom lucra împreună.", phonetic: "[vom loo-KRAH eem-preh-OO-nuh]", english: "We will work together." },
            ],
          },
          {
            title: "The Conditional with 'Aș'",
            content:
              "The present conditional ('would') is formed with the auxiliary 'aș/ai/ar/am/ați/ar' + infinitive. Used for polite requests, hypothetical situations, and wishes.",
            examples: [
              { romanian: "Aș vrea.", phonetic: "[ash VREH-ah]", english: "I would like. (polite request)" },
              { romanian: "Ai putea să mă ajuți?", phonetic: "[ay poo-TEH-ah suh muh ah-ZHOOT]", english: "Could you help me?" },
              { romanian: "Ar fi bine.", phonetic: "[ar fee BEE-neh]", english: "It would be good." },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l15-e1",
            type: "multiple-choice",
            question: "Which structure is most common for the future tense in spoken Romanian?",
            options: [
              { id: "a", text: "voi + infinitive" },
              { id: "b", text: "o să + subjunctive form" },
              { id: "c", text: "am să + past participle" },
              { id: "d", text: "va + present tense" },
            ],
            correctAnswer: "b",
            explanation: "In everyday speech, 'o să + subjunctive' is the dominant future form: o să merg, o să vii, etc.",
          },
          {
            id: "a2-l15-e2",
            type: "fill-blank",
            question: "Translate 'I would like' (polite): _____ vrea.",
            blankSentence: "_____ vrea.",
            correctAnswer: "Aș",
            explanation: "Conditional 'eu' form: 'aș'. Aș vrea = I would like — the standard polite request form.",
          },
          {
            id: "a2-l15-e3",
            type: "multiple-choice",
            question: "What is the formal future form of 'we will work'?",
            options: [
              { id: "a", text: "O să lucrăm." },
              { id: "b", text: "Am lucrat." },
              { id: "c", text: "Vom lucra." },
              { id: "d", text: "Lucrăm viitor." },
            ],
            correctAnswer: "c",
            explanation: "Formal future: voi/vei/va/vom/veți/vor + infinitive. 'Noi' = vom: vom lucra.",
          },
        ],
      },
    ],
  },
  {
    id: "b1",
    code: "B1",
    title: "Intermediate",
    description:
      "Master the full case system, all past tenses, subjunctive mood, passive voice, complex sentence structures, and rich vocabulary for travel, work, and culture.",
    color: "#2D5A27",
    badgeColor: "bg-[#2D5A27] text-white",
    unlocked: false,
    lessons: [
      // ─── Lesson 1 ───────────────────────────────────────────────────────────
      {
        id: "b1-l1",
        title: "The Case System: Nominative & Accusative",
        type: "grammar",
        estimatedMinutes: 28,
        completed: false,
        sections: [
          {
            title: "The Five Cases of Romanian",
            content:
              "Romanian has five cases: Nominative (subject), Accusative (direct object), Genitive (possession), Dative (indirect object), and Vocative (direct address). Crucially, Nominative/Accusative share the same form for most nouns, as do Genitive/Dative. Case is marked mainly by the definite article and by prepositions.",
            examples: [
              { romanian: "Băiatul citește.", phonetic: "[buh-YAH-tool chee-TESH-teh]", english: "The boy is reading. (Nominative — subject)" },
              { romanian: "Văd băiatul.", phonetic: "[vuhd buh-YAH-tool]", english: "I see the boy. (Accusative — direct object)" },
              { romanian: "O fată frumoasă.", phonetic: "[oh FAH-tuh froo-MWAH-suh]", english: "A beautiful girl. (Nominative — indefinite)" },
            ],
          },
          {
            title: "The Accusative: Direct Objects & Prepositions",
            content:
              "The accusative is used for direct objects and after most prepositions (pe, la, cu, de, în, pe, prin, etc.). Personal direct objects (people and pets) must be marked with the preposition 'pe' — this is called the 'pe accusative'.",
            examples: [
              { romanian: "Îl văd pe Ion.", phonetic: "[eel vuhd peh YON]", english: "I see Ion. (pe-accusative for a person)" },
              { romanian: "Merg la munte.", phonetic: "[merg lah MOON-teh]", english: "I go to the mountains. (accusative after 'la')" },
              { romanian: "Citesc o carte.", phonetic: "[chee-TESK oh KAR-teh]", english: "I read a book. (accusative — inanimate, no 'pe')" },
            ],
          },
          {
            title: "Definite Articles in Nominative vs. Accusative",
            content:
              "In Romanian the definite article is a suffix (enclitic). Nominative and Accusative share the same form for most nouns. Masculine singular: -ul/-le. Feminine singular: -a. Neuter singular: -ul. Note: some masculine nouns ending in -e use -le: omul but fratele.",
            examples: [
              { romanian: "câinele / câinele", phonetic: "[KUY-neh-leh]", english: "the dog — m. (NOM = ACC same form)" },
              { romanian: "cartea / cartea", phonetic: "[KAR-teh-ah]", english: "the book — f. (NOM = ACC same form)" },
              { romanian: "scaunul / scaunul", phonetic: "[SKOW-nool]", english: "the chair — n. (NOM = ACC same form)" },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l1-e1",
            type: "multiple-choice",
            question: "Which preposition marks a personal direct object in Romanian?",
            options: [
              { id: "a", text: "de" },
              { id: "b", text: "cu" },
              { id: "c", text: "pe" },
              { id: "d", text: "la" },
            ],
            correctAnswer: "c",
            explanation: "In Romanian, direct objects that are people or pets are marked with 'pe' (the pe-accusative): Îl văd pe Ion.",
          },
          {
            id: "b1-l1-e2",
            type: "fill-blank",
            question: "Complete: Îl văd _____ Andrei. (I see Andrei.)",
            blankSentence: "Îl văd _____ Andrei.",
            correctAnswer: "pe",
            explanation: "'Pe' is required before personal direct objects: Îl văd pe Andrei.",
          },
          {
            id: "b1-l1-e3",
            type: "multiple-choice",
            question: "How many cases does Romanian have?",
            options: [
              { id: "a", text: "Three" },
              { id: "b", text: "Four" },
              { id: "c", text: "Five" },
              { id: "d", text: "Seven" },
            ],
            correctAnswer: "c",
            explanation: "Romanian has five cases: Nominative, Accusative, Genitive, Dative, and Vocative.",
          },
        ],
      },
      // ─── Lesson 2 ───────────────────────────────────────────────────────────
      {
        id: "b1-l2",
        title: "Genitive & Dative Cases",
        type: "grammar",
        estimatedMinutes: 28,
        completed: false,
        sections: [
          {
            title: "The Genitive: Possession",
            content:
              "The genitive expresses possession ('of', 's). For definite nouns, the genitive article changes: masculine/neuter -ului, feminine -ei. Indefinite genitive uses 'unui' (m./n.) or 'unei' (f.). The possessed noun takes the definite article.",
            examples: [
              { romanian: "cartea băiatului", phonetic: "[KAR-teh-ah buh-YAH-too-loo-ee]", english: "the boy's book / the book of the boy" },
              { romanian: "ușa casei", phonetic: "[OO-shah KAH-say]", english: "the door of the house" },
              { romanian: "cartea unui student", phonetic: "[KAR-teh-ah OO-noo-ee stoo-DENT]", english: "a student's book (indef.)" },
            ],
          },
          {
            title: "The Dative: Indirect Objects",
            content:
              "The dative marks the indirect object (to/for whom). Genitive and Dative share the same noun forms. The dative can also be introduced by prepositions 'la' or 'pentru'. Clitic dative pronouns: îmi, îți, îi, ne, vă, le.",
            examples: [
              { romanian: "Îi dau cartea profesorului.", phonetic: "[ee dow KAR-teh-ah proh-feh-SOH-roo-loo-ee]", english: "I give the book to the teacher." },
              { romanian: "Îmi place muzica.", phonetic: "[eem PLAH-cheh moo-ZEE-kah]", english: "I like music. (lit. Music pleases me — dative 'îmi')" },
              { romanian: "Spun prietenei mele.", phonetic: "[spoon pryeh-TEH-nay MEH-leh]", english: "I tell my (female) friend." },
            ],
          },
          {
            title: "The Vocative: Direct Address",
            content:
              "The vocative is used to call or address someone directly. It is formed differently by gender: masculine nouns often add -e or -ule; feminine nouns often end in -o or -ă. Used in greetings, commands, and exclamations.",
            examples: [
              { romanian: "Andrei! / Andreie!", phonetic: "[an-DREH-yeh]", english: "Andrei! (vocative of male name)" },
              { romanian: "Mamă!", phonetic: "[MAH-muh]", english: "Mom! (vocative)" },
              { romanian: "Doamnelor și domnilor!", phonetic: "[DWAHM-neh-lor shee DOM-nee-lor]", english: "Ladies and gentlemen! (vocative pl.)" },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l2-e1",
            type: "multiple-choice",
            question: "What is the genitive definite article for a feminine noun?",
            options: [
              { id: "a", text: "-ului" },
              { id: "b", text: "-ei" },
              { id: "c", text: "-lor" },
              { id: "d", text: "-ul" },
            ],
            correctAnswer: "b",
            explanation: "Feminine nouns in the genitive/dative take -ei: cartea fetei (the girl's book).",
          },
          {
            id: "b1-l2-e2",
            type: "fill-blank",
            question: "Translate: 'I like music.' Use dative clitic: _____ place muzica.",
            blankSentence: "_____ place muzica.",
            correctAnswer: "Îmi",
            explanation: "'Îmi place' = I like (lit. it pleases me). 'Îmi' is the dative clitic for 'eu'.",
          },
          {
            id: "b1-l2-e3",
            type: "multiple-choice",
            question: "Which case shares the same noun forms as the Genitive?",
            options: [
              { id: "a", text: "Nominative" },
              { id: "b", text: "Accusative" },
              { id: "c", text: "Dative" },
              { id: "d", text: "Vocative" },
            ],
            correctAnswer: "c",
            explanation: "In Romanian, Genitive and Dative share the same noun forms for most nouns.",
          },
        ],
      },
      // ─── Lesson 3 ───────────────────────────────────────────────────────────
      {
        id: "b1-l3",
        title: "Past Tenses: Perfect Compus & Imperfect",
        type: "grammar",
        estimatedMinutes: 28,
        completed: false,
        sections: [
          {
            title: "Perfect Compus — Completed Actions",
            content:
              "The perfect compus (compound perfect) covers both English simple past and present perfect. Formed with 'a avea' present + past participle. It describes completed, bounded events: I ate, I went, I slept. Negation: nu am / n-am + participle.",
            examples: [
              { romanian: "Am mâncat la restaurant.", phonetic: "[am mun-KAT lah res-tow-RANT]", english: "I ate at the restaurant." },
              { romanian: "Au plecat ieri.", phonetic: "[ow pleh-KAT YEH-ree]", english: "They left yesterday." },
              { romanian: "N-am dormit bine.", phonetic: "[nam dor-MEET BEE-neh]", english: "I didn't sleep well." },
            ],
          },
          {
            title: "Imperfect — Ongoing & Habitual Past",
            content:
              "The imperfect describes ongoing states, background situations, and habitual actions in the past (was doing, used to do). It is a simple tense formed by adding endings to the verb stem: -am, -ai, -a, -am, -ați, -au.",
            examples: [
              { romanian: "Când eram mic, mergeam la mare.", phonetic: "[kund yeh-RAM meek, mehr-GYAM lah MAH-reh]", english: "When I was young, I used to go to the sea." },
              { romanian: "Ea cânta frumos.", phonetic: "[yah KUN-tah froo-MOS]", english: "She used to sing beautifully." },
              { romanian: "Ploua afară.", phonetic: "[PLOH-wah ah-FAH-ruh]", english: "It was raining outside." },
            ],
          },
          {
            title: "Choosing Between Perfect Compus & Imperfect",
            content:
              "Use perfect compus for: specific completed actions, sequences of events. Use imperfect for: background descriptions, habitual/repeated past actions, states ('was', 'had', 'knew'). They often appear together: imperfect sets the scene, perfect compus carries the main events.",
            examples: [
              { romanian: "Citeam când a sunat telefonul.", phonetic: "[chee-TYAM kund ah soo-NAT teh-leh-FOH-nool]", english: "I was reading when the phone rang. (imperfect + perf.compus)" },
              { romanian: "Înainte mergeam pe jos, dar azi am luat autobuzul.", phonetic: "[ee-NAIN-teh mehr-GYAM peh zhos, dar azi am loo-AT ow-toh-BOO-zool]", english: "Before I used to walk, but today I took the bus." },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l3-e1",
            type: "multiple-choice",
            question: "Which tense would you use to say 'I was reading when the phone rang'?",
            options: [
              { id: "a", text: "Perfect compus for both verbs" },
              { id: "b", text: "Imperfect for both verbs" },
              { id: "c", text: "Imperfect for 'was reading', perfect compus for 'rang'" },
              { id: "d", text: "Perfect compus for 'was reading', imperfect for 'rang'" },
            ],
            correctAnswer: "c",
            explanation: "Ongoing background action (reading) → imperfect. Interrupting completed event (phone rang) → perfect compus.",
          },
          {
            id: "b1-l3-e2",
            type: "fill-blank",
            question: "Complete: Când eram mic, _____ la mare. (I used to go to the sea.)",
            blankSentence: "Când eram mic, _____ la mare.",
            correctAnswer: "mergeam",
            explanation: "'Mergeam' is the imperfect of 'a merge' (to go) — used for habitual past actions.",
          },
          {
            id: "b1-l3-e3",
            type: "multiple-choice",
            question: "What auxiliary is used to form the perfect compus?",
            options: [
              { id: "a", text: "a fi (to be)" },
              { id: "b", text: "a vrea (to want)" },
              { id: "c", text: "a putea (to be able)" },
              { id: "d", text: "a avea (to have)" },
            ],
            correctAnswer: "d",
            explanation: "Perfect compus = present of 'a avea' + past participle: am/ai/a/am/ați/au + participle.",
          },
        ],
      },
      // ─── Lesson 4 ───────────────────────────────────────────────────────────
      {
        id: "b1-l4",
        title: "The Subjunctive Mood (Conjunctivul)",
        type: "grammar",
        estimatedMinutes: 26,
        completed: false,
        sections: [
          {
            title: "What Is the Subjunctive?",
            content:
              "The subjunctive (conjunctivul) in Romanian replaces the infinitive after most verbs expressing desire, wish, necessity, emotion, or intention. Structure: verb + să + subjunctive. The subjunctive present looks almost identical to the indicative present, with minor differences in 3rd person.",
            examples: [
              { romanian: "Vreau să merg.", phonetic: "[vryow suh merg]", english: "I want to go." },
              { romanian: "Trebuie să studiezi.", phonetic: "[TREH-bwee-yeh suh stoo-DYEH-zee]", english: "You must study." },
              { romanian: "Sper să vii.", phonetic: "[sper suh vee]", english: "I hope you will come." },
            ],
          },
          {
            title: "Subjunctive vs. Infinitive",
            content:
              "Unlike other Romance languages, Romanian rarely uses the infinitive after modal/volitional verbs. Instead, 'să + subjunctive' is used. The infinitive (with 'a') remains for a few contexts: after 'înainte de a', 'fără a', and impersonal constructions.",
            examples: [
              { romanian: "Încerc să înțeleg.", phonetic: "[een-CHERK suh een-TSYEH-leg]", english: "I try to understand." },
              { romanian: "Înainte de a pleca.", phonetic: "[ee-NAIN-teh deh ah pleh-KAH]", english: "Before leaving. (infinitive after 'înainte de a')" },
              { romanian: "Fără a spune nimic.", phonetic: "[FUH-ruh ah SPOO-neh NEE-meek]", english: "Without saying anything. (infinitive after 'fără a')" },
            ],
          },
          {
            title: "Common Verbs Followed by Să",
            content:
              "These verbs always require 'să + subjunctive': a vrea (to want), a putea (to be able), a trebui (must), a dori (to wish), a ruga (to ask/beg), a lăsa (to let), a permite (to allow), a spera (to hope), a ști (to know how to).",
            examples: [
              { romanian: "Îl rog să vină.", phonetic: "[eel rog suh VEE-nuh]", english: "I ask him to come." },
              { romanian: "Îi permit să plece.", phonetic: "[ee pehr-MEET suh PLEH-cheh]", english: "I allow him/her to leave." },
              { romanian: "Nu știu să cânt.", phonetic: "[noo SHTYOO suh kunt]", english: "I don't know how to sing." },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l4-e1",
            type: "multiple-choice",
            question: "How do you say 'I want to go' in Romanian?",
            options: [
              { id: "a", text: "Vreau a merge." },
              { id: "b", text: "Vreau să merg." },
              { id: "c", text: "Vreau merge." },
              { id: "d", text: "Vreai merg." },
            ],
            correctAnswer: "b",
            explanation: "After 'a vrea' (to want), Romanian uses 'să + subjunctive': vreau să merg.",
          },
          {
            id: "b1-l4-e2",
            type: "fill-blank",
            question: "Complete: Încerc _____ înțeleg. (I try to understand.)",
            blankSentence: "Încerc _____ înțeleg.",
            correctAnswer: "să",
            explanation: "'A încerca' (to try) is followed by 'să + subjunctive': încerc să înțeleg.",
          },
          {
            id: "b1-l4-e3",
            type: "multiple-choice",
            question: "After which conjunction/preposition is the infinitive still used in Romanian?",
            options: [
              { id: "a", text: "după (after)" },
              { id: "b", text: "înainte de a (before)" },
              { id: "c", text: "pentru că (because)" },
              { id: "d", text: "când (when)" },
            ],
            correctAnswer: "b",
            explanation: "'Înainte de a + infinitive' is one of the few contexts where the infinitive survives in Romanian.",
          },
        ],
      },
      // ─── Lesson 5 ───────────────────────────────────────────────────────────
      {
        id: "b1-l5",
        title: "Pronunciation: Regional Accents & Connected Speech",
        type: "pronunciation",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Regional Accents in Romania",
            content:
              "Romanian has several regional varieties. The Muntenian (Wallachian) accent is considered standard — used in media and education. Moldovan Romanian is softer with some different vowel sounds. Transylvanian Romanian has Hungarian and German influences. Oltenian has distinctive vowel shifts.",
            examples: [
              { romanian: "merg [standard]", phonetic: "[merg]", english: "I go — standard Muntenian" },
              { romanian: "merge [Moldovan]", phonetic: "[MEHR-jeh] — stressed differently", english: "slight stress/vowel variation" },
              { romanian: "Bună ziua!", phonetic: "[BOO-nuh ZEE-wah]", english: "Good day! — same across all regions" },
            ],
          },
          {
            title: "Connected Speech: Elision & Contraction",
            content:
              "In fast natural speech, Romanians contract and elide sounds. Common patterns: 'nu am' → 'n-am', 'nu este' → 'nu-i' or 'n-e', 'o să' can sound like 's-'. Clitic pronouns merge with verbs: 'îl' → 'l-', 'îi' → 'i-'.",
            examples: [
              { romanian: "N-am mers.", phonetic: "[nam mers]", english: "I didn't go. (nu am → n-am)" },
              { romanian: "Nu-i acasă.", phonetic: "[NOO-ee ah-KAH-suh]", english: "He/she isn't home. (nu este → nu-i)" },
              { romanian: "L-am văzut.", phonetic: "[lam vuh-ZOOT]", english: "I saw him. (îl am → l-am)" },
            ],
          },
          {
            title: "Rhythm & Syllable Timing",
            content:
              "Romanian is a syllable-timed language — each syllable takes roughly the same amount of time, unlike English which is stress-timed. This gives Romanian a steady, even rhythm. Focus on keeping unstressed vowels clear and not reducing them to 'schwa' as English speakers tend to do.",
            examples: [
              { romanian: "fri-gi-der", phonetic: "[free-JEE-der]", english: "refrigerator — each syllable clear" },
              { romanian: "u-ni-ver-si-ta-te", phonetic: "[oo-nee-ver-see-TAH-teh]", english: "university — 6 equal syllables" },
              { romanian: "con-ver-sa-ți-e", phonetic: "[kon-ver-SAH-tsyeh]", english: "conversation" },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l5-e1",
            type: "multiple-choice",
            question: "Which Romanian accent is considered standard and used in media?",
            options: [
              { id: "a", text: "Moldovan" },
              { id: "b", text: "Transylvanian" },
              { id: "c", text: "Muntenian (Wallachian)" },
              { id: "d", text: "Oltenian" },
            ],
            correctAnswer: "c",
            explanation: "Muntenian (Wallachian) Romanian, centered on Bucharest, is the prestige standard used in broadcasting and education.",
          },
          {
            id: "b1-l5-e2",
            type: "fill-blank",
            question: "What does 'nu am' contract to in fast speech?",
            blankSentence: "nu am → ___-am",
            correctAnswer: "n",
            explanation: "'Nu am' contracts to 'n-am' in connected speech: N-am mers = I didn't go.",
          },
          {
            id: "b1-l5-e3",
            type: "multiple-choice",
            question: "Romanian is described as a ___ language in terms of rhythm.",
            options: [
              { id: "a", text: "stress-timed" },
              { id: "b", text: "tone-timed" },
              { id: "c", text: "syllable-timed" },
              { id: "d", text: "mora-timed" },
            ],
            correctAnswer: "c",
            explanation: "Romanian is syllable-timed: each syllable takes roughly equal time, giving it a steady rhythmic feel.",
          },
        ],
      },
      // ─── Lesson 6 ───────────────────────────────────────────────────────────
      {
        id: "b1-l6",
        title: "Reflexive Verbs & Reflexive Constructions",
        type: "grammar",
        estimatedMinutes: 22,
        completed: false,
        sections: [
          {
            title: "True Reflexive Verbs",
            content:
              "Reflexive verbs in Romanian use reflexive pronouns (mă, te, se, ne, vă, se) to show the subject acts on itself. Many daily-routine verbs are reflexive. The pronouns precede the verb in most tenses.",
            examples: [
              { romanian: "Mă spăl pe mâini.", phonetic: "[muh spuhl peh MUY-nee]", english: "I wash my hands. (lit. I wash myself on the hands)" },
              { romanian: "Te îmbraci repede.", phonetic: "[teh eem-BRAH-chee REH-peh-deh]", english: "You get dressed quickly." },
              { romanian: "Ne distrăm.", phonetic: "[neh dees-TRAHM]", english: "We are having fun." },
            ],
          },
          {
            title: "Reciprocal Reflexives",
            content:
              "The third-person reflexive 'se' can express reciprocal action (each other). Context distinguishes it from true reflexive. When ambiguity is possible, 'unul pe altul' (one another) can clarify.",
            examples: [
              { romanian: "Se iubesc.", phonetic: "[seh yoo-BESK]", english: "They love each other." },
              { romanian: "Ne cunoaștem de mult.", phonetic: "[neh kwoh-NAHSH-tem deh moolt]", english: "We have known each other for a long time." },
              { romanian: "Se ajută unul pe altul.", phonetic: "[seh ah-ZHOO-tuh OO-nool peh AL-tool]", english: "They help one another." },
            ],
          },
          {
            title: "Reflexive Passive Construction",
            content:
              "Romanian commonly uses the reflexive 'se' to form passive-like constructions (instead of the formal passive with 'a fi'). This is the normal spoken way to express passivity or impersonal actions.",
            examples: [
              { romanian: "Aici se vorbește română.", phonetic: "[ah-EECH seh vor-BEHSH-teh roh-MUH-nuh]", english: "Romanian is spoken here." },
              { romanian: "Se vând mere proaspete.", phonetic: "[seh vund MEH-reh PRWAS-peh-teh]", english: "Fresh apples are sold. / They sell fresh apples." },
              { romanian: "Ușa se deschide la opt.", phonetic: "[OO-shah seh des-KEE-deh lah opt]", english: "The door opens at eight." },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l6-e1",
            type: "multiple-choice",
            question: "What is the reflexive pronoun for 'noi' (we)?",
            options: [
              { id: "a", text: "mă" },
              { id: "b", text: "se" },
              { id: "c", text: "ne" },
              { id: "d", text: "vă" },
            ],
            correctAnswer: "c",
            explanation: "Reflexive pronouns: mă (eu), te (tu), se (el/ea/ei/ele), ne (noi), vă (voi).",
          },
          {
            id: "b1-l6-e2",
            type: "fill-blank",
            question: "Translate 'Romanian is spoken here': Aici _____ vorbește română.",
            blankSentence: "Aici _____ vorbește română.",
            correctAnswer: "se",
            explanation: "The reflexive passive uses 'se': 'se vorbește' = is spoken. This is the most natural way to express passive in spoken Romanian.",
          },
          {
            id: "b1-l6-e3",
            type: "multiple-choice",
            question: "'Se iubesc' most likely means:",
            options: [
              { id: "a", text: "He loves himself." },
              { id: "b", text: "They love each other." },
              { id: "c", text: "She is loved." },
              { id: "d", text: "I love him." },
            ],
            correctAnswer: "b",
            explanation: "Third person plural 'se' in context of two people typically expresses a reciprocal: they love each other.",
          },
        ],
      },
      // ─── Lesson 7 ───────────────────────────────────────────────────────────
      {
        id: "b1-l7",
        title: "Noun Plurals: Patterns & Irregulars",
        type: "grammar",
        estimatedMinutes: 24,
        completed: false,
        sections: [
          {
            title: "Masculine Plural Patterns",
            content:
              "Masculine nouns form plurals mainly with -i. Final consonants often soften before -i (palatalisation). Examples: băiat → băieți, student → studenți, prieten → prieteni, om → oameni (irregular).",
            examples: [
              { romanian: "băiat → băieți", phonetic: "[buh-YAT / buh-YETS]", english: "boy → boys" },
              { romanian: "student → studenți", phonetic: "[stoo-DENT / stoo-DENTS]", english: "student → students" },
              { romanian: "om → oameni", phonetic: "[om / WAH-meh-nee]", english: "man/person → people (irregular)" },
            ],
          },
          {
            title: "Feminine Plural Patterns",
            content:
              "Feminine nouns ending in -ă form plurals by replacing -ă with -e or -i. Feminine nouns ending in -e usually add -i. Feminine nouns ending in -ie usually become -ii.",
            examples: [
              { romanian: "fată → fete", phonetic: "[FAH-tuh / FEH-teh]", english: "girl → girls" },
              { romanian: "casă → case", phonetic: "[KAH-suh / KAH-seh]", english: "house → houses" },
              { romanian: "floare → flori", phonetic: "[FLWAH-reh / flor]", english: "flower → flowers" },
            ],
          },
          {
            title: "Neuter Nouns: The Ambigenous Gender",
            content:
              "Neuter nouns behave like masculine in the singular and feminine in the plural — earning the nickname 'ambigenous'. Neuter plurals usually end in -uri or -e.",
            examples: [
              { romanian: "scaun → scaune", phonetic: "[SKOW-noon / SKOW-neh]", english: "chair → chairs (n.→f.pl)" },
              { romanian: "teatru → teatre", phonetic: "[TYAH-troo / TYAH-treh]", english: "theatre → theatres" },
              { romanian: "lucru → lucruri", phonetic: "[LOOK-roo / LOOK-roori]", english: "thing → things (-uri plural)" },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l7-e1",
            type: "multiple-choice",
            question: "What is the plural of 'băiat' (boy)?",
            options: [
              { id: "a", text: "băiați" },
              { id: "b", text: "băieți" },
              { id: "c", text: "băieti" },
              { id: "d", text: "băiaturi" },
            ],
            correctAnswer: "b",
            explanation: "'Băiat' → 'băieți'. Palatalisation of 't' before -i gives 'ț': băieți.",
          },
          {
            id: "b1-l7-e2",
            type: "fill-blank",
            question: "What is the plural of 'casă' (house)?",
            blankSentence: "casă → _____",
            correctAnswer: "case",
            explanation: "Feminine nouns ending in -ă typically replace -ă with -e: casă → case.",
          },
          {
            id: "b1-l7-e3",
            type: "multiple-choice",
            question: "Why are neuter nouns called 'ambigenous'?",
            options: [
              { id: "a", text: "They have no gender." },
              { id: "b", text: "They are masculine in the singular and feminine in the plural." },
              { id: "c", text: "They can be either masculine or feminine." },
              { id: "d", text: "Their gender changes with case." },
            ],
            correctAnswer: "b",
            explanation: "Neuter nouns use masculine singular forms but feminine plural forms — hence 'ambigenous' (both-gendered).",
          },
        ],
      },
      // ─── Lesson 8 ───────────────────────────────────────────────────────────
      {
        id: "b1-l8",
        title: "Demonstrative & Relative Pronouns",
        type: "grammar",
        estimatedMinutes: 22,
        completed: false,
        sections: [
          {
            title: "Demonstrative Pronouns: This & That",
            content:
              "Romanian demonstratives agree with the noun's gender and number. Near (this): acesta (m.), aceasta (f.), acestea (pl.). Far (that): acela (m.), aceea (f.), acelea (pl.). Short forms: ăsta/asta (this), ăla/aia (that) — used in colloquial speech.",
            examples: [
              { romanian: "Acesta este fratele meu.", phonetic: "[ah-CHES-tah YES-teh FRAH-teh-leh MEH-oo]", english: "This is my brother." },
              { romanian: "Îmi place aceea.", phonetic: "[eem PLAH-cheh ah-CHEH-ah]", english: "I like that one (f.)." },
              { romanian: "Ăsta e bun!", phonetic: "[UHS-tah yeh boon]", english: "This one is good! (colloquial)" },
            ],
          },
          {
            title: "Relative Pronouns: Care, Ce, Cine",
            content:
              "'Care' (who/which/that) is the main relative pronoun, agreeing in gender and number. It declines: care (NOM/ACC), cărui/căreia (GEN/DAT sg.), cărora (GEN/DAT pl.). 'Ce' is used for things/ideas in fixed expressions. 'Cine' refers to people in general.",
            examples: [
              { romanian: "Cartea care e pe masă.", phonetic: "[KAR-teh-ah KAH-reh yeh peh MAH-suh]", english: "The book that/which is on the table." },
              { romanian: "Omul pe care îl văd.", phonetic: "[OH-mool peh KAH-reh eel vuhd]", english: "The man whom I see." },
              { romanian: "Tot ce știu.", phonetic: "[tot cheh SHTYOO]", english: "Everything (that) I know." },
            ],
          },
          {
            title: "Compound Demonstratives with 'cel'",
            content:
              "The particle 'cel/cea/cei/cele' is used to create compound demonstratives and as a determiner before adjectives meaning 'the one that is...'. Also used in superlatives: cel mai bun (the best).",
            examples: [
              { romanian: "cel mai mare", phonetic: "[chel my MAH-reh]", english: "the biggest / the largest" },
              { romanian: "cea mai frumoasă", phonetic: "[chah my froo-MWAH-suh]", english: "the most beautiful (f.)" },
              { romanian: "Cel care vine.", phonetic: "[chel KAH-reh VEE-neh]", english: "The one who is coming." },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l8-e1",
            type: "multiple-choice",
            question: "What is the colloquial short form of 'aceasta' (this, f.)?",
            options: [
              { id: "a", text: "ăsta" },
              { id: "b", text: "aia" },
              { id: "c", text: "asta" },
              { id: "d", text: "ceea" },
            ],
            correctAnswer: "c",
            explanation: "Short colloquial forms: ăsta (m. this), asta (f. this), ăla (m. that), aia (f. that).",
          },
          {
            id: "b1-l8-e2",
            type: "fill-blank",
            question: "Complete: cel mai bun = the _____ (superlative)",
            blankSentence: "cel mai _____",
            correctAnswer: "bun",
            explanation: "'Cel mai bun' = the best. Superlatives in Romanian use 'cel/cea/cei/cele mai + adjective'.",
          },
          {
            id: "b1-l8-e3",
            type: "multiple-choice",
            question: "Which relative pronoun is most commonly used in Romanian for both people and things?",
            options: [
              { id: "a", text: "ce" },
              { id: "b", text: "cine" },
              { id: "c", text: "care" },
              { id: "d", text: "cel" },
            ],
            correctAnswer: "c",
            explanation: "'Care' is the main relative pronoun in Romanian, used for both people and things: omul care, cartea care.",
          },
        ],
      },
      // ─── Lesson 9 ───────────────────────────────────────────────────────────
      {
        id: "b1-l9",
        title: "Pronunciation: Rhythm, Linking & Fluency",
        type: "pronunciation",
        estimatedMinutes: 18,
        completed: false,
        sections: [
          {
            title: "Linking Words in Speech",
            content:
              "In natural Romanian speech, words within a phrase link together. Final consonants link to the following vowel-initial word. The result is smooth, flowing speech that can sound fast to learners. Practise reading aloud to develop this.",
            examples: [
              { romanian: "un_om bun", phonetic: "[oo-NOM boon]", english: "a good man — 'un' links to 'om'" },
              { romanian: "în_afară", phonetic: "[ee-nah-FAH-ruh]", english: "outside — smooth linking" },
              { romanian: "de_acord", phonetic: "[dyah-KORD]", english: "agreed — 'de' links to 'acord'" },
            ],
          },
          {
            title: "Vowel Hiatus & Diphthong Resolution",
            content:
              "When two vowels meet at word boundaries, Romanian either glides one of them (forming a diphthong) or maintains a hiatus. The high vowels i and u often glide into [j] and [w] respectively before another vowel.",
            examples: [
              { romanian: "a ieși", phonetic: "[ah yeh-SHEE]", english: "to exit — 'ie' glides" },
              { romanian: "ea are", phonetic: "[yah AH-reh]", english: "she has — 'ea' + vowel" },
              { romanian: "în_urcare", phonetic: "[een-oor-KAH-reh]", english: "while going up — linking" },
            ],
          },
          {
            title: "Speed & Pause Patterns",
            content:
              "Romanian speakers use pauses at clause boundaries, not mid-phrase. Commas signal short breath-pauses. Lists speed up. Questions rise at the end. Practise with authentic materials: Romanian news, podcasts, and films.",
            examples: [
              { romanian: "Vreau să merg, // dar nu pot.", phonetic: "[vryow suh merg // dar noo pot]", english: "I want to go, // but I can't. (pause at comma)" },
              { romanian: "pâine, lapte, ouă, brânză", phonetic: "[PUY-nyeh LAP-teh WUH BRUN-zuh]", english: "bread, milk, eggs, cheese — list speeds up" },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l9-e1",
            type: "multiple-choice",
            question: "How is 'de acord' (agreed) typically pronounced in connected speech?",
            options: [
              { id: "a", text: "[DEH ah-KORD] — clear separation" },
              { id: "b", text: "[dyah-KORD] — linked" },
              { id: "c", text: "[deh-kord] — 'a' dropped" },
              { id: "d", text: "[dah-KORD] — vowel merged" },
            ],
            correctAnswer: "b",
            explanation: "In connected speech, 'de acord' links to form [dyah-KORD] — the 'e' of 'de' glides into the following vowel.",
          },
          {
            id: "b1-l9-e2",
            type: "fill-blank",
            question: "When 'i' appears before another vowel at word boundaries it often sounds like: [___]",
            blankSentence: "[___]",
            correctAnswer: "j",
            explanation: "The vowel 'i' glides into the semivowel [j] (like 'y' in 'yes') before another vowel in Romanian.",
          },
          {
            id: "b1-l9-e3",
            type: "multiple-choice",
            question: "Where do Romanian speakers typically pause within a sentence?",
            options: [
              { id: "a", text: "After every stressed syllable" },
              { id: "b", text: "Mid-phrase, randomly" },
              { id: "c", text: "At clause boundaries / commas" },
              { id: "d", text: "They never pause" },
            ],
            correctAnswer: "c",
            explanation: "Pauses in Romanian occur at natural clause boundaries — commas and conjunction breaks, not mid-phrase.",
          },
        ],
      },
      // ─── Lesson 10 ──────────────────────────────────────────────────────────
      {
        id: "b1-l10",
        title: "Conditional & Conditional Perfect",
        type: "grammar",
        estimatedMinutes: 24,
        completed: false,
        sections: [
          {
            title: "Present Conditional: 'Would'",
            content:
              "The present conditional expresses what would happen. Auxiliary: aș/ai/ar/am/ați/ar + infinitive. Used for polite requests, hypothetical situations, and wishes. Very common in everyday speech.",
            examples: [
              { romanian: "Aș vrea o cafea.", phonetic: "[ash VREH-ah oh kah-FEH-ah]", english: "I would like a coffee. (polite)" },
              { romanian: "Ai putea să mă ajuți?", phonetic: "[ay poo-TEH-ah suh muh ah-ZHOOTSI]", english: "Could you help me?" },
              { romanian: "Ar fi mai bine.", phonetic: "[ar fee my BEE-neh]", english: "It would be better." },
            ],
          },
          {
            title: "Conditional Perfect: 'Would Have'",
            content:
              "The conditional perfect expresses what would have happened. Formed with: aș/ai/ar/am/ați/ar + fi + past participle. Used in hypothetical past situations (if...then) and to express regret.",
            examples: [
              { romanian: "Aș fi mers dacă știam.", phonetic: "[ash fee mers DAH-kuh SHTYAM]", english: "I would have gone if I had known." },
              { romanian: "Ar fi putut pleca.", phonetic: "[ar fee poo-TOOT pleh-KAH]", english: "He/she could have left." },
              { romanian: "Am fi câștigat.", phonetic: "[am fee kushts-tee-GAT]", english: "We would have won." },
            ],
          },
          {
            title: "Conditional in 'If' Clauses (Dacă)",
            content:
              "Romanian if-clauses use 'dacă' (if). Type 2 (unreal present): dacă + imperfect / conditional present. Type 3 (unreal past): dacă + pluperfect / conditional perfect. Type 1 (real): dacă + present / present or future.",
            examples: [
              { romanian: "Dacă aș ști, ți-aș spune.", phonetic: "[DAH-kuh ash shtyee tsee-ash SPOO-neh]", english: "If I knew, I would tell you. (Type 2)" },
              { romanian: "Dacă ar fi venit, am fi vorbit.", phonetic: "[DAH-kuh ar fee veh-NEET, am fee vor-BEET]", english: "If he had come, we would have spoken. (Type 3)" },
              { romanian: "Dacă merg, te sun.", phonetic: "[DAH-kuh merg teh soon]", english: "If I go, I'll call you. (Type 1)" },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l10-e1",
            type: "multiple-choice",
            question: "What is the conditional auxiliary for 'eu' (I)?",
            options: [
              { id: "a", text: "ar" },
              { id: "b", text: "am" },
              { id: "c", text: "aș" },
              { id: "d", text: "ai" },
            ],
            correctAnswer: "c",
            explanation: "Conditional auxiliaries: aș (eu), ai (tu), ar (el/ea), am (noi), ați (voi), ar (ei/ele).",
          },
          {
            id: "b1-l10-e2",
            type: "fill-blank",
            question: "Complete: Aș fi _____ dacă știam. (I would have gone if I had known.)",
            blankSentence: "Aș fi _____ dacă știam.",
            correctAnswer: "mers",
            explanation: "Conditional perfect: aș fi + past participle. Participle of 'a merge' = mers.",
          },
          {
            id: "b1-l10-e3",
            type: "multiple-choice",
            question: "Which tense combination forms a Type 2 (unreal present) if-clause?",
            options: [
              { id: "a", text: "present + present" },
              { id: "b", text: "imperfect + conditional present" },
              { id: "c", text: "pluperfect + conditional perfect" },
              { id: "d", text: "future + conditional" },
            ],
            correctAnswer: "b",
            explanation: "Type 2 if-clauses: dacă + imperfect → conditional present. E.g. Dacă aș ști, ți-aș spune.",
          },
        ],
      },
      // ─── Lesson 11 ──────────────────────────────────────────────────────────
      {
        id: "b1-l11",
        title: "Passive Voice & Impersonal Constructions",
        type: "grammar",
        estimatedMinutes: 22,
        completed: false,
        sections: [
          {
            title: "The Formal Passive with 'A Fi'",
            content:
              "The formal passive is formed with the appropriate tense of 'a fi' (to be) + past participle. The participle agrees in gender and number with the subject. This form appears in writing and formal speech.",
            examples: [
              { romanian: "Cartea este citită.", phonetic: "[KAR-teh-ah YES-teh chee-TEE-tuh]", english: "The book is read. (f. sg. — passive)" },
              { romanian: "Scrisorile au fost trimise.", phonetic: "[skree-SOH-ree-leh ow fost tree-MEE-seh]", english: "The letters were sent. (f. pl.)" },
              { romanian: "Proiectul va fi finalizat.", phonetic: "[pro-YEKT-ool vah fee fee-nah-lee-ZAT]", english: "The project will be finalized." },
            ],
          },
          {
            title: "Se-Passive (Preferred in Speech)",
            content:
              "The reflexive 'se' passive is preferred in spoken Romanian. It is more natural than the 'a fi' passive for most contexts. The verb agrees with the grammatical subject.",
            examples: [
              { romanian: "Se vând bilete.", phonetic: "[seh vund bee-YEH-teh]", english: "Tickets are sold." },
              { romanian: "Se știe că...", phonetic: "[seh SHTYEH-yeh kuh]", english: "It is known that..." },
              { romanian: "Se spune că e greu.", phonetic: "[seh SPOO-neh kuh yeh grew]", english: "It is said that it's difficult." },
            ],
          },
          {
            title: "Impersonal Constructions",
            content:
              "Impersonal expressions use the third-person singular with no specific subject. Common: trebuie să (must), e posibil să (it's possible to), e nevoie de (there is a need for), e greu să (it's hard to), e bine să (it's good to).",
            examples: [
              { romanian: "E posibil să plouă.", phonetic: "[yeh poh-SEE-beel suh PLOH-wuh]", english: "It's possible that it will rain." },
              { romanian: "E nevoie de răbdare.", phonetic: "[yeh neh-VOY-yeh deh ruhb-DAH-reh]", english: "Patience is needed." },
              { romanian: "E greu să înveți o limbă.", phonetic: "[yeh grew suh een-VETS oh LEEM-buh]", english: "It's hard to learn a language." },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l11-e1",
            type: "multiple-choice",
            question: "Which passive form is more common in spoken Romanian?",
            options: [
              { id: "a", text: "a fi + past participle" },
              { id: "b", text: "se + verb" },
              { id: "c", text: "a deveni + participle" },
              { id: "d", text: "a rămâne + participle" },
            ],
            correctAnswer: "b",
            explanation: "The 'se' passive (reflexive passive) is preferred in spoken Romanian: se vinde, se spune, se știe.",
          },
          {
            id: "b1-l11-e2",
            type: "fill-blank",
            question: "Complete: _____ spune că e greu. (It is said that it's difficult.)",
            blankSentence: "_____ spune că e greu.",
            correctAnswer: "Se",
            explanation: "'Se spune' = it is said / people say. Reflexive impersonal construction.",
          },
          {
            id: "b1-l11-e3",
            type: "multiple-choice",
            question: "In the formal passive 'cartea este citită', what does 'citită' agree with?",
            options: [
              { id: "a", text: "The agent (who reads)" },
              { id: "b", text: "The verb 'este'" },
              { id: "c", text: "The subject 'cartea' (f. sg.)" },
              { id: "d", text: "Nothing — participles don't agree" },
            ],
            correctAnswer: "c",
            explanation: "In the formal passive, the past participle agrees with the subject in gender and number: cartea (f. sg.) → citită (f. sg.).",
          },
        ],
      },
      // ─── Lesson 12 ──────────────────────────────────────────────────────────
      {
        id: "b1-l12",
        title: "Complex Sentences: Conjunctions & Subordination",
        type: "grammar",
        estimatedMinutes: 24,
        completed: false,
        sections: [
          {
            title: "Coordinating Conjunctions",
            content:
              "Coordinating conjunctions join clauses of equal status. Key ones: și (and), dar (but), sau (or), ci (but rather — after negation), nici...nici (neither...nor), fie...fie (either...or), atât...cât și (both...and).",
            examples: [
              { romanian: "Mănânc și beau.", phonetic: "[muh-NUNC shee byow]", english: "I eat and drink." },
              { romanian: "Nu el, ci ea.", phonetic: "[noo yel chee yah]", english: "Not him, but her. ('ci' after negation)" },
              { romanian: "Fie merg, fie stau.", phonetic: "[fyeh merg fyeh stow]", english: "Either I go or I stay." },
            ],
          },
          {
            title: "Subordinating Conjunctions",
            content:
              "Subordinating conjunctions introduce dependent clauses. Key ones: că (that), dacă (if/whether), când (when), deși (although), pentru că (because), ca să (so that/in order to), înainte să (before), după ce (after), în timp ce (while).",
            examples: [
              { romanian: "Știu că ești obosit.", phonetic: "[shtyoo kuh YESHTS oh-boh-SEET]", english: "I know that you are tired." },
              { romanian: "Deși plouă, mergem.", phonetic: "[deh-SHEE PLOH-wuh MEHR-gem]", english: "Although it's raining, we are going." },
              { romanian: "Merg ca să înveț.", phonetic: "[merg kah suh een-VETS]", english: "I go in order to learn." },
            ],
          },
          {
            title: "Cause, Consequence & Concession",
            content:
              "Expressing cause: pentru că, din cauza că, fiindcă (because). Consequence: deci (therefore), prin urmare (consequently), astfel (thus). Concession: deși, cu toate că (even though), totuși (however, nevertheless).",
            examples: [
              { romanian: "Fiindcă plouă, stau acasă.", phonetic: "[fyind-KUH PLOH-wuh stow ah-KAH-suh]", english: "Because it's raining, I stay home." },
              { romanian: "E târziu, deci plec.", phonetic: "[yeh TUR-zyoo DEH-chee pleck]", english: "It's late, so I'm leaving." },
              { romanian: "Cu toate că e greu, încerc.", phonetic: "[koo TWAH-teh kuh yeh grew een-CHERK]", english: "Even though it's hard, I try." },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l12-e1",
            type: "multiple-choice",
            question: "Which conjunction means 'but rather' and is used after a negation?",
            options: [
              { id: "a", text: "dar" },
              { id: "b", text: "ci" },
              { id: "c", text: "deși" },
              { id: "d", text: "totuși" },
            ],
            correctAnswer: "b",
            explanation: "'Ci' = but rather (only after negation): Nu el, ci ea = Not him, but her.",
          },
          {
            id: "b1-l12-e2",
            type: "fill-blank",
            question: "Complete: _____ plouă, stau acasă. (Because it's raining, I stay home.)",
            blankSentence: "_____ plouă, stau acasă.",
            correctAnswer: "Fiindcă",
            explanation: "'Fiindcă' = because. Also valid: 'pentru că', 'deoarece'.",
          },
          {
            id: "b1-l12-e3",
            type: "multiple-choice",
            question: "Which conjunction means 'in order to' (expressing purpose)?",
            options: [
              { id: "a", text: "dacă" },
              { id: "b", text: "deși" },
              { id: "c", text: "ca să" },
              { id: "d", text: "după ce" },
            ],
            correctAnswer: "c",
            explanation: "'Ca să' = in order to / so that (purpose clause): Merg ca să înveț = I go in order to learn.",
          },
        ],
      },
      // ─── Lesson 13 ──────────────────────────────────────────────────────────
      {
        id: "b1-l13",
        title: "Travel, Directions & Public Services",
        type: "grammar",
        estimatedMinutes: 20,
        completed: false,
        sections: [
          {
            title: "Asking for & Giving Directions",
            content:
              "Essential vocabulary for navigating Romanian cities. Key verbs: a merge (to go), a vira (to turn), a traversa (to cross), a continua (to continue). Direction words: stânga (left), dreapta (right), drept înainte (straight ahead), la colț (at the corner).",
            examples: [
              { romanian: "Unde este gara?", phonetic: "[OON-deh YES-teh GAH-rah]", english: "Where is the train station?" },
              { romanian: "Virați la stânga.", phonetic: "[vee-RATS lah STUN-gah]", english: "Turn left." },
              { romanian: "Mergeți drept înainte.", phonetic: "[MEHR-jets drept ee-NAIN-teh]", english: "Go straight ahead." },
            ],
          },
          {
            title: "Transport & Tickets",
            content:
              "Romanian public transport vocabulary: tren (train), autobuz (bus), metrou (metro/subway), tramvai (tram), taxi, avion (plane), bilet (ticket), dus-întors (round trip), clasa întâi / a doua (first/second class).",
            examples: [
              { romanian: "Un bilet dus-întors la Cluj, vă rog.", phonetic: "[oon bee-YET doos een-TORS lah kloozh vuh rog]", english: "A round-trip ticket to Cluj, please." },
              { romanian: "La ce oră pleacă trenul?", phonetic: "[lah cheh OH-rah PLYAH-kuh TREH-nool]", english: "What time does the train leave?" },
              { romanian: "Cât costă un bilet de metrou?", phonetic: "[kuht KOS-tuh oon bee-YET deh meh-TROO]", english: "How much is a metro ticket?" },
            ],
          },
          {
            title: "At the Hotel & Official Services",
            content:
              "Checking into a hotel, dealing with official services. Key phrases: a rezerva (to reserve), o cameră (a room), pașaport (passport), buletin (ID card), formular (form), semnătură (signature).",
            examples: [
              { romanian: "Am o rezervare pe numele Ionescu.", phonetic: "[am oh reh-zer-VAH-reh peh NOO-meh-leh yoh-NES-koo]", english: "I have a reservation under the name Ionescu." },
              { romanian: "Pot să văd pașaportul dvs.?", phonetic: "[pot suh vuhd pah-sha-POR-tool dom-nee-vwas-truh]", english: "May I see your passport?" },
              { romanian: "Trebuie să completez un formular?", phonetic: "[TREH-bwee-yeh suh kom-pleh-TEZ oon for-moo-LAR]", english: "Do I need to fill in a form?" },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l13-e1",
            type: "multiple-choice",
            question: "How do you say 'turn left' in Romanian?",
            options: [
              { id: "a", text: "Mergeți stânga." },
              { id: "b", text: "Virați la dreapta." },
              { id: "c", text: "Virați la stânga." },
              { id: "d", text: "Continuați la stânga." },
            ],
            correctAnswer: "c",
            explanation: "'A vira' = to turn. 'La stânga' = to the left. Virați la stânga = Turn left.",
          },
          {
            id: "b1-l13-e2",
            type: "fill-blank",
            question: "Complete: Un bilet _____ la Cluj, vă rog. (A round-trip ticket to Cluj.)",
            blankSentence: "Un bilet _____ la Cluj, vă rog.",
            correctAnswer: "dus-întors",
            explanation: "'Dus-întors' = round trip (lit. gone-returned). Bilet dus-întors = round-trip ticket.",
          },
          {
            id: "b1-l13-e3",
            type: "multiple-choice",
            question: "What does 'Mergeți drept înainte' mean?",
            options: [
              { id: "a", text: "Turn right." },
              { id: "b", text: "Go back." },
              { id: "c", text: "Go straight ahead." },
              { id: "d", text: "Stop here." },
            ],
            correctAnswer: "c",
            explanation: "'Drept înainte' = straight ahead. 'Mergeți drept înainte' = Go straight ahead.",
          },
        ],
      },
      // ─── Lesson 14 ──────────────────────────────────────────────────────────
      {
        id: "b1-l14",
        title: "The Pluperfect & Sequence of Tenses",
        type: "grammar",
        estimatedMinutes: 24,
        completed: false,
        sections: [
          {
            title: "The Pluperfect (Mai-mult-ca-perfectul)",
            content:
              "The pluperfect (past perfect) expresses an action completed before another past action — the 'had done' tense. In Romanian it is a simple tense formed by adding endings to the past participle: -sem, -seși, -se, -serăm, -serăți, -seră.",
            examples: [
              { romanian: "Mâncasem deja.", phonetic: "[mun-KAH-sem DEH-jah]", english: "I had already eaten." },
              { romanian: "Plecase când am ajuns.", phonetic: "[pleh-KAH-seh kund am ah-ZHOONS]", english: "He had left when I arrived." },
              { romanian: "Nu dormisem bine.", phonetic: "[noo dor-MEE-sem BEE-neh]", english: "I hadn't slept well." },
            ],
          },
          {
            title: "Using the Pluperfect in Context",
            content:
              "The pluperfect is used to establish which past event happened first. It often appears with temporal conjunctions: după ce (after), când (when), până (until), înainte să (before). In spoken Romanian, perfect compus sometimes replaces it.",
            examples: [
              { romanian: "După ce terminasem, am plecat.", phonetic: "[DOO-puh cheh ter-mee-NAH-sem am pleh-KAT]", english: "After I had finished, I left." },
              { romanian: "Înainte să ajungă, pregătisem totul.", phonetic: "[ee-NAIN-teh suh ah-ZHOON-guh preh-guh-TEE-sem TOH-tool]", english: "Before she arrived, I had prepared everything." },
            ],
          },
          {
            title: "Reported Speech & Sequence",
            content:
              "In reported speech, tenses shift back: present → imperfect, perfect compus → pluperfect. The conjunction 'că' introduces reported statements; 'dacă' / 'să' introduce reported questions and commands.",
            examples: [
              { romanian: "Mi-a spus că pleacă. → Mi-a spus că plecase.", phonetic: "[mee-ah spoos kuh PLYAH-kuh / pleh-KAH-seh]", english: "He told me he's leaving. → He told me he had left." },
              { romanian: "A întrebat dacă sunt acasă.", phonetic: "[ah een-treh-BAT DAH-kuh soont ah-KAH-suh]", english: "He asked whether I was home." },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l14-e1",
            type: "multiple-choice",
            question: "Which tense is 'mâncasem' (I had eaten)?",
            options: [
              { id: "a", text: "Imperfect" },
              { id: "b", text: "Perfect compus" },
              { id: "c", text: "Pluperfect (mai-mult-ca-perfect)" },
              { id: "d", text: "Conditional perfect" },
            ],
            correctAnswer: "c",
            explanation: "'Mâncasem' = I had eaten — the pluperfect, formed from the participle 'mâncat' + -sem ending.",
          },
          {
            id: "b1-l14-e2",
            type: "fill-blank",
            question: "Complete: Plecase când am _____. (He had left when I arrived.)",
            blankSentence: "Plecase când am _____.",
            correctAnswer: "ajuns",
            explanation: "Past participle of 'a ajunge' (to arrive) = ajuns. Am ajuns = I arrived (perfect compus).",
          },
          {
            id: "b1-l14-e3",
            type: "multiple-choice",
            question: "In reported speech, a present tense verb shifts to which tense?",
            options: [
              { id: "a", text: "Pluperfect" },
              { id: "b", text: "Perfect compus" },
              { id: "c", text: "Imperfect" },
              { id: "d", text: "Conditional" },
            ],
            correctAnswer: "c",
            explanation: "In Romanian reported speech, present → imperfect: 'pleacă' → 'plecase' or 'pleca'.",
          },
        ],
      },
      // ─── Lesson 15 ──────────────────────────────────────────────────────────
      {
        id: "b1-l15",
        title: "Vocabulary: Work, Culture & Abstract Concepts",
        type: "grammar",
        estimatedMinutes: 22,
        completed: false,
        sections: [
          {
            title: "Work & Professional Vocabulary",
            content:
              "Essential vocabulary for work contexts. Romanian borrows many professional terms from French and English. Key verbs: a lucra (to work), a angaja (to hire), a demisiona (to resign), a promova (to promote), a negocia (to negotiate).",
            examples: [
              { romanian: "Sunt angajat la o firmă de IT.", phonetic: "[soont an-gah-ZHAт lah oh FEER-muh deh ee-tee]", english: "I am employed at an IT company." },
              { romanian: "Am o întâlnire de afaceri.", phonetic: "[am oh een-TUL-nee-reh deh ah-FAH-cheh-ree]", english: "I have a business meeting." },
              { romanian: "Salariul meu a crescut.", phonetic: "[sah-LAH-ryool MEH-oo ah kreh-SKOOT]", english: "My salary has increased." },
            ],
          },
          {
            title: "Romanian Culture & History Vocabulary",
            content:
              "Vocabulary for discussing Romanian culture and history — useful for reading, watching films, and authentic conversations. Key terms: cultură (culture), patrimoniu (heritage), tradiție (tradition), meșteșug (craft), folclor (folklore), revoluție (revolution).",
            examples: [
              { romanian: "România are un patrimoniu cultural bogat.", phonetic: "[roh-MUH-nyah AH-reh oon pah-tree-MOH-nyoo kool-too-RAL boh-GAT]", english: "Romania has a rich cultural heritage." },
              { romanian: "Îmi place muzica populară românească.", phonetic: "[eem PLAH-cheh MOO-zee-kah poh-poo-LAH-ruh roh-muh-NYASK-uh]", english: "I like Romanian folk music." },
              { romanian: "Revoluția din 1989 a schimbat istoria.", phonetic: "[reh-voh-LOOTS-yah deen no-uh-spreh-zeh-cheh-opt-zeh-chee-noh-uh ah skeem-BAT ees-TOH-ryah]", english: "The 1989 revolution changed history." },
            ],
          },
          {
            title: "Abstract Concepts & Discourse Markers",
            content:
              "To speak at B1 level, you need abstract vocabulary for opinions, argumentation, and discussion: opinie (opinion), argument (argument), dovadă (evidence), concluzie (conclusion), perspectivă (perspective). Discourse markers: de fapt (in fact), cu alte cuvinte (in other words), prin urmare (therefore), în concluzie (in conclusion).",
            examples: [
              { romanian: "De fapt, situația e mai complexă.", phonetic: "[deh fakt see-twah-TSYAH yeh my kom-PLEX-uh]", english: "In fact, the situation is more complex." },
              { romanian: "Cu alte cuvinte, nu ești de acord.", phonetic: "[koo AL-teh koo-VEEN-teh noo yeshts deh ah-KORD]", english: "In other words, you disagree." },
              { romanian: "În concluzie, am realizat obiectivele.", phonetic: "[een kon-KLOO-zyeh am reh-ah-lee-ZAT ob-yeck-TEE-veh-leh]", english: "In conclusion, we achieved our objectives." },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l15-e1",
            type: "multiple-choice",
            question: "How do you say 'I have a business meeting' in Romanian?",
            options: [
              { id: "a", text: "Am o întâlnire de serviciu." },
              { id: "b", text: "Am o întâlnire de afaceri." },
              { id: "c", text: "Am o conferință de muncă." },
              { id: "d", text: "Lucrez la o întâlnire." },
            ],
            correctAnswer: "b",
            explanation: "'De afaceri' = of business / business-related. Întâlnire de afaceri = business meeting.",
          },
          {
            id: "b1-l15-e2",
            type: "fill-blank",
            question: "Complete: _____ fapt, situația e mai complexă. (In fact, the situation is more complex.)",
            blankSentence: "_____ fapt, situația e mai complexă.",
            correctAnswer: "De",
            explanation: "'De fapt' = in fact. A very common discourse marker in Romanian speech and writing.",
          },
          {
            id: "b1-l15-e3",
            type: "multiple-choice",
            question: "What does 'prin urmare' mean?",
            options: [
              { id: "a", text: "in other words" },
              { id: "b", text: "in fact" },
              { id: "c", text: "therefore / consequently" },
              { id: "d", text: "however" },
            ],
            correctAnswer: "c",
            explanation: "'Prin urmare' = therefore / consequently. Used to signal logical conclusions in discourse.",
          },
        ],
      },
    ],
  },
  {
    id: "b2",
    code: "B2",
    title: "Upper Intermediate",
    description:
      "Navigate subjunctive mood, complex discourse, and idiomatic expressions.",
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
            content:
              "The Romanian subjunctive (conjunctiv) is used far more frequently than in English. It appears after verbs of wanting, wishing, necessity, and many conjunctions. It is formed with 'să' + present or past form.",
            examples: [
              {
                romanian: "Vreau să merg.",
                phonetic: "[vryow suh merg]",
                english: "I want to go.",
              },
              {
                romanian: "Trebuie să înveți.",
                phonetic: "[TREH-boo-yeh suh un-VEHTS]",
                english: "You must study.",
              },
              {
                romanian: "E important să știi.",
                phonetic: "[yeh eem-por-TAHNT suh shtyee]",
                english: "It's important to know.",
              },
            ],
          },
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
            explanation:
              "The particle 'să' introduces the subjunctive (conjunctiv) in Romanian. It's equivalent to 'to' in English infinitives: 'vreau să merg' = 'I want to go'.",
          },
        ],
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
            content:
              "Romanian idioms reflect the culture's humor, pragmatism, and Latin roots mixed with Slavic influences. Learning idioms helps you sound natural and understand native speakers.",
            examples: [
              {
                romanian: "A da cu bâta-n baltă",
                phonetic: "[ah dah koo BUH-tah un BAL-tuh]",
                english:
                  "To stir up trouble (lit. to hit the pond with a stick)",
              },
              {
                romanian: "A tăia frunze la câini",
                phonetic: "[ah tuh-YAH FROON-zeh lah KUY-nee]",
                english: "To waste time (lit. to cut leaves for dogs)",
              },
              {
                romanian: "Capul face, capul trage",
                phonetic: "[KAH-pool FAH-cheh, KAH-pool TRAH-geh]",
                english:
                  "Actions have consequences (lit. the head does, the head bears)",
              },
            ],
          },
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
            explanation:
              "Literally 'to cut leaves for dogs' — this idiom describes wasting time on pointless activities, since dogs don't eat leaves.",
          },
        ],
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
            content:
              "Romanian uses the conditional-optative mood for hypothetical situations, polite requests, and wishes. It is formed with the auxiliary 'ar' + infinitive stem.",
            examples: [
              {
                romanian: "Aș vrea un ceai.",
                phonetic: "[ash vryah oon chay]",
                english: "I would like a tea. (polite request)",
              },
              {
                romanian: "Dacă aș putea, aș veni.",
                phonetic: "[DAH-kuh ash poo-TYAH, ash veh-NEE]",
                english: "If I could, I would come.",
              },
              {
                romanian: "Ar trebui să pleci.",
                phonetic: "[ar TREH-boo-ee suh PLETCH]",
                english: "You should leave.",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "b2-l3-e1",
            type: "fill-blank",
            question:
              "Complete the polite request: '___ vrea un ceai' (I would like a tea):",
            blankSentence: "___ vrea un ceai",
            correctAnswer: "Aș",
            explanation:
              "'Aș' is the conditional auxiliary for the first person singular. It combines with the infinitive stem: 'aș vrea' (I would want/like).",
          },
        ],
      },
    ],
  },
];

export const grammarTables = {
  nounGenders: {
    title: "Noun Genders",
    headers: ["Gender", "Singular Article", "Plural Article", "Example"],
    rows: [
      [
        "Masculine",
        "un (indef.) / -ul (def.)",
        "niște (indef.) / -ii (def.)",
        "băiat / băiatul",
      ],
      [
        "Feminine",
        "o (indef.) / -a (def.)",
        "niște (indef.) / -le (def.)",
        "casă / casa",
      ],
      [
        "Neuter",
        "un (indef.) / -ul (def.)",
        "niște (indef.) / -le (def.)",
        "scaun / scaunul",
      ],
    ],
  },
  verbEndings: {
    title: "Present Tense: -a Verbs",
    headers: ["Person", "Singular", "Example (a lucra)"],
    rows: [
      ["1st", "-ez / -", "lucrez (I work)"],
      ["2nd", "-ezi / -i", "lucrezi (you work)"],
      ["3rd", "-ează / -ă", "lucrează (he/she works)"],
    ],
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
    ],
  },
};
