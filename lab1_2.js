alert("Следуйте инструкциям в модальных окнах.");

// Вспомогательная функция для чтения списка натуральных чисел из строки
function parseNaturalNumbers(input) {
  const parts = input
    .split(/[\s,]+/) // разделение по пробелам и запятым
    .filter(Boolean); // Boolean передаётся как функция callback в filter, если строка пустая, то она приводится к false, иначе к true

  const numbers = parts.map((p) => Number(p));

  const allNatural =
    numbers.length > 0 &&
    numbers.every((n) => Number.isInteger(n) && n > 0 && !Number.isNaN(n));

  if (!allNatural) {
    return null;
  }

  return numbers;
}

// 1. Сортировка списка натуральных чисел по возрастанию
// Сразу вызываем функцию через IIFE
(function runTask1() {
  const input = prompt(
    "1) Введите натуральные числа через пробел или запятую для сортировки по возрастанию:"
  );
  if (input === null) return;
  // Извлекаем числа в список из пользовательского ввода
  const numbers = parseNaturalNumbers(input); // Если ввод корректный, то numbers будет массивом чисел
  if (!numbers) {
    alert("1) Некорректный ввод. Используйте только натуральные числа.");
    return;
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  alert(`1) Отсортированный список: ${sorted.join(" ")}`);

  // Этот же массив дальше будем использовать для задания 2
  window._task2Numbers = numbers;
})();

// 2. Массив остатков от деления на 5
function remaindersMod5(arr) {
  return arr.map((n) => n % 5);
}

// Сразу вызываем функцию через IIFE
(function runTask2() {
  let source = window._task2Numbers;

  if (!Array.isArray(source)) {
    const input = prompt(
      "2) Введите натуральные числа через пробел или запятую (для остатков деления на 5):"
    );
    if (input === null) return;
    const numbers = parseNaturalNumbers(input);
    if (!numbers) {
      alert("2) Некорректный ввод. Используйте только натуральные числа.");
      return;
    }
    source = numbers;
  }

  const result = remaindersMod5(source);
  alert("2) Остатки от деления на 5: " + result.join(" "));
})();

// 3. Функция медианы произвольного количества аргументов
function median(...nums) {
  const cleaned = nums.filter((n) => typeof n === "number" && !Number.isNaN(n));
  if (cleaned.length === 0) {
    return NaN;
  }

  const sorted = [...cleaned].sort((a, b) => a - b);
  const len = sorted.length;
  const mid = Math.floor(len - 1) / 2;

  if (len % 2 === 1) {
    // нечётное количество
    return sorted[(len - 1) / 2];
  } else {
    // чётное количество
    const mid1 = sorted[len / 2 - 1];
    const mid2 = sorted[len / 2];
    return (mid1 + mid2) / 2;
  }
}

// Сразу вызываем функцию через IIFE
(function runTask3() {
  // Вызов 1: классическая передача аргументов
  const med1 = median(1, 3, 5, 7, 9);

  // Вызов 2: распаковка заранее созданного массива
  const arr = [10, 20, 30, 40];
  const med2 = median(...arr);

  alert(
    "3) Медиана (1, 3, 5, 7, 9) = " +
    med1 +
    "\n" +
    "3) Медиана массива [10, 20, 30, 40] = " +
    med2
  );
})();

// 4. Проверка правильности скобочной строки с помощью стека
function isValidParentheses(str) {
  const stack = [];

  for (const ch of str) {
    if (ch === "(") {
      stack.push(ch);
    } else if (ch === ")") {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    } else {
      // Игнорируем любые другие символы
    }
  }

  return stack.length === 0;
}

(function runTask4() {
  const input = prompt(
    '4) Введите строку из "(" и ")" для проверки правильности, например: (())()():'
  );
  if (input === null) return;

  const result = isValidParentheses(input) ? "Правильная" : "Неправильная";
  alert("4) Скобочная строка: " + result);
})();

// 5. Глубокое копирование объекта произвольной вложенности
function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  const result = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
}

(function runTask5() {
  const original = {
    name: "Иван",
    age: 20,
    scores: [5, 4, 5],
    address: {
      city: "Москва",
      street: "Ленина",
    },
  };

  const copy = deepClone(original);

  // Меняем копию, чтобы показать, что она не влияет на оригинал
  copy.name = "Пётр";
  copy.scores.push(3);
  copy.address.city = "Санкт-Петербург";

  console.log("5) Оригинал:", original);
  console.log("5) Копия:", copy);

  alert

  alert(
    "5) Глубокая копия объекта создана.\n" +
    "Результат смотри в консоли"
  );
})();

