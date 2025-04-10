import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {error: '', username: '', password: ''}

  success = jwtToken => {
    this.setState({error: ''})
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  failed = err => {
    this.setState({error: err})
  }

  getData = async e => {
    e.preventDefault()
    console.log('start..')
    const {username, password} = this.state
    const userdata = {
      username,
      password,
    }
    const method = {
      method: 'POST',
      body: JSON.stringify(userdata),
    }
    const response = await fetch('https://apis.ccbp.in/login', method)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.success(data.jwt_token)
    } else {
      this.failed(data.error_msg)
    }
  }

  renderusername = () => (
    <>
      <label htmlFor="username" className="label-field">
        USERNAME
      </label>
      <input
        placeholder="Username"
        className="input-field"
        type="text"
        id="username"
        onChange={e => this.setState({username: e.target.value})}
      />
    </>
  )

  renderpassword = () => (
    <>
      <label htmlFor="password" className="label-field">
        PASSWORD
      </label>
      <input
        placeholder="Password"
        className="input-field"
        type="password"
        id="password"
        onChange={e => this.setState({password: e.target.value})}
      />
    </>
  )

  render() {
    const {error} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-cont">
        <form className="form-cont" onSubmit={this.getData}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="input-cont">{this.renderusername()}</div>
          <div className="input-cont">{this.renderpassword()}</div>
          <div className="btn-cont">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
          {error ? <p className="error">{error}</p> : ''}
        </form>
      </div>
    )
  }
}

export default Login
