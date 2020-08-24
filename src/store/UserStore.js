import  { extendObservable } from 'mobx';

class UserStore {
    constructor(){
        extendObservable(this, {
            isLoggedIn: false,
            userName: '',
            token: ''
        })
    }
}

export default new UserStore();