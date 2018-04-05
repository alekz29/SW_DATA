import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import schema from './data/index';
import compiler from './config'
import {loaders} from "./data/apiHelper";


export const BASE_URL = 'https://swapi.co/api'
const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;


const graphQLServer = express();

graphQLServer.use('/', graphQLHTTP(req => {
    return {
        context: {loaders},
        schema: schema,
        graphiql: true,
    }
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));


const app = new WebpackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
    publicPath: '/dist/',
    stats: {colors: true},
});

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
});

