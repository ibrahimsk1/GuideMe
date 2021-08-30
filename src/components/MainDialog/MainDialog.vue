<template>
  <b-modal
    :visible="dialog"
    centered
    scrollable
    @hidden="modalChange"
    hide-footer
  >
    <template #modal-header="{ close }">
      <ModalHeader
        :headerName="$t('MainModal.Header')"
        iconColor="black"
        :closeFunction="close"
      ></ModalHeader>
    </template>
    <b-tabs content-class="mt-3" fill v-model="tabIndex">
      <b-tab :title="$t('MainModal.Settings')">
        <div style="display: flex; align-items: baseline">
          <span style="margin-right: 10px">{{$t('MainModal.Location')}}</span>

          <span v-if="locationStatus == 'unknown'"
            >{{$t('MainModal.LocGet')}}<b-spinner
              class="ml-1"
              variant="success"
              label="Spinning"
              style="width: 1.1rem; height: 1.1rem; margin-left: 20px"
            ></b-spinner
          ></span>
          <span v-if="locationStatus == 'enabled'">{{$t('MainModal.LocNow')}}</span>
          <span v-if="locationStatus == 'disabled'"
            >{{$t('MainModal.NoLoc')}} 
            <b-button
              @click="chooseFromMap"
              style="margin-left: 10px"
              flat
              variant="outline-primary"
              size="sm"
              >{{$t('MainModal.FromMap')}}</b-button 
            ></span
          >
          <span v-if="locationStatus == 'selected'">{{$t('MainModal.LocSelected')}}</span>
        </div>
        <div style="margin-top: 20px; display: flex; align-items: baseline">
          <span style="margin-right: 10px">{{$t('MainModal.Duration')}}</span>
          <Multiselect
            v-model="timeValue"
            :options="timeOptions"
            :placeholder="this.$t('MainModal.DurationPlaceholder')"
            label="name"
            track-by="name"
          />
        </div>
        <div style="margin-top: 20px; display: flex; align-items: baseline">
          <span style="margin-right: 10px">{{$t('MainModal.Facility')}}</span>
          <Multiselect
            :placeholder="this.$t('MainModal.FacilityPlaceholder')"
            v-model="facilityValue"
            :multiple="true"
            :options="facilityOptions"
            :multipleLabel="multipleLabel"
            :taggable="true"
            label="name"
            track-by="name"
            ><template slot="singleLabel" slot-scope="{ option }">{{
              option.name
            }}</template></Multiselect
          >
        </div>
        <div
          v-if="errorText !== ''"
          style="margin-top: 20px; display: flex; justify-content: center"
        >
          <span style="color: red">{{ errorText }}</span>
        </div>

        <div
          style="
            margin-top: 40px;
            display: flex;
            justify-content: center;
            width: 100%;
          "
        >
          <b-button
            @click="search"
            style="margin-left: 20px; width: 100px"
            variant="success"
            >{{$t('MainModal.Search')}}</b-button
          >
        </div>
      </b-tab>
      <b-tab :title="$t('MainModal.Results')">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >{{$t('MainModal.Clear')}}</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-table
          small
          responsive
          hover
          :fields="resultFields"
          :items="resultList"
          show-empty
          :filter="filter"
        >
          <template #empty="scope">
            <div
              style="text-align: center; margin-top: 20px; margin-bottom: 20px"
            >
              <h4>{{ $t("Table.Empty") }}</h4>
            </div>
          </template>

          <template v-slot:cell(Name)="row">
            {{ row.item["ADI"] }}
          </template>

          <template v-slot:cell(Tip)="row">
            <b-icon
              v-if="row.item.dataType == 'greenArea'"
              icon="circle-fill"
              style="color: green"
            ></b-icon>
            <b-icon
              v-if="row.item.dataType == 'healthCare'"
              icon="circle-fill"
              style="color: blue"
            ></b-icon>
          </template>

          <template v-slot:cell(Action)="row">
            <b-button size="sm" variant="primary" @click="rowSelected(row.item)"
              >{{ $t("Table.Select") }}</b-button
            >
          </template>
        </b-table>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script> 
import Multiselect from 'vue-multiselect'
import { mapMutations, mapState } from 'vuex'
import { startSearch, pointSelected } from '../../Controller/MainController'
import { chooseFromMap } from '../../Controller/MapController'

import ModalHeader from '../Modal/ModalHeader.vue'

export default {
  components: {
    Multiselect,
    ModalHeader
  },
  computed: {
    ...mapState({
      dialog: state => state.Main.menuDialog,
      locationStatus: state => state.Main.locationStatus,
      resultFields: state => state.Main.resultFields,
      resultList: state => state.Main.resultList,
    }),
    tabIndex: {
      get() { return this.$store.state.Main.tabIndex; },
      set(value) { this.$store.commit('setTabIndex', value); },
    }
  },

  data() {

    return {
      filter: '',
      errorText: '',
      timeValue: null,
      timeOptions: [
        { value: 15, name: this.$t('MainModal.15min') },
        { value: 30, name: this.$t('MainModal.30min') },
        { value: 60, name: this.$t('MainModal.60min')},
      ],
      facilityValue: null,
      facilityOptions: [
        { value: 'greenArea', name: this.$t('MainModal.GreenArea') },
        { value: 'healthCare', name: this.$t('MainModal.HealthCare')},
      ]
    }
  },
  methods: {
    chooseFromMap,
    ...mapMutations({
      setMenuDialogStatus: "setMenuDialogStatus",
    }),
    modalChange(isVisible) {
      if (isVisible.type === "hidden") {
        this.setMenuDialogStatus(false)
      }
    },
    multipleLabel(value) {
      return value.map(val => val.label).join(',');
    },
    search() {
      if (this.timeValue !== null && this.facilityValue !== null && ( this.locationStatus == "enabled" || this.locationStatus == "selected")) {
        this.errorText = ''
        startSearch(this.timeValue.value, this.facilityValue.map(item => item.value));
      } else {
        this.errorText = this.$t('MainModal.Error')
      }
    },
    rowSelected(item) {
      pointSelected({ lat: item["ENLEM"], lng: item["BOYLAM"] });
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>