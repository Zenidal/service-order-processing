import AxiosApiInstance from './AxiosApiInstance';
import {API_ORDER_PATH} from "../constants/ApiRoutePaths";

let instance;

export default class OrderService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.api = new AxiosApiInstance();

        return instance;
    }

    getAllOrders(successCallback, errorCallback) {
        this.api.axiosObject.get(API_ORDER_PATH)
            .then(successCallback)
            .catch(errorCallback);
    }

    deleteOrder(id, successCalback, errorCalback) {
        this.api.axiosObject.delete(API_ORDER_PATH + '/' + id)
            .then(successCalback)
            .catch(errorCalback);
    }

    getOrder(id, successCalback, errorCalback) {
        this.api.axiosObject.get(API_ORDER_PATH + '/' + id)
            .then(successCalback)
            .catch(errorCalback);
    }
}