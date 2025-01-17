/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as AchievemetStamp } from '../../assets/images/AchievementStamp.svg';

function FeedForExplore({ post }) {
  const navigate = useNavigate();
  const [showFirstImage, setShowFirstImage] = useState(!post.achievement_img);

  useEffect(() => {
    setShowFirstImage(!post.achievement_img);
  }, [post.achievement_img]);

  const handleImageToggle = () => {
    if (post.achievement_img) {
      setShowFirstImage((prev) => !prev);
    }
  };

  const goFeedDetail = () => {
    navigate(`/feed/${post.post_id}`);
  };

  return (


    <div
      className="w-[360px] h-[448px] relative"
      onClick={goFeedDetail}
      style={{ cursor: 'pointer' }}
    >
      <div className="w-[315px] left-[25px] top-[376px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
        {post.title}
      </div>
      <div
        className="w-[360px] h-[360px] left-0 top-0 absolute "
        onClick={post.achievement_img ? handleImageToggle : null}
      >
        {/* showFirstImage: 이미지 넘기는 토글 관련 */}
        {showFirstImage ? (
          <img
            className="w-[360px] h-[360px] left-0 top-0 absolute"
            src={post.ai_img}
            alt="1번 이미지"
          />
        ) : (
          // 2번 이미지 없는 경우 1번 이미지만 보이도록
          post.achievement_img && (
            <img
              className="w-[360px] h-[360px] left-0 top-0 absolute"
              src={post.achievement_img}
              alt="2번 이미지"
            />
          )
        )}
        {post.is_achieved && (

          <AchievemetStamp className="w-[135px] h-[135px] left-[225px] top-[1px] absolute" />
        )}
      </div>
      {post.achievement_img && (
        <div className="bar w-[140px] h-1.5 left-[110px] top-[345px] absolute">
          <div
            className={`leftbar w-[70px] h-1.5 left-[0px] top-[-0px] absolute ${
              showFirstImage
                ? 'bg-white bg-opacity-80'
                : 'bg-zinc-400 bg-opacity-80'
            } rounded-[10px]`}
          />
          <div
            className={`rightbar w-[70px] h-1.5 left-[70px] top-[-0px] absolute ${
              showFirstImage
                ? 'bg-zinc-400 bg-opacity-80'
                : 'bg-white bg-opacity-80'
            } rounded-[10px]`}
          />
        </div>
      )}
    </div>
  );
}

export default FeedForExplore;
