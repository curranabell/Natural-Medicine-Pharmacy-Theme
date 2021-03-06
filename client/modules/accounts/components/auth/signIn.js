import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button, TextField, Translation } from "/imports/plugins/core/ui/client/components";

class SignIn extends Component {
  static propTypes = {
    credentials: PropTypes.object,
    isLoading: PropTypes.bool,
    loginFormMessages: PropTypes.func,
    messages: PropTypes.object,
    onError: PropTypes.func,
    onForgotPasswordClick: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onSignUpClick: PropTypes.func,
    uniqueId: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      email: props.credentials.email,
      password: props.credentials.password
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFieldChange = (event, value, field) => {
    this.setState({
      [field]: value
    });
  }

  handleSubmit = (event) => {
    if (this.props.onFormSubmit) {
      this.props.onFormSubmit(event, this.state.email, this.state.password);
    }
  }

  renderEmailErrors() {
    if (this.props.onError(this.props.messages.errors && this.props.messages.errors.email)) {
      return (
        <span className="help-block">
          <Translation
            defaultValue={this.props.messages.errors.email.reason}
            i18nKey={this.props.messages.errors.email.i18nKeyReason}
          />
        </span>
      );
    }
  }

  renderPasswordErrors() {
    return (
      <span className="help-block">
        {this.props.onError(this.props.messages.errors && this.props.messages.errors.password) &&
          this.props.messages.errors.password.map((error, i) => (
            <Translation
              key={i}
              defaultValue={error.reason}
              i18nKey={error.i18nKeyReason}
            />
          ))
        }
      </span>
    );
  }

  renderFormMessages() {
    if (this.props.loginFormMessages) {
      return (
        <div>
          {this.props.loginFormMessages()}
        </div>
      );
    }
  }

  renderSpinnerOnWait() {
    if (this.props.isLoading === true) {
      return (
        <div style={{ textAlign: "center" }}>
          <i className="fa fa-spinner fa-spin" />
        </div>
      );
    }
    return (
      <Button
        className="btn-block"
        primary={true}
        bezelStyle="solid"
        i18nKeyLabel="accountsUI.signIn"
        label="Sign In"
        type="submit"
        tabIndex="3"
        eventAction="submitSignInForm"
      />
    );
  }

  render() {
    const emailClasses = classnames({
      "form-group": true,
      "form-group-email": true,
      "has-error has-feedback": this.props.onError(this.props.messages.errors && this.props.messages.errors.email)
    });

    const passwordClasses = classnames({
      "form-group": true,
      "has-error has-feedback": this.props.onError(this.props.messages.errors && this.props.messages.errors.password)
    });
    return (
      <div>
        <div className="loginForm-title">
          <h2>
            <Translation defaultValue="Sign In" i18nKey="accountsUI.signIn" />
          </h2>
        </div>

        <form className="login-form" onSubmit={this.handleSubmit} noValidate>

          {this.renderFormMessages()}

          <div className={emailClasses}>
            <TextField
              i18nKeyLabel="accountsUI.emailAddress"
              label="Email"
              name="email"
              type="email"
              tabIndex="1"
              id={`email-${this.props.uniqueId}`}
              value={this.state.email}
              onChange={this.handleFieldChange}
            />
          {this.renderEmailErrors()}
          </div>

          <div className={passwordClasses}>
            <TextField
              i18nKeyLabel="accountsUI.password"
              label="Password"
              name="password"
              type="password"
              tabIndex="2"
              id={`password-${this.props.uniqueId}`}
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          {this.renderPasswordErrors()}
          </div>

          <div className="form-group">
            {this.renderSpinnerOnWait()}
          </div>

          <div className="form-group flex flex-justify-spaceBetween">
            <a
              href="#"
              tabIndex="4"
              onClick={this.props.onForgotPasswordClick}
            >
              <Translation defaultValue="Reset Password" i18nKey="accountsUI.forgotPassword" />
            </a>
            <a
              href="#"
              tabIndex="5"
              onClick={this.props.onSignUpClick}
            >
              <Translation defaultValue="Register" i18nKey="accountsUI.signUp" />
            </a>
          </div>

        </form>
      </div>
    );
  }
}

export default SignIn;
