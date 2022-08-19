import React, { Component } from 'react'

export class Newsitem extends Component {
  
  render() {
    let {title,description , imageUrl , newsUrl , date,author} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl?"https://cdn.benzinga.com/files/images/story/2022/07/30/musk_tesla2.jpg?width=1200&height=800&fit=crop":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}..</p>
              <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem