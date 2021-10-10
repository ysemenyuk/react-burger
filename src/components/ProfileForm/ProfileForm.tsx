import cn from 'classnames';
import styles from './ProfileForm.module.css';

import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useProfileInput from '../../hooks/useProfileInput';
import { updateUserInfo } from '../../redux/actions/userActions';
import { userSelectors } from '../../redux/selectors';

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const { email, name } = useSelector(userSelectors.userInfo);
  const { loading, success, error } = useSelector(userSelectors.updateProfile);

  const userInput = useProfileInput(name);
  const emailInput = useProfileInput(email);
  const passInput = useProfileInput('');

  const submitHandler = () => {
    // todo: validate inputs
    dispatch(
      updateUserInfo({
        name: userInput.value,
        email: emailInput.value,
        ...(passInput.value && { password: passInput.value }),
      })
    );
  };

  const resetHandler = () => {
    userInput.onReset();
    emailInput.onReset();
    passInput.onReset();
  };

  return (
    <form className={cn(styles.form)} onSubmit={submitHandler}>
      <Input
        onChange={userInput.onChange}
        value={userInput.value}
        ref={userInput.ref}
        type='text'
        name='username'
        placeholder='Имя'
        disabled={userInput.disabled}
        icon={userInput.disabled ? 'EditIcon' : 'CloseIcon'}
        onIconClick={userInput.onIconClick}
      />
      <Input
        onChange={emailInput.onChange}
        value={emailInput.value}
        ref={emailInput.ref}
        type='email'
        name='email'
        placeholder='E-mail'
        disabled={emailInput.disabled}
        icon={emailInput.disabled ? 'EditIcon' : 'CloseIcon'}
        onIconClick={emailInput.onIconClick}
      />
      <Input
        onChange={passInput.onChange}
        value={passInput.value}
        ref={passInput.ref}
        type='password'
        name='password'
        placeholder='Пароль'
        disabled={passInput.disabled}
        icon={passInput.disabled ? 'EditIcon' : 'CloseIcon'}
        onIconClick={passInput.onIconClick}
      />

      <div className={styles.buttons}>
        <Button type='secondary' onClick={resetHandler}>
          Отмена
        </Button>
        <Button type='primary'>Сохранить</Button>
      </div>

      {loading && 'Loading...'}
      {success && 'Success'}
      {error && error.message}
    </form>
  );
};

export default ProfileForm;
