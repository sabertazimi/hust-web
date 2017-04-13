import React, {Component} from 'react';
import NewsHeader from './NewsHeader';
import NewsItem from './NewsItem';

const data = {
        "by": "sabertazimi",
        "descendants" : 49,
        "id" : 11600137,
        "kids" : [ 11600476, 11600473, 11600501, 11600463, 11600452, 11600528, 11600421, 11600577, 11600483 ],
        "score" : 56,
        "time" : 1461985332,
        "title" : "sabertazimi's code life",
        "type" : "story",
        "url" : "https://github.com/sabertazimi"
};

export default class NewsList extends Component {
    render() {
        return (
            <div className="newsList">
                <NewsHeader />
                <div className="newsList-newsItem">
                    {
                        (this.props.items).map(function(item, index) {
                            return (
                                <NewsItem key={item.id} item={item} rank={index+1} />
                           );
                        })
                    }
                </div>
            </div>
        );
    }
}