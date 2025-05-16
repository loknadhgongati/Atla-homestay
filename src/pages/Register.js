import React from 'react';
import RegisterForm from 'components/forms/RegisterForm';
import ApiErrors from 'components/forms/ApiErrors';
import { Navigate } from 'react-router-dom';
import { withAuth } from 'providers/AuthProvider';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
      redirectState: null,
      errors: []
    };
  }

  signUp = (registerData) => {
    this.props.auth.signUp(registerData)
      .then(() => {
        this.setState({
          shouldRedirect: true,
          redirectState: { message: 'You have been successfully registered!' }
        });
      })
      .catch(errors => this.setState({ errors }));
  }

  render() {
    const { shouldRedirect, redirectState, errors } = this.state;

    if (shouldRedirect) {
      return <Navigate to="/login" state={redirectState} />;
    }

    return (
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Register</h1>
            <RegisterForm onSubmit={this.signUp} />
            <ApiErrors errors={errors} />
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">Register to find hundreds of awesome places!</h2>
              <img src="/images/register-image.jpg" alt="Register a user" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Register);
