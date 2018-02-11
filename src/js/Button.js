import React from 'react'
import PermissionsApi from './PermissionsApi'

class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  getPermission(action) {
    return PermissionsApi.isAllowed(action)
    .then(isAllowed => {
      console.log(`Permission granted for ${action} action`)  
    })
  }

  render() {
    return (
      <a href="#" onClick={() => {
        this.getPermission(this.props.action)
        .then(() => {
          return this.props.onPermissionGranted()
        })
      }}>{this.props.label}</a>
    )
   
  }
}

export default Button