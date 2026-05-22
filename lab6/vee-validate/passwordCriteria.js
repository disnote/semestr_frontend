/** Критерии сложности пароля (лаб. VeeValidate) */
export const PASSWORD_CRITERIA = [
    {
        id: "length",
        label: "Длина не менее 8",
        test: (value) => value.length >= 8,
    },
    {
        id: "digit",
        label: "Цифры",
        test: (value) => /\d/.test(value),
    },
    {
        id: "lower",
        label: "Буквы нижнего регистра",
        test: (value) => /[a-z]/.test(value),
    },
    {
        id: "upper",
        label: "Буквы верхнего регистра",
        test: (value) => /[A-Z]/.test(value),
    },
    {
        id: "special",
        label: "Спецсимволы",
        test: (value) => /[^A-Za-z0-9]/.test(value),
    },
];

export function checkPasswordCriteria(password) {
    const value = password ?? "";
    return PASSWORD_CRITERIA.map((c) => ({
        ...c,
        ok: c.test(value),
    }));
}

export function isPasswordStrong(password) {
    const value = password ?? "";
    if (!value) return false;
    return PASSWORD_CRITERIA.every((c) => c.test(value));
}
