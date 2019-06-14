var express				=	require('express');
var app					=	express();
var port				=	3000;
var expressSession		=	require('express-session');
var cookieParser 		=	require('cookie-parser');
var bodyParser			=	require('body-parser');
var logout				=	require('./controllers/logout');
var registration		=	require('./controllers/registration');
var login				=	require('./controllers/login');
var shopkeeper			=	require('./controllers/shopkeeper');


var customer			=	require('./controllers/customer');

//configuration
app.set('view engine','ejs');


//middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: 'hhdhdhdhd', saveUninitialized: true, resave: false}));
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));
app.use(cookieParser());



//routing
app.use('/login', login);
app.use('/registration', registration);
app.use('/logout', logout);
app.use('/customer', customer);
app.use('/shopkeeper', shopkeeper);

app.use('/', customer);


app.listen(port,function(request,response){
	console.log("server started at "+port);
});