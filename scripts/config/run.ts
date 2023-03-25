import { execSync } from 'child_process'

const scriptName = process.argv[2]
execSync(`ts-node ./scripts/${scriptName}`, { stdio: 'inherit' })
