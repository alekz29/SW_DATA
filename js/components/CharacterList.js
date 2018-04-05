import React, {Component} from 'react'
import {createPaginationContainer, graphql} from 'react-relay'
import Character from './Character'
import {Button} from 'react-bootstrap'

class CharactersList extends Component {

    _loadMore() {
        if (!this.props.relay.hasMore()) {
            console.log('nothing more to load')
            return
        } else if (this.props.relay.isLoading()) {
            console.log('request is already pending')
            return
        }
        this.props.relay.loadMore(10)
    }

    render() {
        return (
            <div>
                <Button className={'btn'} onClick={() => this._loadMore()}>
                    MORE
                </Button>
                <div className={'character_list'}>
                    {
                        this.props.film.characterConnection.edges.map(({node}) =>
                            <Character key={node.__id} character={node}/>)
                    }
                </div>
            </div>
        )
    }
}

export default createPaginationContainer(CharactersList,
    {
        film: graphql`
            fragment CharacterList_film on Film{
                characterConnection(
                    first:$count,
                    after:$cursor,
                ) @connection(key:"CharacterList_characterConnection",filters:[]){
                    edges{
                        node{
                            ...Character_character
                        }
                    }
                    pageInfo{
                        endCursor
                        hasNextPage
                    }
                }
            }
        `
    },
    {
        direction: 'forward',
        query: graphql`
            query CharacterListForwardQuery(
            $count: Int!,
            $cursor: String,
            $id:ID!
            ){
                film(filmID:$id){
                    ...CharacterList_film
                }
            }
        `,
        getConnectionFromProps(props) {
            return props.film && props.film.characterConnection
        },
        getFragmentVariables(previousVariables, totalCount) {
            return {
                ...previousVariables,
                count: totalCount,
            }
        },
        getVariables(props, paginationInfo, fragmentVariables) {
            return {
                count: paginationInfo.count,
                cursor: paginationInfo.cursor,
                id: props.id
            }
        },
    }
)
