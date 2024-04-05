import {
  AgentBar,
  Avatar,
  ChatList,
  ChatListItem,
  Column,
  IconButton,
  Message,
  MessageList,
  MessageText,
  Row,
  SendButton,
  SendIcon,
  Subtitle,
  TextComposer,
  TextInput,
  ThemeProvider,
  Title,
} from '@livechat/ui-kit'
import React from 'react'
import { connect } from 'react-redux'
import * as io from 'socket.io-client'
import { SERVER_URL } from '../constants'
import './Dashboard.scss'
import withRouter from './withRouter'

class ChatMessage {
  constructor(from = '', to = '', content = '') {
    this.from = from
    this.to = to
    this.content = content
  }

  toJSON() {
    return JSON.stringify({
      from: this.from,
      to: this.to,
      content: this.content,
    })
  }
}

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messageList: {},
      currentMessage: '',
      currentWindow: '',
    }

    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleType = this.handleType.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }

  componentDidMount() {
    const { username, friends } = this.props

    if (username !== '') {
      const prevState = this.state
      const { messageList } = prevState
      const socket = io(SERVER_URL, { query: { username } })

      friends.forEach((friend) => {
        if (!messageList[friend])
          messageList[friend] = []
      })

      socket.on('connect', () => {
        // eslint-disable-next-line no-console -- CLI output.
        console.log('Connected to server !')
      })

      socket.on(username, (chatMessage) => {
        const prevvState = this.state
        const { from, to, content } = JSON.parse(chatMessage)
        const message = new ChatMessage(from, to, content)
        messageList[from].push(message)

        this.setState({
          ...prevvState,
          messageList,
        })
      })

      this.setState({
        ...prevState,
        messageList,
        socket,
      })
    }
  }

  handleSwitch(event) {
    const prevState = this.state

    this.setState({
      ...prevState,
      currentWindow: event.currentTarget.dataset.name,
    })
  }

  handleType(event) {
    const prevState = this.state

    this.setState({
      ...prevState,
      currentMessage: event.target.value,
    })
  }

  handleSend() {
    const prevState = this.state
    const { username } = this.props
    const {
      messageList,
      currentWindow: to,
      currentMessage: content,
      socket,
    } = prevState

    if (to !== '') {
      const message = new ChatMessage(username, to, content)

      messageList[to].push(message)
      socket.emit(username, message.toJSON())

      this.setState({
        ...prevState,
        messageList,
      })
    }
  }

  render() {
    const { email, username, friends, history } = this.props
    const { currentWindow, messageList } = this.state

    if (email === '' || username === '') {
      return (
        <ThemeProvider>
          <MessageList active>
            <Message authorName="Error">
              <MessageText>Plesase sign up or login !</MessageText>
              <IconButton
                onClick={() => {
                  history.push('/')
                }}
              >
                <SendIcon color="#f03e3e" />
              </IconButton>
            </Message>
          </MessageList>
        </ThemeProvider>
      )
    }

    return (
      <ThemeProvider
        theme={{
          MessageText: {
            css: {
              backgroundColor: '#1c7ed6',
              color: '#fff',
            },
          },
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: 300,
            }}
          >
            <AgentBar>
              <Column>
                <Avatar letter={username.toUpperCase()[0]} />
                <Title>{username}</Title>
                <Subtitle>{email}</Subtitle>
              </Column>
            </AgentBar>
            <ChatList
              style={{
                maxWidth: 300,
              }}
            >
              {friends.map(friend => (
                <ChatListItem
                  key={friend}
                  data-name={friend}
                  onClick={this.handleSwitch}
                >
                  <Avatar letter={friend.toUpperCase()[0]} />
                  <Column fill="true">
                    <Row justify>
                      <Title ellipsis>{friend}</Title>
                    </Row>
                  </Column>
                </ChatListItem>
              ))}
            </ChatList>
          </div>
          <div
            style={{
              width: '80%',
            }}
          >
            <div
              style={{
                height: '70vh',
              }}
            >
              <MessageList active>
                {messageList[currentWindow]
                  ? (
                      messageList[currentWindow].map(message => (
                        <Message
                          key={`${message.content} ${Math.random()}`}
                          isOwn={message.from !== currentWindow}
                        >
                          <MessageText>{message.content}</MessageText>
                        </Message>
                      ))
                    )
                  : (
                    <Message authorName="Welcome">
                      <MessageText>Welcome to Chat System !</MessageText>
                    </Message>
                    )}
              </MessageList>
            </div>
            <div>
              {messageList[currentWindow]
                ? (
                  <TextComposer
                    onChange={this.handleType}
                    onSend={this.handleSend}
                  >
                    <Row align="center">
                      <TextInput
                        placeholder="Write something to send ..."
                        fill="true"
                      />
                      <SendButton fit="true" />
                    </Row>
                  </TextComposer>
                  )
                : (
                  <br />
                  )}
            </div>
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

const Dashboard = withRouter(
  connect((state) => {
    const { username, email, friends } = state

    return {
      username,
      email,
      friends,
    }
  })(DashboardComponent),
)

export default Dashboard
