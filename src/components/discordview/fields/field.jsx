import React from 'react'
import onClickOutside from 'react-onclickoutside'

class EmbedField extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdited: true
    }
  }

  handleClickOutside = ev => {
    if (this.state.isEdited && this.props.name.length > 0 && this.props.value.length > 0) {
      this.setState({ isEdited: false })
    }
  }

  renderFieldName () {
    return <div
    className="embed-field-name">
    {this.state.isEdited
      ? <textarea
      style={{ height: '47px' }}
      maxLength="256"
      type="text"
      key="name"
      placeholder="Field Title:"
      value={this.props.name}
      onChange={(ev) => this.props.onUpdate(this.props.index, { name: ev.target.value }, this.props.findex)}/>
      : this.props.parsedName}
    </div>
  }

  renderFieldValue () {
    return <div
      className="embed-field-value markup">
    {this.state.isEdited
      ? <textarea
      style={{ height: '47px' }}
      maxLength="1024"
      type="text"
      key="value"
      placeholder="Field Text:"
      value={this.props.value}
      onChange={(ev) => this.props.onUpdate(this.props.index, { value: ev.target.value }, this.props.findex)}/>
      : this.props.parsedValue}
    </div>
  }

  render () {
    const cls = 'embed-field' + (this.props.inline ? ' embed-field-inline' : '')

    return <div
    className={cls}>
      <div
      onClick={() => this.setState({ isEdited: true })}>
        {this.renderFieldName()}
        {this.renderFieldValue()}
      </div>
      <div className='buttons'>
        <input
          type="checkbox"
          defaultChecked={true}
          onClick={(ev) => this.props.onUpdate(this.props.index, { inline: ev.target.checked }, this.props.findex)}>
        </input>
        <span>Inline</span>
        <button
          onClick={() => this.props.onRemove(this.props.index, this.props.findex)}>
          Remove
        </button>
      </div>
    </div>
  }
}

export default onClickOutside(EmbedField)
