import React from 'react';
import { useForm } from 'react-hook-form';

const EMAIL_PATTERN = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur', // Validate on blur for better UX
    reValidateMode: 'onChange', // Re-validate on change after blur
    defaultValues: {
      email: '',
      password: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Must be a valid email format!'
            }
          })}
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
        />
        {errors.email && (
          <div className="alert alert-danger mt-2">
            {errors.email.message}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          {...register('password', {
            required: 'Password is required.',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long.'
            }
          })}
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id="password"
        />
        {errors.password && (
          <div className="alert alert-danger mt-2">
            {errors.password.message}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-bwm-main">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;