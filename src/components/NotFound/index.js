import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="not-found-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
