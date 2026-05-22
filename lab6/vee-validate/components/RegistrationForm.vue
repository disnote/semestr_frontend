<template>
    <div class="registration">
        <h1>Регистрация</h1>
        <p class="hint">Lab 6 — VeeValidate</p>

        <form class="form" @submit="onSubmit">
            <label class="field">
                <span class="label">Email</span>
                <input
                    v-model="email"
                    type="email"
                    class="input"
                    :class="emailBorderClass"
                    placeholder="user@example.com"
                    autocomplete="email"
                />
                <span v-if="emailError" class="error-text">{{ emailError }}</span>
            </label>

            <div class="password-row">
                <label class="field field--grow">
                    <span class="label">Password</span>
                    <input
                        v-model="password"
                        type="password"
                        class="input"
                        :class="passwordBorderClass"
                        placeholder="••••••••"
                        autocomplete="new-password"
                    />
                    <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
                </label>

                <ul class="criteria" aria-label="Критерии пароля">
                    <li
                        v-for="item in criteriaList"
                        :key="item.id"
                        :class="item.ok ? 'criteria-ok' : 'criteria-fail'"
                    >
                        {{ item.label }}
                    </li>
                </ul>
            </div>

            <label class="agree">
                <input v-model="agree" type="checkbox" name="agree" />
                <span>I agree with license agreement.</span>
            </label>

            <button type="submit" class="btn-register" :disabled="!canRegister">
                Register
            </button>

            <p v-if="submitted" class="success">
                Регистрация прошла успешно (демо).
            </p>
        </form>

        <p class="back">
            <a href="/">← К ToDo List</a>
        </p>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useField, useForm } from "vee-validate";
import { registrationSchema } from "../schemas/registrationForm.js";
import { checkPasswordCriteria, isPasswordStrong } from "../passwordCriteria.js";

const submitted = ref(false);

const { handleSubmit, meta } = useForm({
    validationSchema: registrationSchema,
    initialValues: {
        email: "",
        password: "",
    },
});

const { value: email, errorMessage: emailError, meta: emailMeta } =
    useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const agree = ref(false);

const criteriaList = computed(() => checkPasswordCriteria(password.value));

const passwordStrong = computed(() => isPasswordStrong(password.value));

const emailBorderClass = computed(() => {
    const v = email.value ?? "";
    if (!v) return "";
    return emailMeta.valid ? "input--valid" : "input--invalid";
});

const passwordBorderClass = computed(() => {
    const v = password.value ?? "";
    if (!v) return "";
    return passwordStrong.value ? "input--valid" : "input--invalid";
});

const canRegister = computed(() => {
    return (
        meta.value.valid &&
        passwordStrong.value &&
        Boolean(agree.value)
    );
});

const onSubmit = handleSubmit(() => {
    submitted.value = true;
});
</script>

<style scoped>
.registration {
    width: min(100%, 28rem);
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 12px;
    background: #1e293b;
    border: 1px solid #334155;
    color: #e2e8f0;
}

h1 {
    margin: 0 0 0.25rem;
    font-size: 1.5rem;
}

.hint {
    margin: 0 0 1.25rem;
    font-size: 0.85rem;
    color: #94a3b8;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.field--grow {
    flex: 1;
    min-width: 10rem;
}

.label {
    font-size: 0.9rem;
    color: #cbd5e1;
}

.input {
    padding: 0.6rem 0.75rem;
    border: 2px solid #475569;
    border-radius: 8px;
    background: #0f172a;
    color: #f8fafc;
    font-size: 1rem;
}

.input--invalid {
    border-color: #ef4444;
}

.input--valid {
    border-color: #22c55e;
}

.password-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: flex-start;
}

.criteria {
    list-style: none;
    margin: 1.6rem 0 0;
    padding: 0;
    font-size: 0.85rem;
    min-width: 11rem;
}

.criteria li {
    margin-bottom: 0.35rem;
}

.criteria-ok {
    color: #22c55e;
}

.criteria-fail {
    color: #ef4444;
}

.agree {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
}

.btn-register {
    padding: 0.65rem 1rem;
    border: none;
    border-radius: 8px;
    background: #2563eb;
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
}

.btn-register:disabled {
    opacity: 0.45;
    cursor: not-allowed;
}

.error-text {
    font-size: 0.8rem;
    color: #fca5a5;
}

.success {
    margin: 0;
    padding: 0.5rem;
    border-radius: 6px;
    background: #14532d;
    color: #bbf7d0;
    font-size: 0.9rem;
}

.back {
    margin: 1.25rem 0 0;
    font-size: 0.9rem;
}

.back a {
    color: #38bdf8;
}
</style>
