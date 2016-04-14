import ReactDOM from 'react-dom';
import React from 'react';
import Joi from 'joi';
import Form from './components/Form.jsx';

//Define our validation Schema
const schema = Joi.object().keys({
  firstName: Joi.string().required().label('First Name'),
  userId: Joi.string().required().label('Id'),
  confirmUserId: Joi.string().valid(Joi.ref('userId')).options({
    language: {
      any: {
        allowOnly: 'don\'t match',
      },
    },
  }).required().label('Confirm User Id'),
});

ReactDOM.render(<Form schema={ schema } />, document.getElementById('container'));
