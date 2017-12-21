const LOGIN_PATH = '/login';
const REGISTER_PATH = '/register';
const HOME_PATH = '/home';

const ORDER_PATH = '/orders';
const ORDER_NEW_PATH = '/orders/new';
const ORDER_SHOW_PATH = '/orders/:number/show';
const ORDER_EDIT_PATH = '/orders/:number/edit';
const ORDER_STATUS_MANAGEMENT_PATH = '/orders/:number/status-management';

const COMPANY_PATH = '/companies';
const COMPANY_BRANCH_PATH = '/company-branches';
const LOCALITY_PATH = '/localities';

const makeUrl = (path, parameters) => {
    return path.replace(/\/:([\w0-9]+)/, function (match, p1) {
        if (parameters[p1]) {
            return '/' + parameters[p1];
        }
    });
};

export {
    makeUrl,

    LOGIN_PATH,
    REGISTER_PATH,
    HOME_PATH,
    ORDER_PATH,
    ORDER_NEW_PATH,
    ORDER_SHOW_PATH,
    ORDER_EDIT_PATH,
    ORDER_STATUS_MANAGEMENT_PATH,
    COMPANY_BRANCH_PATH,
    COMPANY_PATH,
    LOCALITY_PATH
};