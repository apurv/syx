import React, {Component} from "react";
import ArticleActions from '../actions/article.actions';
import ArticleStore from '../stores/article.store';
import UserStore from '../stores/user.store';
import AppConstants from '../constants';
import Card from './Card.jsx';

export default class CardsDisplay extends Component {

    constructor() {
        super();

        this.state = {
            articles: []
        };
        //FIXME -- this seems bad
        let initialListener = ArticleStore.addListener((e) => {
            // console.log("inside handler", e)
            this.setState({
                articles: ArticleStore.getAllStoreArticles()
            });

            initialListener.remove();
        });
    }

    componentDidMount() {
        this.state = {
            articles: ArticleActions.getAllArticles()
        };
    }

    addArticle() {
        ArticleActions.addArticle(UserStore.getCurrentStoreUser()._id);
    }

    getArticle() {
        ArticleActions.getArticle();
    }

    updateArticle() {
        ArticleActions.updateArticle();
    }

    deleteArticle() {
        ArticleActions.deleteArticle();
    }

    isAdmin() {
        if (!UserStore.isAdmin()) {
            return 'none';
        }
    }

    render() {
        return (
            <div className="container">
                { this.state.articles.map(function (article) {
                    return (
                        <div key={article._id} className="col-xs-6 col-lg-4">
                            <Card article={article}/>
                        </div>
                    )
                })
                }
                <button 
                    className="btn btn-success btn-lg" 
                    style={{ margin:'50px', display: this.isAdmin() }}
                    onClick={this.addArticle.bind(this)}> 
                        Contribute
                </button>
            </div>
        )
    }
}
