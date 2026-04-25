<template>
  <article class="clicker">
    <p>Очки: {{ count }}</p>
    <button type="button" @click="handleClick">
      <slot>+{{ amount }} очков</slot>
    </button>
  </article>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  amount: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['button-clicked'])
const count = ref(0)

function handleClick() {
  count.value += props.amount
  emit('button-clicked')
}
</script>

<style scoped>
.clicker {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0.75rem;
}

button {
  cursor: pointer;
  padding: 0.45rem 0.75rem;
}
</style>
