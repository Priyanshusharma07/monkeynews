import React, { Component } from 'react'

const NewsItem=(props)=>{ 

    let {title,decription,imageurl,newurl,author,date}=props;
    return (
      <div className='my-3'>
              <div className="card" >
             <img src={!imageurl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg":imageurl} className="card-img-top" alt="..."/>
             <div className="card-body">
               <h5 className="card-title">{title}</h5>
               {/* <p classNsame="card-text mx-2">{decriptio}</p> */}
               <p className="card-text">{decription}</p>
               <p className="card-text"><small className="text-body-secondary">BY {author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
               <a href={newurl} target='blank' className="btn btn-primary">Read More</a>
         </div>
       </div>
      </div>
    )
  }


export default NewsItem
