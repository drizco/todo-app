import { useRouter } from 'next/router';

const useRefreshData = () => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return refreshData;
};

export default useRefreshData;
