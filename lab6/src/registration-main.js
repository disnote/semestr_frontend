import { createApp } from "vue";
import RegistrationForm from "../vee-validate/components/RegistrationForm.vue";
import "../vee-validate/configure.js";
import "./assets/main.css";

createApp(RegistrationForm).mount("#app");
