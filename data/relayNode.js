import type {GraphQLObjectType} from 'graphql';
import {nodeDefinitions, fromGlobalId} from 'graphql-relay';
import {getObject} from "./apiHelper";
import types from './types'


export function swapiTypeToGraphQLType(swapiType: string): GraphQLObjectType {
    const FilmType = types.FilmType
    const PersonType = types.PersonType
    const PlanetType = types.PlanetType

    switch (swapiType) {
        case 'films':
            return FilmType;
        case 'people':
            return PersonType;
        case 'planets':
            return PlanetType;
        default:
            throw new Error('Unrecognized type `' + swapiType + '`.');
    }
}

const {nodeInterface, nodeField} = nodeDefinitions(
    globalId => {
        const {type, id} = fromGlobalId(globalId);
        return getObject(type, id);
    },
    obj => {
        const parts = obj.url.split('/');
        return swapiTypeToGraphQLType(parts[parts.length - 3]);
    },
);

export {nodeInterface, nodeField};