import { controlPosition } from './LocationController'
import { addMarker, checkInsidePoly } from './MapController'
import store from '../store/index'
import { getIsoline } from '../services/IsolineService'

export const finishOnboarding = () =>{
    store.commit("setInfoDialogStatus", false);
    store.commit("setMenuDialogStatus", true);
}

export const startOnboarding = () =>{
    store.commit("setInfoDialogStatus", true);
}


//triggerred after map loaded
export const getLocation = async () => {
    const { position, error } = await controlPosition()
    if (error.message == "NoError") {
        //add marker
        // const positionObj = { lat: position.coords.latitude, lng: position.coords.longitude };
        console.log(position)
        const positionObj = { lat:41.0137, lng: 28.9554 }; 
        addMarker(positionObj)
        store.commit("setPosition", positionObj)
        store.commit("setLocationStatus", "enabled")
    }
    else {
        // settings and choose from map
        store.commit("setLocationStatus", "disabled")
    }
}


//find type data which inside polygon 
const findAvailableGreenArea = (data, polygonLatLngArr) => {
    let insideList = new Array();
    data.default.records.map((record, ix)=> {
        if (checkInsidePoly({ lat: record[3], lng: record[2] }, polygonLatLngArr)){
            insideList.push({"ENLEM":record[3] , "BOYLAM":record[2] , "ADI":record[1],  dataType:'greenArea' })
        }
    });
    return insideList;

}

const findAvailableHealthCare =  (data, polygonLatLngArr) => {
    let insideList = new Array();
    data.default.records.map((record, ix) => {
        if (checkInsidePoly({ lat: record.ENLEM, lng: record.BOYLAM }, polygonLatLngArr)) {
            insideList.push({...record,dataType:'healthCare'})
        }
    });
    return insideList;

}

const findAvailablePointsbyType = (types, polygonLatLngArr) => {
    let availablePointsObj = new Object();
    let availablePointsArr = new Array();

    for (const property in store.state.Main.dataTypes) {
        if (types.includes(property) && property == "greenArea") {
            const data = findAvailableGreenArea(store.state.Main.dataTypes[property], polygonLatLngArr)
            availablePointsArr = availablePointsArr.concat(data)
            availablePointsObj[property] = data
        } else if (types.includes(property) && property == "healthCare") {
            const data = findAvailableHealthCare(store.state.Main.dataTypes[property], polygonLatLngArr)
            availablePointsArr = availablePointsArr.concat(data)
            availablePointsObj[property] = data
        }
    }
    return { availablePointsObj , availablePointsArr}
}



export const pointSelected = async ({lat,lng}) => {
    store.commit("setMenuDialogStatus", false);

    store.state.Main.mapObject.RouteAnalysis.Drive({
      start:
      {
        lat: store.state.Main.position.lat,
        lon: store.state.Main.position.lng
      },      
      finish:
      {
        lat: lat,
        lon: lng
      }
    });


}

export const startSearch = async (duration, types) => {
    try {
        store.commit("setMenuDialogStatus", false);
        store.commit("setWaitingDialogStatus", true);
        const data = { "locations": [[store.state.Main.position.lng , store.state.Main.position.lat]], "range": [duration * 60] }
        const result = await getIsoline(data);
        const polygonLatLngArr = result.data.features[0].geometry.coordinates[0]
        const { availablePointsObj , availablePointsArr} = findAvailablePointsbyType(types, polygonLatLngArr);
        store.commit("setResultList", availablePointsArr)
        store.commit("setWaitingDialogStatus", false);
        store.commit("setMenuDialogStatus", true);
        store.commit("setTabIndex", 1);


    } catch (err) {
        //put global error
        store.commit("setWaitingDialogStatus", false);
        console.log(err)
    }

    // 
}





