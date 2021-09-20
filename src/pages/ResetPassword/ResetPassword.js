import cn from 'classnames';
import styles from './ResetPassword.module.css';

import { Link } from 'react-router-dom';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../hooks/useForm';
import FormContainer from '../../components/FormContainer/FormContainer';
import usePassInput from '../../hooks/usePasswordInput';

function ResetPassword() {
  const { values, onChange } = useForm();
  const passInput = usePassInput();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('values', values);
  };

  return (
    <FormContainer title='Восстановление пароля'>
      <form className={cn(styles.form)} onSubmit={submitHandler}>
        <Input
          onChange={onChange}
          value={values.password || ''}
          type={passInput.type}
          name='password'
          placeholder='Введите новый пароль'
          icon={passInput.icon}
          onIconClick={passInput.onIconClick}
          error={false}
          errorText={'Ошибка'}
        />
        <Input
          onChange={onChange}
          value={values.token || ''}
          type='text'
          name='token'
          placeholder='Введите код из письма'
        />
        <Button>Сохранить</Button>
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

export default ResetPassword;
