# holikov.uz

Персональный сайт-портфолио Тимурбека Холикова (Petroleum Engineer). Статический сайт на GitHub Pages, без сборки и зависимостей.

## Структура
- `index.html` — главная страница
- `projects/*.html` — страницы инженерных проектов
- `assets/css/site.css` — дизайн-система и стили
- `assets/js/site.js` — меню, sticky header, анимации появления, копирование контактов
- `assets/img/` — изображения (портрет WebP/JPEG, SVG-иллюстрации, OG-картинка, иконки)
- `assets/cv/Holikov_Timurbek_CV.pdf` — резюме для скачивания
- `sitemap.xml`, `robots.txt`, `404.html`, `CNAME`

## Локальный запуск
```
python3 -m http.server 8000
```
Открыть http://localhost:8000. Пути в сайте абсолютные (`/assets/...`), поэтому открывать через сервер, а не двойным щелчком по файлу.

## Production build
Сборка не нужна: GitHub Pages публикует ветку `main` как есть.
