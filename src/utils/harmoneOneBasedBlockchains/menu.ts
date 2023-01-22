import inquirer from 'inquirer'

export default async function menu() {
  const allServices = [
    'Start new node',
    'create new blskeys',
    'Check shard from blskey',
    'Update node version',
    'Update cli version',
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
      },
      {
        type: 'number',
        name: 'blskeyQuantity',
        message: 'Enter the amount of blskey to be created:',
        when(answers) {
          return answers.service != 'Check shard from blskey'
        },
      },
      {
        type: 'password',
        name: 'passphrase',
        message: 'Set the blskeys passphrase',
        when(answers) {
          return answers.service != 'Check shard from blskey' || answers.blskeyQuantity > 0
        },
      },
    ])
    .then((answers) => {
      process.env.BLS_KEY_PASSPHRASE = answers.passphrase
      process.env.BLOCKCHAIN_ENVIRONMENT = answers.environment
      return answers
    })
}
