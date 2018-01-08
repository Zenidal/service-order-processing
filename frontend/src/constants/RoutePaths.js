const LOGIN_PATH = '/login';
const REGISTER_PATH = '/register';
const HOME_PATH = '/';

const ORDER_PATH = '/orders';
const ORDER_NEW_PATH = '/orders/new';
const ORDER_SHOW_PATH = '/orders/:number/show';
const ORDER_EDIT_PATH = '/orders/:number/edit';
const ORDER_STATUS_MANAGEMENT_PATH = '/orders/:number/status-management';

const COMPANY_PATH = '/companies';
const COMPANY_ALL_PATH = '/companies/:limit?/:page?';
const COMPANY_NEW_PATH = '/companies/new';
const COMPANY_EDIT_PATH = '/companies/:number/edit';

const makeUrl = (path, parameters) => {
    return path.replace(/\/:([\w0-9]+)\??/g, function (match, p1) {
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
    COMPANY_PATH,
    COMPANY_ALL_PATH,
    COMPANY_NEW_PATH,
    COMPANY_EDIT_PATH
};