/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TwoTapButton({
  memberId,
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  leftActive, // 추가: leftActive를 props로 받음
}) {
  const [isActive, setIsActive] = useState(leftActive); // 상태명을 isActive로 변경
  const navigate = useNavigate();

  const handleLeftClick = () => {
    setIsActive(false);
    navigate(`/following/${memberId}`);
  };

  const handleRightClick = () => {
    setIsActive(true);
    navigate(`/follower/${memberId}`);
  };

  return (
    <div className="w-[360px] h-[60px] bg-white justify-start items-start inline-flex">
      <div
        className={`w-[180px] pt-[17px] flex-col justify-end items-center gap-[17px] inline-flex ${
          isActive ? 'text-stone-300' : 'text-neutral-700'
        }`}
        onClick={handleLeftClick}
      >
        <div className="text-center text-base font-bold">
          {leftLabel} {leftValue}
        </div>
        <div
          className={`w-[180px] h-[3px] ${
            isActive ? 'bg-stone-300' : 'bg-neutral-700'
          }`}
        />
      </div>
      <div
        className={`w-[180px] pt-[17px] flex-col justify-end items-center gap-[17px] inline-flex ${
          isActive ? 'text-neutral-700' : 'text-stone-300'
        }`}
        onClick={handleRightClick}
      >
        <div className="text-center text-base font-bold">
          {rightLabel} {rightValue}
        </div>
        <div
          className={`w-[180px] h-[3px] ${
            isActive ? 'bg-neutral-700' : 'bg-stone-300'
          }`}
        />
      </div>
    </div>
  );
}

export default TwoTapButton;
