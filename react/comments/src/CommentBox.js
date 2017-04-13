import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default class CommentBox extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [
                {
                    id: 1,
                    author: 'sabertazimi',
                    text: 'Hello React'
                }
            ]
        };

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(comment) {
        comment.id = Date.now();

        const comments = this.state.data;
        const newComments = comments.concat([comment]);

        this.setState({
            data: newComments
        });
    }
    
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
}
