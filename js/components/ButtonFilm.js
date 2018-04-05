import React, {Component} from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import {Link} from 'react-router-dom'


class ButtonFilm extends Component {

    render() {
        return (
            <div className={'menu'}>
                <Link className={'loaderEpisode'} to={`/characters/${this.props.episode.id}`}>
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
