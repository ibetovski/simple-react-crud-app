import React from 'react'
import Form from './Form'
import Button from './Button'


class ProductsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: props.items
    }
  }

  /**
   * Will take care for pushing new items to the list
   * @param {[type]} item [description]
   */
  addItem(item) {
    // 
    let items = this.state.items.slice()
    items.push(item)
    this.setState({items})
  }

  markItemForEditting(i) {
    let items = this.state.items.slice()
    items[i].isEditing = true
    this.setState({items})
  }

  updateItem(item, i) {
    let items = this.state.items.slice()
    items[i] = item
    // we explicitly should put we are not editing anymore.
    // Otherwise the form stays open
    items[i].isEditing = false
    this.setState({items}) 
  }

  removeItem(index) {
    let items = this.state.items.slice()
    items.splice(index, 1)
    this.setState({items})
  }

  renderForm({item, submitButtonValue, onSubmitClick}) {
    return <Form item={item} submitButtonValue={submitButtonValue} onSubmitClick={onSubmitClick} />
    // return <Form  submitButtonValue="Add" onSubmitClick={() => {}} />
  }

  render() {
    let items = this.state.items.map((x, i) => {

      let itemContent = null
      if (!x.isEditing) {
        itemContent = (
          <tr>
            <td>{x.name}</td>
            <td>{x.price}</td>
            <td>{x.currency}</td>
            <td>
              <Button
                action="edit"
                label="Edit"
                onPermissionGranted={this.markItemForEditting.bind(this, i)}
              />
            </td>

            <td>
              <Button
                action="remove"
                label="Remove"
                onPermissionGranted={this.removeItem.bind(this, i)}
              />
            </td>
          </tr>
        )
      } else {
        itemContent = (
          <td colSpan="5">
            {this.renderForm({
              submitButtonValue: 'Save',
              // this will let the form know what is the default data to render
              // in the fields.
              item: x,
              onSubmitClick: (item) => {
                console.log('item:', item, i)
                // we don't just have to update the item but we should know which item
                // to update.
                // That's why we need the index too.
                this.updateItem(item, i);
              }
             })}
          </td>
        )
      }

      return (
        <tr key={x.name}>
          {itemContent}
        </tr>
      )
    })

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>price</th>
              <th>currency</th>
              <th>edit</th>
              <th>remove</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
        <div>
          {this.renderForm({
            submitButtonValue: 'Add',
            onSubmitClick: (item) => {
              this.addItem(item);
            }
          })}
        </div>
      </div>
    )
  }
}

export default ProductsList