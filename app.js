var express = require('express');
var path = require('path');
var fs = require('fs');

let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use("/modules", express.static('node_modules'));
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}; 
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  app.listen(8080, function () { 
    try{
        serialize();
    }
    catch(err){
        console.log(err);
    }
    console.log('Listening on port 8080!');
  });
  
function serialize (){
    let clocks=[
        {
            "countryName": "Israel",
            "hour":0,
            "minute" :0,
            "second":0
        },{
            "countryName": "Germany",
            "hour":-1,
            "minute" :0,
            "second":0
        },{
        "countryName": "England",
        "hour":-2,
        "minute" :0,
        "second":0}]
    
    let str=JSON.stringify(clocks);
    fs.writeFile("clocks.json", str,err => {   
        // Checking for errors
        if (err) throw err; 
        console.log("Done writing"); // Success
    });

}
function deserialize(){
    var clocks =  fs.readFileSync("clocks.json")
    return clocks;
}
app.post('/',(req,res)=>{
    let clock=deserialize(); 
    res.end(clock);
})
    
  

  

  module.exports = app;
 