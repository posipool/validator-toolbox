import bash from '../bash'
import fs from 'fs'

export default class Tools {
  constructor(private config: Validator.ToolConfig) {}

  async downloadCli() {
    console.log('Start download CLI tool')
    const cliname = this.config.cliName
    await bash(`curl -LO ${this.config.cliDownloadUrl}`)
    await bash(`mv ${this.config.cliDownloadUrl.split('/').pop()} ${cliname}`)
    await bash(`chmod +x ${cliname}`)
    console.log('Download CLI tool finished!')
  }

  async downloadNodeBinary() {
    console.log('Start download node bynary')
    const nodeName = this.config.nodeName
    await bash(`curl -LO ${this.config.nodeDownloadUrl}`)
    await bash(`mv ${this.config.cliDownloadUrl.split('/').pop()} ${nodeName}`)
    await bash(`chmod +x ${nodeName}`)
    console.log('Download node bynary finished!')
  }

  async checkNodeVersion() {
    await bash(`./${this.config.nodeName} -V`)
  }

  async createBlsKeys(quantity: number, shard: number) {
    const cliname = this.config.cliName
    for (let _ of Array(quantity)) {
      await bash(`./${cliname} keys generate-bls-key --shard ${shard} --passphrase-file ./blskeysPassphrase.txt`)
    }
    await bash(`mkdir -p .${cliname}/blskeys`)
    await bash(`mv *.key .${cliname}/blskeys`)
    const blskeys = fs
      .readdirSync(`.${cliname}/blskeys`, { encoding: 'utf8' })
      .filter((blskey) => blskey.includes('.key'))

    for (let blskey of blskeys) {
      await bash(`echo -n ${process.env.BLS_KEY_PASSPHRASE} > .${cliname}/blskeys/${blskey.replace('.key', '.pass')}`)
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
