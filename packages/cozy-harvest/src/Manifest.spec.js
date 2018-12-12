/* eslint-env jest */ 
import {legacyLoginFields, legacyEncryptedFields, Manifest} from './Manifest'

describe('Manifest', ()=>{
  describe('sanitize', ()=>{

    it('shouldn\'t modify if fields is null', ()=>{
      const input0 = {
        fields: null
      }
      const result = Manifest.sanitize( input0 ) 
      expect( result.fields ).toBe( null); 
    })

  })

  describe('sanitizeIdentifier', ()=>{

    it('should set role=identifier for login', ()=>{
      const input1 = {
        fields:{
          login: { type:'text' },
          password: { type:'password' }
        }
      }
      const result = Manifest.sanitizeIdentifier( input1 ) 
      expect( result.fields.login.role ).toBe( 'identifier' ); 
    })

    it('should set role=identifier without login field', ()=>{
      const input1 = {
        fields:{
          password: { type:'password' },
          plop: { type:'text' }
        }
      }
      const result = Manifest.sanitizeIdentifier( input1 ) 
      expect( result.fields.plop.role ).toBe( 'identifier' ); 
    })

    for(let name of legacyLoginFields){
      let inputLegacy = {
        fields: {
          password: { type:'password' },
          plop: { type:'text' }
        }
      }
      inputLegacy.fields[name] = { type:'text' }
      it('should set role=identifier to '+name, ()=>{
        const result = Manifest.sanitizeIdentifier( inputLegacy ) 
        expect( result.fields[name].role ).toBe( 'identifier' ); 
      })
    }

  })

  describe('sanitizeIsRequired', ()=>{

    it('should set isRequired=true for role=identifier', ()=>{
      const input1 = {
        fields:{
          login: { type:'text', role:'identifier' },
          password: { type:'password' }
        }
      }
      const result = Manifest.sanitizeIsRequired( input1 ) 
      expect( result.fields.login.isRequired ).toBe( true ); 
    })

    it('should set isRequired=true for role=password', ()=>{
      const input1 = {
        fields:{
          login: { type:'text', role:'identifier' },
          password: { type:'password', role:'password'}
        }
      }
      const result = Manifest.sanitizeIsRequired( input1 ) 
      expect( result.fields.password.isRequired ).toBe( true ); 
    })

  })

  describe('sanitizeEncrypted', ()=>{

    for(let name of legacyEncryptedFields){
      let inputLegacy = {
        fields: {
          password: { type:'password' },
          plop: { type:'text' }
        }
      }
      inputLegacy.fields[name] = { type:'text' }
      it('should set encrypted=true to '+name, ()=>{
        const result = Manifest.sanitizeEncrypted( inputLegacy ) 
        expect( result.fields[name].encrypted ).toBe( true ); 
      })
    }

  })
})
