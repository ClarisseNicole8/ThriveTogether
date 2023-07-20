
// import React from 'react';
// import InboxForm from './InboxForm';
// import InboxCards from './InboxCards';
// import { connect } from 'react-redux';

// function InboxPage(props) {
//   const { recipient } = props;
//   let content = "";
//   if (recipient.recipient === "") {
//     content =     <div className="container">
//                       <div>
//                           <InboxCards />
//                       </div>
//                     </div>

//   } else {
//     content = <div className="container">
//           <div className="inbox-container">
//             <div className="inbox-cards">
//               <InboxCards />
//             </div>
//             <div className="inbox-form">
//               <InboxForm />
//             </div>
//           </div>
//         </div>
//   }
//   return (
//     <div>
//       { content }
//     </div>
//   )
// }

// const mapStateToProps = (state) => ({
//   recipient: state.recipient,
// });

// export default connect(mapStateToProps)(InboxPage);

import React from 'react';
import InboxForm from './InboxForm';
import InboxCards from './InboxCards';
import { connect } from 'react-redux';

function InboxPage(props) {
  const { recipient } = props;
  let content;

  if (recipient.recipient === "") {
    content = (
      <div className="cards-container">
        <div className="solo-inbox-cards">
          <InboxCards />
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
      {content}
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipient: state.recipient,
});

export default connect(mapStateToProps)(InboxPage);
