import React from 'react'
import ReactDOM from 'react-dom'
import Form from './Form'
import ProductsList from './ProductsList'
import ProductData from '../data/products.json'
import PermissionsApi from './PermissionsApi'


// Before do anything check what the user is allowed to do
// Meanwhile show a "Please wait..." message
ReactDOM.render(
  (
    <div>
      Please wait while we are checking what you are permitted to do...
    </div>
  ),
  document.getElementById('root')
)

PermissionsApi.getAllAllowedPermissions()
.then(permissions => {
  ReactDOM.render(
    (
      <div>
        <ProductsList items={ProductData} permissions={permissions}/>
      </div>
    ),
    document.getElementById('root')
  )
})