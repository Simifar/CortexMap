import type { ExamGuide } from './types';

// IDs and slugs are permanent; edit titles without regenerating them.
export const examGuides: ExamGuide[] = [
  {
    "id": "ielts",
    "slug": "ielts",
    "title": "IELTS",
    "officialName": "International English Language Testing System",
    "description": "Международный экзамен для учёбы, работы и миграции.",
    "cefrLevels": [
      "B1",
      "B2",
      "C1",
      "C2"
    ],
    "tags": [
      "международный",
      "учёба",
      "миграция"
    ],
    "access": "paid",
    "officialUrl": "https://ielts.org/",
    "linkCheckedAt": null,
    "organization": "British Council, IDP Education и Cambridge University Press & Assessment",
    "familySlug": null,
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "Продолжительность уточняется по официальному регламенту",
    "scoreScale": null,
    "scoreMapping": [],
    "validity": null,
    "registration": null,
    "parts": [
      {
        "id": "listening",
        "title": "Listening",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
      },
      {
        "id": "reading",
        "title": "Reading",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
      },
      {
        "id": "writing",
        "title": "Writing",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
      },
      {
        "id": "speaking",
        "title": "Speaking",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
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
    "description": "Академический экзамен для поступления в зарубежные вузы.",
    "cefrLevels": [
      "B2",
      "C1",
      "C2"
    ],
    "tags": [
      "академический",
      "поступление"
    ],
    "access": "paid",
    "officialUrl": "https://www.ets.org/toefl.html",
    "linkCheckedAt": null,
    "organization": "ETS",
    "familySlug": null,
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "Продолжительность уточняется по официальному регламенту",
    "scoreScale": null,
    "scoreMapping": [],
    "validity": null,
    "registration": null,
    "parts": [
      {
        "id": "reading",
        "title": "Reading",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
      },
      {
        "id": "listening",
        "title": "Listening",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
      },
      {
        "id": "speaking",
        "title": "Speaking",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
      },
      {
        "id": "writing",
        "title": "Writing",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
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
    "description": "Линейка квалификационных экзаменов B1 Preliminary, B2 First, C1 Advanced и C2 Proficiency.",
    "cefrLevels": [
      "B1",
      "B2",
      "C1",
      "C2"
    ],
    "tags": [
      "кембриджский",
      "квалификация"
    ],
    "access": "paid",
    "officialUrl": "https://www.cambridgeenglish.org/exams-and-tests/",
    "linkCheckedAt": null,
    "organization": "Cambridge University Press & Assessment",
    "familySlug": null,
    "levelStatus": "single",
    "familyMembers": null,
    "duration": "Продолжительность уточняется по официальному регламенту",
    "scoreScale": null,
    "scoreMapping": [],
    "validity": null,
    "registration": null,
    "parts": [
      {
        "id": "reading-and-use-of-english",
        "title": "Reading and Use of English",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
      },
      {
        "id": "writing",
        "title": "Writing",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
      },
      {
        "id": "listening",
        "title": "Listening",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
        "scoreShare": null
      },
      {
        "id": "speaking",
        "title": "Speaking",
        "duration": null,
        "questionCount": null,
        "taskTypes": [],
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
        "title": "Официальный каталог экзаменов",
        "url": "https://www.cambridgeenglish.org/exams-and-tests/"
      }
    ],
    "reviewStatus": "pending",
    "verifiedAt": null
  }
];
