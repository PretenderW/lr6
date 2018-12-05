require('dotenv').config();
const mysql = require('mysql');
const util = require('util');
const Model = require('./model.js');
const User = require('./user.js');
const Car = require('./car.js');

// https://adonisjs.com/docs/4.0/lucid - Lucid Models

global.db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

global.db.query = util.promisify(global.db.query);

// Открыть с БД и вывести в консоль сузествующего пользователя с машинами
let user;
(async function (){
    try{
        user = new User();
        user.pk = 2;
        const result = await user.load();
        let j = 0;
        for (let key in result){
          user.fields[j++] = result[key];
          //console.log(key + " - " + result[key]);
        }
        let car = new Car();
        let cars = [];
        const res = await car.loadAll();
        let n = 0;
        for (let i in res){
          cars[i] = new Car();
          j = 0;
          for (let key in res[i]){
            cars[i].fields[j++] = res[i][key];
          }
          cars[i].pk = res[i]['id'];
          if (user.pk == cars[i].fields[1]){
            user.hasMany[n] = {
                model : cars[i],
                primaryKey : cars[i].fields[0],
                foreignKey : cars[i].fields[1]
                }
            n++;
          }
        }
    }catch(e){
        console.log('error\n');
        console.log(e);
    }
})().then(res => {
    console.log("-------------------------------------------------------")
    console.log("1)Открыть БД и вывести в консоль существующего пользователя с машинами");
    console.log("-------------------------------------------------------")
    console.log(user.toString());
    console.log("-----------------END-------------------------------");
});

// Создать нового пользователя
 try{
        console.log("-------------------------------------------------------")
        console.log("2)Создать нового пользователя");
        console.log("-------------------------------------------------------")
        let user = new User()
        user.setData('Petr', 'Petrov', 25, 'M');
        user.save(new User());
    }catch(e){
      console.log('error\n');
      console.log(e);
    }
  console.log("Пользователь добавлен");
  console.log("-----------------END----------------------------------");


// Изменить имя пользователю
(async function (){
    try{
        let user = new User();
        user.pk = 1;
        const result = await user.load();
        let j = 0;
        for (let key in result){
          user.fields[j++] = result[key];
        }
        user.setName('Ivan','Sidorov');
        //user.setName('Ivan','Ivanov');
        user.save(new User());
    }catch(e){
        console.log('error\n');
        console.log(e);
    }
})().then(res => {
    console.log("-------------------------------------------------------");
    console.log("3)Изменить имя пользователя");
    console.log("-------------------------------------------------------");
    console.log("Пользователь изменен");
    console.log("-----------------END-------------------------------");
});

// Удалить пользователя
let user1;
(async function (){
    try{
        user1 = new User();
        const result = await user1.loadAll();
        let j = 0;
        for (let i in result){
           j++;
        }
        //delete last id
        user1.pk = result[--j].id;
    }catch(e){
        console.log('error\n');
        console.log(e);
    }
})().then(res => {
    console.log("-------------------------------------------------------");
    console.log("4)Удаление пользователя");
    console.log("-------------------------------------------------------");
    user1.delete();
    console.log("Пользователь удален");
    console.log("-----------------END-------------------------------");
});
// Добавить пользователю новую машину

    try{
        let car = new Car();
        car.setData(2, 'BMW', '2018');
        console.log("-------------------------------------------------------");
        console.log("5)Добавление пользователю новой машини");
        console.log("-------------------------------------------------------");
        car.save(new Car());
        console.log("Машина добавлена");
        console.log("-----------------END-------------------------------");
    }catch(e){
        console.log('error\n');
        console.log(e);
    }



//global.db.end();
