import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import Header from '../Header'
import './index.css'

const profilestatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAILED',
  loader: 'LOADER',
}

const itemstatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAILED',
  loader: 'LOADER',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profiledata: {},
    jobslist: [],
    selectedsalary: '',
    employmentType: [],
    search: '',
    profileactivestatus: profilestatus.initial,
    itemactivestatus: itemstatus.initial,
    totalLength: 0,
  }

  componentDidMount() {
    this.getdata()
    this.getJobsData()
  }

  handleSalaryChange = event => {
    this.setState({selectedsalary: event.target.value}, this.getJobsData)
  }

  handelemployment = event => {
    const {value, checked} = event.target
    this.setState(
      prev => ({
        employmentType: checked
          ? [...prev.employmentType, value]
          : prev.employmentType.filter(each => each !== value),
      }),
      this.getJobsData,
    )
  }

  getdata = async () => {
    this.setState({profileactivestatus: profilestatus.loader})
    const jwt = Cookies.get('jwt_token')
    const method = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', method)
    const data = await response.json()

    if (response.ok) {
      const formatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profiledata: formatedData,
        profileactivestatus: profilestatus.success,
      })
    } else {
      this.setState({profileactivestatus: profilestatus.fail})
    }
  }

  getJobsData = async () => {
    this.setState({itemactivestatus: itemstatus.loader})
    const jwt = Cookies.get('jwt_token')
    const {employmentType, selectedsalary, search} = this.state
    const method = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
        ',',
      )}&minimum_package=${selectedsalary}&search=${search}`,
      method,
    )
    const data = await response.json()
    if (response.ok) {
      const formatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))

      this.setState({
        jobslist: formatedData,
        itemactivestatus: itemstatus.success,
        totalLength: data.total,
      })
    } else {
      this.setState({
        itemactivestatus: itemstatus.fail,
        totalLength: true,
      })
    }
  }

  renderProfilecard = () => {
    const {profiledata} = this.state
    const {name, profileImageUrl, shortBio} = profiledata
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderfailView = () => (
    <div className="loader-container">
      <button type="button" className="retry-btn" onClick={this.getdata}>
        Retry
      </button>
    </div>
  )

  renderProfileswitch = () => {
    const {profileactivestatus} = this.state
    switch (profileactivestatus) {
      case profilestatus.success:
        return this.renderProfilecard()
      case profilestatus.fail:
        return this.renderfailView()
      case profilestatus.loader:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderitemfailView = () => (
    <div className="job-fail-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="itemfailimg"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-btn" type="button" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderitemsuccessview = () => {
    const {jobslist} = this.state
    return (
      <>
        {jobslist.map(each => (
          <JobItem key={each.id} item={each} />
        ))}
      </>
    )
  }

  rendernoitemView = () => (
    <div className="job-fail-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="itemfailimg"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderitemswitch = () => {
    const {itemactivestatus} = this.state

    switch (itemactivestatus) {
      case itemstatus.success:
        return this.renderitemsuccessview()
      case itemstatus.fail:
        return this.renderitemfailView()
      case itemstatus.loader:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {
      selectedsalary,
      jobslist,
      employmentType,
      totalLength,
      itemactivestatus,
    } = this.state
    console.log(employmentType)

    return (
      <>
        <Header />
        <div className="jobs-cont">
          <div className="profile-filter-cont">
            <>{this.renderProfileswitch()}</>
            <hr />
            <div>
              <h1 className="Employment-head">Type of Employment</h1>
              <ul className="Employment-ul">
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId}>
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      value={each.employmentTypeId}
                      checked={employmentType.includes(each.employmentTypeId)}
                      onChange={this.handelemployment}
                    />
                    <label htmlFor={each.employmentTypeId}>{each.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div>
              <h1 className="salary-head">Salary Range</h1>
              <ul className="salary-ul">
                {salaryRangesList.map(each => (
                  <li key={each.salaryRangeId}>
                    <input
                      type="radio"
                      id={each.salaryRangeId}
                      name="salary"
                      value={each.salaryRangeId}
                      checked={selectedsalary === each.salaryRangeId}
                      onChange={this.handleSalaryChange}
                    />
                    <label htmlFor={each.salaryRangeId}>{each.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs-collection">
            <div className="jobs-search-cont">
              <input
                type="search"
                placeholder="Search"
                onChange={e => this.setState({search: e.target.value})}
              />

              <button
                type="button"
                data-testid="searchButton"
                onClick={() => this.getJobsData()}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {totalLength && this.renderitemswitch()}
            {!totalLength && this.rendernoitemView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
