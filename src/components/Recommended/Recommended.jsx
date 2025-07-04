import React, { useEffect, useState } from 'react';
import './Recommended.css';

import { API_KEY } from '../../data';
import { value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    try {
      const relatedData_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const response = await fetch(relatedData_url);
      const data = await response.json();
      setApiData(data.items);
    } catch (err) {
      console.error("Error fetching recommended videos:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]); 

  return (
    <div className='recommended'>
      {apiData.map((item, index) => (
        <Link
          to={`/video/${item.snippet.categoryId}/${item.id}`}
          key={index}
          className="side-video-list"
        >
          <img src={item.snippet.thumbnails.medium.url} alt='' />
          <div className='vid-info'>
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
