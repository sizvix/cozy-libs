import React, { PureComponent } from 'react'
import { Form , Field } from 'react-final-form'

//export { default as AccountForm } from './react/AccountForm'
import AccountForm from './react/AccountForm'

export class Harvest extends PureComponent {
  render() {
      return <AccountForm manifestFields={{'login':{type:'text'},'plop':{type:'password'} }} />
/*    return (
      <Form onSubmit={v=>console.log(v)} render={({ handleSubmit, form, submitting, pristine, values })=>(
        <div>
          <Field name="firstName" component="input" placeholder="First Name" />
          <Field name="interests" component={<input type="password" />} />
          <Field
            name="bio"
            render={({ input, meta }) => (
              <div>
                <label>Bio</label>
                <textarea {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          />
          <Field name="phone">
            {({ input, meta }) => (
              <div>
                <label>Phone</label>
                <input type="text" {...input} placeholder="Phone" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </div>
      )} />
    )	*/
  }
}

export default {
  Harvest,
  AccountForm
}
