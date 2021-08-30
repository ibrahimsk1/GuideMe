<template>
  <div class="h-100 mainContainer">
   <Header />
    <main class="h-100">
        <slot></slot>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header/Header.vue'

export default {
  components: {
    Header
  }
}
</script>