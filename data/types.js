import {GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";
import {getObject} from "./apiHelper";
import {nodeInterface} from './relayNode';
import {globalIdField} from 'graphql-relay';
import {connectionFromUrls} from './connections';

const types = {
    PersonType: new GraphQLObjectType({
        name: 'Person',
        description: '...',
        fields: () => ({
            name: {
                type: GraphQLString,
                description: 'The name of this person.',
            },
            height: {
                type: GraphQLInt,
                resolve: (person) => person.height,
            },
            id: {type: GraphQLID},
            homeworld: {
                type: types.PlanetType,
                resolve: (person, global, {loaders}) =>
                    getObject(global, loaders, '/planets/', person.homeworld, false)

            }
        })
    }),
    PlanetType: new GraphQLObjectType({
        name: 'Planet',
        description: '...',
        fields: () => ({
            name: {
                type: GraphQLString,
                description: 'The name of this planet.',
            },
        })
    }),
    FilmType: new GraphQLObjectType({
        name: 'Film',
        description: 'A single film.',
        fields: () => ({
            title: {
                type: GraphQLString,
                description: 'The title of this film.',
            },
            characterConnection: connectionFromUrls(
                'FilmCharacters',
                'characters',
                types.PersonType,
            ),
               id: globalIdField('films'),

            //   interfaces: () => [nodeInterface],
        }),
    })
}
export default types