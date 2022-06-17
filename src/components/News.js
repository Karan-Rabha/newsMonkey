import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Articles from './sampleOutput'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 5,
        category:"general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles:[],
            page: 1,
            loading: false,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=491cf8ec981442519a54f16bffee8047&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    // life cycle method --> (componentDidMount)
    async componentDidMount(){
        this.updateNews();
    }
    
    handlePrevClick = async () => {
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }
    
    handleNextClick = async () => {
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{margin: '35px 0'}}>News - Top {this.props.category === "general" ? null : this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((news)=> {
                        return <div className="col-md-4" key={news.url}>
                            <NewsItems title={news.title} description={news.description} imageUrl={news.urlToImage} newsUrl={news.url} />
                        </div>
                    })
                    }     
                </div>
                <div className="container d-flex justify-content-between">
                <button style={{visibility:this.state.page <= 1 ? "hidden" : "visible"}} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>

                <button style={{visibility:this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize) ? "hidden" : "visible"}} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                
                </div>
            </div>
        )
    }
}

export default News