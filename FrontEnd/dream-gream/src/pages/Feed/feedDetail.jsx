/* eslint-disable camelcase */
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInterceptor';
// import './Main.scss';
import Topbar from '../../components/Common/Topbar';
import FeedForDetail from '../../components/Feed/FeedForDetail';
import AcheiveBtn from '../../components/Button/AcheiveBtn';
import ScrapCheerUpBtns from '../../components/Button/ScrapCheerUpBtns';
import ScrapCelebrateBtns from '../../components/Button/ScrapCelebrateBtns';
import Navbar from '../../components/Common/Navbar';
import Member from '../../components/Feed/Member';
import ContentCard from '../../components/Feed/ContentCard';
import CheerUpCelebrateBtns from '../../components/Button/CheerUpCelebrateBtns';
import DoneCheerUpBtns from '../../components/Button/DoneCheerUpBtns';
import { API_URL } from '../../config';

function FeedDetail() {
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const loginFlag = accessToken !== null;

  const loggedInUser = parseInt(localStorage.getItem('member_id'), 10);

  const [post, setPost] = useState({});
  const { post_id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`${API_URL}/api/posts/${post_id}`, {
        params: {
          'login-flag': loginFlag,
        },
      })
      .then((response) => {
        setPost(response.data.data.post);
      });
  }, [post_id]);

  return (
    <>
      <div className="body" style={{ overflow: 'auto', overflowX: 'hidden' }}>
        <Topbar showCloseButton={false} />
        <div className="main">
          <Member post={post} />
          <FeedForDetail post={post} />
          <br />
          <hr />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ContentCard title="시작하는 마음" post={post} isBefore />
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {post.is_achieved ? (
              <ContentCard title="달성 소감" post={post} isBefore={false} />
            ) : null}
          </div>
          <br />
          {loggedInUser === post.member_id && !post.is_achieved && (
            <DoneCheerUpBtns post={post} />
          )}
          {loggedInUser === post.member_id && post.is_achieved && (
            <CheerUpCelebrateBtns post={post} />
          )}
          {loggedInUser !== post.member_id && !post.is_achieved && (
            <ScrapCheerUpBtns post={post} />
          )}
          {loggedInUser !== post.member_id && post.is_achieved && (
            <ScrapCelebrateBtns post={post} />
          )}
          <br />
          <br />
        </div>
        <div className="w-[360px] h-[66px] pl-[79px] pr-[81px] pt-[21px] pb-[11px] bg-white bg-opacity-0 flex-col justify-end items-center gap-0.5 inline-flex">
          <div className="text-center text-neutral-400 text-[11px] font-normal">
            Copyright ⓒ SSAFY. All rights reserved.
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <div style={{ position: 'fixed', top: 736 }}>
        <Navbar />
      </div>
    </>
  );
}

export default FeedDetail;
