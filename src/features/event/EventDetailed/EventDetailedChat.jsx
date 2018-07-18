import React, { Component } from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import distanceInWords from 'date-fns/distance_in_words';

import EventDetailedChatForm from './EventDetailedChatForm';
import { Link } from 'react-router-dom';

class EventDetailedChat extends Component{
  state = {
    showReplyForm: false,
    selectedCommentId: null
  };

  render(){
    const { addEventComment, eventId, eventChat } = this.props;

    return(
      <div>
        <Segment
          textAlign="center" 
          attached="top" 
          inverted 
          color="teal" 
          style={{ border: 'none' }}
        >
          <Header>Chat about this event</Header>
        </Segment>
        <Segment attached>
          <Comment.Group>
            {eventChat &&
              eventChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar 
                    src={comment.photoURL || '/assets/user.png'} 
                  />
                </Comment>
              ))
            }
          </Comment.Group>
        </Segment>
      </div>
    );
  }
};

export default EventDetailedChat;