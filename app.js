const express = require('express');
var app = express();
const handlebars = require('hbs');
app.set('view engine', 'hbs');
app.use(express.urlencoded());
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Major:Major@cluster0.0arep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;
client.connect(() => {
    collection = client.db("test").collection("baza");
    

});

app.post('/', function (req, res) {

  console.log(req);

  
  var myobj = { Imie: req.body.firstName, Nazwisko: req.body.lastName };

  collection.insertOne(myobj, function (err, res) {

      if (err) throw err;
      console.log("Wysłano pomyślnie");

  });
  res.render('Potwierdzoneinfo');
})

app.get('/', function (req, res) {
    res.render('dodaj')
        ;
})


var server = app.listen(8081);
client.close();