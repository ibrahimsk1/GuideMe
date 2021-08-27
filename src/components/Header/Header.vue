<template>
  <b-navbar
    toggleable="lg"
    type="light"
    variant="light"
    class="w-100 headerShadow"
  >
    <b-navbar-brand href="#"><ButtonGroup /></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav> </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav style="margin-left: auto; margin-right: 10px">
        <b-button @click="setInfoDialogStatus(true)" variant="light" class="mb-2">
          <b-icon icon="question-circle" aria-hidden="true"></b-icon>{{$t("Header.Help")}}
        </b-button>
        <b-button variant="light" class="mb-2">
          <b-icon icon="github" aria-hidden="true"></b-icon> Github
        </b-button>
        <b-button variant="light">
        <b-nav-item-dropdown text="Lang">
          <b-dropdown-item @click="setLang('en')">EN</b-dropdown-item>
          <b-dropdown-item @click="setLang('tr')">TR</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-button>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import ButtonGroup from '../ButtonGroup/ButtonGroup.vue'

export default {
  components: {
    ButtonGroup
  },
  methods: {
    ...mapActions({
      setLang: "setLang"
    }),
    ...mapMutations({
        setInfoDialogStatus:"setInfoDialogStatus"
    })
  }

}
</script>

<style>
</style>