
/*
import 'todomvc-common';

import React from 'react';
import ReactDOM from 'react-dom';

import {installRelayDevTools} from 'relay-devtools';

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

import TodoApp from './components/TodoApp';

// Useful for debugging, but remember to remove for a production deploy.
installRelayDevTools();

const mountNode = document.getElementById('root');

function fetchQuery(
    operation,
    variables,
) {
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

const modernEnvironment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

ReactDOM.render(
    <QueryRenderer
        environment={modernEnvironment}
        query={graphql`
      query appQuery {
        viewer {
          ...TodoApp_viewer
        }
      }
    `}
        variables={{}}
        render={({error, props}) => {
            if (props) {
                return <TodoApp viewer={props.viewer} />;
            } else {
                return <div>Loading</div>;
            }
        }}
    />,
    mountNode
);
*/