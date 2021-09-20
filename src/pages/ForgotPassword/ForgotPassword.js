import cn from 'classnames';
import styles from './ForgotPassword.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../../components/FormContainer/FormContainer';
import useInput from '../../hooks/useInput';

import { forgotUserPassword } from '../../redux/actions/userActions';

function ForgotPassword() {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.userInfo.isAuth);

  const emailInput = useInput('');

  useEffect(() => {
    if (emailInput.ref && emailInput.ref.current) {
      emailInput.ref.current.focus();
    }
  }, [emailInput.ref]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotUserPassword({ email: emailInput.value }));
  };

  if (isAuth) {
    return <Redirect to={'/'} />;
  }

  if (localStorage.getItem('resetEmailSent')) {
    return <Redirect to={'/reset-password'} />;
  }

  return (
    <FormContainer title='Восстановление пароля'>
      <form className={cn(styles.form)} onSubmit={submitHandler}>
        <Input
          onChange={emailInput.onChange}
          value={emailInput.value}
          ref={emailInput.ref}
          type='email'
          name='email'
          placeholder='E-mail'
        />
        <Button>Восстановить</Button>
      </form>
      <span className={cn(styles.text, 'text_color_inactive', 'mb-4')}>
        Вспомнили пароль?{' '}
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </span>
    </FormContainer>
  );
}

export default ForgotPassword;
