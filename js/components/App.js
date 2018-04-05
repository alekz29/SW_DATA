import React, {Component} from 'react'
import HomeView from './views/HomeView'
import {Switch, Route} from 'react-router-dom'
import CharacterListPage from './CharacterListPage'

class App extends Component {
    render() {
        return (
            <div>
                <header className={'header'}> STAR WARS-img</header>
                <section className={'content'}>
                    <HomeView/>
                    <div>
                        <Switch>
                            <Route exact path='/characters' component={CharacterListPage}/>
                        </Switch>
                    </div>
                </section>
            </div>
        )
    }
}

export default App