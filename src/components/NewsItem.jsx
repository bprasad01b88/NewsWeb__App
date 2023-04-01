import React, { Component } from "react";
import moment from "moment";

class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    const defaultImageUrl =
      "https://indiaeducationdiary.in/wp-content/uploads/2021/02/lovett-backdrop-crop-1-1024x576.jpg";
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : "90%", zIndex : "1"}}>
            {source}
          </span>
          <img
            src={imageUrl ? imageUrl : defaultImageUrl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {moment(date).format("LLLL")}
              </small>
            </p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
