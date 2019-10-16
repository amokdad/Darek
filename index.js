var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/app",express.static('html'))


let hotels = require('./data/hotels');

app.post('/api/GetData',function(req,res){



  

   var boxes = [];
   var region = req.body.regions;
   
   for(var i in region){
     
      for(var l in region[i].lines)
      {
          var txt = "";
          var b = region[i].boundingBox.split(',');
          for(var w in region[i].lines[l].words)
          {
              console.log(region[i].lines[l]);
              txt += region[i].lines[l].words[w].text + " ";
             // var b = w.boundingBox.split(',');
              //boxes.push([parseInt(b[0]), parseInt(b[1]), parseInt(b[2]), parseInt(b[3]),w.text])
          }
          boxes.push([parseInt(b[0]), parseInt(b[1]), parseInt(b[2]), parseInt(b[3]),txt.trim()])
         
      }
   }
   
   console.log(boxes);

   var nameen,namear,qid,doe,dob,occ,nat;
   var dates = [];
   for(var i in boxes)
   {
      val = boxes[i];
      var txt = val[4];
      if(i == boxes.length-1 && (txt.indexOf("Name") != -1 || txt.indexOf(":") != -1 ))
      {
          nameen = txt.replace(":","").trim().replace("Name","");
      }
      if(i == boxes.length-2 && (txt.indexOf("الاسم") != -1 || txt.indexOf(":") != -1 ))
      {
          namear = txt.replace(":","").trim().replace("الاسم","");
      }
      if(txt.length == 11)
      {
          numbersCount = 0;
          for(var l in txt)
          {
              numbersCount += (isNaN(txt[l]) ? 0 : 1);
          }
          if(numbersCount > 9)
          qid = txt;
      }
      if(txt.length == 10)
      {
          if(txt.indexOf("/") != -1)
          {
              var t = txt;
              dates.push(t);
          }
      }
      if(txt == ":Nationality")
      {
          var y = val[1];
          for(var j in boxes){
         
              r = boxes[j];
              if(r[1] <= y+10 && r[1] >= y-10 && j != i)
              {
                  nat = r[4];
              }
          }

      }
      if(txt == ":Occupation")
      {
          var y = val[1];
          for(var j in boxes){
               r = boxes[j];
              if(r[1] <= y+10 && r[1] >= y-10 && j != i)
              {
                  occ = r[4];
              }
          }

      }
  }
  return res.json({nameen:nameen,namear:namear,qid:qid,occ:occ,nat:nat,doe:doe,dob:dob});


})

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
   var exist = hotels.find(x=>x.email === item.email);
   if(exist)
      return res.json({code:false});
   hotels.push(item);
      return res.json({code:true});
});

app.delete("/api/hotels/:id", (req, res) => {
    const itemId = req.params.id;
    const filtered_list = data.filter(item => item.id !== itemId);
 
    // replace old list with new one
    hotels = filtered_list;
 
    return res.json({message:true});
 });

app.put("/api/hotels/:id", (req, res) => {
    const itemId = req.params.id;
    const item = req.body;

    const updatedListItems = [];
    // loop through list to find and replace one item
    hotels.forEach(oldItem => {
       if (oldItem.id === itemId) {
          updatedListItems.push(item);
       } else {
          updatedListItems.push(oldItem);
       }
    });
    hotels = updatedListItems;
    return res.json({message:true});
 });



// set port
app.listen(process.env.PORT || 3000, function () {
    console.log('Node app is running on port 3000');
});


module.exports = app;