export const legacyLoginFields = ['login','identifier','new_identifier','email']

export const roleShouldBeRequired = ['identifier','password']

export const legacyEncryptedFields = ["secret", "dob", "code", "answer", "access_token", "refresh_token", "appSecret"]

export const Manifest = {
  sanitize : ( manifest ) => {
    if( ! manifest.fields ) return manifest
    manifest = Manifest.sanitizeIdentifier(manifest)
    return manifest
  },
  
  sanitizeIdentifier : ( manifest ) => {
    for(let inp in manifest.fields )
      if( manifest.fields[inp].role==='identifier' ) return manifest			// we have one OR MORE identifier, it's OK
  
    for( let name of legacyLoginFields )
      if( manifest.fields[name] ){
        manifest.fields[name].role = 'identifier'
        return manifest
      }
  
    for(let inp in manifest.fields )
      if( inp!=='password' ) manifest.fields[inp].role = 'identifier'
  
    return manifest
  },
  
  sanitizeIsRequired : ( manifest ) => {
    for( let inp in manifest.fields )
      if( roleShouldBeRequired.indexOf(manifest.fields[inp].role) >-1 ) manifest.fields[inp].isRequired = true

    return manifest
  },
  
  sanitizeEncrypted : ( manifest ) => {
    for( let inp in manifest.fields )
      if( legacyEncryptedFields.indexOf(inp) >-1 ) manifest.fields[inp].encrypted = true

    return manifest
  }
}

export default Manifest
