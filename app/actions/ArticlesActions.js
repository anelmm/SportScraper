import alt from '../alt';

class ArticlesActions {
  constructor() {
    this.generateActions(
      'getArticlesSuccess',
      'getArticlesFail'
    );
  }

  getArticles() {

   $.ajax({ url: '/api/articles' })
      	.done((data) => {
        	this.actions.getArticlesSuccess(data)
      	})
      	.fail((jqXhr) => {
        	this.actions.getArticlesFail(jqXhr)
      	});
  }
}

export default alt.createActions(ArticlesActions);