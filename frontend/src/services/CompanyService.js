import AxiosApiInstance from './AxiosApiInstance';
import {COMPANY_BRANCH_PATH, COMPANY_PATH} from "../constants/RoutePaths";

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
        return this.api.axiosObject.get(COMPANY_PATH + '/search', {
            q: q,
            limit: limit
        })
            .then(successCallback)
            .catch(errorCallback);
    }

    searchCompanyBranchByAddress(q, companyId, localityId, limit, successCallback, errorCallback){
        return this.api.axiosObject.post(COMPANY_BRANCH_PATH + '/search', {
            q: q,
            limit: limit,
            companyId: companyId,
            localityId: localityId
        })
            .then(successCallback)
            .catch(errorCallback);
    }
}