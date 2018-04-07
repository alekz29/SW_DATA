import React from 'react';
import {
    QueryRenderer,
    graphql,
} from 'react-relay';
import environment from '../Environment'
import SelectedFilm from "./SelectedFilm";
import '../styles/Menu.css'

const MenuQuery = graphql`
    query MenuQuery{
        ...SelectedFilm_selected
    }
`

export default class Menu extends React.Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={MenuQuery}
                render={({error, props}) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <span className={'loader'}> </span>;
                    }
                    return (
                        <div >
                            <SelectedFilm selected={props}/>
                        </div>
                    )
                }}
            />
        );
    }
}
