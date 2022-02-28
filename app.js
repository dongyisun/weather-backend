"use strict"

const { response } = require('express')
var express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors());

const pathToSwaggerUi = "/home/ec2-user/swagger-ui/dist"
app.use(express.static(pathToSwaggerUi))
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

app.use(express.static(pathToSwaggerUi))
// token test for backend
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io'];
	const origin = req.headers.origin;
		
	if (allowedOrigins.includes(origin)) {
	  res.setHeader('Access-Control-Allow-Origin', origin);
	}

	// Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader != "undefined") {
	  const bearer = bearerHeader.split(" ");
	  const bearerToken = bearer[1];
	  req.token = bearerToken;
	  next();
	}

	// Pass to next layer of middleware
	next();
  });


app.get('data/2.5/weather', get_weather)
app.get('/v1/weather', get_weather)
app.get('/v1/hello',get_hello)
app.post('/v1/auth', get_auth)


// adding token for two endpoints
function get_weather(req,res) {
    if ((req.query.token == key)) {
    response.json({"coord":{"lon":-123.262,"lat":44.5646},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":281.56,"feels_like":281.56,"temp_min":279.46,"temp_max":283.9,"pressure":1032,"humidity":73},"visibility":10000,"wind":{"speed":0.89,"deg":113,"gust":1.34},"clouds":{"all":75},"dt":1642803894,"sys":{"type":2,"id":2040223,"country":"US","sunrise":1642779731,"sunset":1642813576},"timezone":-28800,"id":5720727,"name":"Corvallis","cod":200})
    }
    else{
        res.sendStatus(401);
    }
}

//add token for two endpoints
function get_hello(req, res) {
    if ((req.query.token == key)) {
        response.json("Have a nice day!")
    }
    else {
      res.sendStatus(401);
    }
}


//token and expirationdate
function post_auth(req,res){
	let usernames = ['sundo','tmfrn','eric']
	let passwords = ['123','tmfrn','456']
	let username = req.body.username
	let pwd = req.body.password
  
	if(usernames.includes(username)){
	  if(passwords.includes(pwd)){
		  res.json({ "access-token":key,
		"expires": "2022-01-11T22:18:26.625Z"
	  })
	  }
  }
  }
  
  app.listen(port, () => {
	console.log("Server listening at port " + port)
  })
  
