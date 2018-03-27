import React from 'react';
import {
    QueryRenderer,
    graphql,
} from 'react-relay';
import environment from '../Environment'
import CharacterList from "./CharacterList";

const CharacterListPageQuery = graphql`
    query CharacterListPageQuery{
        ...CharacterList_date
    }
`

export default class CharacterListPage extends React.Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={CharacterListPageQuery}
                variables={{}}
                render={({error, props}) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div>Loading...</div>;
                    }
                    return (
                        <div>
                            <CharacterList date={props}/>
                        </div>
                    )
                }}
            />
        );
    }
}
