import cn from 'classnames';
import styles from './Login.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../../components/FormContainer/FormContainer';
import useInput from '../../hooks/useInput';
import usePasswordInput from '../../hooks/usePasswordInput';
import { userLogin } from '../../redux/actions/userActions';

function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const location = useLocation();

  const emailInput = useInput('');
  const passInput = usePasswordInput('');

  useEffect(() => {
    if (emailInput.ref && emailInput.ref.current) {
      emailInput.ref.current.focus();
    }
  }, [emailInput.ref]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email: emailInput.value, password: passInput.value }));
  };

  if (isAuth) {
    return <Redirect to={location.state.from || '/'} />;
  }

  return (
    <FormContainer title='Вход'>
      <form className={cn(styles.form)} onSubmit={submitHandler}>
        <Input
          onChange={emailInput.onChange}
          value={emailInput.value}
          ref={emailInput.ref}
          type='email'
          name='email'
          placeholder='E-mail'
        />
        <Input
          onChange={passInput.onChange}
          value={passInput.value}
          ref={passInput.ref}
          type={passInput.type}
          name='password'
          placeholder='Пароль'
          icon={passInput.icon}
          onIconClick={passInput.onIconClick}
        />
        <Button>Войти</Button>
      </form>
      <span className={cn(styles.text, 'text_color_inactive', 'mb-4')}>
        Вы — новый пользователь?{' '}
        <Link className={styles.link} to='/register'>
          Зарегистрироваться
        </Link>
      </span>
      <span className={cn(styles.text, 'text_color_inactive', 'mb-4')}>
        Забыли пароль?{' '}
        <Link className={styles.link} to='/forgot-password'>
          Восстановить пароль
        </Link>
      </span>
    </FormContainer>
  );
}

export default Login;
