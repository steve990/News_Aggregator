import React    from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Header   from './components/Header';
import Article  from './components/Article';
import Menu     from './components/Menu';
import About    from './components/About';
import Footer   from './components/Footer';
import './styles/index.css';

const API_KEY       = 'c1e8a0f1855c4fcf814aef1091bd6c53';
const BASE_URL      = 'https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey='
                    + API_KEY + "&q=";
const LAST_SEARCH   = 'lastNewsSearch';
const LANGUAGE      = 'language';

class App extends React.Component { 
    constructor() {
        super();
        this.state  = {
            apiKey : API_KEY,
            articles : [],
            searchQuery: 'today',
            language: 'en',
            burgerState: false
        };

        // Register class functions.
        this.getNews        = this.getNews.bind(this);
        this.setCookie      = this.setCookie.bind(this);
        this.getCookie      = this.getCookie.bind(this);
        this.setURL         = this.setURL.bind(this);
        this.setBurgerState = this.setBurgerState.bind(this);
    }

    // Called when constructor is finished building component.
    componentDidMount() {
        // Read search perameters from cookies.
        // If cookie set, set state for last search and language
        let lastSearchCookie    = this.getCookie(LAST_SEARCH);
        let languageCookie      = this.getCookie(LANGUAGE);

        if (lastSearchCookie !== null && lastSearchCookie !== 'undefined'){
            this.setState({searchQuery: lastSearchCookie})
        } else {
            lastSearchCookie = this.state.searchQuery;
        }

        if (languageCookie !== null && languageCookie !== 'undefined'){
            this.setState({language: languageCookie})
        } else {
            languageCookie = this.state.language;
        }

        this.getNews(lastSearchCookie, languageCookie);
        //If window size changes, close the hamburger menu
        window.addEventListener("resize", () => this.setState({ burgerState: true}));
    }

    //Toggle hamburger menu
    setBurgerState(){
        this.setState({ burgerState: !this.state.burgerState });
    }

    //Modify URL before passing search parameters to News API
    setURL(urlSelector, selectorValue) {
        switch (urlSelector) {
            case 'language':
                this.setState({ 
                    language: selectorValue 
                }, () => { 
                    this.getNews(this.state.searchQuery, selectorValue);
                });
                break;
            case 'searchQuery':
                this.setState({
                    searchQuery: selectorValue 
                });
                break;
                default:
                    return false;
            }
    }

    // Set cookie that expires 1000 days from now.
    // This can store the user's preferred news category.
    setCookie(cookieType, cookieValue) {
        var numDays = 1000;
        var d = new Date();
        d.setTime(d.getTime() + (numDays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cookieType + "=" + cookieValue 
                        + ";" + expires + ";path=/";
    }

    // Get cookie data if cookie exists.
    getCookie(cookieType) {
        var name = cookieType + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                // Cookie found.
                return c.substring(name.length, c.length);
            }
        }
        // Cookie not found.
        return null;
    }

    // Send search string to News API.
    getNews(search, language, category) {    
        let URL = BASE_URL 
                + search
                + '&language=' + language;
        fetch(URL).then(response => response.json())
            .then((data) => {
                this.setState({articles: data.articles});
            })
            .then(() => {
                this.setCookie('lastNewsSearch', search);
                this.setCookie('language', language);
            })
            .catch((error) => {
                alert(error);
            });         
    }

    render() {
        return (   
            <Router>
                {/* Renders news banner at top of the page */}
                <Header />
                {/* Renders nav menu at top of the page */}
                <Menu 
                    getNews         ={this.getNews}
                    setURL          ={this.setURL}
                    setBurgerState  ={this.setBurgerState}
                    searchQuery     ={this.state.searchQuery}
                    language        ={this.state.language}
                    burgerState     ={this.state.burgerState}
                    />
                <div className='routeContainer'>
                    <div className='sideBannerLeft'></div>
                    <Switch>
                        {/* Route to display the about page */}
                        <Route
                            exact={true}
                            path='/news/about/'
                            component={About}
                            />
                        {/* Route to display the news */}
                        <Route 
                            exact={true}
                            path='/news/'
                            render={props => <Article 
                                {...props}
                                articles={this.state.articles}
                                category={this.state.defaultCategory}
                                />}
                        />
                        {/* Set index to main news page */}
                        <Redirect from='/' to='/news/' />
                        {/* Route to display the about page */}
                        <Route
                            path='/*'
                            component={About}
                            />
                    </Switch>
                    <div className='sideBannerRight'></div>
                </div>   
                {/* Renders the footer */}
                <Footer />
            </Router> 
        )
    }
}
export default App;