import AxiosApiInstance from './AxiosApiInstance';
import {API_COMPANY_BRANCH_PATH, API_COMPANY_PATH} from "../constants/ApiRoutePaths";

let instance;

export default class CompanyService {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.api = new AxiosApiInstance();

        return instance;
    }

    searchCompany(q, limit, successCallback, errorCallback) {
        return this.api.axiosObject.post(API_COMPANY_PATH + '/search', {
            q: q,
            limit: limit
        })
            .then(successCallback)
            .catch(errorCallback);
    }

    getAllCompanies(limit, pageNumber, successCallback, errorCallback) {
        return this.api.axiosObject.get(API_COMPANY_PATH, {
            params: {
                pageNumber: pageNumber,
                limit: limit
            }
        })
            .then(successCallback)
            .catch(errorCallback);
    }

    getCompany(id, successCallback, errorCallback) {
        return this.api.axiosObject.get(API_COMPANY_PATH + '/' + id)
            .then(successCallback)
            .catch(errorCallback);
    }

    newCompany(company, successCallback, errorCallback) {
        return this.api.axiosObject.post(API_COMPANY_PATH, company)
            .then(successCallback)
            .catch(errorCallback);
    }

    editCompany(company, successCallback, errorCallback) {
        return this.api.axiosObject.put(API_COMPANY_PATH + '/' + company.id, company)
            .then(successCallback)
            .catch(errorCallback);
    }

    deleteCompany(companyId, successCallback, errorCallback) {
        return this.api.axiosObject.delete(API_COMPANY_PATH + '/' + companyId)
            .then(successCallback)
            .catch(errorCallback);
    }

    searchCompanyBranchByAddress(q, companyId, localityId, limit, successCallback, errorCallback) {
        return this.api.axiosObject.post(API_COMPANY_BRANCH_PATH + '/search', {
            q: q,
            limit: limit,
            companyId: companyId,
            localityId: localityId
        })
            .then(successCallback)
            .catch(errorCallback);
    }
}