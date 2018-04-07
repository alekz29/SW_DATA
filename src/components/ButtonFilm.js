import React, {Component} from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import {Link} from 'react-router-dom'
import '../styles/ButtonFilm.css'


class ButtonFilm extends Component {

    render() {
        return (
            <div className={'episode'}>
                <Link className={'episode_button'} to={`/characters/${this.props.episode.id}`}>
                    {this.props.episode.title}
                </Link>
            </div>
        )
    }
}

export default createFragmentContainer(ButtonFilm, graphql`
    fragment ButtonFilm_episode on Film{
        title
        id
    }
`)
