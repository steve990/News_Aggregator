import React from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends React.Component{
    constructor(props){
        super(props);

        this.props.getNews();
        this.props.setURL();
        this.props.setBurgerState();
    }

    // Calls the News API query callback function
    getNews(event){
        event.preventDefault();
        this.props.getNews(this.props.searchQuery, this.props.language);
    }

    // Calls the URL setting callback function
    setURL(urlSelector, selectorValue){
        this.props.setURL(urlSelector, selectorValue);
    }

    // Calls the callback function to change the hamburger menu state
    setBurgerState(){
        this.props.setBurgerState();
    }

    render(){
        return (
            // Renders the nav menu
            <nav className={this.props.burgerState ? 'navClosed' : 'navOpen'}>
                <ul>
                    <div 
                        className={this.props.burgerState ? 'burger burgerClosed' : 'burger burgerOpen'}
                        onClick={() => this.setBurgerState()}
                    >
                        <span className="burgerLine Line1"></span>
                        <span className="burgerLine Line2"></span>
                        <span className="burgerLine Line3"></span>
                        
                    </div>
                    <div className="mainNav">
                        <li>
                            <NavLink to="/news" activeClassName="active">Main</NavLink>
                        </li>
                        <li>
                            <NavLink to="/news/about" activeClassName="active">About</NavLink>
                        </li>
                    </div>
                    <li>
                        <form onSubmit={(event) => this.getNews(event)}>
                            <input 
                                type='sumbit' 
                                id='search'
                                name='search'
                                placeholder={this.props.searchQuery}
                                onChange={(event) => this.setURL('searchQuery', event.target.value)}/>
                            <button 
                                type='button' 
                                htmlFor='search'
                                onClick={(event) => this.getNews(event)}>Search News</button>
                            <select 
                                id="language"
                                value={this.props.language}
                                onChange={(event) => this.setURL('language', event.target.value)}>
                                <option value="ar">ar</option>
                                <option value="de">de</option>
                                <option value="en">en</option>
                                <option value="es">es</option>
                                <option value="fr">fr</option>
                                <option value="he">he</option>
                                <option value="it">it</option>
                                <option value="nl">nl</option>
                                <option value="no">no</option>
                                <option value="pt">pt</option>
                                <option value="ru">ru</option>
                                <option value="se">se</option>
                                <option value="ud">ud</option>
                                <option value="zh">zh</option>
                            </select>
                        </form>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Menu;