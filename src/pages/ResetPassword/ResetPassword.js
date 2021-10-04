import cn from 'classnames';
import styles from './ResetPassword.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useInput from '../../hooks/useInput';
import FormContainer from '../../components/FormContainer/FormContainer';
import usePassInput from '../../hooks/usePasswordInput';
import { resetUserPassword } from '../../redux/actions/userActions';
import userSelectors from '../../redux/selectors/userSelectors';

function ResetPassword() {
  const dispatch = useDispatch();

  const isAuth = useSelector(userSelectors.isAuth);
  const { loading, success, error } = useSelector(userSelectors.resetPassword);

  const passInput = usePassInput('');
  const tokenInput = useInput('');

  useEffect(() => {
    if (passInput.ref && passInput.ref.current) {
      passInput.ref.current.focus();
    }
  }, [passInput.ref]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetUserPassword({ password: passInput.value, token: tokenInput.value }));
  };

  if (isAuth) {
    return <Redirect to={'/'} />;
  }

  if (success) {
    return <Redirect to={'/login'} />;
  }

  if (!localStorage.getItem('resetEmailSent')) {
    return <Redirect to={'/forgot-password'} />;
  }

  return (
    <FormContainer title='Восстановление пароля'>
      <form className={cn(styles.form)} onSubmit={submitHandler}>
        <Input
          onChange={passInput.onChange}
          value={passInput.value}
          ref={passInput.ref}
          disabled={loading}
          error={error}
          type={passInput.type}
          name='password'
          placeholder='Введите новый пароль'
          icon={passInput.icon}
          onIconClick={passInput.onIconClick}
        />
        <Input
          onChange={tokenInput.onChange}
          value={tokenInput.value}
          ref={tokenInput.ref}
          disabled={loading}
          error={error}
          type='text'
          name='token'
          placeholder='Введите код из письма'
        />
        <Button disabled={loading}>Сохранить</Button>

        {loading && 'Loading...'}
        {success && 'Success'}
        {error && error.message}
      </form>

      <span className={cn(styles.text, 'text_color_inactive')}>
        Вспомнили пароль?{' '}
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </span>
    </FormContainer>
  );
}

export default ResetPassword;
