export class Data{
    json: any;
    constructor(json){
        this.json = json
    }

    getTotalExpenses = ()=>{
        console.log(this.json)
        this.json
    }
}