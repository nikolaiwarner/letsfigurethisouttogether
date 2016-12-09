import { Meteor } from 'meteor/meteor';
import { Visuals } from '../../api/visuals.js'
import { createContainer } from 'meteor/react-meteor-data';
import VisualsList from '../components/Visuals';

export default VisualsContainer = createContainer(({ params }) => {
  const visualsHandle = Meteor.subscribe('visuals');
  const loading = !visualsHandle.ready();
  return {
    loading,
    visuals: Visuals.find().fetch(),
  };
}, VisualsList);
