import { useState, useCallback } from 'react';

function useForm() {
  const [values, setValues] = useState({});

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback(() => setValues({}), [setValues]);

  return {
    values,
    onChange,
    resetForm,
  };
}

export default useForm;
