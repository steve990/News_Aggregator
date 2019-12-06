import React from 'react';
import Newspaper from '../img/newspaper.png';

class Header extends React.Component {
    render(){
        return(
            <header>
                <div className='headerMask'>
                    <span>
                        <img src={Newspaper} alt='Movie Reels'></img>
                        <h1>News API</h1>
                        <img className='flipImg' src={Newspaper} alt='Movie Reels'></img>
                    </span>
                    <h3>Your source for online news in a single page...</h3>
                </div>
            </header>
        )
    }
} 

export default Header;