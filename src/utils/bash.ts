import { spawn } from 'child_process'

export default function bash(command: string) {
  return new Promise<void>((resolve, reject): void => {
    const process = spawn('bash')
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
