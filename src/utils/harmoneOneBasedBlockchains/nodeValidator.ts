import bash from '../bash'

export default class NodeValidator {
  constructor(private nodeConfig: Validator.NodeConfig) {}

  async downloadBinary() {
    await bash(`curl -LO ${this.nodeConfig.binaryDownloadUrl}`)
    await bash(`mv ${this.nodeConfig.binaryDownloadUrl.split('/').pop()} ${this.nodeConfig.binaryName}`)
    await bash(` chmod +x  ${this.nodeConfig.binaryName}`)
  }

  async checkNodeVersion() {
    await bash(`./${this.nodeConfig.binaryName} -V`)
  }

  async configNodeValidator() {
    await bash(
      `./${this.nodeConfig.binaryName} config dump --network ${process.env.BLOCKCHAIN_ENVIRONMENT} ${this.nodeConfig.binaryName}.conf`,
    )
  }

  async start() {
    await bash(`./${this.nodeConfig.binaryName} -c ${this.nodeConfig.binaryName}.conf`)
  }
}
