/** Поля пользователя */
type UserFields = {
    name: string;
    age: number;
};

/** Поведение приветствия */
type Greeter = {
    hello(): void;
};

/** Контракт «пользователь» — объединение через псевдонимы типов */
type IUser = UserFields & Greeter;

class AppUser implements IUser {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    hello(): void {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

/** Псевдоним для экземпляра класса */
type AppUserInstance = InstanceType<typeof AppUser>;

/** Дополнительный класс с тем же контрактом IUser */
class BotUser implements IUser {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    hello(): void {
        console.log(`Beep! I am ${this.name}, age ${this.age} (bot).`);
    }
}

// пример использования
const user: AppUserInstance = new AppUser("Alex", 20);
user.hello();

const bot: IUser = new BotUser("Unit-01", 3);
bot.hello();

type Point = { x: number, y: number };

function distance(x1: number, y1: number, x2: number, y2: number): number;
function distance(point1: Point, point2: Point): number;

function distance(a: number | Point,
    b: number | Point,
    c?: number,
    d?: number
): number {
    if (typeof a === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number") {
        return Math.sqrt((c - a) ** 2 + (d - b) ** 2);
    }
    if (typeof a === "object" && typeof b === "object") {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }
    throw new Error("Invalid arguments");
}

type TreeNode = {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
};

type BinaryTreeType = {
    root: TreeNode | null;
    append(value: number): void;
    search(value: number): boolean;
};

class BinaryTree implements BinaryTreeType {
    root: TreeNode | null = null;

    constructor(root: TreeNode) {
        this.root = root;
    }

    append(value: number): void {
        if (this.root == null) this.root = { value: value, left: null, right: null };

        else {
            let current: TreeNode | null = this.root;

            while (current != null) {
                if (value < current.value) {

                    if (current.left == null) {
                        current.left = { value: value, left: null, right: null };
                    } else {
                        current = current.left;
                    }
                } else if (value == current.value) {
                    throw new Error("Value already exists");
                } else {
                    if (current.right == null) {
                        current.right = { value: value, left: null, right: null };
                    } else {
                        current = current.right;
                    }
                }
            }

            current = { value: value, left: null, right: null };
        }
    }

    search(value: number): boolean {
        let current: TreeNode | null = this.root;

        while (current != null) {
            if (value == current.value) {
                return true;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
}


const tree: BinaryTreeType = new BinaryTree({ value: 10, left: null, right: null });



// Простой пример паттерна Adapter
class DataSource {
    func() {
        return "Hello World";
    }
}

class DataSourceAdapter {
    source: DataSource;

    constructor(source: DataSource) {
        this.source = source;
    }

    func() {
        return this.source.func().replace("Hello", "Hi");
    }
}

const dataSourceAdapter: DataSourceAdapter = new DataSourceAdapter(new DataSource());

console.log(dataSourceAdapter.func());



// Простой пример паттерна Strategy
type Strategy = {
    someFunc(): void;
}

class SoftStrategy implements Strategy {
    someFunc(): void {
        console.log("Soft strategy");
    }
}

class HardStrategy implements Strategy {
    someFunc(): void {
        console.log("Hard strategy");
    }
}

class Context {
    strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    execute(): void {
        this.strategy.someFunc();
    }
}

const context: Context = new Context(new SoftStrategy());
context.execute();

const context2: Context = new Context(new HardStrategy());
context2.execute();

// Простой пример паттерна Observer
interface Observer {
    update(message: string): void;
}

class SoftObserver implements Observer {
    update(message: string): void {
        console.log("Soft observer received message: " + message);
    }
}

class HardObserver implements Observer {
    update(message: string): void {
        console.log("Hard observer received message: " + message);
    }
}

class Subject {
    observers: Observer[] = [];

    constructor() {
        this.observers = []
    }

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    notify(message: string): void {
        this.observers.forEach(observer => observer.update(message));
    }

    doSth(name?: string): void {
        console.log(`Doing something... ${name ? name : ""}`);
        this.notify("Attackk!!!!!!!!!");
    }
}

const subject: Subject = new Subject();
const softObserver: Observer = new SoftObserver();
const hardObserver: Observer = new HardObserver();

subject.attach(softObserver);
subject.attach(hardObserver);

subject.doSth("Hello");
