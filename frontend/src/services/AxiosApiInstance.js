import axios from 'axios';
import Config from '../config';

let instance = null;

class AxiosApiInstance {
    constructor() {
        if (!instance) {
            instance = this;
        }

        this.axiosObject = axios.create({
            baseURL: Config.get('apiUrl'),
            params: {}
        });

        return instance;
    }

    static setApiHeader(apiToken) {
        instance.axiosObject.defaults.params.api_token = apiToken;
    }

    static removeApiToken(){
        delete instance.axiosObject.defaults.params.api_token;
    }
}

export default AxiosApiInstance;