import React, {Component} from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import Character from './Character'

class CharactersList extends Component {
    render() {
        return (
            <div>
                {
                    this.props.date.allPeople.edges.map(({node}) =>
                        <Character key={node.__id} character={node}/>)
                }
            </div>
        )
    }
}

export default createFragmentContainer(CharactersList, graphql`
    fragment CharacterList_date on Query{
        allPeople(first:10) @connection(key:"CharacterList_allPeople",filters:[]){
            edges{
                node{
                    ...Character_character
                }
            }
        }
    }
`)