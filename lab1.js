// 1. Пример подключения JS к HTML (модальное окно)
alert("Скрипт подключен успешно.");

// 2. Программа: номер месяца -> название месяца
function getMonthName(monthNumber) {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Проверка на корректность введённого номера месяца
  if (monthNumber < 1 || monthNumber > 12 || !Number.isInteger(monthNumber)) {
    return "Некорректный номер месяца";
  }

  return months[monthNumber - 1];
}

// Модальное взаимодействие для задачи 2
const monthInput = prompt("2) Введите номер месяца (1-12):");
if (monthInput !== null) {
  const monthNumber = Number(monthInput);
  alert("2) Результат: " + getMonthName(monthNumber));
}

// 3. Проверка на простое число
function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  const limit = Math.sqrt(num);
  for (let i = 3; i <= limit; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

// Поиск простых N чисел (начиная с числа 2)
function getFirstNPrimes(n) {
  const result = [];
  let current = 2;

  while (result.length < n) {
    if (isPrime(current)) {
      result.push(current);
    }
    current++;
  }

  return result.join(" ");
}

// Модальное взаимодействие для задачи 3
const nInput = prompt("3) Введите натуральное число n (количество простых чисел):");
if (nInput !== null) {
  const n = Number(nInput);
  if (!Number.isInteger(n) || n <= 0) {
    alert("3) Некорректное значение n");
  } else {
    alert("3) Первые " + n + " простых чисел: " + getFirstNPrimes(n));
  }
}

// 4. Объект Counter
const Counter = {
  count: 0,
  add(value) {
    this.count += value;
  },
  sub(value) {
    this.count -= value;
  },
};

// Проверка 
const addValue = prompt(`4) Введите число, на которое увеличить счетчик 
  (текущее значение счётчика ${Counter.count}):`);
if (addValue !== null) {
  const addNum = Number(addValue);
  if (!Number.isNaN(addNum)) {
    Counter.add(addNum);
  }
}

const subValue = prompt(`4) Введите число, на которое уменьшить счетчик (текущее значение счётчика ${Counter.count}): `);
if (subValue !== null) {
  const subNum = Number(subValue);
  if (!Number.isNaN(subNum)) {
    Counter.sub(subNum);
  }
}

alert(`4) Текущее значение счетчика: ${Counter.count}`);

// 5. Список слов через запятую -> через точки
function replaceCommasWithDots(words) {
  return words.split(",").join(".");
}

// Модальное взаимодействие для задачи 5
const wordsInput = prompt(
  "5) Введите слова, разделенные запятыми (например: кот,собака,мышь):"
);
if (wordsInput !== null) {
  alert(`5) Результат: ${replaceCommasWithDots(wordsInput)}`);
}

// 6. Проверка строки на палиндром
function isPalindrome(str) {
  const normalized = str.toLowerCase();
  const reversed = normalized.split("").reverse().join("");
  return normalized === reversed;
}

function checkPalindrome(str) {
  if (isPalindrome(str)) {
    return "Да";
  } else {
    return "Нет";
  }
}

// Модальное взаимодействие для задачи 6
const palindromeInput = prompt("6) Введите строку для проверки на палиндром:");
if (palindromeInput !== null) {
  alert(`6) Является ли палиндромом? ${checkPalindrome(palindromeInput)}`);
}

