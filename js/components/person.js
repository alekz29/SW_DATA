import React from 'react';
import {
    QueryRenderer,
    graphql,
} from 'react-relay';
import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';


function fetchQuery(operation,
                    variables,) {
    return fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json();
    });
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default class App extends React.Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={graphql`
          query personQuery{
            person(personID:74){
              name
                }
            }
        `}
                variables={{}}
                render={({error, props}) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div>Loading...</div>;
                    }
                    return <div>Person Name: {props.person.name}</div>;
                }}
            />
        );
    }
}