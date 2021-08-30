import { MAP_KEY } from '../constans/config'
import store from '../store/index'

export const mapInit = () => {
    return new window.SehirHaritasiAPI({ mapFrame: "mapFrame", apiKey: MAP_KEY }, function () {
    });

}

export const addMarker = ({ lat, lng }) => {
    console.log({ lat, lng })
    store.state.Main.mapObject.Marker.Add({
        lat: lat,
        lon: lng,
        effect: true,
        zoom: 18,
        gotoPosition: true,
        draggable: true,
        showPopover: true,
        content: 'Konumum',
        title: 'Bilgi',
        opacity: 1,
        iconUrl: store.state.Main.mapObject.icons.Info,
        anchorX: store.state.Main.mapObject.anchors.Left,
        anchorY: store.state.Main.mapObject.anchors.Top
    });
};

export const chooseFromMap = () => {
    store.commit("setMenuDialogStatus", false)
    store.state.Main.mapObject.Map.OnClick(function (lat, lon, zoom, clickDirection, pixelX, pixelY) {
        const position = { lat: lat, lng: lon };
        addMarker(position)
        store.commit("setPosition", position)
        store.commit("setLocationStatus", "selected")
        store.commit("setMenuDialogStatus", true)
	});
}


export const checkInsidePoly = (point, vs) => {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    var x = point.lat,
        y = point.lng;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][1],
            yi = vs[i][0];
        var xj = vs[j][1],
            yj = vs[j][0];

        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}




