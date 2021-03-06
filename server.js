import express      from 'express';
import path         from 'path';
import favicon      from 'serve-favicon';
import logger       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import React from 'react';
import Router from 'react-router';
import routes from './app/routes';
import alt from './app/alt';
import Iso from 'iso';

import routes from './routes/index';
import users from './routes/users';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

app.use(function(req, res) {
  alt.bootstrap(JSON.stringify(res.locals || {}));

  var iso = new Iso();

  const router = Router.create({
    routes: routes,
    location: req.url,
    onAbort: (redirect) => {
      return res.redirect('/login');
    }
  });

  router.run(function (Handler, state) {
    var html = React.renderToString(React.createElement(Handler));
    iso.add(html, alt.flush());

    res.render('index', {html: iso.render()});
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
