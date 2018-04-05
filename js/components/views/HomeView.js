import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'

class HomeView extends Component {
    render() {
        return (
            <div className={'menu'}>
                <Link className={'loader'} to='/characters'>CHARACTERS</Link>
            </div>
        )
    }
}

export default withRouter(HomeView)