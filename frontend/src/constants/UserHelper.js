const user = () => {
    return JSON.parse(localStorage.getItem('user')) || null;
};

const apiToken = () => {
    return localStorage.getItem('apiToken') || null;
};

const isAuthenticated = () => {
    return !!localStorage.getItem('user');
};

const isManager = () => {
    return isAuthenticated() && user() && user().role.name === 'manager';
};

export {user, apiToken, isAuthenticated, isManager};