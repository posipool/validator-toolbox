namespace Validator {
  interface NodeConfig {
    binaryDownloadUrl: string
    binaryName: string
  }

  interface CliConfig {
    cliDownloadUrl: string
    cliName: string
    rpc: string
    rcloneConfig: string
    rcloneSyncCommand: string
  }
}

interface Dict<T> {
  [Key: string]: string | undefined
}

type harmonyOneBasedAnswers = {
  environment: 'mainnet' | 'testnet'
  passphrase: string
  service: string
  blskey: string
}

type BlsKey = {
  'hex-address': string
  'shard-id': number
  'public-key': string
  'encrypted-private-key': string
}
