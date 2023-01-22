import inquirer from 'inquirer'
import fs from 'fs'
import blockchainScripts from './blockchains'

const blockchains = fs
  .readdirSync('./src/blockchains', { encoding: 'utf8', withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

inquirer
  .prompt([
    {
      type: 'list',
      name: 'blockchain',
      message: 'choose the blockchain:',
      choices: blockchains,
    },
  ])
  .then(async (answers: { service: string; blockchain: keyof typeof blockchainScripts; environment: string }) => {
    // const test = `src/blockchains/${answers.blockchain}/config.ts`
    // bash(`cat ${test}`)
    await blockchainScripts[answers.blockchain]()
  })
