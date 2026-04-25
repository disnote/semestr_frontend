// Установите puppeteer: npm install puppeteer
// Сохраните как extract.js

const puppeteer = require('puppeteer');

async function extractTextFromUrl(url) {
    console.log('Запуск браузера для URL:', url);

    const browser = await puppeteer.launch({ headless: false }); // headless: false чтобы видеть браузер
    const page = await browser.newPage();

    try {
        // Переходим по URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        console.log('Страница загружена, извлекаем текст...');

        // Имитация действий пользователя
        await page.evaluate(async () => {
            // Скролл
            window.scrollTo(0, document.body.scrollHeight);
            await new Promise(r => setTimeout(r, 1000));

            // Клики по кнопкам "показать еще"
            document.querySelectorAll('button, .show-more, .read-more').forEach(btn => {
                if (btn.offsetParent !== null) btn.click();
            });

            await new Promise(r => setTimeout(r, 1000));
        });

        // Извлечение текста
        const result = await page.evaluate(() => {
            return {
                url: window.location.href,
                title: document.title,
                text: document.body.innerText,
                textLength: document.body.innerText.length
            };
        });

        console.log('Текст извлечен успешно!');


        return result;

    } catch (error) {
        console.error('Ошибка при извлечении:', error);
    } finally {
        await browser.close();
    }
}

// Использование - укажите нужный URL здесь!
const targetUrl = 'https://example.com'; // <--- ВСТАВЬТЕ СВОЙ URL ЗДЕСЬ

extractTextFromUrl(targetUrl).then(result => {
    if (result) {
        console.log('Результат:');
        console.log('URL:', result.url);
        console.log('Заголовок:', result.title);
        console.log('Длина текста:', result.textLength);
        console.log('Первые 500 символов:', result.text);
    }
});