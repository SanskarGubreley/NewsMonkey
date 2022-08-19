import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import propTypes from 'prop-types';

export class News extends Component {
  static defaultProps={
    country:"us",
    pageSize:6,
    category:"science"
  }
  static propTypes ={
    country:propTypes.string,
    pageSize:propTypes.number,
    category:propTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1 ,
       
    }

  }

 

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=689db382ddd04bfc9d3e24bef59921cc&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data =await fetch(url);
    let parsedData =await data.json();
    this.setState({articles:parsedData.articles , 
      totalResults:parsedData.totalResults,
      loading:false
    });
  }
  

  
  handleNextClick = async () =>{
    if(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)){


    }
    else{

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=689db382ddd04bfc9d3e24bef59921cc&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data =await fetch(url);
      let parsedData =await data.json();
      this.setState({
        page:this.state.page+1,
        articles:parsedData.articles,
        loading:false
      }
      )
    }
  }

  handlePrevClick = async () =>{
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=689db382ddd04bfc9d3e24bef59921cc&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data =await fetch(url);
    let parsedData =await data.json();
    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading:false
    }
    )
  }

  render() {
    return (
      <div className="container my-3 ">
        <h2 className='text-center'>News - Top headliness</h2>
        {this.state.loading && <Spinner/>}
        <div className="row my-3">
          {!this.state.loading && this.state.articles.map ((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled ={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News