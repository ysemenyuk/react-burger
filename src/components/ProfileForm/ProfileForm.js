import cn from 'classnames';
import styles from './ProfileForm.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useProfileInput from '../../hooks/useProfileInput';
import { updateUserInfo } from '../../redux/actions/userActions';

function ProfileForm() {
  const dispatch = useDispatch();
  const { email, name } = useSelector((state) => state.userInfo.userInfo);
  const { loading, success, error } = useSelector((state) => state.userUpdateProfile);

  const userInput = useProfileInput(name);
  const emailInput = useProfileInput(email);
  const passInput = useProfileInput('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserInfo({
        name: userInput.value,
        email: emailInput.value,
        // password: passInput.value,
      })
    );
  };

  const resetHandler = (e) => {
    e.preventDefault();
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
        icon={userInput.icon}
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
        icon={emailInput.icon}
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
        icon={passInput.icon}
        onIconClick={passInput.onIconClick}
      />
      <div className={styles.buttons}>
        <Button type='secondary' onClick={resetHandler}>
          Отмена
        </Button>
        <Button type='primary'>Сохранить</Button>
      </div>
      {loading && 'Loading'}
      {success && 'Success'}
      {error && 'Error'}
    </form>
  );
}

export default ProfileForm;
