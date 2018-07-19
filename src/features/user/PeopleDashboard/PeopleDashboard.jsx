import React  from 'react';
import { Grid, Segment, Header, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import PersonCard from './PersonCard';

const query = ({auth}) => {
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{collection: 'following'}],
        storeAs: 'following'
      },
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{collection: 'followers'}],
        storeAs: 'followers'
      }
    ]
};

const mapState = state => ({
  followings: state.firestore.ordered.following,
  followers: state.firestore.ordered.followers,
  auth: state.firebase.auth
});

const PeopleDashboard = () => {
  return (
    <Grid>
    
    </Grid>
  );
} 

export default PeopleDashboard;