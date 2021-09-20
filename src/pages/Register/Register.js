import cn from 'classnames';
import styles from './Register.module.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../../components/FormContainer/FormContainer';
import useForm from '../../hooks/useForm';
import usePasswordInput from '../../hooks/usePasswordInput';
import { userRegister } from '../../redux/actions/userActions';

function Register() {
  const dispatch = useDispatch();
  const { values, onChange } = useForm();
  const passInput = usePasswordInput();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('values', values);
    dispatch(userRegister(values));
  };

  return (
    <FormContainer title='Регистрация'>
      <form className={cn(styles.form)} onSubmit={submitHandler}>
        <Input
          onChange={onChange}
          value={values.name || ''}
          type='text'
          name='name'
          placeholder='Имя'
        />
        <Input
          onChange={onChange}
          value={values.email || ''}
          type='email'
          name='email'
          placeholder='E-mail'
        />
        <Input
          onChange={onChange}
          value={values.password || ''}
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
