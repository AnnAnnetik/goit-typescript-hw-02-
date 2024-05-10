import { FC } from 'react';
import style from './LoadMoreBtn.module.css';

interface ButtonProps{
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button className={style.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default Button;
