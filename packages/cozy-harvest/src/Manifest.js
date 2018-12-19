export const legacyLoginFields = [
  'login',
  'identifier',
  'new_identifier',
  'email'
]

export const roleShouldBeRequired = ['identifier', 'password']

export const legacyEncryptedFields = [
  'secret',
  'dob',
  'code',
  'answer',
  'access_token',
  'refresh_token',
  'appSecret'
]

export const Manifest = {
  sanitize: manifest => {
    if (!manifest.fields) return manifest
    manifest = Manifest.sanitizeIdentifier(manifest)
    manifest = Manifest.sanitizeIsRequired(manifest)
    manifest = Manifest.sanitizeEncrypted(manifest)
    return manifest
  },

  sanitizeIdentifier: manifest => {
    for (let fieldName in manifest.fields)
      if (manifest.fields[fieldName].role === 'identifier') return manifest

    for (let name of legacyLoginFields)
      if (manifest.fields[name]) {
        manifest.fields[name].role = 'identifier'
        return manifest
      }

    for (let fieldName in manifest.fields)
      if (fieldName !== 'password')
        manifest.fields[fieldName].role = 'identifier'

    return manifest
  },

  sanitizeIsRequired: manifest => {
    for (let fieldName in manifest.fields)
      if (typeof manifest.fields[fieldName].required != 'boolean')
        manifest.fields[fieldName].required = true

    return manifest
  },

  sanitizeEncrypted: manifest => {
    for (let fieldName in manifest.fields)
      if (legacyEncryptedFields.includes(fieldName))
        manifest.fields[fieldName].encrypted = true

    return manifest
  }
}

export default Manifest
