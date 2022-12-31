const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public")); //static folder
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsondata = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/707bfa0e26";
  const options = {
    method: "POST",
    auth: "sachi2162:db49f97778335f160349321f1179acf7-us8"
  };
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT||3000, function() {//port will run on both locally and at heroku
  console.log("Server is running on port 3000");
});





// api key
// db49f97778335f160349321f1179acf7-us8

// list id
// 707bfa0e26
