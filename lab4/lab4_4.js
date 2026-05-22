"use strict";
class AppUser {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}
/** Дополнительный класс с тем же контрактом IUser */
class BotUser {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Beep! I am ${this.name}, age ${this.age} (bot).`);
    }
}
// пример использования
const user = new AppUser("Alex", 20);
user.hello();
const bot = new BotUser("Unit-01", 3);
bot.hello();
