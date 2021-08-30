<template>
  <b-modal :visible="dialog" centered hide-footer hide-header>
    <div style="text-align:center;">
    <span
      >{{$t('WaitingModal.Info')}}<b-spinner
        class="ml-1"
        variant="success"
        label="Spinning"
        style="width: 1.1rem; height: 1.1rem;margin-left:20px;"

      ></b-spinner>
      </span
    >
    </div>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      dialog: state => state.Main.waitingDialog,

    })
  },
}
</script>