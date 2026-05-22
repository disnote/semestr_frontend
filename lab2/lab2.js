
// 1. Счётчик загрузок страницы (сохраняется между рестартами браузера)
function runTask1PageLoadCounter() {
  const key = "pageLoadCount_" + window.location.pathname;
  const raw = window.localStorage.getItem(key);
  let count = Number(raw || "0");

  // Проверка, является ли число валидным для счётчика
  if (!Number.isFinite(count) || count < 0) {
    count = 0;
  }

  count += 1;
  window.localStorage.setItem(key, String(count));

  alert("1) Вы загружали/обновляли эту страницу " + count + " раз(а).");
}

// Вспомогательная функция для чтения списка строк (например URL или IP)
function promptList(message, expectedLength) {
  const input = prompt(message);
  if (input === null) return null;

  // t(/[,\s]+/) - регулярка, разбивающая строку на элементы в списке
  // trim() удаляет пробелы в начале и конце строки.
  const parts = input
    .split(/[,\s]+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (expectedLength != null && parts.length !== expectedLength) {
    alert(
      "Ожидалось ровно " +
      expectedLength +
      " значений, а было введено: " +
      parts.length
    );
    return null;
  }

  return parts;
}

// 2. Картинки: загрузка по очереди, порядок как у введённых URL без async/await
function addImagesInGivenOrder(urls) {
  if (!urls || urls.length === 0) return;

  // Создаём контейнер для картинки
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "10px";
  container.style.marginTop = "20px";

  // Добавляем заголовок для элемента
  const title = document.createElement("h2");
  title.textContent = "2) Картинки в порядке ввода URL";

  // Через метод appendChild добавляем элемент в конец другого элемента
  document.body.appendChild(title);
  document.body.appendChild(container);

  // Проходимся по списку urls, который подаётся на входе функции
  urls.forEach((url, index) => {
    const slot = document.createElement("div");
    slot.style.minWidth = "150px";
    slot.style.minHeight = "100px";
    slot.style.display = "flex";
    slot.style.alignItems = "center";
    slot.style.justifyContent = "center";
    slot.style.border = "1px solid #ccc";
    slot.style.padding = "4px";
    container.appendChild(slot);

    // Проверка на пустой url
    if (!url) {
      const p = document.createElement("p");
      p.textContent = "Can’t load image";
      slot.appendChild(p);
      return;
    }

    // Создаём объект картинки
    const img = new Image();
    img.alt = "Image " + (index + 1);
    img.style.maxWidth = "140px";
    img.style.maxHeight = "90px";

    // Обработчик событий на элемент (тут обрабатывается load)
    img.addEventListener("load", () => {
      slot.innerHTML = "";
      slot.appendChild(img);
    });

    // Обработчик событий на элемент (тут обрабатывается error)
    img.addEventListener("error", () => {
      slot.innerHTML = "";
      const p = document.createElement("p");
      p.textContent = "Can’t load image";
      slot.appendChild(p);
    });

    img.src = url;
  });
}

// 3. Картинки: порядок отображения = порядок завершения загрузки
// Аналогично работает, как с функцией addImagesInGivenOrder, только div блок создаётся 
// После загрузки картинки (div - контейнер)
function addImagesByLoadTime(urls) {
  if (!urls || urls.length === 0) return;

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "10px";
  container.style.marginTop = "20px";

  const title = document.createElement("h2");
  title.textContent = "3) Картинки в порядке завершения загрузки";
  document.body.appendChild(title);
  document.body.appendChild(container);

  urls.forEach((url, index) => {
    if (!url) {
      const p = document.createElement("p");
      p.textContent = "Can’t load image";
      container.appendChild(p);
      return;
    }

    const img = new Image();
    img.alt = "Image " + (index + 1);
    img.style.maxWidth = "140px";
    img.style.maxHeight = "90px";

    img.addEventListener("load", () => {
      const wrapper = document.createElement("div");
      wrapper.style.border = "1px solid #ccc";
      wrapper.style.padding = "4px";
      wrapper.appendChild(img);
      container.appendChild(wrapper);
    });

    img.addEventListener("error", () => {
      const p = document.createElement("p");
      p.textContent = "Can’t load image";
      container.appendChild(p);
    });

    img.src = url;
  });
}

// Вспомогательная функция: Promise-загрузка картинки
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // На этом этапе производится загрузка картинки
    img.src = url;

    // callback функции
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Can’t load image"));
  });
}

