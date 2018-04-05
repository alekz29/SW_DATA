import React from 'react';
import {
    QueryRenderer,
    graphql,
} from 'react-relay';
import environment from '../Environment'
import CharacterList from "./CharacterList";

const CharacterListPageQuery = graphql`
    query CharacterListPageQuery(
    $count:Int!,
    $cursor:String
    ){
        ...CharacterList_data
    }
`

export default class CharacterListPage extends React.Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                variables={{
                    count: 10,
                    cursor: ""
                }}
                query={CharacterListPageQuery}
                render={({error, props}) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div className={'dataFetcher'}>Loading...</div>;
                    }
                    return (
                        <div className={'list'}>
                            <CharacterList data={props}/>
                        </div>
                    )
                }}
            />
        );
    }
}
