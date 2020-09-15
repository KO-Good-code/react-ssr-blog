
import Koa from 'koa';
import React from 'react';
import Router from 'koa-router';
import fs from 'fs';
import koaStatic from 'koa-static';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import routes from '../src/router'
import { renderToString } from 'react-dom/server';
const App = require('../src/App');

const config = {
  port: 3030
};

const app = new Koa();

app.use(
  koaStatic(path.join(__dirname, '../build'), {
    maxage: 365 * 24 * 60 * 1000,
    index: 'root'
  })
)

app.use(
  new Router()
    .get('*', async (ctx, next) => {
      ctx.response.type = 'html';
      let html = '';
      await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, '../build/index.html'), 'utf-8', (err, data) => {
          if(err){
            reject(err);
            return false
          }
          html = data
          resolve()
        })
      })
      const branch = matchRoutes(routes, ctx.path);
      const promises = branch.map(({route}) => {
        const fetch = route.component.loadData;
        return fetch instanceof Function ? fetch(ctx.query.id) : Promise.resolve(null);
      });
      
      const data = await Promise.all(promises)
      
      let initState = {};
      data.forEach(i => {
        Object.assign(initState, i)
      })
      const Ssr = () => <StaticRouter location={ctx.path}><App content={initState} /></StaticRouter>
      html = html.replace('{{root}}', renderToString(<Ssr/>))
      .replace("%data%", JSON.stringify(initState))
      .replace("{{title}}", initState.title)
      .replace("{{keywords}}", initState.keywords)
      .replace("{{description}}", initState.description);
      ctx.body = html
    })
    .routes()
)

app.listen(config.port, () => {
  console.log('服务器启动，监听 port： ' + config.port + '  running~')
})