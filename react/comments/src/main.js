import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';

const data = [
    {
        id: 1,
        author: 'sabertazimi',
        text: 'This is one comment'
    },
    {
        id: 2,
        author: 'Yilong Liu',
        text: 'This is **another** comment'
    }
]

ReactDOM.render(
    <CommentBox data={data}/>,
    document.getElementById('content')
);

