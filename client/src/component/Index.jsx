import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Index extends Component {
    constructor() {
        super();
        this.state = {
            be: ''
        }
    }
    componentDidMount() {
        const header = new Headers();
        header.append('apiKey', 'MLPOIUY&%$$FGT!CVNHGFRES');
        let fetchData = { 
            method: 'GET', 
            headers: header
        }
        fetch('/users',fetchData)
            .then((response) => response.json())
            .then((resp) => {
                this.setState({ be: resp.data })
            })
            .catch((error) => {
                console.log('{error: error}')
            })
    }

    render() {
        console.log('fetched___', this.state.be)
        const c =
            (<div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        {this.state.be}
                    </p>
                </header>
            </div>);
        return c;
    }
}

export default Index;