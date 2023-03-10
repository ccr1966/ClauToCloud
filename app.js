var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var app = express();

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// agregado por mi routes de cada tema----------------------------------------------
var home= require('./routes/home');
var education= require('./routes/education');
var career= require('./routes/career');
var formulario = require('./routes/formulario');
var look = require('./routes/look');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// routes de cada tema----------------------------------------------
var home= require('./routes/home');
var routes = require('./routes/home');

app.use('/', routes);
app.use('/home', home);

app.use('/career', career);
app.use('/education',  education);
app.use('/formulario',   formulario);
app.use('/look',   look); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // render the error page
  res.status(err.status || 500);
  res.render('MensajesAlUsuario',{

    mensaje:err.message
  });
});

module.exports = app;