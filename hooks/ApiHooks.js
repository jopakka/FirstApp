import {useState, useEffect} from 'react';
import {baseUrl} from '../utils/variables';

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const json = await response.json();
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
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const json = await response.json();
          return json;
        } catch (e) {
          console.error('List loadThumb', e.message);
        }
      })
    );
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return mediaArray;
};

const useLogin = () => {
  const postLogin = async (userCreds) => {
    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCreds),
    };

    try {
      const response = await fetch(baseUrl + 'login', options);
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      throw new Error(data.message);
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
      const response = await fetch(baseUrl + 'users/user', options);
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      throw new Error(data.message);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {postLogin, checkToken};
};

export {useLoadMedia, useLogin};
