const express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
  fs = require('fs');

const port = 3000
let usersFreeKey = require("./files/usersInfo.json");

app.use(cookieParser('secret key'))
app.use(express.static('img'));

app.get('/get-cookie', (req, res) => {
  console.log('Cookie: ', req.cookies)
  res.send('Get Cookie')
})

app.get('/set-cookie', (req, res) => {
  res.cookie('token', '12345ABCDE')
  res.send('Set Cookie')
})

app.get('/getItems', (req, res) => {
    let arr = [];
    let data = require("./pizzaInfo.json");
    fs.readdir("./img/", (err, files) => {
        files.forEach(file => {
        if(file.includes(".jpg"))
        arr.push({"path":file, "name" : file.split('.')[0], "info": data[file.split('.')[0]]});
        });
        
        if(req.query['client_id'] == "null"){
            console.log(req.query['client_id']);
            usersFreeKey["lastKey"] = usersFreeKey["lastKey"] + 1;
            fs.writeFileSync('./files/usersInfo.json', JSON.stringify(usersFreeKey));
            return res
            .setHeader('Access-Control-Allow-Origin', '*')
            .json({'client_id': usersFreeKey["lastKey"],"PizzaInfo" : arr});
        }
        else{
            return res
            .setHeader('Access-Control-Allow-Origin', '*')
            .json({"PizzaInfo" : arr});        
        }
    })
    
})

app.get('/getBascket', (req, res) => {
    let data = require("./bascketInfo.json");
    let arr = {};

    arr = data[req.query['client_id']];

    return res
            .setHeader('Access-Control-Allow-Origin', '*')
            .json({"items" : arr});
        
})

app.get('/itemAdd', (req, res) => {
    //добавление предмета в корзину
    let data = require("./bascketInfo.json");
    if(data[req.query["client_id"]] == null)
        data[req.query["client_id"]] = {}

    if(data[req.query["client_id"]][req.query['itemName']] == null)
        data[req.query["client_id"]][req.query['itemName']] = 1;
    else
        data[req.query["client_id"]][req.query['itemName']] += 1;

    fs.writeFileSync('./bascketInfo.json', JSON.stringify(data));
     return res
     .setHeader('Access-Control-Allow-Origin', '*')
     .sendStatus(200);
})

app.get('/deleteItemFromBuscket', (req, res) => {
    //добавление предмета в корзину
    let data = require("./bascketInfo.json");
    delete data[req.query["client_id"]][req.query['itemName']];

    fs.writeFileSync('./bascketInfo.json', JSON.stringify(data));
     return res
     .setHeader('Access-Control-Allow-Origin', '*')
     .sendStatus(200);
})

app.listen(port, () =>
  console.log(`Server listens http://localhost:${port}`)
)