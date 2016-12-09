import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Visuals = new Mongo.Collection('visuals')

if (Meteor.isServer) {
  Meteor.publish('visuals', function visualsPublication() {
    return Visuals.find();
  });
}

Meteor.methods({
  'visuals.insert'(name) {
    check(name, String)
    Visuals.insert({
      name: name,
      createdAt: new Date(),
    })
  },
  'visuals.remove'(visualId) {
    check(visualId, String)
    Visuals.remove(visualId)
  },
  'visuals.setData'(visualId, data) {
    check(visualId, String)
    check(data, Object)
    Visuals.update(visualId, { $set: { data: data.data, dimensions: data.dimensions } })
  },
})
