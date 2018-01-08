import AxiosApiInstance from './AxiosApiInstance';
import {API_LOCALITY_PATH} from "../constants/ApiRoutePaths";

let instance;

export default class CompanyService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.api = new AxiosApiInstance();

        return instance;
    }

    searchLocality(q, limit, successCallback, errorCallback) {
        return this.api.axiosObject.get(API_LOCALITY_PATH + '/search', {
            q: q,
            limit: limit
        })
            .then(successCallback)
            .catch(errorCallback);
    }
}