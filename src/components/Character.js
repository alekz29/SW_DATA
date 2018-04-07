import React, {Component} from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import '../styles/Character.css'


class Character extends Component {

    render() {
        return (
            <div>
                <div className={'character'}>{this.props.character.name}</div>
            </div>
        )
    }
}

export default createFragmentContainer(Character, graphql`
    fragment Character_character on Person{
        name
        id
    }
`)

