import axios from 'axios';
import Config from '../config';
import UserService from "./UserService";

let instance = null;

class AxiosApiInstance {
    constructor() {
        if (!instance) {
            instance = this;
        }

        let params = UserService.apiToken() ? {'api_token': UserService.apiToken()} : {};

        this.axiosObject = axios.create({
            baseURL: Config.get('apiUrl'),
            params: params
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