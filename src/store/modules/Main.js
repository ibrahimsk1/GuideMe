import * as healthCareData from '../../constans/HealthCare.json';
import * as greenAreaData from '../../constans/GreenArea.json';



const state = {
    mapObject: {},
    mainState: "search",
    menuDialog:false,
    listDialog:false,
    waitingDialog:false,
    infoDialog:true,
    locationStatus:'unknown',
    position:{lat:0 , lng:0},
    dataTypes:{"greenArea":greenAreaData , "healthCare":healthCareData},
    resultFields:["Tip" ,"Name" , "Action"],
    resultList:[],
    tabIndex:0

}

const getters = {

}

const mutations = {
    setMapObject(state, payload) {
        state.mapObject = payload
    },

    setMenuDialogStatus(state, payload) {
        state.menuDialog = payload
    },

    
    setListDialogStatus(state, payload) {
        state.listDialog = payload
    },

    
    setWaitingDialogStatus(state, payload) {
        state.waitingDialog = payload
    },

    setInfoDialogStatus(state, payload) {
        state.infoDialog = payload
    },

    setLocationStatus(state, payload) {
        state.locationStatus = payload
    },

    setResultList(state, payload) {
        state.resultList = payload
    },

    setTabIndex(state, payload) {
        state.tabIndex = payload
    },

    
    setPosition(state, payload) {
        state.position = payload
    }
}

const actions = {



}

export default {
    state,
    getters,
    mutations,
    actions
}