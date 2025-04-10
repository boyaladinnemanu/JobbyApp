import {withRouter, Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => (
  <>
    <Header />
    <div className="home-cont">
      <div className="home-content-cont">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <Link className="link-h" to="/jobs">
          <button type="button">Find Jobs</button>
        </Link>
      </div>
    </div>
  </>
)

export default withRouter(Home)
