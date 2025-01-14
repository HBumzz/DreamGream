import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CategoryButtons from '../Button/CategoryButtons';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { saveSubject } from '../../store/actions/postActions';
import axiosInstance from '../../utils/axiosInterceptor';
import { API_URL } from '../../config';

function PostSubject({ handleCloseIconClick, handleNextButtonClick }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('기타');
  const [categoryID, setCategoryID] = useState(null);
  const textareaRef = useRef(null);
  const [isPosting, setIsPosting] = useState(false);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onPostSubject = async () => {
    if (isPosting) {
      return; // 이미 요청 중인 경우 중복 요청 방지
    }
    setIsPosting(true);
    try {
      dispatch(saveSubject({ title, category, categoryID }));
      // POST 요청은 body에 실어 보냄
      await axiosInstance.post(`${API_URL}/api/posts/image`, {
        title,
        category_name: category,
      });
      setTitle('');
      handleNextButtonClick();
    } catch (e) {
      console.error(e);
    }
    finally {
      setIsPosting(false);
    }
  };
  useEffect(() => {
    // Update the textarea height to match its content
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [title]);

  return (
    <div>
      <div className="w-[360px] h-[60px] relative border-b">
        <CloseIcon
          className="w-[26px] h-[26px] left-[20px] top-[18px] absolute z-[1]"
          onClick={handleCloseIconClick}
          style={{ cursor: 'pointer' }}
        />

        <button
          type="button"
          className="left-[307px] top-[19px] absolute text-right text-zinc-800 text-lg font-bold leading-[25.20px] cursor-pointer"
          onClick={onPostSubject}
        >
          다음
        </button>
      </div>
      <div className="text-3xl font-medium leading-10 pl-[21px] pt-[17px]">
        <div className="w-[201px] h-[78px] text-left font-medium leading-10 whitespace-nowrap">
          이루고 싶은
          <br />
          꿈이 무엇인가요?
        </div>
      </div>
      <div
        className="text-zinc-500 text-left text-xs font-regular leading-4 pl-[21px] pt-[17px]"
        style={{ color: '#888888' }}
      >
        하고 싶고, 갖고 싶고, 가보고 싶은 꿈을 적어주세요.
        <br />
        나에게 일어날 멋진 일을 그림으로 만나보실 수 있어요.
      </div>
      <div className="w-[360px] h-px border-b border-neutral-200 mt-[13px]" />
      <div className="text-zinc-800 text-left font-medium leading-snug mt-[30px] pl-[21px]">
        카테고리를 선택해주세요.
      </div>
      <div className="pl-[21px] mt-[30px]">
        <CategoryButtons
          setCategory={setCategory}
          setCategoryID={setCategoryID}
        />
      </div>
      <div className="ml-[21px] mt-[48px] w-80 flex relative">
        <textarea
          ref={textareaRef}
          className="focus:outline-0 resize-none w-full border-b border-gray-200  mb-7"
          maxLength="50"
          placeholder="꿈을 입력하세요."
          onChange={onChange}
          value={title}
          style={{ overflowY: 'hidden' }}
        />
        <div className="text-sm text-gray-500 mt-1 mr-2 absolute bottom-0 right-0">
          {title.length}/50 {/* Display the character count */}
        </div>
      </div>
      <div className="pl-[21px] mt-[48px] w-72 h-10 text-stone-300 text-xs font-normal leading-4">
        🙏 멋진 그림 생성을 위해 줄임말이나 모호한 언어는 피해주세요!
      </div>
    </div>
    //   </div>
    //   <div
    //     className="text-zinc-500 text-left text-xs font-regular leading-4 pl-[21px] pt-[17px]"
    //     style={{ color: '#888888' }}
    //   >
    //     하고 싶고, 갖고 싶고, 가보고 싶은 꿈을 적어주세요.
    //     <br />
    //     나에게 일어날 멋진 일을 그림으로 만나보실 수 있어요.
    //   </div>
    //   <div className="w-[360px] h-px border-b border-neutral-200 mt-[13px]" />
    //   <div className="text-zinc-800 text-left font-medium leading-snug mt-[30px] pl-[21px]">
    //     카테고리를 선택해주세요.
    //   </div>
    //   <div className="pl-[21px] mt-[30px]">
    //     <CategoryButtons setCategory={setCategory} />
    //   </div>
    //   <div className="ml-[21px] mt-[48px] w-80 flex relative">
    //     <textarea
    //       ref={textareaRef}
    //       className="focus:outline-0 resize-none w-full border-b border-gray-200  mb-7"
    //       maxLength="50"
    //       placeholder="꿈을 입력하세요."
    //       onChange={onChange}
    //       value={title}
    //       style={{ overflowY: 'hidden' }}
    //     />
    //     <div className="text-sm text-gray-500 mt-1 mr-2 absolute bottom-0 right-0">
    //       {title.length}/50 {/* Display the character count */}
    //     </div>
    //   </div>
    //   <div className="pl-[21px] mt-[48px] w-72 h-10 text-stone-300 text-xs font-normal leading-4">
    //     🙏 멋진 그림 생성을 위해 줄임말이나 모호한 언어는 피해주세요!
    //   </div>
    // </div>
  );
}
PostSubject.propTypes = {
  handleCloseIconClick: PropTypes.func.isRequired,
  handleNextButtonClick: PropTypes.func.isRequired,
};
export default PostSubject;
