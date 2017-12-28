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
        return this.api.axiosObject.get(API_ORDER_PATH)
            .then(successCallback)
            .catch(errorCallback);
    }

    deleteOrder(id, successCallback, errorCallback) {
        return this.api.axiosObject.delete(API_ORDER_PATH + '/' + id)
            .then(successCallback)
            .catch(errorCallback);
    }

    getOrder(id, successCallback, errorCallback) {
        return this.api.axiosObject.get(API_ORDER_PATH + '/' + id)
            .then(successCallback)
            .catch(errorCallback);
    }

    newOrder(order, successCallback, errorCallback) {
        return this.api.axiosObject.post(API_ORDER_PATH + '/create-from-address-company', {
            description: order.description,
            exact_address: order.exactAddress,
            company_id: order.companyId,
            locality_id: order.localityId,
            address_id: order.addressId
        })
            .then(successCallback)
            .catch(errorCallback);
    }

    editOrder(order, successCallback, errorCallback) {
        return this.api.axiosObject.put(API_ORDER_PATH + '/' + order.id + '/edit-from-address-company', {
            description: order.description,
            exact_address: order.exactAddress,
            company_id: order.companyId,
            locality_id: order.localityId,
            address_id: order.addressId
        })
            .then(successCallback)
            .catch(errorCallback);
    }

    assign(order, engineerId, comment, successCallback, errorCallback) {
        let params = {
            engineer_id: engineerId
        };
        if (comment) {
            params.comment = comment;
        }

        return this.api.axiosObject.post(API_ORDER_PATH + '/' + order.id + '/assign', params)
            .then(successCallback)
            .catch(errorCallback);
    }

    startProgress(order, comment, successCallback, errorCallback) {
        let params = {};
        if (comment) {
            params.comment = comment;
        }
        return this.api.axiosObject.post(API_ORDER_PATH + '/' + order.id + '/start-progress', params)
            .then(successCallback)
            .catch(errorCallback);
    }

    resolve(order, comment, successCallback, errorCallback) {
        let params = {};
        if (comment) {
            params.comment = comment;
        }
        return this.api.axiosObject.post(API_ORDER_PATH + '/' + order.id + '/resolve', params)
            .then(successCallback)
            .catch(errorCallback);
    }

    close(order, comment, successCallback, errorCallback) {
        let params = {};
        if (comment) {
            params.comment = comment;
        }
        return this.api.axiosObject.post(API_ORDER_PATH + '/' + order.id + '/close', params)
            .then(successCallback)
            .catch(errorCallback);
    }

    reopen(order, comment, successCallback, errorCallback) {
        let params = {};
        if (comment) {
            params.comment = comment;
        }
        return this.api.axiosObject.post(API_ORDER_PATH + '/' + order.id + '/reopen', params)
            .then(successCallback)
            .catch(errorCallback);
    }

    getStatusHistories(orderId, successCallback, errorCallback) {
        return this.api.axiosObject.get(API_ORDER_PATH + '/' + orderId + '/order-status-histories')
            .then(successCallback)
            .catch(errorCallback);
    }
}