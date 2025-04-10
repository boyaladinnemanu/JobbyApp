import {Link} from 'react-router-dom'
import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = item
  return (
    <Link to={`/jobs/${id}`} className="link">
      <div className="company-details">
        <div className="about-company">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1>{title}</h1>
            <div>
              <IoIosStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-type">
          <div className="location-employment-type">
            <div>
              <MdLocationOn className="loaction-icon" />
              <p>{location}</p>
            </div>
            <div>
              <BsFillBriefcaseFill className="loaction-icon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <h1>{packagePerAnnum}</h1>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobItem
