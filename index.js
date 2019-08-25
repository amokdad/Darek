var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/app",express.static('html'))


let hotels = require('./data/hotels');


app.get('/api/hotels', function (req, res) {
    return res.json(hotels);
});

app.get("/api/hotels/:id", (req, res) => {
    const itemId = req.params.id;
    const item = data.find(_item => _item.id === itemId);
    if (item) {
       res.json(item);
    } else {
       res.json({ message: `item ${itemId} doesn't exist`})
    }
 });

app.post('/api/hotels', function (req, res) {
   const item = req.body;
   data.push(item)
   return res.json({message:true});
});

app.delete("/api/hotels/:id", (req, res) => {
    const itemId = req.params.id;
    const filtered_list = data.filter(item => item.id !== itemId);
 
    // replace old list with new one
    data = filtered_list;
 
    return res.json({message:true});
 });

app.put("/api/hotels/:id", (req, res) => {
    const itemId = req.params.id;
    const item = req.body;

    const updatedListItems = [];
    // loop through list to find and replace one item
    data.forEach(oldItem => {
       if (oldItem.id === itemId) {
          updatedListItems.push(item);
       } else {
          updatedListItems.push(oldItem);
       }
    });
    data = updatedListItems;
    return res.json({message:true});
 });



// set port
app.listen(80, function () {
    console.log('Node app is running on port 3000');
});


module.exports = app;