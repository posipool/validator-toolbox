namespace Validator {
  interface ToolConfig {
    nodeDownloadUrl: string
    nodeName: string
    cliDownloadUrl: string
    cliName: string
    rpc: string
    rcloneConfig: string
    rcloneSyncCommand: string
    setBlockchainEnvironment: (environment: string) => void
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
  blskeyQuantity: number
}

type BlsKey = {
  'hex-address': string
  'shard-id': number
  'public-key': string
  'encrypted-private-key': string
}
