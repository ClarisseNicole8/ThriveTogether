import React from 'react';
import InboxForm from './InboxForm';
import InboxCards from './InboxCards';

function InboxPage() {
  return (
    <div className="my-5 container d-flex">
      <div className="flex-grow-1">
        <InboxCards />
      </div>
      <div className="flex-grow-1">
        <InboxForm />
      </div>
    </div>
  );
}

export default InboxPage;
