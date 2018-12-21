/*
	on nous donne un manifest, pour chaque fields
		on crée un Field ( input text & password pour le moment )
			si encrypted => value = ''
			si require => 
*/
import Field from 'cozy-ui/react/Field'

import React, { PureComponent } from 'react'
import { Form , Field as FinalFormFied } from 'react-final-form'

const required = value => (value ? undefined : "Required") ;

export class GenForm extends PureComponent {
  render(props) {
    return (
      <Form onSubmit={v=>console.log(v)} render={({ handleSubmit, form, submitting, pristine, values })=>(
        <div>
          { Object.keys(props.manifestFields).map(fieldName => {
            const fieldToGen = props.manifestFields[fieldName] ;
            if(['text','password','date'].includes( fieldToGen.type )){
              <FinalFormFied name={fieldName} >
                {({ input, meta })=>(
                  <Field label={fieldName} placeholder="First Name" type={fieldToGen.type}  {...input} />
                )}
              </FinalFormFied>
            }
          })}
          <button onclick={()=>alert(JSON.stringify(values, 0, 2))} >ALERT </button>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </div>
      )} />
    )
  }
}

export default GenForm



