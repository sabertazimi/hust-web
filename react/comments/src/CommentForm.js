import React from 'react';

export default class CommentForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            author: '',
            text: ''
        };

        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAuthorChange(e) {
        this.setState({
            author: e.target.value
        });
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const author = this.state.author.trim();
        const text = this.state.text.trim();

        if (!author || !text) {
            return ;
        }

        // submit data back to parent component of CommentForm
        this.props.onCommentSubmit(
            {
                author: author,
                text: text
            }
        );

        // clear up after submit
        this.setState({
            author: '',
            text: ''
        });
    }
    
    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={this.state.author}
                    onChange={this.handleAuthorChange}
                />
                <input
                    type="text"
                    placeholder="Say something..."
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
}
