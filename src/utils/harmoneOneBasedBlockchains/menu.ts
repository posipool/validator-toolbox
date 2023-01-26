import inquirer from 'inquirer'
import serviceTypeIncluded from './serviceTypeIsIncluded'

export default async function menu() {
  const allServices = [
    'Setup new node',
    'Start node',
    'create new blskeys',
    'Update node version',
    'Update cli version',
    'Check shard from blskey',
    'Check node version',
    'Check cli version',
  ]

  return await inquirer
    .prompt<harmonyOneBasedAnswers>([
      {
        type: 'list',
        name: 'service',
        message: 'What do you want to do?',
        choices: allServices,
      },
      {
        type: 'list',
        name: 'environment',
        message: 'Choose the environmnet',
        choices: ['testnet', 'mainnet'],
        when(answers) {
          const services = ['Start new node']
          return serviceTypeIncluded(services, answers.service)
        },
      },
      {
        type: 'number',
        name: 'blskeyQuantity',
        message: 'Enter the amount of blskey to be created:',
        when(answers) {
          const services = ['Start new node', 'create new blskeys']
          return serviceTypeIncluded(services, answers.service)
        },
      },
      {
        type: 'password',
        name: 'passphrase',
        message: 'Set the blskeys passphrase',
        when(answers) {
          const services = ['Start new node', 'create new blskeys']
          return serviceTypeIncluded(services, answers.service) && answers.blskeyQuantity > 0
        },
      },
      {
        type: 'input',
        name: 'blskey',
        message: 'Enter the bls key:',
        when(answers) {
          const services = ['Check shard from blskey']
          return serviceTypeIncluded(services, answers.service)
        },
      },
    ])
    .then((answers) => {
      process.env.BLS_KEY_PASSPHRASE = answers.passphrase
      process.env.BLOCKCHAIN_ENVIRONMENT = answers.environment
      return answers
    })
}
