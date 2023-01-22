import config from './config'
import validatorTools from '../../utils/harmoneOneBasedBlockchains'

export default async function posichain() {
  await validatorTools(config)
}
