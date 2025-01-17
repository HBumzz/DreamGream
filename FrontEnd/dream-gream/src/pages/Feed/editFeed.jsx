/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/alt-text */
import { React, useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import axiosInstance from '../../utils/axiosInterceptor';

import TopbarForEdit from '../../components/Edit/TopbarForEdit';
import EditImg from '../../components/Edit/EditImg';
import EditInfo from '../../components/Edit/EditInfo';
import EditInfoForAcheive from '../../components/Edit/EditInfoForAcheive';
import { API_URL } from '../../config';

function EditFeed() {
  const [post, setPost] = useState({});
  const { post_id } = useParams();
  const [imgFile, setimgFile] = useState('');
  const [achievedDate, setAchievedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryID, setSelectedCategoryID] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [isPublic, setIsPublic] = useState('');
  const [imgUpdateFlag, setImgUpdateFlag] = useState('false');
  const [mainImg, setMainImg] = useState('');
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedAchievementContent, setEditedAchievementContent] = useState(
    post.achievement_content,
  );

  const today = new Date().toISOString();

  const categorys = {
    Travel: { id: 1, category: '여행' },
    Health: { id: 2, category: '건강/운동' },
    Learning: { id: 3, category: '배움' },
    Culture: { id: 4, category: '문화/엔터' },
    Love: { id: 5, category: '사랑' },
    Food: { id: 6, category: '음식' },
    Shopping: { id: 7, category: '쇼핑' },
    Work: { id: 8, category: '일' },
    etc: { id: 9, category: '기타' },
  };
  const handleDateChange = (event) => {
    const selectedDateStr = event.target.value;
    const selectedDate = new Date(selectedDateStr);
    const formattedDate = selectedDate.toISOString();
    setAchievedDate(formattedDate);
  };

  const updateImgFile = (newimgFile) => {
    setimgFile(newimgFile);
  };
  // 게시물 초기 정보 렌더링
  useEffect(() => {
    if (post && post.dead_line) {
      setSelectedPeriod(post.dead_line);
    }
    if (post && post.category_id) {
      setSelectedCategoryID(post.category_id);
    }
    if (post && post.is_display) {
      setIsPublic(post.is_display);
    }
    if (post && post.achieved_date) {
      setAchievedDate(post.achieved_date);
    } else {
      setAchievedDate(today);
    }
    const matchingCategory = Object.values(categorys).find(
      (category) => category.id === post.category_id,
    );
    if (matchingCategory) {
      setSelectedCategory(matchingCategory.category);
    }
  }, [post]);

  const onTogglePublic = () => {
    setIsPublic((prevIsPublic) => !prevIsPublic);
  };

  // 이미지 관련
  const fileInputRef = useRef(null);

  const setPreviewImg = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setMainImg(e.target.result);
        updateImgFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const addImg = () => {
    fileInputRef.current.click();
  };

  const clearImg = () => {
    setMainImg('');
    setImgUpdateFlag(true);
  };

  useEffect(() => {
    setEditedContent(post.content);
    setEditedAchievementContent(post.achievement_content);
    setMainImg(post.achievement_img);
  }, [post]);

  // 달성완료 버튼을 통해서 온건지 확인
  const location = useLocation();
  const isAchievedChanged = location.state && location.state.change_is_achieved;

  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const loginFlag = accessToken !== null;

  // 게시글 상태 업데이트 함수
  const updatePostAchievedStatus = (newAchievedStatus) => {
    setPost((prevPost) => ({
      ...prevPost,
      is_achieved: newAchievedStatus,
    }));
  };

  // isAchievedChanged 값 변경 감지하여 post 상태 업데이트
  useEffect(() => {
    if (isAchievedChanged && !post.is_achieved) {
      // Only update if isAchievedChanged is true and post.is_achieved is not already true
      updatePostAchievedStatus(true);
    }
  }, [isAchievedChanged, post.is_achieved]);

  // 게시글 상세 조회
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
  }, []);

  return (
    <div
      className="w-[360px] h-[1000px] relative bg-white "
      style={{ overflow: 'auto', overflowX: 'hidden' }}
    >
      <TopbarForEdit
        post={post}
        isAchievedChanged={isAchievedChanged}
        imgFile={imgFile}
        selectedCategory={selectedCategory}
        selectedCategoryID={selectedCategoryID}
        selectedPeriod={selectedPeriod}
        isPublic={isPublic}
        achievedDate={achievedDate}
        imgUpdateFlag={imgUpdateFlag}
        editedContent={editedContent}
        editedAchievementContent={editedAchievementContent}
      />
      <hr />

      <div className="flex space-x-4 absolute top-[85px] left-1/2 transform translate-x-[-50%]">
        <EditImg
          post={post}
          isAiImg
          mainImg={post.ai_img}
          setPreviewImg={setPreviewImg}
        />
        {post.is_achieved && (
          <EditImg
            isAiImg={false}
            mainImg={mainImg}
            setPreviewImg={setPreviewImg}
            addImg={addImg}
            clearImg={clearImg}
            fileInputRef={fileInputRef}
          />
        )}
      </div>
      <div className="w-[315px] left-[22px] top-[267px] absolute text-zinc-800 text-[17px] font-medium leading-normal">
        {post.title}
      </div>
      <div className="w-[360px] h-[0px] left-0 top-[369px] absolute border border-zinc-300" />
      <div className="w-[319px] h-[165px] left-[17px] top-[395px] absolute">
        <div className="w-[319px] h-[180px] relative bg-[#DEE2F4] rounded-[10px]">
          <div className="card-title w-[97px] h-[9.17px] left-[10px] top-[9.09px] absolute text-zinc-800 text-[13px] font-medium leading-[16.90px]">
            시작하는 마음
          </div>

          <div
            className="w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px]"
            contentEditable
            onBlur={(event) => setEditedContent(event.target.innerHTML)}
            dangerouslySetInnerHTML={{ __html: editedContent }}
          />
        </div>
        {post.is_achieved && (
          <>
            <br />
            <div className="w-[319px] h-[180px] relative bg-[#DEE2F4] rounded-[10px]">
              <div className="card-title w-[97px] h-[9.17px] left-[10px] top-[9.09px] absolute text-zinc-800 text-[13px] font-medium leading-[16.90px]">
                달성 소감
              </div>
              <div
                className="w-[300px] left-[10px] top-[34px] absolute text-zinc-800 text-[13px] font-normal leading-[16.90px]"
                contentEditable
                onBlur={(event) =>
                  setEditedAchievementContent(event.target.innerHTML)
                }
                dangerouslySetInnerHTML={{ __html: editedAchievementContent }}
                placeholder="달성 소감을 입력해주세요."
              />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        )}
      </div>

      <div className="w-[360px] h-14 left-0 top-[813px] absolute bg-white">
        {post.is_achieved ? (
          <EditInfoForAcheive
            achievedDate={achievedDate}
            handleDateChange={handleDateChange}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isPublic={isPublic}
            setSelectedCategoryID={setSelectedCategoryID}
            onTogglePublic={onTogglePublic}
          />
        ) : (
          <EditInfo
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            isPublic={isPublic}
            setSelectedCategoryID={setSelectedCategoryID}
            onTogglePublic={onTogglePublic}
          />
        )}
      </div>
    </div>
  );
}

export default EditFeed;
