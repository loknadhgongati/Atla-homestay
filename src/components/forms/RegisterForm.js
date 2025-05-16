import React from 'react';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Optional: Define the sameAs helper inline if you still want to use it
const sameAs = (field, getValues) => value =>
  value === getValues()[field] || 'Passwords do not match.';

const RegisterForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onBlur', // Validate on blur for better UX
    reValidateMode: 'onChange', // Re-validate on change after blur
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  });

  // Watch the password field to compare with passwordConfirmation
  // eslint-disable-next-line no-unused-vars
  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          {...register('username', {
            required: 'Username is required.'
          })}
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          id="username"
        />
        {errors.username && (
          <div className="alert alert-danger mt-2">
            {errors.username.message}
          </div>
        )}
      </div>

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

      <div className="form-group">
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          {...register('passwordConfirmation', {
            required: 'Password confirmation is required.',
            minLength: {
              value: 8,
              message: 'Password confirmation must be at least 8 characters long.'
            },
            validate: sameAs('password', getValues) // Use the sameAs helper
            // Alternatively, you can use the inline validation:
            // validate: value => value === password || 'Passwords do not match.'
          })}
          type="password"
          className={`form-control ${errors.passwordConfirmation ? 'is-invalid' : ''}`}
          id="passwordConfirmation"
        />
        {errors.passwordConfirmation && (
          <div className="alert alert-danger mt-2">
            {errors.passwordConfirmation.message}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-bwm-main">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;