const express = require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app = express()

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
const port = 3000
app.get("/",function(req,res){ 
res.sendFile(__dirname+"/signup.html");

});

app.post("/",function(req,res){
const firstName=req.body.FirstName;
const lastName=req.body.LastName;
const email=req.body.email;
console.log(firstName,lastName,email);


const data={
  members: [
      {
          email_address: email,
          status: "subscribed",
          merge_fields: {
              FNAME: firstName,
              LNAME: lastName
          }
      }  
  ]
};

const Jsondata=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/c83d322dcd"
const options={
method:"POST",
auth:"raunak:fb4a90925915d89dc7a6969cbd31d695-us21"
}
const request=https.request(url,options, function(response){
if(response.statusCode==200){
res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}

   response.on("data",function(data){
    console.log(JSON.parse(data));
   })
})
request.write(Jsondata);
request.end();
});

app.post("/failure",function(req,res){// this will response to the post req send by try again button and redirect to home page
res.redirect("/");

});


app.listen(port, () => {
  console.log("server has started");
})
//api key fb4a90925915d89dc7a6969cbd31d695-us21
// audiance id c83d322dcd