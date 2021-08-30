import { useContext } from 'react';
import DataContext from '@/context/DataContext';

const useData = () => useContext(DataContext);

export default useData;
