import React          from 'react'
import Form           from './Form'
import Button         from './Button'
import PermissionsApi from './PermissionsApi'

class ProductsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: props.items,
      // by default nothing is allowed as actions
      permissions: this.props.permissions
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

  renderForm({item, action, submitButtonValue, onSubmitClick}) {
    if (action === undefined) {
      throw Error(`Please provide action to renderForm function`)
    }

    if (this.state.permissions.includes(action)) {
      return <Form item={item} submitButtonValue={submitButtonValue} onSubmitClick={onSubmitClick} />
    } else {
      return ''
    }
  }

  renderButton({action, label, onPermissionGranted}) {
    if (this.state.permissions.includes(action)) {
      return <Button
              action={action}
              label={label}
              onPermissionGranted={onPermissionGranted}
              />
    } else {
      return ''
    }
  }

  render() {
    console.log('state permissions:', this.state.permissions)
    if (!this.state.permissions.includes('read')) {
      return 'You have no permissions to view this feature'
    }

    let items = this.state.items.map((x, i) => {
      let itemContent = null
      if (!x.isEditing) {
        itemContent = (
          <tr>
            <td>{x.name}</td>
            <td>{x.price}</td>
            <td>{x.currency}</td>
            <td>
              {this.renderButton({
                action: 'update',
                label: 'Edit',
                onPermissionGranted: this.markItemForEditting.bind(this, i)
              })}
            </td>

            <td>
              {this.renderButton({
                action: 'delete',
                label: 'Remove',
                onPermissionGranted: this.removeItem.bind(this, i)
              })}
            </td>
          </tr>
        )
      } else {
        itemContent = (
          <td colSpan="5">
            {this.renderForm({
              submitButtonValue: 'Save',
              // use this action to check if the form is allowed to be shown
              action: 'update',
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
            action: 'create',
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