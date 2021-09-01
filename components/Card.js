import styles from '@/styles/components/card.module.scss';
import { motion, usePresence } from 'framer-motion';

const Card = ({ children }) => {
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: 'out',
    animate: isPresent ? 'in' : 'out',
    variants: {
      in: { scale: 1, opacity: 1 },
      out: { scale: 0.8, opacity: 0, zIndex: -1 },
    },
    transition: { type: 'spring', bounce: 0.4, duration: 0.4 },
    onAnimationComplete: () => !isPresent && safeToRemove(),
  };

  return (
    <motion.li {...animations} className={styles.card}>
      {children}
    </motion.li>
  );
};

export default Card;
