<template>
  <div class="h-100">
    <router-view />
    <Intercept />
  </div>
</template>

<script>
import Intercept from "./utils/Intercept.vue"
export default {
  components: {
    Intercept
  }
}
</script>


<style lang="scss">
@import "./scss/style.scss";
</style>