const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Employee = require("./models/Employee")

conn = mongoose.connect('mongodb://127.0.0.1:27017/company');
const port = 3000

app.set('view engine', 'ejs');

const getRandom = (arr) => {
  let rno = Math.floor(Math.random() * arr.length);
  return arr[rno];
}



app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
})

app.get('/generate', async (req, res) => {
  await Employee.deleteMany({});
  let randomNames = ['Rohan', "Sohan", "Mohan", "Sobhan"];
  let randomLang = ["Python", "js", "C++", "Java"];
  let randomCities = ["Bilaspur", "Moradabad", "Mysore", "Kolkata"];
  for (let index = 0; index < 10; index++) {
      let e = await Employee.create({
          name: getRandom(randomNames),
          salary: Math.floor(Math.random() * 22000),
          language: getRandom(randomLang),
          city: getRandom(randomCities),
          isManager: (Math.random() > 0.5) ? true : false
      });
      console.log(e);
  }
  res.json({ message: '10 random employees generated and saved to the database.' });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})