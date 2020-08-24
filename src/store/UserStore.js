import  { extendObservable } from 'mobx';

class UserStore {
    constructor(){
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            userName: '',
            token: ''
        })
    }
}

export default new UserStore();