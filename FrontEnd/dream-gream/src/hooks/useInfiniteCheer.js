/* eslint-disable */
import { API_URL } from '../config';
import axiosInstance from '../utils/axiosInterceptor';

export const UseInfiniteCheer = async (
  loginFlag,
  lastPostID,
  size,
  categoryID,
) => {

  let res;
  if (lastPostID === null) {
    res = await axiosInstance.get(`${API_URL}/api/posts`, {
      params: {
        'login-flag': loginFlag,
        'category-id': categoryID,
      },
    });
  } else {
    res = await axiosInstance.get(
      `${API_URL}/api/posts/?last-post-id=${lastPostID}`,
      {
        params: {
          'login-flag': loginFlag,
          'category-id': categoryID,
        },
      },
    );
  }

  const postList = res.data.data.post_list.content;
  const nextLastPostId = postList[postList.length - 1]?.post_id;
  return { postList, nextLastPostId, isLast: postList.length < size };
};
