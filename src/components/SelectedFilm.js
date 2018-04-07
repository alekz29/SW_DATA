import React, {Component} from 'react'
import {createFragmentContainer, graphql} from 'react-relay'
import ButtonFilm from './ButtonFilm'
import '../styles/SelectedFilm.css'


class SelectedFilm extends Component {

    render() {
        return (
            <div className={'menu'}>
                {

                    this.props.selected.allFilms.edges.map(({node}) =>
                        <ButtonFilm key={node.__id} episode={node}/>)

                }
            </div>
        )
    }
}

export default createFragmentContainer(SelectedFilm, graphql`
    fragment SelectedFilm_selected on Query{
        allFilms(first:10) @connection(key:"SelectedFilm_allFilms",filters:[]){
            edges{
                node{
                   ...ButtonFilm_episode
                }
            }
        }
    }
`)
