import React from 'react'
import ReactDOM from 'react-dom'
import Form from './Form'
import ProductsList from './ProductsList'
import ProductData from '../data/products.json'

ReactDOM.render(
  (
    <div>
      <ProductsList items={ProductData} />
    </div>
  ),
  document.getElementById('root')
)