import React from 'react'

// mock the fetch API
let oldFetchApi = fetch

fetch = function(url) {
  // the fetch API is a promise, so we should implement the same functionality
  // but since we have to mock it as successfull we could just return promise.resolve()
  return Promise.resolve({ok: 1})
}

class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  getPermission(action) {
    return fetch(`/check-action-permission/${action}`)
    .then((data) => {
      if (data.ok === 1) {
        console.log(`Permission granted for ${action} action`)
      }
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