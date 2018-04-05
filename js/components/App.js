import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Menu from './Menu'
import CharactersView from "./views/CharactersView";

class App extends Component {
    render() {
        return (
            <div>
                <header className={'header'}> STAR WARS-img</header>
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