import React, { useEffect, useState } from 'react';
import './PlayVideo.css';

import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';


const value_converter = (num) => {
  if (!num) return '0';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
};

const PlayVideo = () => {
  const { videoId } = useParams(); 

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  
  const fetchVideoData = async () => {
    try {
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetails_url);
      const data = await response.json();
      setApiData(data.items[0]);
    } catch (err) {
      console.error("Error fetching video data:", err);
    }
  };

  const fetchOtherData = async () => {
    if (!apiData) return;

    try {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const response = await fetch(channelData_url);
      const data = await response.json();
      setChannelData(data.items[0]);

      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      const commentRes = await fetch(comment_url);
      const commentData = await commentRes.json();
      setCommentData(commentData.items);
    } catch (err) {
      console.error("Error fetching other data:", err);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className='play-video'>
      <iframe
        width="1020"
        height="574"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={apiData ? apiData.snippet.title : "Video"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>

      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16k"} views &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span><img src={like} alt="Like" /> {apiData ? value_converter(apiData.statistics.likeCount) : 155}</span>
          <span><img src={dislike} alt="Dislike" /> 2</span>
          <span><img src={share} alt="Share" /> Share</span>
          <span><img src={save} alt="Save" /> Save</span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt="Channel owner"
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : ""} subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description here"}</p>
        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 102} comments</h4>
        {commentData.map((item, index) => (
          <div key={index} className='comment'>
            <img
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt="Author"
            />
            <div>
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName}
                <span> • {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="Like" />
                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="Dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
