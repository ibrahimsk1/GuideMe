<template>
  <div class="w-100"  style="text-align: center">
    <h5>{{ headerName }}</h5>
    <b-icon
    v-if="closeStatus"
      style="
        width: 25px;
        height: 25px;
        margin: 15px;
        position: absolute;
        top: 0;
        right: 10;
      "
      @click="closeFunction"
      icon="x-circle"
      aria-hidden="true"
      v-iconScaleOnHover="{ color: `${iconColor}` }"
    ></b-icon>
  </div>
</template>

<script>
export default {
  props: {
    headerName: {
      type: String
    },
    iconColor: {
      type: String
    },
    closeFunction: {
      type: Function
    },
    closeStatus:{
        type:Boolean,
        default:true
    }
  }
}
</script>

<style>
</style>