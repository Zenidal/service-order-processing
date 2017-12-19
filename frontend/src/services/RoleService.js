import AxiosApiInstance from './AxiosApiInstance';
import {API_ROLE_PATH} from "../constants/ApiRoutePaths";

let instance;

export default class RoleService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.api = new AxiosApiInstance();

        return instance;
    }

    getAllRoles(successCallback, errorCallback) {
        this.api.axiosObject.get(API_ROLE_PATH)
            .then(successCallback)
            .catch(errorCallback);
    }
}