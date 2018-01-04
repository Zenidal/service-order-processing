import AxiosApiInstance from './AxiosApiInstance';
import {API_STATISTIC_PATH} from "../constants/ApiRoutePaths";

let instance;

export default class StatisticService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.api = new AxiosApiInstance();

        return instance;
    }

    getStatistics(request, successCallback, errorCallback) {
        return this.api.axiosObject.post(API_STATISTIC_PATH, request)
            .then(successCallback)
            .catch(errorCallback);
    }
}