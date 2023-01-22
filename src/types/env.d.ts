declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BLOCKCHAIN_ENVIRONMENT: 'testnet' | 'mainnet'
      BLS_KEY_PASSPHRASE: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
