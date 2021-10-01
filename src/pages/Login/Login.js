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
import userSelectors from '../../redux/selectors/userSelectors';

function Login() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuth = useSelector(userSelectors.isAuth);
  const { loading, success, error } = useSelector(userSelectors.login);

  const emailInput = useInput('');
  const passInput = usePasswordInput('');

  useEffect(() => {
    if (emailInput.ref && emailInput.ref.current) {
      emailInput.ref.current.focus();
    }
  }, [emailInput.ref]);

  const submitHandler = (e) => {
    e.preventDefault();
    // todo: validate inputs
    dispatch(userLogin({ email: emailInput.value, password: passInput.value }));
  };

  if (isAuth) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <FormContainer title='Вход'>
      <form className={cn(styles.form)} onSubmit={submitHandler}>
        <Input
          onChange={emailInput.onChange}
          value={emailInput.value}
          ref={emailInput.ref}
          type='email'
          disabled={loading}
          error={error}
          name='email'
          placeholder='E-mail'
        />
        <Input
          onChange={passInput.onChange}
          value={passInput.value}
          ref={passInput.ref}
          type={passInput.type}
          disabled={loading}
          error={error}
          name='password'
          placeholder='Пароль'
          icon={passInput.icon}
          onIconClick={passInput.onIconClick}
        />
        <Button disabled={loading}>Войти</Button>

        {loading && 'Loading...'}
        {success && 'Success'}
        {error && error.message}
      </form>

      <span className={cn(styles.text, 'text_color_inactive')}>
        Вы — новый пользователь?{' '}
        <Link className={styles.link} to='/register'>
          Зарегистрироваться
        </Link>
      </span>
      <span className={cn(styles.text, 'text_color_inactive')}>
        Забыли пароль?{' '}
        <Link className={styles.link} to='/forgot-password'>
          Восстановить пароль
        </Link>
      </span>
    </FormContainer>
  );
}

export default Login;
