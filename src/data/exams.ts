import type { ExamGuide } from './types';

// IDs and slugs are permanent; edit titles without regenerating them.
// Stage B content is pending human verification: reviewStatus stays pending,
// verifiedAt/linkCheckedAt stay null until checked against official pages.
export const examGuides: ExamGuide[] = [
  {
    "id": "ielts",
    "slug": "ielts",
    "title": "IELTS",
    "officialName": "International English Language Testing System",
    "description": "Международный экзамен для учёбы, работы и миграции. Версии Academic и General Training: аудирование и говорение совпадают, чтение и письмо различаются.",
    "cefrLevels": [
      "B1",
      "B2",
      "C1",
      "C2"
    ],
    "tags": [
      "международный",
      "учёба",
      "миграция",
      "academic",
      "general training"
    ],
    "access": "paid",
    "officialUrl": "https://ielts.org/",
    "linkCheckedAt": null,
    "organization": "British Council, IDP Education и Cambridge University Press & Assessment",
    "familySlug": null,
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "2 часа 45 минут",
    "scoreScale": {
      "min": 0,
      "max": 9,
      "unit": "band",
      "note": "Общий балл — среднее четырёх частей, шаг 0,5. Вузы обычно просят 6,0–7,5 — уточняйте требования конкретной программы."
    },
    "scoreMapping": [
      { "cefr": "B1", "score": "4,0–5,0" },
      { "cefr": "B2", "score": "5,5–6,5" },
      { "cefr": "C1", "score": "7,0–8,0" },
      { "cefr": "C2", "score": "8,5–9,0" }
    ],
    "validity": "2 года",
    "registration": {
      "costNote": "Стоимость зависит от страны и центра — уточняйте при записи",
      "frequency": "Даты доступны регулярно в течение года",
      "format": "Бумажный, компьютерный или онлайн (Academic)",
      "website": "https://ielts.org/take-a-test/test-types/ielts-academic-test"
    },
    "parts": [
      {
        "id": "listening",
        "title": "Аудирование (Listening)",
        "duration": "Около 30 минут",
        "questionCount": 40,
        "taskTypes": ["множественный выбор", "соотнесение", "заполнение пропусков", "завершение предложений"],
        "scoreShare": 25
      },
      {
        "id": "reading",
        "title": "Чтение (Reading)",
        "duration": "60 минут",
        "questionCount": 40,
        "taskTypes": ["множественный выбор", "верно / неверно / не сказано", "соотнесение заголовков"],
        "scoreShare": 25
      },
      {
        "id": "writing",
        "title": "Письмо (Writing)",
        "duration": "60 минут",
        "questionCount": 2,
        "taskTypes": ["описание графика (Academic) / письмо (General)", "эссе"],
        "scoreShare": 25
      },
      {
        "id": "speaking",
        "title": "Говорение (Speaking)",
        "duration": "11–14 минут",
        "questionCount": null,
        "taskTypes": ["беседа", "монолог по карточке", "обсуждение"],
        "scoreShare": 25
      }
    ],
    "preparationStrategy": [
      {
        "phase": "Диагностика",
        "focus": "Определите стартовый уровень и целевой band score."
      },
      {
        "phase": "База",
        "focus": "Закройте пробелы в грамматике и академической лексике."
      },
      {
        "phase": "Формат",
        "focus": "Разберите типы заданий и критерии оценивания."
      },
      {
        "phase": "Репетиция",
        "focus": "Выполняйте полные варианты в условиях экзамена."
      }
    ],
    "officialMaterials": [
      {
        "title": "Формат Academic: официальное описание",
        "url": "https://ielts.org/take-a-test/test-types/ielts-academic-test"
      },
      {
        "title": "Формат General Training: официальное описание",
        "url": "https://ielts.org/take-a-test/test-types/ielts-general-training-test"
      },
      {
        "title": "Официальный сайт IELTS",
        "url": "https://ielts.org/"
      }
    ],
    "reviewStatus": "pending",
    "verifiedAt": null
  },
  {
    "id": "toefl",
    "slug": "toefl",
    "title": "TOEFL iBT",
    "officialName": "Test of English as a Foreign Language iBT",
    "description": "Академический экзамен для поступления в зарубежные вузы. Сдаётся на компьютере в центре или дома.",
    "cefrLevels": [
      "B2",
      "C1",
      "C2"
    ],
    "tags": [
      "академический",
      "поступление",
      "учёба"
    ],
    "access": "paid",
    "officialUrl": "https://www.ets.org/toefl.html",
    "linkCheckedAt": null,
    "organization": "ETS",
    "familySlug": null,
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "Около 2 часов",
    "scoreScale": {
      "min": 0,
      "max": 120,
      "unit": "баллов",
      "note": "Четыре части по 0–30. С января 2026 ETS переходит на шкалу 1–6 с пересчётом в 0–120 на переходный период."
    },
    "scoreMapping": [
      { "cefr": "B2", "score": "72–94" },
      { "cefr": "C1", "score": "95–113" },
      { "cefr": "C2", "score": "114–120" }
    ],
    "validity": "2 года",
    "registration": {
      "costNote": "Стоимость зависит от страны — уточняйте при записи",
      "frequency": "Даты доступны регулярно в течение года",
      "format": "На компьютере в центре или дома (Home Edition)",
      "website": "https://www.ets.org/toefl.html"
    },
    "parts": [
      {
        "id": "reading",
        "title": "Чтение (Reading)",
        "duration": "35 минут",
        "questionCount": 20,
        "taskTypes": ["чтение отрывков", "ответы на вопросы"],
        "scoreShare": 25
      },
      {
        "id": "listening",
        "title": "Аудирование (Listening)",
        "duration": "36 минут",
        "questionCount": 28,
        "taskTypes": ["лекции", "диалоги в аудитории"],
        "scoreShare": 25
      },
      {
        "id": "speaking",
        "title": "Говорение (Speaking)",
        "duration": "16 минут",
        "questionCount": 4,
        "taskTypes": ["независимое задание", "интегрированные задания"],
        "scoreShare": 25
      },
      {
        "id": "writing",
        "title": "Письмо (Writing)",
        "duration": "29 минут",
        "questionCount": 2,
        "taskTypes": ["интегрированное задание", "обсуждение в учебной дискуссии"],
        "scoreShare": 25
      }
    ],
    "preparationStrategy": [
      {
        "phase": "Диагностика",
        "focus": "Сопоставьте текущий уровень с целевым баллом."
      },
      {
        "phase": "Академическая база",
        "focus": "Тренируйте лексику, конспектирование и работу с лекциями."
      },
      {
        "phase": "Интегрированные задания",
        "focus": "Связывайте чтение, аудирование и устный или письменный ответ."
      },
      {
        "phase": "Репетиция",
        "focus": "Отрабатывайте темп и стратегию на полных тестах."
      }
    ],
    "officialMaterials": [
      {
        "title": "Состав и длительность: официальное описание",
        "url": "https://www.ets.org/toefl/test-takers/ibt/about/content.html"
      },
      {
        "title": "Баллы: официальное описание",
        "url": "https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html"
      },
      {
        "title": "Официальный сайт TOEFL",
        "url": "https://www.ets.org/toefl.html"
      }
    ],
    "reviewStatus": "pending",
    "verifiedAt": null
  },
  {
    "id": "cambridge-english",
    "slug": "cambridge",
    "title": "Cambridge English",
    "officialName": "Cambridge English Qualifications",
    "description": "Линейка квалификационных экзаменов A2 Key, B1 Preliminary, B2 First, C1 Advanced и C2 Proficiency. Сертификат бессрочный, уровень подтверждает конкретная квалификация.",
    "cefrLevels": [
      "A2",
      "B1",
      "B2",
      "C1",
      "C2"
    ],
    "tags": [
      "кембриджский",
      "квалификация",
      "учёба",
      "работа"
    ],
    "access": "paid",
    "officialUrl": "https://www.cambridgeenglish.org/exams-and-tests/",
    "linkCheckedAt": null,
    "organization": "Cambridge University Press & Assessment",
    "familySlug": null,
    "levelStatus": "family",
    "familyMembers": [
      { "id": "cambridge-a2-key", "slug": "cambridge-a2-key", "title": "A2 Key", "cefrLevels": ["A2"] },
      { "id": "cambridge-b1-preliminary", "slug": "cambridge-b1-preliminary", "title": "B1 Preliminary", "cefrLevels": ["B1"] },
      { "id": "cambridge-b2-first", "slug": "cambridge-b2-first", "title": "B2 First", "cefrLevels": ["B2"] },
      { "id": "cambridge-c1-advanced", "slug": "cambridge-c1-advanced", "title": "C1 Advanced", "cefrLevels": ["C1"] },
      { "id": "cambridge-c2-proficiency", "slug": "cambridge-c2-proficiency", "title": "C2 Proficiency", "cefrLevels": ["C2"] }
    ],
    "duration": "Зависит от квалификации — около 2–4 часов",
    "scoreScale": {
      "min": 80,
      "max": 230,
      "unit": "баллов Кембриджской шкалы",
      "note": "Диапазон зависит от квалификации: например, B2 First — 140–190, C1 Advanced — 180–199."
    },
    "scoreMapping": [
      { "cefr": "A2", "score": "Зависит от квалификации" },
      { "cefr": "B1", "score": "140–159" },
      { "cefr": "B2", "score": "160–179" },
      { "cefr": "C1", "score": "180–199" },
      { "cefr": "C2", "score": "200–212" }
    ],
    "validity": "Бессрочно",
    "registration": {
      "costNote": "Стоимость зависит от центра — уточняйте при записи",
      "frequency": "Сессии по расписанию авторизованных центров",
      "format": "Бумажный или компьютерный",
      "website": "https://www.cambridgeenglish.org/exams-and-tests/"
    },
    "parts": [
      {
        "id": "reading-and-use-of-english",
        "title": "Чтение и практика языка (Reading and Use of English)",
        "duration": null,
        "questionCount": null,
        "taskTypes": ["множественный выбор", "словообразование", "перефразирование"],
        "scoreShare": null
      },
      {
        "id": "writing",
        "title": "Письмо (Writing)",
        "duration": null,
        "questionCount": 2,
        "taskTypes": ["обязательное задание", "задание на выбор"],
        "scoreShare": null
      },
      {
        "id": "listening",
        "title": "Аудирование (Listening)",
        "duration": null,
        "questionCount": 30,
        "taskTypes": ["множественный выбор", "заполнение пропусков"],
        "scoreShare": null
      },
      {
        "id": "speaking",
        "title": "Говорение (Speaking)",
        "duration": null,
        "questionCount": null,
        "taskTypes": ["беседа", "монолог", "совместное задание", "обсуждение"],
        "scoreShare": null
      }
    ],
    "preparationStrategy": [
      {
        "phase": "Выбор уровня",
        "focus": "Выберите экзамен по официальным sample tests."
      },
      {
        "phase": "Языковая база",
        "focus": "Систематизируйте грамматику, word formation и collocations."
      },
      {
        "phase": "Формат",
        "focus": "Отработайте каждую часть и критерии writing/speaking."
      },
      {
        "phase": "Репетиция",
        "focus": "Решайте официальные пробные варианты."
      }
    ],
    "officialMaterials": [
      {
        "title": "Каталог экзаменов: официальная страница",
        "url": "https://www.cambridgeenglish.org/exams-and-tests/"
      },
      {
        "title": "Формат B2 First: официальное описание",
        "url": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format"
      },
      {
        "title": "Формат C1 Advanced: официальное описание",
        "url": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/advanced/format"
      }
    ],
    "reviewStatus": "pending",
    "verifiedAt": null
  },
  {
    "id": "cambridge-a2-key",
    "slug": "cambridge-a2-key",
    "title": "A2 Key",
    "officialName": "A2 Key",
    "description": "Квалификационный экзамен Cambridge English для уровня A2.",
    "cefrLevels": ["A2"],
    "tags": ["кембриджский", "квалификация", "A2"],
    "access": "paid",
    "officialUrl": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/",
    "linkCheckedAt": null,
    "organization": "Cambridge University Press & Assessment",
    "familySlug": "cambridge-english",
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "Уточняется по официальному регламенту",
    "scoreScale": null,
    "scoreMapping": [],
    "validity": null,
    "registration": null,
    "parts": [
      { "id": "reading-and-writing", "title": "Чтение и письмо", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "listening", "title": "Аудирование", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "speaking", "title": "Говорение", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null }
    ],
    "preparationStrategy": [{ "phase": "Выбор уровня", "focus": "Сверьте уровень с официальным описанием экзамена." }],
    "officialMaterials": [{ "title": "A2 Key: официальная страница", "url": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/" }],
    "reviewStatus": "pending",
    "verifiedAt": null
  },
  {
    "id": "cambridge-b1-preliminary",
    "slug": "cambridge-b1-preliminary",
    "title": "B1 Preliminary",
    "officialName": "B1 Preliminary",
    "description": "Квалификационный экзамен Cambridge English для уровня B1.",
    "cefrLevels": ["B1"],
    "tags": ["кембриджский", "квалификация", "B1"],
    "access": "paid",
    "officialUrl": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/",
    "linkCheckedAt": null,
    "organization": "Cambridge University Press & Assessment",
    "familySlug": "cambridge-english",
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "Уточняется по официальному регламенту",
    "scoreScale": null,
    "scoreMapping": [],
    "validity": null,
    "registration": null,
    "parts": [
      { "id": "reading", "title": "Чтение", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "writing", "title": "Письмо", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "listening", "title": "Аудирование", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "speaking", "title": "Говорение", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null }
    ],
    "preparationStrategy": [{ "phase": "Выбор уровня", "focus": "Сверьте уровень с официальным описанием экзамена." }],
    "officialMaterials": [{ "title": "B1 Preliminary: официальная страница", "url": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/" }],
    "reviewStatus": "pending",
    "verifiedAt": null
  },
  {
    "id": "cambridge-b2-first",
    "slug": "cambridge-b2-first",
    "title": "B2 First",
    "officialName": "B2 First",
    "description": "Квалификационный экзамен Cambridge English для уровня B2.",
    "cefrLevels": ["B2"],
    "tags": ["кембриджский", "квалификация", "B2"],
    "access": "paid",
    "officialUrl": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/",
    "linkCheckedAt": null,
    "organization": "Cambridge University Press & Assessment",
    "familySlug": "cambridge-english",
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "Уточняется по официальному регламенту",
    "scoreScale": null,
    "scoreMapping": [],
    "validity": null,
    "registration": null,
    "parts": [
      { "id": "reading-and-use-of-english", "title": "Чтение и практика языка", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "writing", "title": "Письмо", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "listening", "title": "Аудирование", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "speaking", "title": "Говорение", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null }
    ],
    "preparationStrategy": [{ "phase": "Выбор уровня", "focus": "Сверьте уровень с официальным описанием экзамена." }],
    "officialMaterials": [{ "title": "B2 First: официальная страница", "url": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/" }],
    "reviewStatus": "pending",
    "verifiedAt": null
  },
  {
    "id": "cambridge-c1-advanced",
    "slug": "cambridge-c1-advanced",
    "title": "C1 Advanced",
    "officialName": "C1 Advanced",
    "description": "Квалификационный экзамен Cambridge English для уровня C1.",
    "cefrLevels": ["C1"],
    "tags": ["кембриджский", "квалификация", "C1"],
    "access": "paid",
    "officialUrl": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/advanced/",
    "linkCheckedAt": null,
    "organization": "Cambridge University Press & Assessment",
    "familySlug": "cambridge-english",
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "Уточняется по официальному регламенту",
    "scoreScale": null,
    "scoreMapping": [],
    "validity": null,
    "registration": null,
    "parts": [
      { "id": "reading-and-use-of-english", "title": "Чтение и практика языка", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "writing", "title": "Письмо", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "listening", "title": "Аудирование", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "speaking", "title": "Говорение", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null }
    ],
    "preparationStrategy": [{ "phase": "Выбор уровня", "focus": "Сверьте уровень с официальным описанием экзамена." }],
    "officialMaterials": [{ "title": "C1 Advanced: официальная страница", "url": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/advanced/" }],
    "reviewStatus": "pending",
    "verifiedAt": null
  },
  {
    "id": "cambridge-c2-proficiency",
    "slug": "cambridge-c2-proficiency",
    "title": "C2 Proficiency",
    "officialName": "C2 Proficiency",
    "description": "Квалификационный экзамен Cambridge English для уровня C2.",
    "cefrLevels": ["C2"],
    "tags": ["кембриджский", "квалификация", "C2"],
    "access": "paid",
    "officialUrl": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/proficiency/",
    "linkCheckedAt": null,
    "organization": "Cambridge University Press & Assessment",
    "familySlug": "cambridge-english",
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "Уточняется по официальному регламенту",
    "scoreScale": null,
    "scoreMapping": [],
    "validity": null,
    "registration": null,
    "parts": [
      { "id": "reading-and-use-of-english", "title": "Чтение и практика языка", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "writing", "title": "Письмо", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "listening", "title": "Аудирование", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null },
      { "id": "speaking", "title": "Говорение", "duration": null, "questionCount": null, "taskTypes": [], "scoreShare": null }
    ],
    "preparationStrategy": [{ "phase": "Выбор уровня", "focus": "Сверьте уровень с официальным описанием экзамена." }],
    "officialMaterials": [{ "title": "C2 Proficiency: официальная страница", "url": "https://www.cambridgeenglish.org/exams-and-tests/qualifications/proficiency/" }],
    "reviewStatus": "pending",
    "verifiedAt": null
  }
];
