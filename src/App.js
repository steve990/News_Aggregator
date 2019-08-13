import React from 'react';
import Image from './Image';

const API_KEY   = 'c1e8a0f1855c4fcf814aef1091bd6c53';
const BASE_URL  = 'https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey='
                + API_KEY + "&q=";
const MAIN_CATEGORY = "mainNewsCategory";

class App extends React.Component { 
    constructor() {
        super();
        this.state  = {
          apiKey : API_KEY,
          articles : [],
          defaultCategory: 'bok choy'
        };

        // Register functions of the class.
        this.getNews = this.getNews.bind(this);
        this.setCookie = this.setCookie.bind(this);
        this.getCookie = this.getCookie.bind(this);
    }

    // Called when constructor is finished building component.
    componentDidMount() {
        // Set main category from cookie if it does not exist.
        let mainCategory = this.getCookie(MAIN_CATEGORY);
        if(mainCategory === null) {
            this.setCookie(MAIN_CATEGORY, this.state.defaultCategory);
            mainCategory = this.state.defaultCategory;
        }
        this.getNews(mainCategory);
    }

    // ** This function does not need to be changed. **
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

    // ** This function does not need to be changed. **
    // Get category from cookie if one exists.
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
        return null;
      }

    getNews(category) {    
        const URL        = BASE_URL + category;

        // Request and wait for data from remote server.
        fetch(URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
                console.log(JSON.stringify(data));
                this.setState({articles:data.articles});
            })
            // Data is not retieved.
            .catch((error) => {
                alert(error);
            });         
    }

    render() {
        return (          
            <div>
                <Image />
                <ul>
                {this.state.articles.map((article, index) => (
                    <li key={index}>{index} 
                        {/* See  https://newsapi.org/ for more properties */}
                        {article.publishedAt}
                        {article.title}
                    </li>
                ))}  
                </ul>
            </div>     
        )
    }
}
export default App;

