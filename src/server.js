'use strict';

const express = require('express');

// const handler404 = require('./error-handlers/404');
// const handler500 = require('./error-handlers/500');
// const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true})); //what is this?! why?

//routes
// app.use(routes);

//catchalls
// app.use(handler404);
// app.use(handler500);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
