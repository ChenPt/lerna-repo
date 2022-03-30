import fs from 'fs-extra';
import path from 'path';
const clientPath = path.join(__dirname, './client.js');
fs.promises
  .readFile(clientPath, {
    encoding: 'utf-8',
  })
  .then((res) => {
    const reg = /antd_frame/;
    // console.log('res', eval(`tmp = ${res.replace('module.exports = ', '')}`));
    let tmp = require(clientPath);
    // tmp.routers;
    const insertRes = {
      resId: '/csm/abc/test',
      pluginName: 'abc',
    };
    console.log('res', JSON.stringify(res, undefined, 2));
    // let tmp = Function('"use strict";return (' + test + ')')();
    // tmp.routers['plugins/antd_frame/routes'].push({
    //   resId: '/csm/abc/test',
    //   pluginName: 'abc',
    // });

    // fs.promises.writeFile(
    //   clientPath,
    //   JSON.parse(JSON.stringify(res)),
    //   {
    //     encoding: 'utf-8',
    //   },
    // );
    console.log('dd', res.replace(/{\n(\x20+)('plugins\/user_login\/routes')(.|\n)+/, '$2'))
    // fs.promises.appendFile('clientPath', JSON.stringify(insertRes, undefined, 2).replace(/"(\w+)": "([\w/]+)"/g, `$1: '$2'`))
  });
  "module.exports = {\n  routers: {\n    'plugins/user_login/routes': [\n      {\n        resId: '/pages',\n        plugin: 'AntdFrame',\n      },\n      {\n        resId: '/csm/abc/test',\n        pluginName: 'abc',\n      },\n    ],\n    'plugins/antd_frame/routes': [\n      {\n        resId: '/',\n        plugin: 'HomePage',\n      },\n    ],\n  },\n};\n"
