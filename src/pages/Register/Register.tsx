import cn from 'classnames';
import styles from './Register.module.css';

import { FC, FormEvent, useEffect } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../../components/FormContainer/FormContainer';
import useInput from '../../hooks/useInput';
import usePasswordInput from '../../hooks/usePasswordInput';
import { userRegister } from '../../redux/actions/userActions';
import { userSelectors } from '../../redux/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

interface ILocationState {
  from: { pathname: string };
}

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation<ILocationState>();

  const { isAuth } = useAppSelector(userSelectors.userInfo);
  const { loading, success, error } = useAppSelector(userSelectors.register);

  const nameInput = useInput('');
  const emailInput = useInput('');
  const passInput = usePasswordInput('');

  useEffect(() => {
    if (nameInput.ref && nameInput.ref.current) {
      nameInput.ref.current.focus();
    }
  }, [nameInput.ref]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // todo: validate inputs
    dispatch(
      userRegister({
        name: nameInput.value,
        email: emailInput.value,
        password: passInput.value,
      })
    );
  };

  if (isAuth) {
    return <Redirect to={state?.from || '/'} />;
  }

  return (
    <FormContainer title='Регистрация'>
      <form className={cn(styles.form)} onSubmit={submitHandler}>
        <Input
          onChange={nameInput.onChange}
          value={nameInput.value}
          ref={nameInput.ref}
          disabled={loading}
          error={!!error}
          type='text'
          name='name'
          placeholder='Имя'
        />
        <Input
          onChange={emailInput.onChange}
          value={emailInput.value}
          ref={emailInput.ref}
          disabled={loading}
          error={!!error}
          type='email'
          name='email'
          placeholder='E-mail'
        />
        <Input
          onChange={passInput.onChange}
          value={passInput.value}
          ref={passInput.ref}
          disabled={loading}
          error={!!error}
          type={passInput.showText ? 'text' : 'password'}
          name='password'
          placeholder='Пароль'
          icon={passInput.showText ? 'HideIcon' : 'ShowIcon'}
          onIconClick={passInput.onIconClick}
        />
        <Button>Зарегистрироваться</Button>
        {loading && 'Loading...'}
        {success && 'Success'}
        {error && error.message}
      </form>

      <span className={cn(styles.text, 'text_color_inactive')}>
        Уже зарегистрированы?{' '}
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </span>
    </FormContainer>
  );
};

export default Register;
