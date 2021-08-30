import ApiService from './ApiService'


const ENDPOINTS = {
    LOG: '/logger/saveLog',
  };

class LoggerService extends ApiService {
    constructor() {
      super();
    }

    saveLog = async logData => {
        const result = await this.apiClient.post(ENDPOINTS.LOG, logData);
        console.log(result)
    };


}

const loggerService = new LoggerService();

export default loggerService;