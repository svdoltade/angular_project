export class User{
    constructor(
        public email: string,
        public id: string,
        private token: string,
        private tokenExpiryDate: Date
    ){}
    
    get userToken(){
        if(!this.tokenExpiryDate || new Date> this.tokenExpiryDate){
            return null;
        }
        return this.token;
    }
}