import styles from '@/styles/components/card.module.scss';

const Card = ({ children }) => <li className={styles.card}>{children}</li>;

export default Card;
