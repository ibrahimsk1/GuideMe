
import isolineHttpService from './IsolineHttpService'

const ENDPOINTS = {
    CAR: "driving-car",
  };

export const getIsoline = async (data) => {
    const result = await isolineHttpService.client.post(ENDPOINTS.CAR, data);
    return result;
}

