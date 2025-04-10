import {Component} from 'react'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const jobdetailstatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAILED',
  loader: 'LOADER',
}

class JobItemDetails extends Component {
  state = {
    itemdetailslist: {jobDetails: {}, similarJobs: []},
    detailstatus: jobdetailstatus.initial,
  }

  componentDidMount() {
    this.getitemdetailsdata()
  }

  jobDetails = each => ({
    companyLogoUrl: each.company_logo_url,
    companyWebsiteUrl: each.company_website_url,
    employmentType: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    lifeAtCompany: {
      description: each.life_at_company.description,
      imageUrl: each.life_at_company.image_url,
    },
    location: each.location,
    packagePerAnnum: each.package_per_annum,
    rating: each.rating,
    skills: each.skills.map(skill => ({
      name: skill.name,
      imageUrl: skill.image_url,
    })),
    title: each.title,
  })

  similarJobs = jobs =>
    jobs.map(each => ({
      id: each.id,
      title: each.title,
      companyLogoUrl: each.company_logo_url,
      location: each.location,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      rating: each.rating,
    }))

  getitemdetailsdata = async () => {
    this.setState({detailstatus: jobdetailstatus.loader})
    const jwt = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const method = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, method)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const formattedItemData = {
        jobDetails: this.jobDetails(data.job_details),
        similarJobs: this.similarJobs(data.similar_jobs),
      }
      this.setState({
        itemdetailslist: formattedItemData,
        detailstatus: jobdetailstatus.success,
      })
    } else {
      this.setState({detailstatus: jobdetailstatus.fail})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderitemfailView = () => (
    <div className="job-fail-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="itemfailimg"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getitemdetailsdata}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {itemdetailslist} = this.state
    const {jobDetails = {}, similarJobs = []} = itemdetailslist
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
      lifeAtCompany,
      skills,
      jobDescription,
    } = jobDetails
    return (
      <div className="jobitemDetails-cont">
        <div className="company-details">
          <div className="about-company">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1>{title}</h1>
              <div className="rating-container">
                <IoIosStar className="star-icon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-type">
            <div className="location-employment-type">
              <div>
                <MdLocationOn className="jdlocation-icon" />
                <p>{location}</p>
              </div>
              <div>
                <BsFillBriefcaseFill className="jdlocation-icon" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-cont">
            <h1>Description</h1>
            <a href={companyWebsiteUrl} className="visit">
              <p>Visit</p>
              <FiExternalLink />
            </a>
          </div>
          <p>{jobDescription}</p>
          <div className="skills-cont">
            <h1>Skills</h1>
            <ul className="skills-ul">
              {(skills || []).map(each => (
                <li key={each.name} className="skills-li">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skills-img"
                  />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company">
            <h1>Life at Company</h1>
            <div className="life-at-company-des">
              <div>
                <p>{lifeAtCompany ? lifeAtCompany.description : ''}</p>
              </div>
              <img
                src={lifeAtCompany ? lifeAtCompany.imageUrl : ''}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul className="similar-url">
            {similarJobs.map(each => (
              <SimilarJobs key={each.id} item={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderjobdetailswitch = () => {
    const {detailstatus} = this.state

    switch (detailstatus) {
      case jobdetailstatus.success:
        return this.renderSuccessView()
      case jobdetailstatus.fail:
        return this.renderitemfailView()
      case jobdetailstatus.loader:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderjobdetailswitch()}
      </div>
    )
  }
}

export default JobItemDetails
