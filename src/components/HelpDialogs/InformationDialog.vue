<template>
  <b-modal :visible="dialog" centered scrollable @hidden="modalChange">
    <template #modal-header="{ close }">
      <ModalHeader
        :headerName="$t('InfoModal.Header')"
        iconColor="black"
        :closeFunction="close"
        :closeStatus="false"
      ></ModalHeader>
    </template>

    <div style="display: flex; align-items: center">
      <span class="fa-stack">
        <i class="text-warning far fa-circle fa-stack-2x"></i>
        <strong class="fa-stack-1x calendar-text">1</strong>
      </span>
      <span style="margin-left: 10px">{{$t('InfoModal.Location')}}</span>
    </div>
    <div style="display: flex; margin-top: 20px; align-items: center">
      <span class="fa-stack">
        <i class="text-primary far fa-circle fa-stack-2x"></i>
        <strong class="fa-stack-1x calendar-text">2</strong>
      </span>
      <span style="margin-left: 10px">Uzaklık ve Tesis Bigilerini Seç</span>
    </div>
    <div style="display: flex; margin-top: 20px; align-items: center">
      <span class="fa-stack">
        <i class="text-success far fa-circle fa-stack-2x"></i>
        <strong class="fa-stack-1x calendar-text">3</strong>
      </span>
      <span style="margin-left: 10px"
        >Gitmek İstediğin Yere Tıkla.Rotan Ayağına Gelsin.</span
      >
    </div>
    <div style="display: flex; margin-top: 20px; align-items: center">
      <i style="font-size: 25px" class="text-danger fas fa-exclamation"></i>
      <span style="margin-left: 10px"
        >Menüyü açmak için sol üst köşedeki GUIDE ME butonuna tıklaman
        yeterli!</span
      >
    </div>
    <template #modal-footer>
      <div
        class=""
        style="
          display: flex;
          margin-top: 20px;
          margin-right: 20px;
          justify-content: flex-end;
        "
      >
        <b-button @click="finishOnboarding" variant="primary">Başla</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { finishOnboarding } from '../../Controller/MainController'
import ModalHeader from '../Modal/ModalHeader.vue'

export default {
  components: {
    ModalHeader,
  },
  computed: {
    ...mapState({
      dialog: state => state.Main.infoDialog,
    })
  },
  data() {
    return {

      asd: true,
    }
  },
  methods: {
    finishOnboarding,
    ...mapMutations({ setInfoDialogStatus: "setInfoDialogStatus" }),
    modalChange(isVisible) {
      if (isVisible.type === "hidden") {
        this.setInfoDialogStatus(false)
      }
    },
  }
}
</script>