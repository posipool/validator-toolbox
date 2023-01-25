import config from './config'
import validatorTools from '../../utils/harmoneOneBasedBlockchains'

export default async function posichain() {
  config.setBlockchainEnvironment(process.env.BLOCKCHAIN_ENVIRONMENT)
  await validatorTools(config)
}
