import axios from 'axios';
import {ISOLINE_URL , ISOLINE_KEY} from '../constans/config';


class IsolineHttpService {
  constructor(options = {}, headers) {
    this.client = axios.create(options);
    this.attachHeaders(headers)
  }

  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers);
  }


}

const options = {
  baseURL: ISOLINE_URL
};

const authorization = {
  Authorization: `Bearer ${ISOLINE_KEY}`
};


const isolineHttpService = new IsolineHttpService(options , authorization);
export default isolineHttpService;