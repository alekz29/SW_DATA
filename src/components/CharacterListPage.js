import React from 'react';
import {
    QueryRenderer,
    graphql,
} from 'react-relay';
import environment from '../Environment'
import CharacterList from "./CharacterList";
import '../styles/CharacterListPage.css'

const CharacterListPageQuery = graphql`
    query CharacterListPageQuery(
    $count:Int!,
    $cursor:String
    $id:ID!
    ){
        film(filmID:$id){
            ...CharacterList_film
        }
    }
`

export default class CharacterListPage extends React.Component {

    render() {
        const episodeId = parseInt(this.props.item, 10);
        return (
            <QueryRenderer
                environment={environment}
                variables={{
                    count: 10,
                    id: episodeId,
                }}
                query={CharacterListPageQuery}
                render={({error, props}) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <span className={'loader'}> </span>;
                    }
                    return (
                        <div className={'characterList'}>
                            <CharacterList film={props.film} id={episodeId}/>
                        </div>
                    )
                }}
            />
        );
    }
}
