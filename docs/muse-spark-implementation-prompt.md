# Muse Spark 1.3 / Muse Code — промт реализации этапа 9

Запуск: из корня репозитория `muse` (интерактивно) или `muse exec --prompt-file <этот файл>`.
Рекомендуемый `/effort`: A, B, D — `xhigh`; C — `high`; верификация — `medium`.
Установить цель: `/goal Реализовать этапы A–D docs/exam-reference-plan.md; после каждой вехи прогон верификации и коммит`.

---

## Общий контекст (сам промт)

Сначала прочитай в таком порядке: `AGENTS.md`, `docs/exam-reference-plan.md`, `ROADMAP.md` (этап 9), `src/data/types.ts`, `src/data/validate.ts`, `src/data/exams.ts`, `src/app/exams/page.tsx`, `src/app/exams/[exam]/page.tsx`, `src/app/search/page.tsx`, `tests/catalog.test.ts`.

Задача: реализовать этап 9 из ROADMAP согласно `docs/exam-reference-plan.md`. Работай строго по этапам A → B → C → D. После каждого этапа прогоняй полный набор проверок и делай коммит с указанным сообщением. К следующему этапу не переходи, пока этап красный.

### Общие ограничения (действуют всегда)

1. **Не менять id/slug опубликованных записей** (IELTS `ielts`, TOEFL `toefl`, `cambridge-english`, все учебники/ресурсы/уровни/темы). Миграционные тесты в `tests/catalog.test.ts` должны оставаться зелёными.
2. **Без выдуманных фактов.** Баллы, шкалы, пороги, срок действия, стоимость и даты — только по проверенным официальным источникам. Всё, что не подтверждено на момент работы, оставляй `reviewStatus: "pending"` и даты `null`. Выставление `verifiedAt`/`linkCheckedAt` отмени до фактической проверки.
3. **Только официальные внешние ссылки** (cambridgeenglish.org, ets.org, ielts.org и т. д.). Никаких пиратских материалов.
4. **UI-строки на русском, код и комментарии — на английском.** Импорты через `@/*`. Стабильные `id`/`slug`.
5. Сайт остаётся статическим (App Router, `STATIC_EXPORT`, GitHub Pages). Без серверной логики, БД, аккаунтов и SPA-переключателей.

---

## Этап A — модель данных (`src/data/types.ts`, `src/data/validate.ts`)

1. В `examGuideSchema` добавить поля:
   - `familySlug: z.string().regex(/^[a-z0-9-]+$/).nullable()` — связь с семейством;
   - `levelStatus: z.enum(['single', 'family'])`;
   - `familyMembers: z.array(z.object({ id, slug: id, title: text, cefrLevels: levelList })).nullable()`;
   - `duration: text`;
   - `scoreScale: z.object({ min: z.number(), max: z.number(), goodFrom: z.number().optional(), unit: text, note: text.nullable() }).nullable()`;
   - `scoreMapping: z.array(z.object({ cefr: z.enum(cefrLevels), score: text }))`;
   - `validity: text.nullable()`;
   - `registration: z.object({ costNote: text.nullable(), frequency: text.nullable(), format: text.nullable(), website: officialUrlSchema }).nullable()`;
   - `parts` пересобрать из `string[]` в массив `{ id, title, duration: text.nullable(), questionCount: z.number().int().positive().nullable(), taskTypes: z.array(text), scoreShare: z.number().min(0).max(100).nullable() }`.
   - Тип `ExamGuide` вытекает из схемы автоматически (см. текущий стиль `z.infer`).
2. Дополнить три существующие записи в `src/data/exams.ts` полями этапа A: осмысленные минимальные значения там, где они не выдуманы, иначе `null`. `levelStatus: 'single'`, `familySlug: null`, `parts` в новом формате с `taskTypes: []` до уточнения.
3. В `validate.ts` добавить правила:
   - `levelStatus: 'family'` ⇔ непустой `familyMembers`; `'single'` ⇒ `familyMembers === null`;
   - `parts` не пусты, `parts[].id` уникальны;
   - `registration.website` следует `officialUrlSchema` (Zod уже проверяет);
   - для `verified`-записей `scoreMapping` покрывает все заявленные `cefrLevels` (для `pending` — мягкое требование, не роняя валидацию).
4. Тесты: добавить новые проверки на новые правила; существующие тесты не менять.

