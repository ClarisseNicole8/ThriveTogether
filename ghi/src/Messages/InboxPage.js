

import React from 'react';
import InboxForm from './InboxForm';
import InboxCards from './InboxCards';
import InboxMessage from './InboxMessage';
import { connect } from 'react-redux';

function InboxPage(props) {
  const { recipient } = props;
  let content;

  const reloadPage = () => {
    window.location.reload();
  };

  if (recipient.recipient === "") {
    content = (
      <div className="cards-container">
        <div className="solo-inbox-cards">
          <InboxCards />
        </div>
        <div className="inbox-message">
          <InboxMessage />
        </div>
       </div>
    );
  } else {
    content = (
      <div className="container">
        <div className="inbox-container">
          <div className="inbox-cards">
            <div className="inbox-card">
            <InboxCards />
            </div>
          </div>
          <div className="inbox-form">
            <InboxForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inbox-page">
      <button className="btn btn-lg btn-primary" onClick={reloadPage}>New Message</button>
      {content}
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipient: state.recipient,
});

export default connect(mapStateToProps)(InboxPage);
