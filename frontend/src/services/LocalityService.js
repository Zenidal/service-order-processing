import AxiosApiInstance from './AxiosApiInstance';
import {LOCALITY_PATH} from "../constants/RoutePaths";

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
        this.api.axiosObject.get(LOCALITY_PATH + '/search', {
            q: q,
            limit: limit
        })
            .then(successCallback)
            .catch(errorCallback);
    }
}