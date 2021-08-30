
export const askForLocation = async () => {
    navigator.permissions.query({
        name: 'geolocation'
    }).then(async function (result) {
        if (result.state == 'granted' || result.state == 'prompt') {
            const { position, error } = await controlPosition();
            return { state: result.state, position: position, error: error }
        } else if (result.state == 'denied') {
            return { state: result.state }
        }
        result.onchange = function () {
            console.log(result);
        }
    });
}


export const controlPosition = async () => {
    let position = new Object();
    let error = new Object({message:"NoError"});

    try {
        position = await getPosition();
    } catch (err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        error = err;
    }

    return { position, error }
}

function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, options);
    });
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};


