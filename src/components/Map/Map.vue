<template>
  <div :style="compStyle">
    <slot></slot>
    <iframe
      id="mapFrame"
      src="https://sehirharitasi.ibb.gov.tr"
      style="height: 100%; width: 100%"
    ></iframe>
  </div>
</template>
<script>

import { mapInit } from "../../Controller/MapController";
export default {
  name: "ibbMap",

  props: {
    options: Object,
    styled: Array,
    setObject:Function,
  },

  computed: {
    compStyle() {
      return this.styled.join('');
    }
  },

  data() {
    return {
      mapOptions: {
        Loc: {
          lat: 41.006876,
          lng: 28.978894,
        },
        Behavior: true,
        Ui: true,
        Router: true,
        uiPosition: "default"
      },
    };
  },

  mounted() {
    const ibbMAP = mapInit();
    this.setObject(ibbMAP)
  }

};
</script>
