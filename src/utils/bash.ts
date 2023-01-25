import { spawn } from 'child_process'
import { cwd } from 'process'
import path from 'path'

export default function bash(command: string) {
  return new Promise<void>((resolve, reject): void => {
    const process = spawn('bash',{cwd: path.dirname(cwd())})
    process.stdin.write(command + '\n')
    process.stdin.end()

    process.stdout.on('data', (data) => {
      console.log(`${data}`)
    })

    process.stderr.on('data', (data) => {
      console.log(`${data}`)
    })

    process.on('close', () => {
      resolve()
    })

    process.on('error', (err) => {
      reject(err)
    })
  })
}
