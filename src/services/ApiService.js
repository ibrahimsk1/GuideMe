
import httpService from './ServerHttpService';

class ApiService {
  constructor() {
    this.api = httpService;
    this.apiClient = this.api.client;
  }
}

export default ApiService;