import React, {Component} from 'react';
import URL from 'url';
import Moment from 'moment';
import '../assets/css/NewsItem.css';
import ImageGrayArrow from '../assets/img/grayarrow.gif';

export default class NewsItem extends Component {
    getCommentLink() { // 评论链接
        let commentText = 'discuss';
        if(this.props.item.kids && this.props.item.kids.length) {
            commentText = this.props.item.kids.length + ' comment';
        }

        return (
            <a href={'https://news.ycombinator.com/item?id=' + this.props.item.id}>{commentText}</a>
        );
    }

    getSubtext() { // 分数, 作者, 时间, 评论数
        return (
            <div className="newsItem-subtext">
                {this.props.item.score} points by <a href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>{this.props.item.by}</a> {Moment.utc(this.props.item.time * 1000).fromNow()} | {this.getCommentLink()}
            </div>
        );
    }

    getRank() { // 序号
        return (
            <div className="newsItem-rank">
                {this.props.rank}.
            </div>
        );
    }

    getVote() { // 投票
        return (
            <div className="newsItem-vote">
                <a href={'https://news.ycombinator.com/vote?for='+ this.props.item.id + '&dir=up&goto=news'}>
                    <img src={ImageGrayArrow} width="10" />
                </a>
            </div>
        );
    }

    getDomain() {
        return URL.parse(this.props.item.url).hostname;
    }

    getTitle() {
        return (
            <div className="newsItem-title">
                <a className="newsItem-titleLink" href={this.props.item.url ? this.props.item.url : 'https://news.ycombinator.com/item?id=' + this.props.item.id}>{this.props.item.title}</a>
                {
                    this.props.item.url && <span className="newsItem-domain"><a href={'https://news.ycombinator.com/from?site=' + this.getDomain()}>({this.getDomain()})</a></span>
                }
            </div>
        );
    }

    render() {
        return (
            <div className="newsItem">
                {this.getRank()}
                {this.getVote()}
                <div className="newsItem-itemText">
                    {this.getTitle()}
                    {this.getSubtext()}
                </div>
            </div>
        );
    }
}