// 4. Те же задания 2 и 3, но с использованием async/await
async function addImagesInGivenOrderAsync(urls) {
  if (!urls || urls.length === 0) return;

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "10px";
  container.style.marginTop = "20px";

  const title = document.createElement("h2");
  title.textContent = "4.1) Картинки в порядке ввода URL (async/await)";
  document.body.appendChild(title);
  document.body.appendChild(container);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const slot = document.createElement("div");
    slot.style.minWidth = "150px";
    slot.style.minHeight = "100px";
    slot.style.display = "flex";
    slot.style.alignItems = "center";
    slot.style.justifyContent = "center";
    slot.style.border = "1px solid #ccc";
    slot.style.padding = "4px";
    container.appendChild(slot);

    if (!url) {
      const p = document.createElement("p");
      p.textContent = "Can’t load image";
      slot.appendChild(p);
      continue;
    }

    try {
      const img = await loadImage(url);
      img.style.maxWidth = "140px";
      img.style.maxHeight = "90px";
      slot.innerHTML = "";
      slot.appendChild(img);
    } catch (e) {
      slot.innerHTML = "";
      const p = document.createElement("p");
      p.textContent = "Can’t load image";
      slot.appendChild(p);
    }
  }
}

async function addImagesByLoadTimeAsync(urls) {
  if (!urls || urls.length === 0) return;

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "10px";
  container.style.marginTop = "20px";

  const title = document.createElement("h2");
  title.textContent = "4.2) Картинки в порядке завершения загрузки (async/await)";
  document.body.appendChild(title);
  document.body.appendChild(container);

  const promises = urls.map((url) =>
    // Возвращает promises, которые потом обрабатываются
    (async () => {
      if (!url) {
        throw new Error("Can’t load image");
      }
      const img = await loadImage(url);
      img.style.maxWidth = "140px";
      img.style.maxHeight = "90px";
      return img;
    })()
  );

  // Ждём завершения всех промисов, но каждая картинка сама добавляет себя при завершении
  promises.forEach((p) => {
    p.then(
      (img) => {
        const wrapper = document.createElement("div");
        wrapper.style.border = "1px solid #ccc";
        wrapper.style.padding = "4px";
        wrapper.appendChild(img);
        container.appendChild(wrapper);
      },
      () => {
        const pEl = document.createElement("p");
        pEl.textContent = "Can’t load image";
        container.appendChild(pEl);
      }
    );
  });

  // Ожидает завершение все promises
  await Promise.allSettled(promises);
}

// 5. Проверка списка IP-адресов через публичный API https://geoiplookup.io/api
async function checkIpAddresses() {
  const ips = promptList(
    "5) Введите 5 IP-адресов через запятую или пробел:",
    5
  );
  if (!ips) return;

  const bannedCountries = [
    "Russia",
    "Belarus",
    "Afghanistan",
    "China",
    "Venezuela",
    "Iran",
  ];

  try {
    for (const ip of ips) {
      const response = await fetch(
        // encodeURIComponent() - защита от спецсимволов
        "https://geoiplookup.io/api/" + encodeURIComponent(ip)
      );

      if (!response.ok) {
        // В случае ошибки запроса считаем IP небезопасным
        alert("5) Response API Error: Our services are not available in your country");
        return;
      }

      const data = await response.json();

      const countryCandidate =
        data.country_name ||
        data.country ||
        data.country_name_en ||
        data.countryName ||
        "";

      const countryName = String(countryCandidate || "").toLowerCase();

      const isBanned = bannedCountries.some((c) =>
        countryName.includes(c.toLowerCase())
      );

      if (isBanned) {
        alert("5) Repsonse IP Error: Our services are not available in your country");
        return;
      }
    }

    alert("5) Welcome to our website!");
  } catch (e) {
    // Любая ошибка сети или парсинга -> лучше запретить доступ
    alert("5) Response Error: Our services are not available in your country");
  }
}

window.addEventListener("load", async () => {
  // 1. Счётчик загрузок
  runTask1PageLoadCounter();

  // 2. Картинки в порядке ввода (без async/await)
  const imgUrls = promptList(
    "2) Введите 5 URL картинок через запятую или пробел:",
    5
  );
  if (imgUrls) {
    addImagesInGivenOrder(imgUrls);

    // 3. Те же URL, но в порядке окончания загрузки (без async/await)
    addImagesByLoadTime(imgUrls);

    // 4. Реализация тех же заданий с async/await
    await addImagesInGivenOrderAsync(imgUrls);
    await addImagesByLoadTimeAsync(imgUrls);
  }

  // 5. Проверка IP-адресов через geoiplookup.io
  await checkIpAddresses();
});


fetch(url)
  .then(function (response) {
    if (!response.ok) {
      alert("5) Response API Error: Our services are not available in your country");
      return;
    }


    return data
  })
  .then(function (response) {

    const data = response

  })
  .catch(
    function (response) {
      alert("5) Response Error: Our services are not available in your country");
      return;
    }
  )


function func(ip) {
  let promise = fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
  return promise
}

func(ip).then(response => console.log(response))

