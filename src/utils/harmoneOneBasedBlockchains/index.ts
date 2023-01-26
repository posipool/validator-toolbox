import menu from './menu'
import Tools from './tools'
import { platform } from 'os'

export default async function validatorTools(config: Validator.ToolConfig) {
  try {
    if (platform() === 'linux') {
      const answers = await menu()
      config.setBlockchainEnvironment(answers.environment)
      const tools = new Tools(config)

      switch (answers.service) {
        case 'Start new node':
          await tools.downloadCli()
          await tools.createBlsKeys(answers.blskeyQuantity, 0)
          await tools.syncBlockchain()
          await tools.downloadNodeBinary()
          await tools.configNodeValidator()
          await tools.systemSetup()
          break
        case 'create new blskeys':
          await tools.createBlsKeys(answers.blskeyQuantity, 0)
          break
        case 'Check shard from blskey':
          tools.checkBlsShard(answers.blskey)
          break
        case 'Update node version':
          console.log('Will be developed soon')
          break
        case 'Update cli version':
          tools.updateCli()
          break
        case 'Check node version':
          tools.checkNodeVersion()
          break
        case 'Check cli version':
          await tools.checkCliversion()
          break
        default:
          break
      }
    } else {
      throw new Error('It is only possible to run node posichain on linux')
    }
  } catch (error) {
    console.log(error)
  }
}
