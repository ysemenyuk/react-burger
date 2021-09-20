import cn from 'classnames';
import styles from './Register.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../../components/FormContainer/FormContainer';
import useInput from '../../hooks/useInput';
import usePasswordInput from '../../hooks/usePasswordInput';
import { userRegister } from '../../redux/actions/userActions';

function Register() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuth = useSelector((state) => state.userInfo.isAuth);

  const nameInput = useInput('');
  const emailInput = useInput('');
  const passInput = usePasswordInput('');

  useEffect(() => {
    if (nameInput.ref && nameInput.ref.current) {
      nameInput.ref.current.focus();
    }
  }, [nameInput.ref]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('values', values);
    dispatch(
      userRegister({
        name: nameInput.value,
        email: emailInput.value,
        password: passInput.value,
      })
    );
  };

  if (isAuth) {
    return <Redirect to={location.state?.from || '/'} />;
  }

  return (
    <FormContainer title='Регистрация'>
      <form className={cn(styles.form)} onSubmit={submitHandler}>
        <Input
          onChange={nameInput.onChange}
          value={nameInput.value}
          ref={nameInput.ref}
          type='text'
          name='name'
          placeholder='Имя'
        />
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
        <Button>Зарегистрироваться</Button>
      </form>
      <span className={cn(styles.text, 'text_color_inactive', 'mb-4')}>
        Уже зарегистрированы?{' '}
        <Link className={styles.link} to='/login'>
          Войти
        </Link>
      </span>
    </FormContainer>
  );
}

export default Register;
