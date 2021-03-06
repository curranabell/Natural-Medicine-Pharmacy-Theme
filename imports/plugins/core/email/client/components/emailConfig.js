import React, { Component, PropTypes } from "react";
import "./emailConfig.css";
import { Card, CardHeader, CardBody, CardGroup, Icon, Translation } from "/imports/plugins/core/ui/client/components";
import EmailSettings from "../containers/emailSettings";


class EmailConfig extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      showSettings: false
    };

    this.togglePassword = this.togglePassword.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }


  togglePassword() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  toggleSettings() {
    this.setState({
      showSettings: !this.state.showSettings
    });
  }

  renderSettingsDisplay() {
    const { settings, status } = this.props;
    const { service, host, port, user, password } = settings;
    const { showPassword } = this.state;

    const NotSet = () => <span data-i18n="admin.settings.fieldNotSet">Not set</span>;

    return (
      <div>
        <div className="pull-right">
          <a onClick={this.toggleSettings}><Icon icon="gear"/></a>
        </div>
        <div className="email-config-status">
          <strong><Translation defaultValue={"Status"} i18nKey={"admin.settings.status"} /></strong>: {status ?
              <i className={`fa fa-circle ${status}`} />
            : <i className={"fa fa-refresh fa-spin"} />}
        </div>
        <div>
          <strong><Translation defaultValue={"Service"} i18nKey={"admin.settings.service"} /></strong>: {service || <NotSet/>}
        </div>
        <div className="truncate">
          <strong><Translation defaultValue={"Host"} i18nKey={"admin.settings.host"} /></strong>: {host || <NotSet/>}
        </div>
        <div>
          <strong><Translation defaultValue={"Port"} i18nKey={"admin.settings.port"} /></strong>: {port || <NotSet/>}
        </div>
        <div className="truncate">
          <strong><Translation defaultValue={"User"} i18nKey={"admin.settings.user"} /></strong>: {user || <NotSet/>}
        </div>
        <div>
          <strong><Translation defaultValue={"Password"} i18nKey={"admin.settings.password"} /></strong>:&nbsp;&nbsp;
          {password ?
            <span>
              {showPassword ? password : "********"}
              <a onClick={this.togglePassword}>
                <span style={{ marginLeft: "1rem" }}>
                  <em>{showPassword ?
                      <span data-i18n="admin.settings.passwordHide">Hide</span>
                    : <span data-i18n="admin.settings.passwordShow">Show</span>}
                  </em>
                </span>
              </a>
            </span>
            : <NotSet/>}
        </div>
      </div>
    );
  }

  renderSettingsUpdate() {
    const { showSettings } = this.state;

    if (showSettings === true) {
      return (
        <div>
          <hr />
          <h4>
            <Translation
              defaultValue={"Edit Settings"}
              i18nKey={"admin.settings.editSettings"}
            />
          </h4>
          <EmailSettings showSettings={showSettings} />
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <CardGroup>
        <Card
          expanded={true}
        >
          <CardHeader
            actAsExpander={true}
            i18nKeyTitle="admin.settings.mailProvider"
            title="Mail Provider"
          />
          <CardBody expandable={true}>
            {this.renderSettingsDisplay()}
            {this.renderSettingsUpdate()}
          </CardBody>
        </Card>
      </CardGroup>
    );
  }
}

EmailConfig.propTypes = {
  settings: PropTypes.shape({
    host: PropTypes.string,
    password: PropTypes.string,
    port: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    service: PropTypes.string,
    user: PropTypes.string
  }),
  status: PropTypes.string
};

export default EmailConfig;
