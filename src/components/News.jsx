import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults : 0
    };
    document.title = `${this.capitalise(this.props.category)} - NewsWeb`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=256174c7141741a7bd9cb9fc1d3b97de&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  fetchMoreData = async () => {
    this.setState({ page : this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=256174c7141741a7bd9cb9fc1d3b97de&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };


  // handlePrevButton = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=256174c7141741a7bd9cb9fc1d3b97de&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   const data = await fetch(url);
  //   const parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };

  // handleNextButton = async () => {
  //   const totalArticles = Math.ceil(
  //     this.state.totalResults / this.props.pageSize
  //   );
  //   console.log(totalArticles);
  //   if (!(this.state.page + 1 > totalArticles)) {
  //     console.log("Hiii");
  //     this.setState({ loading: true });
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       this.props.country
  //     }&category=${
  //       this.props.category
  //     }&apiKey=256174c7141741a7bd9cb9fc1d3b97de&page=${
  //       this.state.page + 1
  //     }&pageSize=${this.props.pageSize}`;
  //     console.log(url);
  //     const data = await fetch(url);
  //     console.log(data);
  //     const parsedData = await data.json();
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false,
  //     });
  //   }
  // };
  render() {
    return (
      <React.Fragment>
        <h1 className="text-center my-3">
          NewsWeb - Top Headlines From {this.capitalise(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((item) => {
                return (
                  <div className="col-md-4" key={item.url}>
                    <NewsItem
                      title={item.title ? item.title.slice(0, 40) : ""}
                      description={
                        item.description ? item.description.slice(0, 80) : ""
                      }
                      imageUrl={item.urlToImage}
                      newsUrl={item.url}
                      author={item.author}
                      date={item.publishedAt}
                      source={item.source.name}
                    />
                  </div>
                );
              })}
          </div>
          </div>
        </InfiniteScroll>
       {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevButton}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextButton}
          >
            Next &rarr;
          </button>
          </div> */}
      </React.Fragment>
    );
  }
}

export default News;
