import React from 'react';
import MaskedInput from 'react-input-mask';

class BlurInput extends React.Component {

  isIdBlurred = () => this.props.isBlurred && !this.props.validationMessage;

  render() {
    if (!this.isIdBlurred()) {
      return (
        <div className={this.props.className}>
          <label className="control-label">ID</label>
          <MaskedInput type="text" className="form-control"
                 value={this.props.value}
                 name={this.props.field}
                 onChange={this.props.onChange}
                 onBlur={this.props.onBlur}
                 onFocus={this.props.onFocus}
                 mask="***-99-aaaa"
                 maskChar=" "
          />
          {this.props.validationMessage}
        </div>
      )} else {
        return (
        <div className={this.props.className}>
          <label className="control-label">ID</label>
          <input type="text" className="form-control" readOnly="true" value="***********" />
          {this.props.validationMessage}
        </div>
        )}
    }
}

export default BlurInput;