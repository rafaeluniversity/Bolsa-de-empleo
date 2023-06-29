import React, {useState} from 'react';

export default function useFormFields(initialValues) {
  const [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = key => e => {
    if (typeof e === 'boolean') {
      const value = e;
      setFormFields(prev => ({...prev, [key]: value}));
      return
    }
    if (!e.target.validity.valid) {
      return;
    }
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormFields(prev => ({...prev, [key]: value}));
  };
  const createChangeState = state => {
    setFormFields(state);
  };

  return {formFields, createChangeHandler, createChangeState};
}
