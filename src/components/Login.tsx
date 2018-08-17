import * as React from "react";
import brandmark from "../assets/videri_brandmark.png";
import "./Login.css";

interface State {
  emailEntry: string;
  passwordEntry: string;
  error?: string;
}

export default class Login extends React.PureComponent<{}, State> {
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
    switch (ev.target.id) {
      case "email":
        this.setState({
          emailEntry: ev.target.value.trim(),
          error: undefined
        });
        break;
      case "password":
        this.setState({
          error: undefined,
          passwordEntry: ev.target.value.trim()
        });
        break;
    }
  }

  login() {
    const { emailEntry, passwordEntry } = this.state;

    if (!isEmailValid(emailEntry)) {
      return this.setState({
        error: "Please enter a valid email address"
      });
    }

    if (!isPasswordValid(passwordEntry)) {
      return this.setState({
        error:
          "Password must contain at least 8 characters, one uppercase letter, " +
          "one lowercase letter, one number, and one special character"
      });
    }

    // TODO: Set app state as logged in
  }

  render() {
    return (
      <main className="fullScreen flexContainer centered">
        <div className="Login card">
          <div className="flexContainer">
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
}

export function isEmailValid(email: string): boolean {
  // Note: should not rely solely on javascript validation of emails
  // The only way to truly validate an email address is to send an email
  // https://www.regular-expressions.info/email.html
  const emailRegex = RegExp(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    "i"
  );

  if (!email.match(emailRegex)) {
    return false;
  }

  return true;
}

export function isPasswordValid(password: string): boolean {
  // Anything with less than eight characters
  // OR anything with no numbers
  // OR anything with no uppercase
  // OR or anything with no lowercase
  // OR anything with no special characters.
  const rejectPasswordRegex = RegExp(
    /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/
  );

  if (password.match(rejectPasswordRegex)) {
    return false;
  }

  return true;
}
