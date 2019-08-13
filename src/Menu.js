import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Switch} from 'react-router-dom';

class Menu extends React.Component{
    render(){
        return (
            <Router>
                <nav>
                    <ul>
                        <li>
                            {/* <Switch> */}
                                <Link to="/about/">About</Link>
                                {/* <Link to="/">Home</Link>
                            </Switch> */}
                        </li>
                    </ul>
                </nav>
            </Router>
        )
    }
}

export default Menu;