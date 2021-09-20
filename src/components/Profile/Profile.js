import cn from 'classnames';
import styles from './Profile.module.css';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useProfileInput from '../../hooks/useProfileInput';

function Profile() {
  const dispatch = useDispatch();
  const { email, name } = useSelector((state) => state.user.userInfo);

  const userInput = useProfileInput(name);
  const emailInput = useProfileInput(email);
  const passInput = useProfileInput('');

  // useEffect(() => {
  //   if (inputRef && inputRef.current) {
  //     inputRef?.current?.focus();
  //   }
  // });

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('values', values);
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
        <Button type='secondary'>Отмена</Button>
        <Button>Сохранить</Button>
      </div>
    </form>
  );
}

export default Profile;
