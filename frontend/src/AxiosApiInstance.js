import axios from 'axios';
import Config from './config';

let instance = null;

class AxiosApiInstance {
    constructor(){
        if(!instance){
            instance = this;
        }

        // to test whether we have singleton or not
        this.axiosObject = axios.create({
            baseURL: Config.get('apiUrl')
        });

        return instance;
    }
}

export default AxiosApiInstance;