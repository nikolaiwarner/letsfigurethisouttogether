import { Meteor } from 'meteor/meteor';
import { Visuals } from '../../api/visuals.js'
import { createContainer } from 'meteor/react-meteor-data';
import Visual from '../components/Visual';

export default VisualContainer = createContainer(({ params }) => {
  const { _id } = params;
  const visualsHandle = Meteor.subscribe('visuals');
  const loading = !visualsHandle.ready();
  return {
    loading,
    visual: Visuals.findOne(_id) || {},
  };
}, Visual);
