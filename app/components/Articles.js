import React from 'react'
import {Link} from 'react-router';
import ArticlesStore from '../stores/ArticlesStore';
import ArticelsActions from '../actions/ArticlesActions';

class Articles extends React.Component{
  constructor(props) {
    super(props);
    this.state = ArticlesStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ArticlesStore.listen(this.onChange);
    ArticelsActions.getArticles();
  }

  componentWillUnmount() {
    ArticlesStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    let sideArticles = this.state.articles.filter(a => !a.isMain).map((article) => {
      return (
	<article className="news_intro">
		<a href="#">
			<img className="pic" src={article.image} width="120" height="80" alt={article.title} />
		</a>
        	<header>
                	<hgroup>
                        	<h3>{article.subTitle}</h3>
                        	<h2><a href="#">{article.title}</a></h2>
                	</hgroup>              
                                       
            		<time className="timeago"></time>
			<span className="by_author">{article.author}</span>
                </header>
            <p className="intro">{article.text}</p>
	    <a href="#" title="proèitaj više" className="more_arrows sport_8_arrow"></a>
        </article>
      )
    });

   let mainArticle = this.state.articles.filter(a => a.isMain).map((article) => {
      return (
	<article className="position_one" id="rpc_position_one">
		<a href="#">
			<img className="pic" src={article.image} width="355" height="200" alt={article.title} />
		</a>
        	<header>
                	<hgroup>
                        	<h3>{article.subTitle}</h3>
                        	<h2><a href="#">{article.title}</a></h2>
                	</hgroup>              
                                       
            		<time className="timeago"></time>
			<span className="by_author">{article.author}</span>
                </header>
            <p className="intro">{article.text}</p>
	    <a href="#" title="proèitaj više" className="more_arrows sport_8_arrow"></a>
        </article>
      )
    });

    return (
<div id="homepage">
     <div id="container_left">
      <div id="position_one_video_columns">
	<div id="position_one_video">
	    <div style={{height:'318px'}}>
	       {mainArticle}
	    </div>
	</div>
      </div>
      <div id="position_2345">
	{sideArticles}
      </div>
    </div>
</div>
    );
  }
}

export default Articles;