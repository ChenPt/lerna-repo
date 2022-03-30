#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { generateDetail } from '../template/Detail/index';

const program = new Command();


function inquirerDemo() {
  inquirer
    .prompt([
      {
        type: 'rawlist',
        message: 'Select toppings',
        name: 'toppings',
        choices: [
          new inquirer.Separator(' = The Meats = '),
          {
            name: 'Pepperoni',
          },
          {
            name: 'Ham',
          },
          {
            name: 'Ground Meat',
          },
          {
            name: 'Bacon',
          },
          new inquirer.Separator(' = The Cheeses = '),
          {
            name: 'Mozzarella',
            checked: true,
          },
          {
            name: 'Cheddar',
          },
          {
            name: 'Parmesan',
          },
          new inquirer.Separator(' = The usual ='),
          {
            name: 'Mushroom',
          },
          {
            name: 'Tomato',
          },
          new inquirer.Separator(' = The extras = '),
          {
            name: 'Pineapple',
          },
          {
            name: 'Olives',
            disabled: 'out of stock',
          },
          {
            name: 'Extra cheese',
          },
        ],
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one topping.';
          }

          return true;
        },
      },
      {
        type: 'input',
      }
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, '  '));
    });
}

function generateDetailFile(props: { name: string }) {
  return generateDetail(props);
}

program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name(), // Just show the name, instead of short usage.
});

program
  .command('test', { isDefault: true })
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program
  .command('update-conf', { hidden: false })
  .description('修改config')
  .option('-p, --plugin', '指定plugin名称')
  .action(async (options: { plugin: string }) => {});

program
  .command('delete-conf', { hidden: false })
  .description('删除指定的配置')
  .option('-r, --resId', 'CBA资源路径')
  .action(async (options: { resId: string }) => {
    inquirerDemo();
  });

program
  .command('detail', { hidden: false })
  .description('生成文件')
  .option('-n, --name <name>', 'name定义')
  .action(async (options: { name: string }) => {
    try {
      console.log('generate detail done', options);
      console.log('dirname', path.join(__dirname, '../template/Detail/index.tsx'));
      const data = generateDetailFile(options);
      await fs.createFile('./Detail/index.tsx');
      fs.writeFile(path.join('./', 'Detail/index.tsx'), data);
    } catch (error) {
      console.log(error);
    }
  });

program.parse(process.argv);
