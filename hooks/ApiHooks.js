import axios from 'axios';
import {useState, useEffect} from 'react';
import {baseUrl} from '../utils/variables';

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const json = await doFetch(baseUrl + 'media');
      const media = await loadMediaInfo(json);
      setMediaArray(media);
    } catch (e) {
      console.error('List loadMedia', e.message);
    }
  };

  const loadMediaInfo = async (array) => {
    return await Promise.all(
      array.map(async (item) => {
        try {
          return await doFetch(baseUrl + 'media/' + item.file_id);
        } catch (e) {
          console.error('List loadThumb', e.message);
        }
      })
    );
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return {mediaArray, loadMediaInfo};
};

const useUser = () => {
  const postLogin = async (userCreds) => {
    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCreds),
    };

    try {
      return await doFetch(baseUrl + 'login', options);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getUserInfoById = async (id, token) => {
    const options = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'users/' + id, options);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const checkToken = async (token) => {
    const options = {
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'users/user', options);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      return await doFetch(baseUrl + 'users', fetchOptions);
    } catch (e) {
      // console.log('ApiHooks register', e.message);
      throw new Error(e.message);
    }
  };

  const checkIfUsernameExists = async (username) => {
    try {
      return await doFetch(baseUrl + 'users/username/' + username);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {
    postLogin,
    checkToken,
    register,
    getUserInfoById,
    checkIfUsernameExists,
  };
};

const useTag = () => {
  const getFilesByTag = async (tagId, token) => {
    const options = {
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + 'tags/' + tagId, options);
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return {getFilesByTag};
};

const getUserData = async (id, token) => {
  const options = {
    headers: {
      'x-access-token': token,
    },
  };
  try {
    return await doFetch(baseUrl + 'users/' + id, options);
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (inputs) => {
  const {postLogin} = useUser();

  try {
    const user = await postLogin(inputs);
    return user;
  } catch (e) {
    // console.error('postLogin', e.message);
    throw new Error(e.message);
  }
};

// General function for fetching
const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    throw new Error(json.error + ': ' + json.message);
  } else if (!response.ok) {
    throw new Error('doFetch failed');
  }
  return json;
};

const useMedia = () => {
  const upload = async (fd, token) => {
    const options = {
      method: 'POST',
      headers: {'x-access-token': token},
      data: fd,
      url: baseUrl + 'media',
    };
    try {
      const response = await axios(options);
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return {upload};
};

export {useLoadMedia, useUser, useTag, login, getUserData, useMedia};
