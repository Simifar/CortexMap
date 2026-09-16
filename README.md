# CortexMap

<p align="center">
  <img src="https://simifar.github.io/EnglishPath/opengraph-image.png" alt="CortexMap — навигатор по английскому языку" width="720">
</p>

<p align="center">Русскоязычный справочник, который помогает собрать понятный маршрут изучения английского языка.</p>

<p align="center">
  <a href="https://simifar.github.io/EnglishPath/"><strong>Открыть CortexMap</strong></a> ·
  <a href="https://github.com/Simifar/EnglishPath/issues">Сообщить о проблеме</a> ·
  <a href="CONTRIBUTING.md">Предложить материал</a>
</p>

<p align="center">
  <a href="https://github.com/Simifar/EnglishPath/actions/workflows/pages.yml"><img src="https://github.com/Simifar/EnglishPath/actions/workflows/pages.yml/badge.svg" alt="GitHub Pages"></a>
  <a href="https://github.com/Simifar/EnglishPath/actions/workflows/content-check.yml"><img src="https://github.com/Simifar/EnglishPath/actions/workflows/content-check.yml/badge.svg" alt="Content checks"></a>
  <a href="https://github.com/Simifar/EnglishPath/actions/workflows/codeql.yml"><img src="https://github.com/Simifar/EnglishPath/actions/workflows/codeql.yml/badge.svg" alt="CodeQL"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-2563eb.svg" alt="MIT License"></a>
</p>

## О проекте

CortexMap объединяет планы CEFR от A1 до C2, учебники, экзаменационные ориентиры и внешние ресурсы в одном каталоге. Поиск и фильтры помогают найти материал под конкретный уровень или навык, а избранное позволяет сохранить полезные страницы в браузере.

Это справочник, а не обучающая платформа. Здесь нет регистрации, личных кабинетов, трекинга прогресса и AI-репетитора. Сайт не хранит персональные данные и не требует базы данных.

На CortexMap размещены авторские описания и ссылки на официальные или иные легальные источники. Проект не хранит электронные копии учебников и не публикует ссылки на пиратские материалы.

## Возможности

- планы обучения для шести уровней CEFR;
- каталог учебников с фильтрами по уровню и назначению;
- справочники по IELTS, TOEFL и Cambridge English;
- подборка ресурсов для грамматики, чтения, аудирования, общения и произношения;
- общий поиск с URL-параметрами и пагинацией;
- локальное избранное с синхронизацией между вкладками;
- адаптивный интерфейс и статические страницы, доступные без сервера.

## Статус проекта

CortexMap работает и опубликован на GitHub Pages. Каталог развивается постепенно: сведения, которые ещё не прошли редакционную проверку, явно отмечены как неподтверждённые. Такие записи не следует воспринимать как персональную рекомендацию или гарантию доступности внешнего сервиса.

## Приватность и безопасность

CortexMap не использует регистрацию, cookies, рекламные трекеры или системы аналитики. Избранное хранится в `localStorage` браузера и не отправляется на сервер.

Изменения автоматически проверяются тестами и CodeQL, а Dependabot отслеживает обновления зависимостей и GitHub Actions. Если вы обнаружили уязвимость, не публикуйте её в обычном issue — используйте [приватный порядок сообщения](SECURITY.md).

## Быстрый запуск

Понадобится [Bun](https://bun.sh/) 1.3.14 или совместимая версия.

```bash
git clone https://github.com/Simifar/EnglishPath.git
cd EnglishPath
bun install --frozen-lockfile
bun run dev
```

После запуска сайт доступен по адресу <http://localhost:3000>. Локальный `.env` не обязателен; список поддерживаемых публичных настроек находится в [.env.example](.env.example).

## Команды

| Команда | Назначение |
| --- | --- |
| `bun run dev` | Запустить локальную разработку |
| `bun test` | Выполнить регрессионные тесты |
| `bunx tsc --noEmit` | Проверить TypeScript |
| `bun run lint` | Проверить исходники ESLint |
| `bun run validate-content` | Проверить записи каталога и связи между ними |
| `bun run build` | Собрать standalone-версию Next.js |
| `bun run build:pages` | Создать статический экспорт в `out/` |
| `bun run check:pages` | Проверить маршруты и ассеты экспорта |
| `bun run preview:pages` | Открыть экспорт через локальный статический сервер |

Проверка GitHub Pages с префиксом репозитория:

```bash
bun run build:pages --base-path /EnglishPath --site-url https://example.github.io/EnglishPath/
bun run check:pages
bun run preview:pages
```

## Устройство проекта

```text
src/
  app/                  страницы, маршруты и метаданные
  components/catalog/   поиск, фильтры и избранное
  components/content/   карточки и представление материалов
  components/layout/    общие элементы интерфейса
  data/                 типизированный статический каталог
  lib/                  поиск и общая прикладная логика
scripts/                 валидация и инструменты сборки
tests/                   регрессионные тесты
```

Контент отделён от компонентов и проверяется Zod-схемами. Постоянные `id` и `slug` защищают опубликованные ссылки от случайной поломки. Поиск и фильтры выполняются в браузере, поэтому статическая версия не зависит от API или серверного рендеринга. Избранное хранится только в `localStorage` текущего домена.

## Публикация

Workflow `GitHub Pages` проверяет типы, lint, тесты и данные, затем публикует только статическую папку `out/`. Адрес сайта и `basePath` берутся из настроек Pages. Отдельный workflow проверяет standalone-сборку, а внешние ссылки запускаются вручную, чтобы временные сбои сторонних сайтов не блокировали релиз.

Подробная инструкция: [docs/github-pages.md](docs/github-pages.md).

## Как помочь

Можно исправить неточность, предложить легальный ресурс, улучшить доступность или дополнить тесты. Перед изменением каталога прочитайте [правила участия](CONTRIBUTING.md) и [описание модели данных](docs/content-model.md). Для крупных изменений сначала создайте issue и опишите задачу.

Если вы нашли уязвимость, используйте порядок из [SECURITY.md](SECURITY.md), а не публичный issue.

## Лицензия

Исходный код распространяется по лицензии [MIT](LICENSE). Названия и материалы внешних ресурсов принадлежат их правообладателям; лицензия проекта на них не распространяется.
