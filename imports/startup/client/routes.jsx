import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import { Index } from '../../ui/components/index.jsx';
import About from '../../ui/components/About.jsx';
import Capture from '../../ui/components/Capture.jsx';
import VisualsContainer from '../../ui/containers/VisualsContainer.jsx';
import VisualContainer from '../../ui/containers/VisualContainer.jsx';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ Index } />
      <Route path="/about" component={About} />
      <Route path="/visuals" component={VisualsContainer} />
      <Route path="/visuals/:_id" component={VisualContainer}/>
      <Route path="/visuals/:_id/capture" component={Capture}/>
    </Router>,
    document.getElementById('render-target')
  );
});