**Верификация A:** `bunx tsc --noEmit && bun run lint && bun test && bun run validate-content`
**Коммит:** `feat: extend exam guide data model`

---

## Этап B — содержание (`src/data/exams.ts`)

Наполнить IELTS, TOEFL и обзор семейства Cambridge по официальным источникам:

- `parts`: русские названия частей, `duration`, `questionCount`, `taskTypes`, `scoreShare`;
- `scoreScale` + `scoreMapping` по официальным шкалам (IELTS 0–9, TOEFL 0–120);
- `validity`, `registration` (стоимость, частота, формат, официальная страница регистрации);
- `officialMaterials`: сгруппировать по назначению (sample tests, официальная практика, регистрация, результаты).

Правила: непроверенные цифры не вносить — `pending` + `null`; в self-review перечислить факты, требующие ручной проверки человеком.

**Верификация B:** те же команды + вручную пройти `/exams`, `/exams/ielts`, `/exams/toefl` в `bun run dev`.
**Коммит:** `feat: enrich IELTS TOEFL and Cambridge exam guides`

---

## Этап C — семейство Cambridge (`src/data/exams.ts`, `sitemap`)

1. `cambridge-english` становится `levelStatus: 'family'` с `familyMembers` из пяти квалификаций: A2 Key, B1 Preliminary, B2 First, C1 Advanced, C2 Proficiency.
2. Добавить отдельные записи с `id`/`slug`: `cambridge-a2-key`, `cambridge-b1-preliminary`, `cambridge-b2-first`, `cambridge-c1-advanced`, `cambridge-c2-proficiency` (поля Level A; фактчекинг — по правилам B). Записям `levelStatus: 'single'`, `familySlug: 'cambridge-english'`.
3. Сохранить `/exams/cambridge` рабочим URL как обзор семейства (не ломать старые ссылки и избранное: `generateStaticParams` собирает из `slug`).
4. `sitemap.ts` и поиск подхватят новые записи автоматически (они итераруют `examGuides`) — проверить, не пропущено ли.

**Верификация C:** `bunx tsc --noEmit && bun run lint && bun test && bun run validate-content && bun run build`
**Коммит:** `feat: split Cambridge English into qualifications`

---

## Этап D — страницы и интеграция

1. `/exams` (список): в карточках показывать тип (единый/семейство), шкалу и CEFR-диапазон. Следовать существующей стилистике `ExamCard`/`ContentCard`.
2. `/exams/[exam]` (детальная, `src/app/exams/[exam]/page.tsx`):
   - блок «Результат и срок действия» (шкала, целевые значения, связь с CEFR, срок действия);
   - «Формат»: таблица частей (название, время, заданий, доля результата);
   - «Регистрация и стоимость»;
   - сохранить существующий блок «Логика подготовки»;
   - для `family`: карточки/ссылки на квалификации вместо единого формата.
3. `/exams/compare` — статический маршрут:
   - параметр `set=ielts,toefl,pte...`; серверный компонент + чтение query через `useSearchParams` в `Suspense` (как сделано в `search/page.tsx` и `TextbooksQueryView`);
   - таблица сравнения: цель, формат, шкала, CEFR, срок действия, стоимость, где сдают;
   - формы/навигация — через `withBasePath`, Next Link сам добавляет basePath;
   - пустой/невалидный набор — понятное пустое состояние, дефолт без `set`.
4. Поиск (`src/lib/search.ts`): индексировать экзамены по названиям частей, организации, шкале и тегам (принцип как для топиков). Пагинацию не трогать.
5. Проверить `static export`: все новые маршруты экспортируются в `out/` (`bun run build:pages`).

**Верификация D:** `bunx tsc --noEmit && bun run lint && bun test && bun run build && bun run check-bundle`; в dev пройти `/exams`, `/exams/ielts`, `/exams/compare?set=ielts,toefl`, поиск «IELTS».
**Коммит:** `feat: add exam detail sections and compare page`

---

## Завершение

После D: не реализовывать этап E (тексты) — это отдельный промт. В финальном отчёте перечислить: выполненные этапы, какие именно факты оставлены на ручную проверку (с ссылками на записи и поля), какие проверки/тесты пройдены. Пушить только после подтверждения пользователем, что все проверки зелёные и страницы выглядят корректно.