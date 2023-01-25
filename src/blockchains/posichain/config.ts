import os from 'os'

export const config: Validator.ToolConfig = {
  nodeDownloadUrl: 'curl -LO https://download.posichain.org/latest/posichain && chmod +x posichain',
  nodeName: 'posichain',
  cliDownloadUrl: `https://download.posichain.org/latest/psc`,
  cliName: 'psc',
  rpc: '',
  rcloneSyncCommand: '',
  rcloneConfig: `
  cat<<-EOF > ${os.homedir()}/.config/rclone/rclone.conf
  [mainnet]
  type = google cloud storage
  object_acl = publicRead
  bucket_acl = publicRead
  location = eu
  storage_class = MULTI_REGIONAL
  anonymous = true

  [testnet]
  type = google cloud storage
  object_acl = publicRead
  bucket_acl = publicRead
  location = asia
  storage_class = MULTI_REGIONAL
  anonymous = true
  EOF
`,
  setBlockchainEnvironment(environment) {
    if (environment) {
      this.rpc = 'https://api.posichain.org'
      this.rcloneSyncCommand =
        'rclone -P -L --checksum sync mainnet:posichain-mainnet-data/posichain-node-vo001/posichain_db_0 posichain_db_0 --multi-thread-streams 4 --transfers=32'
    } else {
      this.rpc = 'https://api.s0.t.posichain.org'
      this.rcloneSyncCommand =
        'rclone -P -L --checksum sync testnet:posichain-nonprod-data/posichain-testnet-node-v001/posichain_db_0 posichain_db_0 --multi-thread-streams 4 --transfers=32'
    }
  },
}

export default config
