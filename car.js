const Model = require('./model');

class Car extends Model {
  static table() {
    return 'cars';
  }

  constructor() {
    super();
    this.pk = 'id';
    this.fields = ['id', 'user_id', 'model', 'year'];

    this.toString = function(){
       let str = `Car pk : ${this.pk}\n\t`;
       str += `fields : [`;
       const n =  this.fields.length;
       for (let i = 0;  i < n; i++){
         if (i != 0)
           str +=', '
          str += `${this.fields[i]}`;
        }
        str+=`]`;
       return str;
    };
  }

  setData(id, model, year){
    this.fields = ['id', id, model, year];
  }



}

module.exports = Car;
