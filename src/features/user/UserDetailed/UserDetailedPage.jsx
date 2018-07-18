import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedEvents from './UserDetailedEvents';
import { userDetailedQuery } from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserEvents } from '../userActions';

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if(ownProps.match.params.id === state.auth.uid){
    profile = state.firebase.profile;
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) &&
    state.firestore.ordered.profile[0];

    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  }
};

const actions = {
  getUserEvents
};

class UserDetailedPage extends Component {
  render(){
    const { 
      profile, photos, auth, match, requesting, events, eventsLoading 
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;

    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSidebar />
        { photos && photos.length > 0 &&
          <UserDetailedPhotos photos={photos}/>
        }
        <UserDetailedEvents />
      </Grid>
    );
  }
};

export default compose(
  connect(mapState),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);