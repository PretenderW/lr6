class Model {
  // do magic
  //получение экземпляра одной строки с БД по первичному ключу
  load(){
    return new Promise((resolve,reject)=>{
      global.db.query(`SELECT * FROM ${this.constructor.table()} WHERE id = ${this.pk}`,
        function(err, res, fields){
          if(err) reject(err);
          //console.log(res);
          resolve(res[0]);
      });
    })
  }
  //получение массива экземпляров класса
  loadAll(){
    return new Promise((resolve,reject)=>{
      global.db.query(`SELECT * FROM ${this.constructor.table()}`,
        function(err, res, fields){
          if(err) reject(err);
          //console.log(res[0].id)
          resolve(res);
          //return Promise.resolve(res);
      });
    })
  }
  //получение массива записей
  static loadAllData(){
    return new Promise((resolve,reject)=>{
    global.db.query('SELECT * FROM users, cars WHERE users.id = cars.user_id',
          function(err, res, fields){
            if(err) reject(err);
            resolve(res);
          /*  for (let i in res){
              console.log(res[i]);
            }*/
          });
        })
  }
  //сохранение в БД (если PK не задан - то создание, иначе - обновление)
  save(names){
    if (this.pk === 'id'){
        const n =  this.fields.length;
        let str =``;
        for (let i = 1;  i < n; i++){
           if (i != 1){
               str += `, `;
            }
           else {
              str +=`(`;
           }
           str += names.fields[i];
        }
        str +=`) VALUES ('`;
        for (let i = 1;  i < n; i++){
           if (i != 1){
               str += `', '`;
            }
           str += this.fields[i];
        }
        str += `')`
      global.db.query(`INSERT INTO ${this.constructor.table()} ${str}`,
          function(err, res, fields){
            if(err) throw(err);
          });
    }
    else {
        const n =  this.fields.length;
        let str=``;
        for (let i = 1;  i < n; i++){
           if (i != 1)
               str += `, `;
           str += `${names.fields[i]} = '${this.fields[i]}'`;
        }
      global.db.query(`UPDATE ${this.constructor.table()} SET ${str} WHERE id = ${this.pk}`,
          function(err, res, fields){
            if(err) throw(err);
          });
      }
  }

  // удаление с БД
  delete(){
      global.db.query(`DELETE FROM ${this.constructor.table()} WHERE id = ${this.pk}`,
          function(err, res, fields){
            if(err) throw(err);
          });
  }
}

module.exports = Model;
