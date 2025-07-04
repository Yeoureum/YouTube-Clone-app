import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { API_KEY } from '../../data';


const value_converter = (num) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num;
};

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    const response = await fetch(videoList_url);
    const data = await response.json();
    setData(data.items);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className='feed'>
      {data.map((item, index) => (
        <Link 
          to={`/video/${item.snippet.categoryId}/${item.id}`} 
          key={index} 
          className='card'
        >
          <img src={item.snippet.thumbnails.medium.url} alt='' />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {value_converter(item.statistics.viewCount)} views &bull;{" "}
            {moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
