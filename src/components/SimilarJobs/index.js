import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {item} = props
  const {
    id,
    title,
    companyLogoUrl,
    location,
    employmentType,
    jobDescription,
    rating,
  } = item
  return (
    <li className="SimilarJobs-cont">
      <div className="about-company">
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h1>{title}</h1>
          <div className="rating-container">
            <IoIosStar className="star-icon" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-description-cont">
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
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
    </li>
  )
}

export default SimilarJobs
