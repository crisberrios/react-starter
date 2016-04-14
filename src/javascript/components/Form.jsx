import React from 'react';
import {Validation, Joi} from 'react-validation-decorator';
import BlurInput from './BlurInput.jsx';

@Validation
class ValidatedForm extends React.Component {
  validationSchema = this.props.schema;
  
  state = { name: '',
    userId: ''
  };
  
  handleChange = (e) => {
    e.persist();
    var newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState, () => {
      this.validate(e.target.name);
    });
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleIdBlur = () => {
    this.setState({isIdBlurred : true});
  };
  
  handleIdFocus = () => {
    this.setState({isIdBlurred: false});
  };
  
  render() {
    return (
        <form className="form-horizontal">
          <div className={this.getValidationClassName('firstName')}>
            <label className='control-label'>First Name</label>
            <input type='text' className='form-control'
                   value={this.state.firstName}
                   name="firstName"
                   onChange={this.handleChange}/>
            {this.renderValidationMessages('firstName')}
          </div>
          <div className={this.getValidationClassName('lastName')}>
            <label className='control-label'>Last Name</label>
            <input type='text' className='form-control'
                   value={this.state.lastName}
                   name="lastName"
                   onChange={this.handleChange}/>
            {this.renderValidationMessages('lastName')}
          </div>
          <div className={this.getValidationClassName('birthDate')}>
            <label className='control-label'>Birth Date</label>
            <input type='text' className='form-control'
                   value={this.state.birthDate}
                   onChange={this.handleChange}/>
            {this.renderValidationMessages('birthDate')}
          </div>
          <BlurInput isBlurred={this.state.isIdBlurred}
                     className={this.getValidationClassName('userId')}
                     onBlur={this.handleIdBlur}
                     onFocus={this.handleIdFocus}
                     field="userId"
                     value={this.state.userId}
                     onChange={this.handleChange}
                     validationMessage={this.renderValidationMessages('userId')}
                     />
          <div className={this.getValidationClassName('confirmUserId')}>
            <label className='control-label'>Confirm ID</label>
            <input type='text' className='form-control'
                   value={this.state.confirmUserId}
                   name="confirmUserId"
                   onChange={this.handleChange}/>
            {this.renderValidationMessages('confirmUserId')}
          </div>
          <button className='btn btn-primary' onClick={this.handleSubmit}
                  disabled={!this.isDirty() || !this.isValid()}>Submit
          </button>
        </form>
    );
  }
}

export default ValidatedForm;