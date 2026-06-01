# FAMILY HOTEL

Односторінковий сайт бази відпочинку «FAMILY HOTEL» (React + Vite + TypeScript + Tailwind).

## Розробка

```bash
npm install
npm run dev
```

## Збірка

```bash
npm run build
npm run preview
```

## Деплой (GitHub Pages)

1. Репозиторій → **Settings** → **Pages** → **Build and deployment** → **GitHub Actions**
2. Після push у `main` workflow збирає сайт автоматично

Сайт: https://family-hotel.com.ua/

### Домен (nic.ua)

У DNS додайте **A-записи** для `@`:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

У GitHub: **Settings → Pages → Custom domain** → `family-hotel.com.ua`, увімкніть **Enforce HTTPS**.

Опційно `www`: CNAME `www` → `roman-alex.github.io` і редирект на основний домен у nic.ua.

Контент редагується в `src/data/content.ts`.
