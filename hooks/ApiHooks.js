import {useState, useEffect} from 'react';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const response = await fetch(apiUrl + 'media');
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
          const response = await fetch(apiUrl + 'media/' + item.file_id);
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

export {useLoadMedia};
