import firebase from './firebase' 
class Api {
    constructor(){
        // this.firebase = firebase;
        this.user = [];
        this.snips = [];
    }
    init(){ 
        const storage = JSON.parse(localStorage.getItem('snipcode'))
        if (storage) {
            this.user = storage;
            return storage;
        } 
        const cfg = {
            user: {
                uid: "",
                snips: [],
                tags: [], 
                onboard: false,
                pro: false
            }
        }
    
        localStorage.setItem('snipcode', JSON.stringify(cfg))
    
        this.user = cfg;
        return cfg
    }
}
export default new Api();