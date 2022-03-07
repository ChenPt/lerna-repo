#!/usr/bin/env node

import chalk from 'chalk'
import { Command } from 'commander'
import Inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import { generateDetail } from '../template/Detail/index';

const program = new Command()

function generateDetailFile (props: {name: string}) {
  return generateDetail(props)
}

program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name(), // Just show the name, instead of short usage.
})

program
  .command('test', { isDefault: true })
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')

program
  .command('detail', { hidden: false })
  .description('生成文件')
  .option('-n, --name <name>', 'name定义')
  .action(async (options: { name: string; }) => {
    try {
      console.log('generate detail done', options)
      console.log(
        'dirname',
        path.join(__dirname, '../template/Detail/index.tsx'),
      )
      const data = generateDetailFile(options);
      await fs.createFile('./Detail/index.tsx')
      fs.writeFile(path.join('./', 'Detail/index.tsx'), data);
    } catch (error) {
      console.log(error)
    }
  })

program.parse(process.argv)
