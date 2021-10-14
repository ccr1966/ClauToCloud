var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const session = require('cookie-session');

var handlebars = require('express-handlebars');    

app.engine('handlebars', handlebars({
    helpers: {
      ifCond: function (v1, v2, options) {
                    if (v1 === v2) {
                      return options.fn(this);
                    }
                    return options.inverse(this);
              }
            }//helper
        }//engine
));

// view engine setup
//app.engine('hbs', hbs({helpers: require("./public/js/helpers.js").helpers,extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret:'esmeralda2407',
  resave:true,
  saveUnInitialized:true
}));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// agregado por mi routes de cada tema----------------------------------------------
var home= require('./routes/home');
var education= require('./routes/education');
var career= require('./routes/career');
var formulario = require('./routes/formulario');
var look = require('./routes/look');

var login = require('./routes/admin/login'); 
var routes = require('./routes/admin/login');
var comentarios = require('./routes/admin/comentarios');


app.use('/', routes);
app.use('/home', home);
app.use('/admin/login', login);
/* funcion de control de paginas para usuario logeado. Me dio error...*/
secured = async(req,res,next) =>{
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
        next();
    }
    else{
      res.redirect('/admin/login');
    }
  } catch(error){
        console.log(error);
  }
}//secured 
// fin ----------------------------------------------------


app.use('/career', secured, career);
app.use('/education',secured,  education);
app.use('/formulario',secured,   formulario);
app.use('/look',  secured, look); 


app.use('/admin/comentarios', secured, comentarios);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //es.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('MensajesAlUsuario',{
    mensaje:err.message
  });
});

module.exports = app;
