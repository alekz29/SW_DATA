import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Menu from './Menu'
import CharactersView from "./views/CharactersView";
import '../styles/App.css'

class App extends Component {
    render() {
        return (
            <div>
                <header className={'header'}><img  className={'header_ST'} src={'https://upload.wikimedia.org/wikipedia/commons/2/21/Star_Wars_logo.png'}/></header>
                <section className={'content'}>
                    <Menu/>
                    <div>
                        <Switch>
                            <Route path="/characters/:productId" component={CharactersView}/>
                        </Switch>
                    </div>
                </section>
            </div>
        )
    }
}

export default App