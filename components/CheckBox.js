import styles from '@/styles/components/checkbox.module.scss';
import classNames from 'classnames';
import { CheckIcon, RoundIcon } from '@/components/Icons';

const CheckBox = ({ className, checked, onChange, name }) => {
  return (
    <div className={classNames(className, styles.input_container)}>
      <input
        type="checkbox"
        className={styles.hidden_checkbox}
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
      />
      <RoundIcon className={styles.checkbox} />
      <CheckIcon className={classNames(styles.check, { [styles.is_checked]: checked })} />
      <label className={classNames(styles.customCheck)} htmlFor={name}></label>
    </div>
  );
};

export default CheckBox;
