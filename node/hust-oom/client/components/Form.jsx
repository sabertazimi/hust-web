import React from 'react'
import { connect } from 'react-redux'
import { SERVER_LOGIN_PATH, SERVER_SIGNUP_PATH, SERVER_URL } from '../constants'
import Actions from '../states/actions'
import postData from '../utils/postData'
import './Form.scss'
import withRouter from './withRouter'

const FormContext = React.createContext({})
const FormProvider = FormContext.Provider
const FormConsumer = FormContext.Consumer

class FormWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePanel: 'login',
    }
  }

  render() {
    const { children } = this.props
    const { activePanel } = this.state

    return (
      <FormProvider
        value={{
          activePanel,
          actions: {
            switchPanel: (newPanel) => {
              this.setState({
                activePanel: newPanel,
              })
            },
          },
        }}
      >
        {children}
      </FormProvider>
    )
  }
}

function FormPanel({ isActive, children }) {
  return (
    <FormConsumer>
      {({ activePanel }) => (activePanel === isActive ? children : null)}
    </FormConsumer>
  )
}

function Panel({ id, children }) {
  return (
    <FormConsumer>
      {({ actions }) => (
        <div onClick={() => actions.switchPanel(id)}>{children}</div>
      )}
    </FormConsumer>
  )
}

class _Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const prevState = this.state

    this.setState({
      ...prevState,
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const { email, password } = this.state
    const { history, onLogin } = this.props

    postData(`${SERVER_URL}${SERVER_LOGIN_PATH}`, {
      email,
      password,
    })
      .then((res) => {
        if (res.status === 200) {
          onLogin(res)
          return history.push('/dashboard')
        } else {
          // eslint-disable-next-line no-alert -- Legacy code.
          return alert(res.message)
        }
      })
      .catch(() => {
        history.push('/')
      })
  }

  render() {
    return (
      <div id="login-tab-content" className="active tabs-content">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            className="input"
            id="user_login"
            onChange={this.handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            className="input"
            id="user_pass"
            onChange={this.handleChange}
            placeholder="Password"
            required
          />
          <input type="submit" className="button" value="Login" />
        </form>
      </div>
    )
  }
}

class _SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const prevState = this.state

    this.setState({
      ...prevState,
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const { email, username, password } = this.state
    const { history, onLogin } = this.props

    postData(`${SERVER_URL}${SERVER_SIGNUP_PATH}`, {
      email,
      username,
      password,
    })
      .then((res) => {
        if (res.status === 200) {
          onLogin(res)
          return history.push('/dashboard')
        } else {
          // eslint-disable-next-line no-alert -- Legacy code.
          return alert(res.message)
        }
      })
      .catch(() => {
        history.push('/')
      })
  }

  render() {
    return (
      <div id="signup-tab-content" className="active tabs-content">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            className="input"
            id="user_email"
            onChange={this.handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="username"
            className="input"
            id="user_name"
            onChange={this.handleChange}
            placeholder="Username"
            pattern="\w+"
            required
          />
          <input
            type="password"
            name="password"
            className="input"
            id="user_pass"
            onChange={this.handleChange}
            placeholder="Password (More than 6 bits)"
            pattern="[0-9a-zA-Z]{6,}"
            required
          />
          <input type="submit" className="button" value="Sign Up" />
        </form>
      </div>
    )
  }
}

const Login = withRouter(
  connect(
    () => ({}),
    dispatch => ({
      onLogin: (...args) => {
        dispatch(Actions.login(...args))
      },
    }),
  )(_Login),
)

const SignUp = withRouter(
  connect(
    () => ({}),
    dispatch => ({
      onLogin: (...args) => {
        dispatch(Actions.login(...args))
      },
    }),
  )(_SignUp),
)

function Form() {
  return (
    <div className="form-wrap">
      <FormWrapper>
        <div className="tabs">
          <Panel id="login">
            <h2 className="login-tab">Login</h2>
          </Panel>
          <Panel id="signup">
            <h2 className="signup-tab">Sign Up</h2>
          </Panel>
        </div>

        <FormPanel isActive="login">
          <Login />
        </FormPanel>

        <FormPanel isActive="signup">
          <SignUp />
        </FormPanel>
      </FormWrapper>
    </div>
  )
}

export default Form
