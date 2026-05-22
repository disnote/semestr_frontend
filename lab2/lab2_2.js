
class User {

  // Явно определяем атрибуты класса
  #age;      // приватное поле для возраста
  _tel = ""; // "защищённое" поле для телефона 
  name;

  constructor(name, age) {
    this.name = name; // просто присваиваем name
    this.age = age; // используем в конструкторе 
  }

  // геттер/сеттер для возраста: только целые 1–100
  get age() {
    return this.#age;
  }

  set age(value) {
    const num = Number(value);
    if (Number.isInteger(num) && num >= 1 && num <= 100) {
      this.#age = num;
    } else {
      throw new Error("Age must be an integer from 1 to 100");
    }
  }

  // геттер/сеттер для телефона вида +7xxxxxxxxxx
  get tel() {
    return this._tel;
  }

  set tel(value) {
    const str = String(value).trim();
    const re = /^\+7\d{10}$/;
    if (!re.test(str)) {
      throw new Error('Phone must be in format "+7xxxxxxxxxx"');
    }
    this._tel = str;
  }

  // метод hello: вывод через модальное окно и в консоль
  hello() {
    const message = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
    console.log(message);
    alert(message);
  }
}

// 2. Аналогичный "класс", но через функцию-конструктор и прототип
function UserFunc(name, age) {
  this.name = name;
  this.age = age;
}

UserFunc.prototype.hello = function () {
  const msg = `Hi! My name is ${this.name}. And I am ${this.age} years old.`;
  console.log(msg);
  alert(msg);
};

// 5. Наследование: Student от User
class Student extends User {
  #knowledge = 0; // приватное знание, извне напрямую не меняется

  constructor(name, age) {
    // Для вызова конструктора класса User
    super(name, age);
  }

  // Переопределяем hello
  hello() {
    const message = `Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`;
    console.log(message);
    alert(message);
  }

  // только метод learn увеличивает knowledge
  learn() {
    this.#knowledge += 1;
  }

  // только чтение знания снаружи
  get knowledge() {
    return this.#knowledge;
  }
}

// 6. Переопределяем Array.prototype.reverse:
// теперь он дублирует массив, а не переворачивает
(function patchArrayReverse() {
  Array.prototype.reverse = function () {
    const copy = this.slice();
    this.push(...copy);
    return this;
  };
})();

// Демонстрация работы через модальные окна
function createUserFromPrompts() {
  const name = prompt("Введите имя пользователя для User:");
  if (name === null) return null;

  const ageInput = prompt("Введите возраст пользователя (1–100):");
  if (ageInput === null) return null;

  const telInput = prompt('Введите телефон в формате "+7xxxxxxxxxx":');
  if (telInput === null) return null;

  try {
    const user = new User(name, ageInput);
    // Показываем, как работает сеттер
    user.tel = telInput;

    user.hello();
    return user;
  } catch (e) {
    alert("Ошибка при создании User: " + e.message);
    return null;
  }
}

function createStudentFromPrompts() {
  const name = prompt("Введите имя студента:");
  if (name === null) return null;

  const ageInput = prompt("Введите возраст студента (1–100):");
  if (ageInput === null) return null;

  try {
    const student = new Student(name, ageInput);
    // вызываем несколько раз метод learn()
    student.learn();
    student.learn();
    student.hello();
    alert("Текущий уровень знаний студента: " + student.knowledge);
    return student;
  } catch (e) {
    alert("Ошибка при создании Student: " + e.message);
    return null;
  }
}

function demoUserFunc() {
  const name = prompt("Введите имя для UserFunc:");
  if (name === null) return;
  const ageInput = prompt("Введите возраст для UserFunc:");
  if (ageInput === null) return;

  const userFunc = new UserFunc(name, ageInput);
  userFunc.hello();
}

function demoArrayReversePatch() {
  alert(
    "Проверим новый reverse(): массив [1,2,3,4,5] после reverse станет [1,2,3,4,5,1,2,3,4,5], так как происходит добавление копии в конец списка, а не переворачивание"
  );
  const arr = [1, 2, 3, 4, 5];
  arr.reverse();
  alert("Результат работы reverse(): " + JSON.stringify(arr));
}

window.addEventListener("load", () => {
  createUserFromPrompts();
  createStudentFromPrompts();
  demoUserFunc();
  demoArrayReversePatch();
});

