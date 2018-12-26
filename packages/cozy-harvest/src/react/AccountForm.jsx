import Field from 'cozy-ui/react/Field'
import { Button } from 'cozy-ui/react/Button'
import { translate } from 'cozy-ui/react/I18n'

import React, { PureComponent } from 'react'
import { Form , Field as FinalFormFied } from 'react-final-form'

const required = value => (value ? undefined : "Required") ;

/* Afficher la liste de fields */
class AccountFields extends PureComponent {
  render() {
    // eslint-disable-next-line no-console
    console.log(' IN AccountFields Render !!! ')
    const { manifestFields } = props.manifestFields
    return (
      <div>
        { Object.keys(manifestFields).map(fieldName => {
          const field = manifestFields[fieldName] ;
          return <FinalFormFied name={fieldName} >
            {({ input, meta })=>(
              <Field label={field.label} placeholder={field.placeholder} type={field.type}  {...input} />
            )}
          </FinalFormFied>
        })}
      </div>
    )
  }
}


/* But : affiche ce qui enveloppe les fields ( et les fields dedans ) */
export class AccountForm extends PureComponent {
  render() {
    // eslint-disable-next-line no-console
    console.log(' IN AccountForm Render !!! ')
    const { fields } = this.props ;
    return (
      <Form onSubmit={v=>console.log(v)} render={({ handleSubmit, form, submitting, pristine, values })=>(
        <div>
          <H1>PLOOP</H1>
          <AccountFields manifestFields={fields} />
          <Button onclick={()=>alert(JSON.stringify(values, 0, 2))} >ALERT </Button>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </div>
      )} />
    )
  }
}

export default AccountForm




