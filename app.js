var app = require('./init');

app.get('/list',function(req, res){
  res.json([{ name : 'omer'},{name : 'eray'}]);
})
