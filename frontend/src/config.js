export default class Config{
    static params = [
        {
            name: 'apiUrl',
            value: 'http://api.service-order-processing.loc/api'
        }
    ];

    static get(configParameterName){
        for(let i = 0; i < Config.params.length; i++){
            if(Config.params[i].name === configParameterName){
                return Config.params[i].value;
            }
        }
    }
}