import bash from '../bash'
import fs from 'fs'
import path from 'path'
import os from 'os'

export default class Tools {
  constructor(private config: Validator.ToolConfig) {}

  async downloadCli() {
    console.log('Start download CLI tool')
    const cliname = this.config.cliName
    await bash(`curl ${this.config.cliDownloadUrl} -o ${cliname}`)
    await bash(`chmod +x ${cliname}`)
    console.log('Download CLI tool finished!')
  }  

  async checkCliversion() {
    await bash(`./${this.config.cliName} version`)
  }

  async updateCli(){
    console.log('Current version:')
    await this.checkCliversion()
    await bash('mkdir -p backup')
    await bash(`mv ${this.config.cliName} backup`)
    await this.downloadCli()
    console.log('Updated version:')
    await this.checkCliversion()
  }

  async configNodeValidator() {
    const networkEnvironment = process.env.BLOCKCHAIN_ENVIRONMENT
    await bash(`./${this.config.nodeName} config dump --network ${networkEnvironment} ${this.config.nodeName}.conf`)
    console.log('Node config file generated!')
  }

  async startNode() {
    await bash(`./${this.config.nodeName} -c ${this.config.nodeName}.conf`)
  }

  async downloadNodeBinary() {
    console.log('Start download node binary')
    const nodeName = this.config.nodeName
    await bash(`curl ${this.config.nodeDownloadUrl} -o ${nodeName}`)
    await bash(`chmod +x ${nodeName}`)
    console.log('Download node binary finished!')
  }

  async checkNodeVersion() {
    await bash(`./${this.config.nodeName} -V`)
  }

  async createBlsKeys(quantity: number, shard: number) {
    const passphrase = process.env.BLS_KEY_PASSPHRASE
    const cliname = this.config.cliName
    await bash(`echo -n '${passphrase}' > blskeysPassphrase.txt`)
    await bash(`./${cliname} keys generate-bls-keys --count ${quantity} --shard ${shard} --passphrase-file ./blskeysPassphrase.txt`)
    await bash(`mkdir -p .${cliname}/blskeys`)
    await bash(`mv *.key .${cliname}/blskeys`)
    const blsFiles = fs.readdirSync(`${path.dirname(process.cwd())}/.${cliname}/blskeys`, { encoding: 'utf8' })
    const blskeyFiles = blsFiles.filter((blskeyFile) => blskeyFile.includes('.key'))
    const blsFilePasswords = blsFiles.filter((blspassFile) => blspassFile.includes('.pass'))
    for (const blskeyFile of blskeyFiles){
        const blskey = blskeyFile.replace('.key', '')
        if(blskeyFile.includes('.key') && !blsFilePasswords.includes(`${blskey}.pass`)){
          bash(`echo -n ${passphrase} > .${cliname}/blskeys/${blskey}.pass`)
        }
    }
  }

  async checkBlsShard(blskey: string) {
    console.log(`./${this.config.cliName} --node=${this.config.rpc} utility shard-for-bls ${blskey}`)
    await bash(`./${this.config.cliName} --node=${this.config.rpc} utility shard-for-bls ${blskey}`)
  }

  async syncBlockchain() {
    await bash(`curl https://rclone.org/install.sh | sudo bash`)
    await bash(`mkdir -p ${os.homedir()}/.config/rclone`)
    await bash(this.config.rcloneConfig)
    await bash(this.config.rcloneSyncCommand)
  }

  async blockchainSize() {
    await bash('du -h posichain_db_*')
  }
}
