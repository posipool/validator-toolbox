import bash from '../bash'
import fs from 'fs'

export default class CLI {
  constructor(private config: Validator.CliConfig) {}

  async download() {
    console.log('Start download CLI tool')
    await bash(`curl -LO ${this.config.cliDownloadUrl}`)
    await bash(`mv ${this.config.cliDownloadUrl.split('/').pop()} ${this.config.cliName}`)
    await bash(`chmod +x ${this.config.cliName}`)
    console.log('Download CLI tool finished!')
  }

  async createBlsKeys(quantity: number, shard: number) {
    await bash(`mkdir -p .${this.config.cliName}/blskeys`)
    for (let _ of Array(quantity)) {
      await bash(
        `./${this.config.cliName} keys generate-bls-key --shard ${shard} --passphrase-file ./blskeysPassphrase.txt`,
      )
    }
    const blskeys = fs
      .readdirSync(`.${this.config.cliName}/blskeys`, { encoding: 'utf8' })
      .filter((blskey) => blskey.includes('.key'))

    for (let blskey of blskeys) {
      await bash(`echo -n ${process.env.BLS_KEY_PASSPHRASE} > test.txt`)
      console.log(blskey)
    }
  }

  async checkBlsShard(blskey: string) {
    console.log(`./${this.config.cliName} --node=${this.config.rpc} utility shard-for-bls ${blskey}`)
    await bash(`./${this.config.cliName} --node=${this.config.rpc} utility shard-for-bls ${blskey}`)
  }

  async syncBlockchain() {
    await bash(`curl https://rclone.org/install.sh | sudo bash`)
    await bash(this.config.rcloneConfig)
    await bash(this.config.rcloneSyncCommand)
  }

  async blockchainSize() {
    await bash('du -h posichain_db_*')
  }
}
