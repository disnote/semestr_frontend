<template>
  <main class="page">
    <h1>100 независимых кликеров</h1>
    <section class="grid">
      <Clicker
        v-for="n in 100"
        :key="n"
        :amount="n"
        @button-clicked="onButtonClicked(n)"
      >
        Clicker {{ n }} (+{{ n }})
      </Clicker>
    </section>
  </main>
</template>

<script setup>
import Clicker from './components/Clicker.vue'

function onButtonClicked(n) {
  alert(`Clicker ${n} clicked!`)
}
</script>

<style scoped>
.page {
  font-family: system-ui, sans-serif;
  margin: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 0.75rem;
}
</style>