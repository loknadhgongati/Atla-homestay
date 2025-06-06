// pages/Login.js
import React from 'react';
import LoginForm from 'components/forms/LoginForm';
import { Navigate } from 'react-router-dom';
import ApiErrors from 'components/forms/ApiErrors';
import { withAuth } from 'providers/AuthProvider';
import { withRouter } from 'utils/withRouter';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
      errors: []
    };
  }

  signIn = (loginData) => {
    this.props.auth.signIn(loginData)
      .then(() => {
        this.setState({ shouldRedirect: true });
      })
      .catch(errors => this.setState({ errors }));
  }

  render() {
    const { errors, shouldRedirect } = this.state;
    const message = this.props.location?.state?.message;

    if (shouldRedirect) {
      return <Navigate to={{ pathname: '/' }} />;
    }

    return (
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5">
            <h1 className="page-title">Login</h1>
            {message &&
              <div className="alert alert-success">
                {message}
              </div>
            }
            <LoginForm onSubmit={this.signIn} />
            <ApiErrors errors={errors} />
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
              <img src="/images/login-image.jpg" alt="Login an user" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withAuth(Login));
