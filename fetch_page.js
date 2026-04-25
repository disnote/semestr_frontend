// Скрипт для Node.js, который по введённой ссылке
// запрашивает страницу и выводит всю её HTML-разметку.
//
// Запуск:
//   node fetch_page.js https://example.com

// Проверяем, передан ли URL
const url = process.argv[2];

if (!url) {
  console.error("Ошибка: укажите URL.\nПример: node fetch_page.js https://example.com");
  process.exit(1);
}

// В современных версиях Node (>= 18) fetch есть "из коробки".
// Если у вас более старая версия Node, нужно будет установить node-fetch:
//   npm install node-fetch
// и раскомментировать строки ниже:
//
// const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function fetchPage(targetUrl) {
  try {
    console.log("Отправляю запрос на:", targetUrl);

    const response = await fetch(targetUrl);

    if (!response.ok) {
      console.error("Сервер вернул ошибку:", response.status, response.statusText);
      process.exit(1);
    }

    const html = await response.text();

    console.log("=== HTML страницы ===");
    console.log(html);
  } catch (err) {
    console.error("Ошибка при запросе:", err.message || err);
    process.exit(1);
  }
}

fetchPage(url);

