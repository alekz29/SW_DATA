import {
    connectionFromArray,
    connectionArgs,
    connectionDefinitions,
} from 'graphql-relay';

import {getObjectsFromUrls} from './apiHelper';

import {GraphQLList} from 'graphql';


export function connectionFromUrls(name, prop, type) {
    const {connectionType} = connectionDefinitions({
        name,
        nodeType: type,
        resolveNode: edge => edge.node,
        connectionFields: () => ({
            [prop]: {
                type: new GraphQLList(type),
                resolve: conn => getObjectsFromUrls(conn.edges.map(edge => edge.node)),
            },
        }),
    });
    return {
        type: connectionType,
        args: connectionArgs,
        resolve: async (obj, args) => {
            const array = await getObjectsFromUrls(obj[prop] || []);
            return {
                ...connectionFromArray(array, args),
            };
        },
    };
}