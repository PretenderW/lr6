const Model = require('./model');
const Car = require('./car');

class User extends Model {
  static table() {
    return 'users';
  }

  constructor() {
    super();
    this.pk = 'id';
    this.fields = ['id', 'first_name', 'last_name', 'age', 'gender'];
    this.hasMany = [
      {
        model: new Car(),
        primaryKey: 'id',
        foreignKey: 'user_id'
      }
    ];

    this.toString = function(){
       let str = `User pk : ${this.pk}\n\tfields : [`;
       const n = this.fields.length;
       for(let i = 0; i < n; i++){
          if (i != 0)
            str += `, `;
          str += this.fields[i];
        }
      str +=`]\n`;
       for (let key in this.hasMany){
          str += this.hasMany[key].model;
          str += `\n\tprimaryKey: `
          str += this.hasMany[key].primaryKey;
          str += `\n\tforeignKey: `
          str += this.hasMany[key].foreignKey;
          str += `\n`;
        }
       return str;
     };
  }

  setData(fn, ln, age, gender){
    this.fields = ['id', fn, ln, age, gender];
  }

  setName(fn, ln){
    this.fields = [this.fields[0], fn, ln, this.fields[3], this.fields[4]];
  }

}

module.exports = User;
