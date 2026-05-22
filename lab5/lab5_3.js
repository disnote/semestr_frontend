import { createApp } from 'vue';
import { ref } from 'vue';


createApp({
    el: '#app',

    setup() {
        const message = ref('');
        const count = ref(0);

        function onClick() {
            message.value = 'Hello World';
        }

        function increment() {
            count.value += 1;
        }

        return {
            message,
            count,
            onClick,
            increment
        };
    }
}).mount('#app');
