import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} from 'graphql';
import {
    fromGlobalId,
    connectionFromArray,
    connectionArgs,
    connectionDefinitions,
} from 'graphql-relay';
import {swapiTypeToGraphQLType, nodeField} from './relayNode';
import {getObject, getObjectsByType} from './apiHelper'


function rootFieldByID(idName, swapiType) {
    const args = {};
    args.id = {type: GraphQLID};
    args[idName] = {type: GraphQLID};
    return {
        type: swapiTypeToGraphQLType(swapiType),
        args: args,
        resolve: (root, args, {loaders}) => {
            if (args[idName] !== undefined && args[idName] !== null) {
                return getObject(root, loaders, swapiType, args);
            }

            if (args.id !== undefined && args.id !== null) {
                const globalId = fromGlobalId(args.id);
                if (
                    globalId.id === null ||
                    globalId.id === undefined ||
                    globalId.id === ''
                ) {
                    throw new Error('No valid ID extracted from ' + args.id);
                }
                return getObject(root, {loaders}, swapiType, globalId, false);
            }
            throw new Error('must provide id or ' + idName);
        },
    };
}

function rootConnection(name, swapiType) {
    const graphqlType = swapiTypeToGraphQLType(swapiType);
    const {connectionType} = connectionDefinitions({
        name,
        nodeType: graphqlType,
        connectionFields: () => ({
            totalCount:{
                type:GraphQLInt,
                resolve:conn =>conn.totalCount,
            },
            [swapiType]: {
                type: new GraphQLList(graphqlType),
                resolve: conn => conn.edges.map(edge => edge.node),
            },
        }),
    });
    return {
        type: connectionType,
        args: connectionArgs,
        resolve: async (_,args) => {
            const {objects,totalCount} = await getObjectsByType(swapiType);
            return {
                ...connectionFromArray(objects, args),
                totalCount,
            };
        },
    };
}


const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
        allFilms: rootConnection('Films', 'films'),
        film: rootFieldByID('filmID', 'films'),
        allPeople: rootConnection('People', 'people'),
        person: rootFieldByID('personID', 'people'),
        allPlanets: rootConnection('Planets', 'planets'),
        planet: rootFieldByID('planetID', 'planets'),
        node: nodeField,
    })
})

export default new GraphQLSchema({
    query: QueryType
})