import React, {useEffect, useState} from 'react'
import Spinner from './Spinner';
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=> {
 
  const [articles, setArticles] = useState([])
  const [loading,setLoading]=useState(false)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)
  // constructor(props){
  //   super(props);
  //   console.log("hello I am constructor from component");
  //   this.state={
  //     article:[],
  //     loading:false, 
  //     page:1,
  //     totalResults:0
  //   }
  //   document.title="Monkey-News-"+ this.capatilizefirstletter(props.category);
  // }



  const capatilizefirstletter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  const  UpdateNews= async()=>{
    props.setProgress(50);
    console.log("update");
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e1d4cb3b8f5c4bfeb1dd1d1809483479&page=${page}&pageSize=${props.pagesize}`;
    setLoading(true)
    let data=await fetch(url);
    let predata=await data.json();
    props.setProgress(70);
    setArticles(predata.articles)
    setTotalResults(predata.totalResults)
    setLoading(false)

      // this.setState({
    //   article:predata.articles,
    //   totalResults:predata.totalResults,
    //   loading:false
    // })
    props.setProgress(100);
  }

  useEffect(()=>{
    UpdateNews();
  },[])
  // const componentDidMount =async()=>{
  //   console.log("cdm");
  //   this.UpdateNews();
  // }


  // ---- for now we using infinite loop due to which we don need any prev or next
  // handlenextClick = async ()=>{
  //   console.log("next click");
  //   if(this.state.page+1 > Math.ceil(this.state.totalResults/props.pagesize)){

  //   } else {
  //   //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e1d4cb3b8f5c4bfeb1dd1d1809483479&page=${this.state.page + 1}&pageSize=${props.pagesize}`;
  //   //   this.setState({loading:true});
  //   //   let data=await fetch(url);
  //   //   let predata=await data.json();
  //   //   // console.log(predata);
  //   //   this.setState({
  //   //     ,
  //   //     article: predata.articles,
  //   //     loading:false
  //     // })
  //     this.setState({page: this.state.page + 1});
  //     this.UpdateNews()
  //   }
  // }


  // handleprevClick = async   ()=>{
  //   console.log("Prev click");

  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e1d4cb3b8f5c4bfeb1dd1d1809483479&page=${this.state.page - 1}&pageSize=${props.pagesize}`;
  //   // this.setState({loading:true});
  //   // let data=await fetch(url);
  //   // let predata=await data.json();
  //   // console.log(predata);
  //   // this.setState({article:predata.articles})

  //   // this.setState({
  //   //   page:this.state.page-1,
  //   //   article:predata.articles,
  //   //   loading:false
  //   // })
  //   this.setState({page:this.state.page-1});
  //   this.UpdateNews()
  // }

  ///here scroll view is here:


  const fetchMoreData = async () => {
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e1d4cb3b8f5c4bfeb1dd1d1809483479&page=${page+1}&pageSize=${props.pagesize}`;
    setPage(page+1)
    let data=await fetch(url);
    let predata=await data.json();

    setArticles(articles.concat(predata.articles))
    setTotalResults(predata.totalResults)

    // this.setState({
    //   article:articles.concat(predata.articles),
    //   totalResults:predata.totalResults,
    // })
  };



    return (

      <div className="container my-3">
      <h1 className="text-center" style={{marginTop:'90px'}}>Monkey News - Daily update</h1>
   
      {loading &&<Spinner/>}
   
      <InfiniteScroll
     dataLength={articles.length}
     next={fetchMoreData} 
     hasMore={articles.length !== totalResults}
      loader={<Spinner/>  }>
        <div className='container'>

            <div className="row">
                {articles.map((element)=>{
                  return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title} description={element.description}  imageurl={!element.urlToImage?"https://thumbs.dreamstime.com/z/omg-shocking-news-newspaper-headline-reading-concept-astonishing-31451595.jpg?w=992":element.urlToImage} newurl={element.url} author={element.author} date={element.publishedAt}/>
              </div>       
                        
                })}
          </div>
        </div>

       </InfiniteScroll>
      
       {/* <div className="container-dark d-flex justify-content-between" >
       <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handleprevClick}><u>&larr; Prev</u></button>
       <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pagesize)} className="btn btn-dark" onClick={this.handlenextClick}><u>Next &rarr;</u></button>
       </div> */}
        
      </div>
    )
  }



News.defaultProps={
  contry:`in`,
  pagesize:8,
  category:'general'
} 

// News.PropTypes = {
//   country:PropsTypes.string,
//   pageSize:PropsTypes.number,
//   category:PropTypes.string
// }





export default News
