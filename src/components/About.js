import React from 'react';
import { Redirect } from 'react-router-dom'

class About extends React.Component{
    render(){
        return (
            <main>
                <div className='thanks'>
                    <h3>App by Steve Gilkes</h3>
                    <br/>
                    <h4>Thanks to <a href='https://newsapi.org'>News API</a> for the REST API that is the backend of this site...</h4>
                    <h4>Banner image by <a href='https://unsplash.com/@aro_mal'>Aromal M S</a> on Unsplash</h4>
                    <h4>Typewriter sidebar images by <a href='https://unsplash.com/@florianklauer'>Florian Klauer</a> on Unsplash</h4>
                    <h4>Crow hover image by <a href='https://unsplash.com/@auntneecey'>Denise Johnson</a> on Unsplash</h4>
                    <h4>Newspaper ico and title image by <a href='https://pixabay.com/vectors/newspaper-news-paper-journal-151438/'>OpenClipart-Vectors</a> on Pixabay</h4>
                </div>
            </main>
        )
    }
}

export default About;