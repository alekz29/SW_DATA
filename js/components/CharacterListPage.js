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
    $after:String
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
                    count:10,
                }}
                query={CharacterListPageQuery}
                render={({error, props}) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div>Loading...</div>;
                    }
                    return (
                        <div>
                            <CharacterList data={props}/>
                        </div>
                    )
                }}
            />
        );
    }
}

/*

*/