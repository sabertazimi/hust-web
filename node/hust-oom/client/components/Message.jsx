import React from 'react';

// class MessageList extends React.PureComponent {
//   render() {
//     return (
//       <ul className="message-list">
//         {this.props.messages.map(message => {
//           return (
//            <li key={message.id}>
//              <div>
//                {message.senderId}
//              </div>
//              <div>
//                {message.text}
//              </div>
//            </li>
//          )
//        })}
//      </ul>
//     )
//   }
// }

// class SendMessageForm extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       message: ''
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//   handleChange(e) {
//     this.setState({
//       message: e.target.value
//     })
//   }
//   handleSubmit(e) {
//     e.preventDefault()
//     this.props.sendMessage(this.state.message)
//     this.setState({
//       message: ''
//     })
//   }
//   render() {
//     return (
//       <form
//         onSubmit={this.handleSubmit}
//         className="send-message-form">
//         <input
//           onChange={this.handleChange}
//           value={this.state.message}
//           placeholder="Type your message and hit ENTER"
//           type="text" />
//       </form>
//     )
//   }
// }

const Message = () => <div>Hello Chat!</div>;

export default Message;
