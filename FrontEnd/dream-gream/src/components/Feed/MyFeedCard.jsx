/* eslint-disable */

import React from 'react';
import { ReactComponent as CheerUpIcon } from '../../assets/icons/SmallCheerUpIcon.svg';
import { ReactComponent as CelebrateIcon } from '../../assets/icons/CelebrateIconSmall.svg';
import { ReactComponent as LockCloseIcon } from '../../assets/icons/LockCloseIcon.svg';
import { ReactComponent as LockOpenIcon } from '../../assets/icons/LockOpenIcon.svg';
import { useNavigate } from 'react-router-dom';

function MyFeedCard({
  title,
  Img,
  likeCount,
  postId,
  isDisplay,
  activeTab,
  isMineFlag,
}) {
  const image = {
    backgroundImage: `url(${Img})`, // 달성중 달성완료 둘다 일단 aiImg로 설정 => 달성완료에 자기 사진 안올리는 사람이 있을까봐 => 근데 있으면 넣고 없으면 빼는 방향이 좋을듯
  };
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/feed/${postId}`);
  };
  return (
    <div
      className="w-40 h-[221px] flex-col justify-start items-start gap-[3px] inline-flex z-[5] mr-2 mb-2"
      onClick={handleCardClick}
    >
      <div
        className="w-40 h-40 bg-zinc-300 rounded-[10px] shadow-md"
        style={{ ...image, backgroundSize: 'cover' }}
      />
      <div className="w-[88px] h-[17px] relative">
        <div className="w-[46px] top-[-0px] absolute text-zinc-800 text-xs font-medium">
          {activeTab ? <CheerUpIcon /> : <CelebrateIcon />}
        </div>
        {isMineFlag && (
          <div className="w-[46px] top-[2px] left-[148px] absolute text-zinc-800 text-xs font-medium">
            {isDisplay ? <LockOpenIcon /> : <LockCloseIcon />}
          </div>
        )}
        <div className="w-[46px] left-[18px] top-[-0px] absolute text-zinc-800 text-xs font-medium">
          {likeCount}
        </div>
      </div>
      <div className="w-40 text-neutral-700 text-[13px] font-normal">
        {title}
      </div>
    </div>
  );
}

export default MyFeedCard;
