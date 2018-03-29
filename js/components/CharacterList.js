import React, {Component} from 'react'
import {createPaginationContainer, graphql} from 'react-relay'
import Character from './Character'

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
                <div>
                    {
                        this.props.data.allPeople.edges.map(({node}) =>
                            <Character key={node.__id} character={node}/>)
                    }
                </div>
                <div>
                    <div onClick={() => this._loadMore()}>Next</div>
                </div>
            </div>
        )
    }
}

export default createPaginationContainer(CharactersList,
    {
        data: graphql`
            fragment CharacterList_data on Query{
                allPeople(
                    first:$count,
                    after:$after,
                ) @connection(key:"CharacterList_allPeople",filters:[]){
                    edges{
                        node{
                            ...Character_character
                        }
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
            $after: String,
            ){
                ...CharacterList_data
            }
        `,
        getConnectionFromProps(props) {
            return props.data && props.data.allPeople
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
                after: paginationInfo.cursor,
            }
        },
    }
)
