import cn from 'classnames';
import styles from './ForgotPassword.module.css';

import { Link } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import FormContainer from '../../components/FormContainer/FormContainer';
import useForm from '../../hooks/useForm';

function ForgotPassword() {
  const { values, onChange } = useForm();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('values', values);
  };

  return (
    <FormContainer title='Восстановление пароля'>
      <form className={cn(styles.form)} onSubmit={submitHandler}>
        <Input
          onChange={onChange}
          value={values.email || ''}
          name='email'
          type='email'
          placeholder='Укажите E-mail'
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
