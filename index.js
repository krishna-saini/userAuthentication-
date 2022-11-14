const app= require('./app.js');
console.log("index.js");
app.listen(`${process.env.PORT}`, ()=>{console.log("listening at port");})