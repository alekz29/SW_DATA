import React, {Component} from 'react'
import {createFragmentContainer, graphql} from 'react-relay'

class Character extends Component {
    render() {
        return (
            <div>
                <div>{this.props.character.name}</div>
            </div>
        )
    }
}

export default createFragmentContainer(Character, graphql`
    fragment Character_character on Person{
        name
    }
`)

