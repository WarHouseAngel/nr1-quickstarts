import React from 'react';
import {
    Switch,
    Route,
    HashRouter
  } from "react-router-dom";
import Home from './Pages/Home';
import View from './Pages/View';
import ScrollToTop from './Shared/Helpers/ScrollToTop';
import './style.scss';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true,
        }
    }

    componentDidMount() {
        // Load in data from website
        fetch('./data.json').then((response) => response.json()).then((data) => {
            this.setState({
                data,
                loading: false,
            });
        }).catch((response) => {
            console.log(response);
        });
    }

    render() {
        if (this.state.loading) {
            return ( <p>Loading</p> );
        }

        return (
            <HashRouter>
                <main role="main">

                    <Switch>
                        <Route path="/view/:handle" render={(props) => ( <View {...props} data={this.state.data} /> )} />
                        <Route path="/" render={(props) => ( <Home {...props} data={this.state.data} /> )} />
                    </Switch>

                    <ScrollToTop />
                </main>
            </HashRouter>
        )
    }

}

export default App;
