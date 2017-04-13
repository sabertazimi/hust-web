import React from 'react';
import {render} from 'react-dom';
import NewsList from './NewsList';
import '../assets/css/app.css';

// get data by hackernews api
const get = (url) => {
    return Promise.resolve($.ajax(url));
}


get('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then((stories) => {
        return Promise.all(stories.slice(0, 30).map(itemId => get('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json')));
    })
    .then((items) => {
        render(<NewsList items={items} />, $('#content')[0]);
    })
    .catch((err) => {
    console.log('error occur', err);
    });

