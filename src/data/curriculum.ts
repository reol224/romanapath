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
      "Build fluency in present tense, expand vocabulary, and tackle case endings.",
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
            content:
              "Romanian verbs are divided into four conjugation groups based on their infinitive endings: -a, -ea, -e, and -i/-î. Each group follows distinct patterns for all persons.",
            examples: [
              {
                romanian: "a vorbi",
                phonetic: "[ah vor-BEE]",
                english: "to speak",
              },
              {
                romanian: "eu vorbesc",
                phonetic: "[yew vor-BESK]",
                english: "I speak",
              },
              {
                romanian: "tu vorbești",
                phonetic: "[too vor-BEHSHTS]",
                english: "you speak",
              },
              {
                romanian: "el/ea vorbește",
                phonetic: "[yel/yah vor-BEHSH-teh]",
                english: "he/she speaks",
              },
            ],
          },
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
            explanation:
              "Romanian verbs have four conjugation groups based on their infinitive ending: -a, -ea, -e, and -i/-î.",
          },
        ],
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
            content:
              "Romanian has several diphthongs — combinations of two vowel sounds gliding together. Mastering these is key to sounding natural.",
            examples: [
              {
                romanian: "iarbă",
                phonetic: "[YAHR-buh]",
                english: "grass (ia diphthong)",
              },
              {
                romanian: "seară",
                phonetic: "[SYAH-ruh]",
                english: "evening (ea diphthong)",
              },
              {
                romanian: "oameni",
                phonetic: "[WAH-meh-nee]",
                english: "people (oa diphthong)",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "a2-l2-e1",
            type: "fill-blank",
            question:
              "The Romanian 'oa' diphthong sounds like the English word beginning with:",
            blankSentence: "___ater",
            correctAnswer: "w",
            explanation:
              "The 'oa' diphthong sounds like the beginning of 'water' in English — a glide from 'w' into 'a'.",
          },
        ],
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
            content:
              "Romanian numbers 1–19 are unique forms. From 20 onwards, Romanian uses a system meaning 'twenty with one', 'twenty with two', etc. — unique among Romance languages.",
            examples: [
              {
                romanian: "unu, doi, trei",
                phonetic: "[OO-noo, doy, tray]",
                english: "one, two, three",
              },
              { romanian: "zece", phonetic: "[ZEH-cheh]", english: "ten" },
              {
                romanian: "douăzeci și unu",
                phonetic: "[DWAH-zeh-chee shee OO-noo]",
                english: "twenty-one",
              },
            ],
          },
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
            explanation:
              "Romanian uniquely constructs compound numbers as 'twenty WITH one' (douăzeci și unu), where 'și' means 'and/with'.",
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
      "Master case system, past tenses, and complex sentence structures.",
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
            content:
              "Romanian has five cases: Nominative, Accusative, Genitive, Dative, and Vocative. Unlike Latin, Romanian simplified by merging Nominative/Accusative and Genitive/Dative into the same form for most nouns.",
            examples: [
              {
                romanian: "Mama vine.",
                phonetic: "[MAH-mah VEE-neh]",
                english: "Mom is coming. (Nominative)",
              },
              {
                romanian: "O văd pe mama.",
                phonetic: "[oh vuhd peh MAH-mah]",
                english: "I see mom. (Accusative)",
              },
              {
                romanian: "Cartea mamei.",
                phonetic: "[KAR-tyah MAH-meh-ee]",
                english: "Mom's book. (Genitive)",
              },
            ],
          },
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
            explanation:
              "Romanian has five cases: Nominative, Accusative, Genitive, Dative, and Vocative. The N/A and G/D pairs share the same forms for most nouns.",
          },
        ],
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
            content:
              "The most commonly used past tense is the perfect compus (compound perfect), equivalent to both simple past and present perfect in English. It is formed with the auxiliary 'a avea' (to have) + past participle.",
            examples: [
              {
                romanian: "Am mâncat.",
                phonetic: "[am mun-KAHT]",
                english: "I ate / I have eaten.",
              },
              {
                romanian: "Ai vorbit cu el?",
                phonetic: "[ay vor-BEET koo yel]",
                english: "Did you speak / Have you spoken to him?",
              },
              {
                romanian: "A plecat.",
                phonetic: "[ah pleh-KAHT]",
                english: "He/she left / has left.",
              },
            ],
          },
        ],
        exercises: [
          {
            id: "b1-l2-e1",
            type: "fill-blank",
            question: "Form the past tense: 'I ate' using the verb 'a mânca':",
            blankSentence: "___ mâncat",
            correctAnswer: "Am",
            explanation:
              "The perfect compus is formed with the auxiliary 'a avea': 'am' (I have) + past participle 'mâncat' = 'am mâncat' (I ate / have eaten).",
          },
        ],
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
            content:
              "Romanian word stress is not fixed — it can fall on different syllables and sometimes changes meaning. While there are patterns, learners must memorize stress for each word.",
            examples: [
              {
                romanian: "copíl",
                phonetic: "[ko-PEEL]",
                english: "child (stress on 2nd syllable)",
              },
              {
                romanian: "cópil",
                phonetic: "[KOH-peel]",
                english: "not a word — wrong stress!",
              },
              {
                romanian: "mobilă",
                phonetic: "[MOH-bee-luh]",
                english: "furniture (stress on 1st syllable)",
              },
            ],
          },
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
            explanation:
              "'copil' (child) is stressed on the second syllable: co-PIL. Getting Romanian stress wrong can make words unrecognizable to native speakers.",
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
