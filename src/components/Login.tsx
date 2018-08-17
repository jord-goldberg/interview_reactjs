import * as React from "react";
import brandmark from "../assets/videri_brandmark.png";
import "./Login.css";

interface State {
  emailEntry: string;
  passwordEntry: string;
  error?: string;
}

export default class Login extends React.Component<{}, State> {
  constructor(props: object) {
    super(props);
    this.updateField = this.updateField.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      emailEntry: "",
      passwordEntry: ""
    };
  }

  updateField(ev: React.ChangeEvent<HTMLInputElement>) {
    switch (ev.target.name) {
      case "email":
        this.setState({ emailEntry: ev.target.value.trim() });
        break;
      case "password":
        this.setState({ passwordEntry: ev.target.value.trim() });
        break;
    }
  }

  login() {
    const { emailEntry, passwordEntry } = this.state;

    if (this.isEmailValid(emailEntry) && this.isPasswordValid(passwordEntry)) {
      this.setState({
        error: undefined
      });
      // TODO: Set app state as logged in
    }
  }

  render() {
    return (
      <main className="fullScreen flexContainer centered">
        <div className="Login card">
          <div className="flexContainer header">
            <img className="brandmark" src={brandmark} />
            <span className="title">ORCHESTRATOR</span>
          </div>
          <div className="sign-in">
            <span>SIGN IN</span>
          </div>
          <div>
            <form>
              <div className="flexContainer">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="ID"
                  onChange={this.updateField}
                />
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                  onChange={this.updateField}
                />

                <div className="error">{this.state.error}</div>

                <button className="button" type="button" onClick={this.login}>
                  SIGN IN
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  private isEmailValid(email: string): boolean {
    // Note: should not rely solely on javascript validation of emails
    // The only way to truly validate an email address is to send an email
    // https://www.regular-expressions.info/email.html
    const emailRegex = RegExp(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      "i"
    );

    if (!email.match(emailRegex)) {
      this.setState({
        error: "Please enter a valid email address"
      });
      return false;
    }

    return true;
  }

  private isPasswordValid(password: string): boolean {
    // At least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex =
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&]";

    if (password.length < 8) {
      this.setState({
        error: "Password must be at least 8 characters"
      });
      return false;
    }

    if (!password.match(passwordRegex)) {
      this.setState({
        error:
          "Password must contain at least one uppercase letter, " +
          "one lowercase letter, one number, and one special character"
      });
      return false;
    }

    return true;
  }
}
