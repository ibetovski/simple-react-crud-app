import React from 'react'

class Form extends React.Component {

  constructor(props) {
    super()

    this.setDefaultState(props.item)

    // avoids losing this because of passing a direct reference of the function
    // to the event
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setDefaultState(item) {
    this.state = item || {
      name: '',
      price: '',
      currency: ''
    }
  }

  handleSubmit(event) {
    // prevent page redirect.
    this.props.onSubmitClick(this.state)
    // and clear the state of the form
    this.setDefaultState()
    this.setState(this.state)
    event.preventDefault()
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  /**
   * Use to render input field with label before it.
   * @param  {String} options.label The label before the field
   * @param  {String} options.key   Property name to be used in the state
   * @return {Object}               A react component
   */
  renderField({label, key}) {
    return (
      <div>
        <label htmlFor="{key}">{label}:</label>
        <input
          type="text"
          id={key}
          value={this.state[key]}
          onChange={(event) => {
            this.handleChange(key, event.target.value)
          }}
        />
      </div>
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        {this.renderField({label: 'Name',     key: 'name'})}
        {this.renderField({label: 'Price',    key: 'price'})}
        {this.renderField({label: 'Currency', key: 'currency'})}

        <button type="submit">{this.props.submitButtonValue}</button>
      </form>
    )
  }
}

export default Form