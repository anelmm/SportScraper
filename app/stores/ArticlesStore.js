import alt from '../alt';
import ArticlesActions from '../actions/ArticlesActions';

class ArticlesStore {
  constructor() {
    this.bindActions(ArticlesActions);
    this.articles = [];
  }

  onGetArticlesSuccess(data) {
    this.articles = data;
  }

  onGetArticlesFail(jqXhr) {
    // Handle multiple response formats, fallback to HTTP status code number.
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(ArticlesStore);