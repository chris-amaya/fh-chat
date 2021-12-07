import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_KEY: jwt.Secret
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
