import React from 'react';
import Router from 'react-router';
import routes from './routes';
import alt from './alt';
import Iso from 'iso';

Iso.bootstrap(function (state, _, container) {
  alt.bootstrap(state);

  Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Handler {...container} />, document.getElementById('app'));
  });
});