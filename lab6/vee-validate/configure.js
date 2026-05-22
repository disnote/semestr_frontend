import { configure, defineRule } from "vee-validate";
import { email, max, min, required } from "@vee-validate/rules";

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("email", email);

configure({
    generateMessage: (ctx) => {
        const messages = {
            required: "Поле обязательно для заполнения",
            email: "Введите корректный email",
            min: `Минимум ${ctx.rule?.params?.[0] ?? 0} символов`,
            max: `Не более ${ctx.rule?.params?.[0] ?? 0} символов`,
        };
        return messages[ctx.rule?.name] ?? "Некорректное значение";
    },
});
