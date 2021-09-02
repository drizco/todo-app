import useError from '@/hooks/useError';
import styles from '@/styles/components/error.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const Error = () => {
  const { error } = useError();

  const animations = {
    initial: { scale: 0.8, opacity: 0 },
    exit: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', bounce: 0.4, duration: 0.4 },
  };

  return (
    <AnimatePresence>
      {error && (
        <motion.div {...animations} className={styles.error_wrapper}>
          <div className={styles.error}>{error}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Error;
