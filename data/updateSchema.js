import path from 'path';
import  schema  from './index';
import fs from 'fs';
import { printSchema } from 'graphql';

const schemaPath = path.resolve(__dirname, 'schema.graphql');

fs.writeFileSync(schemaPath, printSchema(schema));
