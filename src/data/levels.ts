import type { LevelPlan } from './types';

// IDs and slugs are permanent; edit titles without regenerating them.
const levelRecords: LevelPlan[] = [
  {
    "id": "a1",
    "slug": "a1",
    "title": "A1",
    "fullName": "Beginner / Элементарный",
    "description": "Базовые фразы, простые грамматические конструкции и повседневная лексика. Уровень предполагает умение представиться, задать несложный вопрос и понять медленную, чёткую речь.",
    "cefrLevels": [
      "A1"
    ],
    "tags": [
      "cefr",
      "a1"
    ],
    "access": "free",
    "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
    "linkCheckedAt": null,
    "verifiedAt": null,
    "duration": "2–3 месяца",
    "color": "emerald",
    "icon": "🌱",
    "grammar": [
      {
        "id": "a1-g1",
        "title": "Порядок слов в предложении",
        "description": "Subject + Verb + Object (Подлежащее + Сказуемое + Дополнение)",
        "details": [
          "I like coffee.",
          "She reads books.",
          "We play football."
        ],
        "slug": "a1-g1",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-g2",
        "title": "Глагол to be (am/is/are)",
        "description": "Настоящее время глагола-связки",
        "details": [
          "I am a student.",
          "She is happy.",
          "They are from Russia."
        ],
        "slug": "a1-g2",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-g3",
        "title": "Present Simple",
        "description": "Регулярные действия и факты",
        "details": [
          "I work every day.",
          "She likes music.",
          "Do you speak English?"
        ],
        "slug": "a1-g3",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-g4",
        "title": "Местоимения (I, you, he, she, it, we, they)",
        "description": "Личные и притяжательные местоимения",
        "details": [
          "I → my",
          "he → his",
          "they → their"
        ],
        "slug": "a1-g4",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-g5",
        "title": "Артикли (a/an, the)",
        "description": "Определённый и неопределённый артикли",
        "details": [
          "a cat (какая-то кошка)",
          "the sun (определённое солнце)",
          "an apple (начинается с гласной)"
        ],
        "slug": "a1-g5",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-g6",
        "title": "Простое прошедшее (was/were, Past Simple рег.)",
        "description": "Базовое прошедшее время",
        "details": [
          "I was tired.",
          "We were at home.",
          "I played tennis yesterday."
        ],
        "slug": "a1-g6",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-g7",
        "title": "Императив (повелительное наклонение)",
        "description": "Приказы, просьбы, инструкции",
        "details": [
          "Open the door.",
          "Don't run!",
          "Please sit down."
        ],
        "slug": "a1-g7",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-g8",
        "title": "There is / There are",
        "description": "Указание на наличие чего-либо",
        "details": [
          "There is a book on the table.",
          "There are many people here."
        ],
        "slug": "a1-g8",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "vocabulary": [
      {
        "id": "a1-v1",
        "title": "Приветствия и знакомство",
        "description": "Hello, Hi, Good morning, My name is..., Nice to meet you",
        "slug": "a1-v1",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-v2",
        "title": "Числа 1–1000, время, даты",
        "description": "Основные числительные, как сказать время и дату",
        "slug": "a1-v2",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-v3",
        "title": "Семья и родственники",
        "description": "Mother, father, sister, brother, husband, wife",
        "slug": "a1-v3",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-v4",
        "title": "Еда и напитки",
        "description": "Bread, milk, water, coffee, apple, meat, vegetables",
        "slug": "a1-v4",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-v5",
        "title": "Цвета, дни недели, месяцы",
        "description": "Red, blue, Monday, Tuesday, January, February",
        "slug": "a1-v5",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-v6",
        "title": "Бытовые предметы и помещения",
        "description": "Kitchen, bedroom, table, chair, lamp, window",
        "slug": "a1-v6",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "skills": [
      {
        "id": "a1-s1",
        "title": "Понимание простых фраз",
        "description": "Понимать медленную чёткую речь на бытовые темы",
        "slug": "a1-s1",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-s2",
        "title": "Заполнение анкет",
        "description": "Уметь заполнять простые формы с личными данными",
        "slug": "a1-s2",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a1-s3",
        "title": "Короткие диалоги",
        "description": "Спрашивать и отвечать на простые вопросы",
        "slug": "a1-s3",
        "cefrLevels": [
          "A1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "textbookIds": [
      "a1-english-file-beginner",
      "a1-face2face-elementary",
      "a1-round-up-1-student-s-book",
      "a1-streamline-english-departures"
    ],
    "reviewStatus": "pending",
    "resourceIds": []
  },
  {
    "id": "a2",
    "slug": "a2",
    "title": "A2",
    "fullName": "Pre-Intermediate / Предпороговый",
    "description": "Базовая грамматика и лексика для типичных повседневных ситуаций: поездок, покупок, работы и общения. Уровень предполагает понимание коротких текстов и простых сообщений.",
    "cefrLevels": [
      "A2"
    ],
    "tags": [
      "cefr",
      "a2"
    ],
    "access": "free",
    "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
    "linkCheckedAt": null,
    "verifiedAt": null,
    "duration": "3–4 месяца",
    "color": "teal",
    "icon": "🌿",
    "grammar": [
      {
        "id": "a2-g1",
        "title": "Present Continuous",
        "description": "Действия, происходящие сейчас",
        "details": [
          "I am reading now.",
          "She is cooking dinner.",
          "Are they sleeping?"
        ],
        "slug": "a2-g1",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-g2",
        "title": "Past Simple (правильные и неправильные)",
        "description": "Завершённые действия в прошлом",
        "details": [
          "I went to school yesterday.",
          "She didn't see the movie.",
          "Did you call him?"
        ],
        "slug": "a2-g2",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-g3",
        "title": "Future Simple (will / going to)",
        "description": "Планы и обещания на будущее",
        "details": [
          "I will help you.",
          "She is going to visit Paris.",
          "It won't rain tomorrow."
        ],
        "slug": "a2-g3",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-g4",
        "title": "Модальные глаголы (can, must, should)",
        "description": "Возможность, обязанность, совет",
        "details": [
          "I can swim.",
          "You must study.",
          "You should see a doctor."
        ],
        "slug": "a2-g4",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-g5",
        "title": "Сравнительная и превосходная степень",
        "description": "Сравнение прилагательных",
        "details": [
          "bigger → the biggest",
          "more beautiful → the most beautiful"
        ],
        "slug": "a2-g5",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-g6",
        "title": "Исчисляемые и неисчисляемые существительные",
        "description": "Much/many, a lot of, some/any",
        "details": [
          "How much money?",
          "How many books?",
          "I have some water."
        ],
        "slug": "a2-g6",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-g7",
        "title": "Предлоги времени и места",
        "description": "in, on, at, to, from, with",
        "details": [
          "in the morning, on Monday, at 5 o'clock",
          "at home, in London, on the table"
        ],
        "slug": "a2-g7",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "vocabulary": [
      {
        "id": "a2-v1",
        "title": "Путешествия и транспорт",
        "description": "Airport, ticket, hotel, train station, passport, luggage",
        "slug": "a2-v1",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-v2",
        "title": "Здоровье и тело",
        "description": "Headache, fever, appointment, pharmacy, prescription",
        "slug": "a2-v2",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-v3",
        "title": "Работа и профессии",
        "description": "Office, salary, interview, CV, manager, employee",
        "slug": "a2-v3",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-v4",
        "title": "Покупки и магазины",
        "description": "Price, discount, receipt, size, try on, cash or card",
        "slug": "a2-v4",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-v5",
        "title": "Хобби и свободное время",
        "description": "Go swimming, play guitar, read books, watch movies, travel",
        "slug": "a2-v5",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-v6",
        "title": "Погода и природа",
        "description": "Sunny, cloudy, rain, snow, temperature, forest, mountain",
        "slug": "a2-v6",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "skills": [
      {
        "id": "a2-s1",
        "title": "Короткие письма и сообщения",
        "description": "Писать простые e-mail, открытки, сообщения",
        "slug": "a2-s1",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-s2",
        "title": "Разговоры в путешествии",
        "description": "Спрашивать дорогу, заказывать еду, бронировать номер",
        "slug": "a2-s2",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "a2-s3",
        "title": "Понимание простых текстов",
        "description": "Читать короткие статьи, объявления, инструкции",
        "slug": "a2-s3",
        "cefrLevels": [
          "A2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "textbookIds": [
      "a2-english-file-pre-intermediate",
      "a2-english-grammar-in-use-red-essential",
      "a2-speakout-pre-intermediate"
    ],
    "reviewStatus": "pending",
    "resourceIds": []
  },
  {
    "id": "b1",
    "slug": "b1",
    "title": "B1",
    "fullName": "Intermediate / Средний",
    "description": "Грамматика и лексика для самостоятельного общения на знакомые темы. Уровень предполагает умение выразить мнение, описать событие и понять основную мысль несложного текста.",
    "cefrLevels": [
      "B1"
    ],
    "tags": [
      "cefr",
      "b1"
    ],
    "access": "free",
    "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
    "linkCheckedAt": null,
    "verifiedAt": null,
    "duration": "4–6 месяцев",
    "color": "amber",
    "icon": "🌳",
    "grammar": [
      {
        "id": "b1-g1",
        "title": "Present Perfect",
        "description": "Опыт и результат к настоящему моменту",
        "details": [
          "I have been to London.",
          "She has already finished.",
          "Have you ever tried sushi?"
        ],
        "slug": "b1-g1",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-g2",
        "title": "Present Perfect vs Past Simple",
        "description": "Разница между опытом и конкретным прошлым",
        "details": [
          "I have been to Paris (опыт) vs I went to Paris last year (факт)"
        ],
        "slug": "b1-g2",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-g3",
        "title": "Условные предложения 1-го и 2-го типа",
        "description": "Real и hypothetical условия",
        "details": [
          "If it rains, I will stay home. (1-й тип)",
          "If I had money, I would buy a car. (2-й тип)"
        ],
        "slug": "b1-g3",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-g4",
        "title": "Пассивный залог (Passive Voice)",
        "description": "Действие совершается над предметом",
        "details": [
          "The book was written in 1990.",
          "English is spoken worldwide.",
          "The cake has been eaten."
        ],
        "slug": "b1-g4",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-g5",
        "title": "Герундий и инфинитив",
        "description": "Verb + -ing / Verb + to + infinitive",
        "details": [
          "I enjoy reading.",
          "I want to travel.",
          "She decided to move."
        ],
        "slug": "b1-g5",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-g6",
        "title": "Сложные предложения (although, because, if, when)",
        "description": "Связующие слова и придаточные",
        "details": [
          "Although it was late, we kept working.",
          "I called because I needed help."
        ],
        "slug": "b1-g6",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-g7",
        "title": "Относительные местоимения (who, which, that, where)",
        "description": "Определительные придаточные",
        "details": [
          "The man who called you is my uncle.",
          "The book that I bought is great."
        ],
        "slug": "b1-g7",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "vocabulary": [
      {
        "id": "b1-v1",
        "title": "Технологии и интернет",
        "description": "Software, download, upload, password, account, social media",
        "slug": "b1-v1",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-v2",
        "title": "Образование и обучение",
        "description": "Degree, scholarship, exam, assignment, lecture, campus",
        "slug": "b1-v2",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-v3",
        "title": "Культура и искусство",
        "description": "Exhibition, performance, novel, masterpiece, genre, audience",
        "slug": "b1-v3",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-v4",
        "title": "Экология и окружающая среда",
        "description": "Pollution, renewable energy, recycling, climate change, global warming",
        "slug": "b1-v4",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-v5",
        "title": "Эмоции и черты характера",
        "description": "Ambitious, generous, anxious, confident, reliable, stubborn",
        "slug": "b1-v5",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-v6",
        "title": "Фразовые глаголы (базовый набор)",
        "description": "give up, look forward to, take off, turn on, find out, make up",
        "slug": "b1-v6",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "skills": [
      {
        "id": "b1-s1",
        "title": "Выражение мнения",
        "description": "In my opinion, I believe, I think that..., On the other hand",
        "slug": "b1-s1",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-s2",
        "title": "Понимание новостей и статей",
        "description": "Читать адаптированные статьи и смотреть новости",
        "slug": "b1-s2",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-s3",
        "title": "Телефонные разговоры",
        "description": "Уметь вести деловой и неформальный телефонный разговор",
        "slug": "b1-s3",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b1-s4",
        "title": "Написание эссе (базовое)",
        "description": "Структура: введение, 2–3 абзаца, заключение",
        "slug": "b1-s4",
        "cefrLevels": [
          "B1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "textbookIds": [
      "b1-english-grammar-in-use-blue",
      "b1-english-file-intermediate",
      "b1-vocabulary-in-use-intermediate",
      "b1-outcomes-intermediate"
    ],
    "reviewStatus": "pending",
    "resourceIds": []
  },
  {
    "id": "b2",
    "slug": "b2",
    "title": "B2",
    "fullName": "Upper-Intermediate / Выше среднего",
    "description": "Язык для подробного обсуждения тем, аргументации и работы с более сложными текстами. Уровень B2 часто служит отправной точкой для целевой подготовки к международным экзаменам.",
    "cefrLevels": [
      "B2"
    ],
    "tags": [
      "cefr",
      "b2"
    ],
    "access": "free",
    "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
    "linkCheckedAt": null,
    "verifiedAt": null,
    "duration": "6–8 месяцев",
    "color": "orange",
    "icon": "🌟",
    "grammar": [
      {
        "id": "b2-g1",
        "title": "Past Perfect & Past Continuous",
        "description": "Действия, предшествовавшие другим действиям в прошлом",
        "details": [
          "I had already eaten when she arrived.",
          "I was reading when the phone rang."
        ],
        "slug": "b2-g1",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-g2",
        "title": "Условные предложения 3-го типа и смешанные",
        "description": "Нереальные условия в прошлом",
        "details": [
          "If I had studied harder, I would have passed. (3-й тип)",
          "If I were you, I would have accepted. (смешанный)"
        ],
        "slug": "b2-g2",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-g3",
        "title": "Сослагательное наклонение (Subjunctive)",
        "description": "Wish, if only, it's time, would rather",
        "details": [
          "I wish I could fly.",
          "If only I had known.",
          "It's time you left."
        ],
        "slug": "b2-g3",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-g4",
        "title": "Косвенная речь (Reported Speech)",
        "description": "Передача чужих слов",
        "details": [
          "He said that he was tired.",
          "She asked if I had seen the movie."
        ],
        "slug": "b2-g4",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-g5",
        "title": "Сложные времена (Perfect Continuous)",
        "description": "Длительность действия к определённому моменту",
        "details": [
          "I have been working for 3 hours.",
          "She had been waiting before I came."
        ],
        "slug": "b2-g5",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-g6",
        "title": "Модальные глаголы (deduction & speculation)",
        "description": "Must have, can't have, might have, should have",
        "details": [
          "She must have forgotten.",
          "He can't have said that.",
          "You should have told me."
        ],
        "slug": "b2-g6",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "vocabulary": [
      {
        "id": "b2-v1",
        "title": "Идиомы и устойчивые выражения",
        "description": "Break the ice, hit the nail on the head, once in a blue moon",
        "slug": "b2-v1",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-v2",
        "title": "Коллокации (словосочетания)",
        "description": "Make a decision (не do), heavy rain (не strong), take advantage of",
        "slug": "b2-v2",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-v3",
        "title": "Синонимы и антонимы (тонкие различия)",
        "description": "Big vs huge vs enormous, sad vs upset vs depressed",
        "slug": "b2-v3",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-v4",
        "title": "Академическая лексика (AWL)",
        "description": "Analyze, assess, contribute, significant, establish, method",
        "slug": "b2-v4",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-v5",
        "title": "Фразовые глаголы (продвинутый набор)",
        "description": "Come across, put up with, look into, turn out, carry on, bring up",
        "slug": "b2-v5",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "skills": [
      {
        "id": "b2-s1",
        "title": "Аргументация и дискуссия",
        "description": "Уметь спорить, соглашаться, возражать корректно",
        "slug": "b2-s1",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-s2",
        "title": "Письменные работы",
        "description": "Официальные письма, отчёты, рецензии, эссе с аргументацией",
        "slug": "b2-s2",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-s3",
        "title": "Понимание фильмов и сериалов",
        "description": "Смотреть фильмы с английскими субтитрами, понимать юмор",
        "slug": "b2-s3",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "b2-s4",
        "title": "Подготовка к IELTS/TOEFL (базовая)",
        "description": "Знакомство с форматом экзаменов, тренировка типов заданий",
        "slug": "b2-s4",
        "cefrLevels": [
          "B2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "textbookIds": [
      "b2-advanced-grammar-in-use",
      "b2-english-collocations-in-use-intermediate",
      "b2-ielts-trainer-b2",
      "b2-english-pronunciation-in-use-intermediate"
    ],
    "reviewStatus": "pending",
    "resourceIds": []
  },
  {
    "id": "c1",
    "slug": "c1",
    "title": "C1",
    "fullName": "Advanced / Продвинутый",
    "description": "Уверенное использование английского в профессиональной и академической среде: сложные тексты, развёрнутая аргументация, презентации и письменные работы.",
    "cefrLevels": [
      "C1"
    ],
    "tags": [
      "cefr",
      "c1"
    ],
    "access": "free",
    "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
    "linkCheckedAt": null,
    "verifiedAt": null,
    "duration": "8–12 месяцев",
    "color": "rose",
    "icon": "🔥",
    "grammar": [
      {
        "id": "c1-g1",
        "title": "Инверсия (Inversion)",
        "description": "Эмфатические конструкции с изменением порядка слов",
        "details": [
          "Never have I seen such beauty.",
          "Not only did he win, but he broke the record."
        ],
        "slug": "c1-g1",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-g2",
        "title": "Cleft-предложения (It is... that... / What... is...)",
        "description": "Выделение части предложения для акцента",
        "details": [
          "It was John who broke the window.",
          "What I need is a vacation."
        ],
        "slug": "c1-g2",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-g3",
        "title": "Сложные модальные конструкции",
        "description": "Needn't have, couldn't have, may/might well, is to",
        "details": [
          "You needn't have worried.",
          "She is to arrive at 5.",
          "He may well be right."
        ],
        "slug": "c1-g3",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-g4",
        "title": "Партиципиальные и абсолютные конструкции",
        "description": "Having done..., With the door open..., Generally speaking",
        "details": [
          "Having finished the work, she went home.",
          "With the rain pouring down, we stayed inside."
        ],
        "slug": "c1-g4",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-g5",
        "title": "Продвинутые относительные конструкции",
        "description": "Which (вложенные предложения), what, whatever, no matter",
        "details": [
          "He passed the exam, which surprised everyone.",
          "Whatever you do, don't give up."
        ],
        "slug": "c1-g5",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "vocabulary": [
      {
        "id": "c1-v1",
        "title": "Академическая лексика (C1-AWL)",
        "description": "Comprehensive, nevertheless, predominantly, facilitate, subsequent",
        "slug": "c1-v1",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-v2",
        "title": "Регистры речи (formal/informal/neutral)",
        "description": "Commence vs start, purchase vs buy, insufficient vs not enough",
        "slug": "c1-v2",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-v3",
        "title": "Метафоры и образная лексика",
        "description": "Fuel the debate, plant the seed, bridge the gap, pour cold water on",
        "slug": "c1-v3",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-v4",
        "title": "Латинские и греческие корни слов",
        "description": "bene, mal, chron, graph, dict, spect, port, vid — для угадывания значений",
        "slug": "c1-v4",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "skills": [
      {
        "id": "c1-s1",
        "title": "Академическое письмо",
        "description": "Research papers, literature reviews, abstracts, academic essays",
        "slug": "c1-s1",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-s2",
        "title": "Публичные выступления",
        "description": "Презентации, доклады, дискуссии на профессиональные темы",
        "slug": "c1-s2",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-s3",
        "title": "Чтение оригинальной литературы",
        "description": "Орвелл, Саллинджер, Кинг, Хоссеини — без адаптации",
        "slug": "c1-s3",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c1-s4",
        "title": "Сдача IELTS Academic 7.0+",
        "description": "Полноценная подготовка ко всем частям экзамена",
        "slug": "c1-s4",
        "cefrLevels": [
          "C1"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "textbookIds": [
      "c1-advanced-grammar-in-use-book-with-answers",
      "c1-english-idioms-in-use-advanced",
      "c1-vocabulary-in-use-advanced",
      "c1-objective-ielts-advanced"
    ],
    "reviewStatus": "pending",
    "resourceIds": []
  },
  {
    "id": "c2",
    "slug": "c2",
    "title": "C2",
    "fullName": "Proficiency / Владение в совершенстве",
    "description": "Точное и гибкое владение английским в академических, профессиональных и творческих задачах, включая работу со сложными текстами и смысловыми оттенками.",
    "cefrLevels": [
      "C2"
    ],
    "tags": [
      "cefr",
      "c2"
    ],
    "access": "free",
    "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
    "linkCheckedAt": null,
    "verifiedAt": null,
    "duration": "12+ месяцев",
    "color": "purple",
    "icon": "👑",
    "grammar": [
      {
        "id": "c2-g1",
        "title": "Стилистические варианты и нюансы",
        "description": "Тонкие различия между синонимичными конструкциями",
        "details": [
          "Should you need... (формально) vs If you need... (нейтрально)",
          "Were he to arrive... (литературно)"
        ],
        "slug": "c2-g1",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c2-g2",
        "title": "Устаревшие и книжные формы",
        "description": "Hither, thence, forsooth, whereby, herein, aforesaid",
        "slug": "c2-g2",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c2-g3",
        "title": "Продвинутая пунктуация и синтаксис",
        "description": "Тире, двоеточие, точка с запятой, парцелляция, многоуровневые предложения",
        "slug": "c2-g3",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "грамматика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "vocabulary": [
      {
        "id": "c2-v1",
        "title": "Сленг, неформализмы и региональные варианты",
        "description": "Mate, bloke, reckon, dodgy (UK) / buddy, gonna, kinda, legit (US)",
        "slug": "c2-v1",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c2-v2",
        "title": "Редкая и специализированная лексика",
        "description": "Юридическая, медицинская, техническая терминология на глубоком уровне",
        "slug": "c2-v2",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c2-v3",
        "title": "Этимология и словообразование",
        "description": "Префиксы и суффиксы для самостоятельного создания слов",
        "slug": "c2-v3",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "лексика"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "skills": [
      {
        "id": "c2-s1",
        "title": "Научные публикации",
        "description": "Писать и рецензировать научные статьи на английском",
        "slug": "c2-s1",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c2-s2",
        "title": "Перевод и локализация",
        "description": "Высококачественный перевод, адаптация текстов",
        "slug": "c2-s2",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c2-s3",
        "title": "Преподавание английского",
        "description": "Объяснять грамматику и помогать другим изучать язык",
        "slug": "c2-s3",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      },
      {
        "id": "c2-s4",
        "title": "Креативное письмо",
        "description": "Писать рассказы, стихи, сценарии на английском языке",
        "slug": "c2-s4",
        "cefrLevels": [
          "C2"
        ],
        "tags": [
          "навыки"
        ],
        "access": "free",
        "officialUrl": "https://www.coe.int/en/web/common-european-framework-reference-languages",
        "linkCheckedAt": null,
        "verifiedAt": null,
        "reviewStatus": "pending"
      }
    ],
    "textbookIds": [
      "c2-cambridge-english-proficiency-cpe-masterclass",
      "c2-practical-english-usage",
      "c2-the-cambridge-grammar-of-the-english-language"
    ],
    "reviewStatus": "pending",
    "resourceIds": []
  }
];

export const levels: LevelPlan[] = levelRecords;
