<template>
  <div class="h-100">
    <MapContainer />
    <MainDialog />
  </div>
</template>

<script>
import MapContainer from '../../../components/Map/MapContainer.vue'
import MainDialog from '../../../components/MainDialog/MainDialog.vue'


export default {
  components: {
    MapContainer,
    MainDialog,
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

