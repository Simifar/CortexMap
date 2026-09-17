# Публикация CortexMap на GitHub Pages

Подготовка к размещению выполнена локально. Удалённый репозиторий не создаётся этими файлами: владелец выбирает свой аккаунт, имя и видимость репозитория.

## Первый запуск

1. Создайте на GitHub пустой репозиторий, например CortexMap. Для Pages на GitHub Free нужен публичный репозиторий. Не добавляйте через интерфейс README или .gitignore: они уже есть в проекте.
2. В локальной папке уже инициализирована ветка main. Проверьте git status и список файлов, которые будут отправлены. .env, сборочные результаты и зависимости исключены через .gitignore.
3. Создайте первый коммит и подключите ваш адрес репозитория:

```sh
git add .
git diff --cached --stat
git commit -m "Prepare CortexMap for GitHub Pages"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Замените YOUR_USERNAME и YOUR_REPOSITORY на свои значения. Если Git просит имя и email автора, задайте собственные значения; для приватности можно использовать noreply-email из настроек GitHub. Если origin уже добавлен, не добавляйте его повторно — проверьте git remote -v.

4. Откройте Settings → Pages → Build and deployment → Source → GitHub Actions.
5. Откройте Actions → GitHub Pages → Run workflow → main. Первый автоматический запуск после push может не пройти Configure Pages, если шаг 4 ещё не выполнен; после настройки просто запустите workflow снова.
6. Дождитесь успешных build и deploy. Итоговый URL будет указан в job deploy и Settings → Pages.

В дальнейшем push в main запускает публикацию автоматически. Pull request проходит отдельные проверки и не публикует сайт.

## Адреса и настройки

Для обычного репозитория адрес имеет вид https://USERNAME.github.io/REPOSITORY/. Для репозитория USERNAME.github.io сайт располагается в корне домена.

Workflow использует actions/configure-pages: base_path становится NEXT_PUBLIC_BASE_PATH, base_url — NEXT_PUBLIC_SITE_URL. Имя пользователя или репозитория не нужно вписывать в исходный код. Переименование репозитория требует новой сборки; сохраните старые адреса материалов внутри сайта.

Для собственного домена сначала настройте Custom domain и DNS в GitHub Pages, затем запустите новую сборку. Домен и отсутствие префикса также берутся из configure-pages. Не добавляйте CNAME с чужим или примерным доменом.

Для project Pages файл robots.txt располагается под префиксом репозитория и не управляет всем доменом USERNAME.github.io. Поиск и избранное помечены noindex в HTML; sitemap.xml доступен под префиксом проекта.

## Локальная проверка

```sh
bun install --frozen-lockfile
bun test
bunx tsc --noEmit
bun run lint
bun run validate-content
bun run build:pages --base-path /CortexMap --site-url https://example.github.io/CortexMap/
bun run check:pages
bun run preview:pages
```

После preview откройте http://127.0.0.1:4173/CortexMap/. Проверьте поиск с главной, пагинацию и перезагрузку результатов, фильтры каталогов, избранное и прямые ссылки на материалы. Остановите preview перед сборкой с другим base path.

Для проверки корневого размещения в PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = ''
bun run build:pages --site-url https://example.github.io/
bun run check:pages
bun run preview:pages
```

Если локальный .env задаёт NEXT_PUBLIC_BASE_PATH, удалите только эту необязательную настройку либо передайте подходящее значение окружения. NEXT_PUBLIC_SITE_URL должен включать тот же префикс, что и NEXT_PUBLIC_BASE_PATH; скрипт проверяет согласованность.

## Что публикуется

- HTML всех маршрутов, JS/CSS, шрифты и публичные ассеты.
- Статическое PNG для социальных сетей.
- Sitemap, robots, 404.html и .nojekyll.

GitHub получает только out как Pages-артефакт. В нём нет .env, сервера приложения или базы данных. Токены доступа вручную добавлять не нужно: deploy использует краткоживущие разрешения GitHub Actions. Репозиторий содержит исходники и документацию; public хранит только предназначенные для посетителей файлы.

Standalone-сборка bun run build сохранена для альтернативного хостинга. Не запускайте разные сборки одновременно в одной папке.

## Если публикация не прошла

- Configure Pages: проверьте Settings → Pages → GitHub Actions и доступность Pages для выбранной видимости репозитория.
- Ошибка прав deploy: проверьте разрешения workflow/организации и окружение github-pages. Workflow запрашивает pages: write и id-token: write только для deploy.
- 404 вместо сайта: дождитесь deploy, откройте URL из его результата с правильным именем репозитория и регистром букв.
- Нет стилей или поиск уходит в корень: проверьте вывод configure-pages и пересоберите сайт с правильным префиксом; не копируйте старую локальную out.
- Ошибка установки: используйте Bun 1.3.14 и bun install --frozen-lockfile.
- Ошибка External links не равна поломке сборки: этот workflow проверяет внешнюю сеть отдельно.

Техническая готовность к размещению не означает завершение редакционной проверки: записи pending остаются такими до проверки источников.

Источники: [GitHub Pages: custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Next.js: static export](https://nextjs.org/docs/app/guides/static-exports).
