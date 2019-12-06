import React from 'react';
import crowImg from '../img/crow2.jpg';

class Article extends React.Component{
    constructor(){
        super();

        this.formatDate = this.formatDate.bind(this);
        this.limitTextLength = this.limitTextLength.bind(this);
    }

    // Formats the date to a easy to read output
    formatDate(input){
        let dateTime = input.split("T");
        let date = dateTime[0];
        let time = dateTime[1].split(":");

        let response = date + ' @ ' + time[0] +':' + time[1];

        return response;
    }

    // If the Title or Author returns a string greater than 90 characters,
    // it will be shortened to 90 and have '...' appended to the end
    limitTextLength(text){
        if (text){
            if (text.length > 90){
                text = text.substring(0, 90) + '...';
            } 
            return text;
        } else {
            return '';
        }
    }

    // Renders the artcle
    render(){
        return (
            <main>
                {this.props.articles.map((article, index) => (
                    <article key={index}>
                        <a href={article.url}>
                            <img className='crow' src={crowImg} alt='Hover crow to fly to article.'></img>
                            <h3>{this.limitTextLength(article.title)}</h3>
                            {article.urlToImage == null ?
                                null 
                                : 
                                <div className='imgContainer'>
                                    <img className='articleImg' src={article.urlToImage} alt="Relevant to article" />
                                </div>
                            }
                            <p className='source'>{article.source.name}</p>
                            <p className='author'>{this.limitTextLength(article.author)}</p>
                            <time>{this.formatDate(article.publishedAt)}</time>
                            <p>{article.description}</p>
                        </a>
                    </article>
                ))}  
            </main>
        )
    }
}

export default Article;