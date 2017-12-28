import AxiosApiInstance from './AxiosApiInstance';
import {API_LOGIN_PATH, API_LOGOUT_PATH, API_REGISTER_PATH, API_USER_PATH} from "../constants/ApiRoutePaths";

let instance;

class UserService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.api = new AxiosApiInstance();

        this.api.axiosObject.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                if (error.response.status === 401) {
                    AxiosApiInstance.removeApiToken();
                    localStorage.removeItem('apiToken');
                    localStorage.removeItem('user');
                }
                return Promise.reject(error);
            });

        return instance;
    }

    register(registeredUser, successCallback, errorCallback) {
        return this.api.axiosObject.post(API_REGISTER_PATH, {
            name: registeredUser.name,
            email: registeredUser.email,
            password: registeredUser.password,
            password_confirmation: registeredUser.passwordConfirmation,
            role_id: registeredUser.roleId,
        })
            .then(successCallback)
            .catch(errorCallback);
    }

    login(loginUser, successCallback, errorCallback) {
        return this.api.axiosObject.post(API_LOGIN_PATH, {
            email: loginUser.email,
            password: loginUser.password
        })
            .then(
                function (response) {
                    let apiToken = response.data.user['api_token'];
                    AxiosApiInstance.setApiHeader(apiToken);
                    localStorage.setItem('apiToken', apiToken);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    successCallback(response);
                }
            )
            .catch(errorCallback);
    }

    searchEngineers(successCallback, errorCallback) {
        return this.api.axiosObject.get(API_USER_PATH + '/engineers')
            .then(successCallback)
            .catch(errorCallback);
    }

    logout(successCallback, errorCallback) {
        return this.api.axiosObject.post(API_LOGOUT_PATH)
            .then(
                function (response) {
                    AxiosApiInstance.removeApiToken();
                    localStorage.removeItem('apiToken');
                    localStorage.removeItem('user');
                    successCallback(response);
                }
            )
            .catch(
                function (error) {
                    errorCallback(error);
                }
            );
    }

    static user() {
        return JSON.parse(localStorage.getItem('user')) || null;
    }

    static apiToken() {
        return localStorage.getItem('apiToken') || null;
    }

    static isAuthenticated() {
        return !!localStorage.getItem('user');
    }
}

export default UserService;