<template>
  <div>
    <WaitingDialog />
    <InformationDialog/>
  </div>
</template>


<script>
import WaitingDialog from '../components/HelpDialogs/WaitingDialog.vue'
import InformationDialog from '../components/HelpDialogs/InformationDialog.vue'
// import WaitingDialog from '../components/HelpDialogs/ErrorDialog.vue'


export default {
  components: {
    WaitingDialog,
    InformationDialog
  }

}
</script>
