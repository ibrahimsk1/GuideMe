<template>
  <Map :setObject="setObject" :options="mapOptions" :styled="styled" />
</template>

<script>
import Map from './Map.vue'
import { mapMutations } from 'vuex';
import { getLocation } from '../../Controller/MainController'


export default {
  components: {
    Map,
  },
  data() {
    return {
      styled: ["width:100%;", "height:100%;"],
      mapOptions: {},
    };
  },


  methods:
  {
    ...mapMutations({
      setMapObject: "setMapObject",
    }),
    setObject(map) {
      this.setMapObject(map);
      //get Location
      setTimeout(() => getLocation() , 3000);
    },
  }


}
</script>

<style>
</style>