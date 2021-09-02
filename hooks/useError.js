import { useContext } from 'react';
import { ErrorContext } from '@/context/ErrorContext';

const useError = () => useContext(ErrorContext);

export default useError;
