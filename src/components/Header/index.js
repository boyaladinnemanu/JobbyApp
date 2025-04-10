import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-cont">
      <Link to="/" className="link-h">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="header-ul-cont">
        <li>
          <Link to="/" className="header-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="header-link">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" onClick={logout} className="logout-btn">
        Logout
      </button>
      <ul className="mobile-cont">
        <li>
          <Link to="/" className="header-link">
            <AiFillHome />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="header-link">
            <BsFillBriefcaseFill />
          </Link>
        </li>
        <li>
          <FiLogOut onClick={logout} className="header-link" />
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
