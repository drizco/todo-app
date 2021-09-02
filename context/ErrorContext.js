import { createContext, useEffect, useState } from 'react';

export const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 1700);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [error, setError]);

  const toastError = (message = 'Uh oh, something went wrong. Please try again.') => {
    setError(message);
  };

  return (
    <ErrorContext.Provider value={{ error, toastError }}>
      {children}
    </ErrorContext.Provider>
  );
};
