import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtecterRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (!jwtToken) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtecterRoute
