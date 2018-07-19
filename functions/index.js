const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createActivity = functions.firestore.document('events/{eventId}')
  .onCreate(event => {
    let newEvent = event.data();
    console.log(newEvent);

    const activity = newActivity('newEvent', newEvent, event.id);
    console.log(activity);

    return admin
      .firestore()
      .collection('activity')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created with id: ', docRef.id);
      })
      .catch(err => {
        return console.log('Error adding activity', err);
      });
  });
  