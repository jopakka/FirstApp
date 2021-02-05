import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  title: {
    presence: {
      message: 'Title must exists',
    },
    length: {
      minimum: 3,
      message: 'must be atlest 3 characters long.',
    },
  },
  description: {
    presence: {
      message: 'Description must exists',
    },
    length: {
      minimum: 5,
      message: 'must be atlest 5 characters long.',
    },
  },
};

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, text) => {
    console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });

    const error = validator(name, text, constraints);
    setErrors((errors) => {
      return {
        ...errors,
        [name]: error,
      };
    });
  };

  const reset = () => {
    setInputs({
      title: '',
      description: '',
    });
    setErrors({});
  };

  return {
    handleInputChange,
    inputs,
    errors,
    reset,
  };
};

export default useUploadForm;
