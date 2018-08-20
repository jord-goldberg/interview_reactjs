import * as React from 'react';
import videri_brandmark_blackSvg from '../../assets/videri_brandmark_black.svg';
import './SignIn.css';

export interface Props {
  signIn: (email: string) => void;
}

interface State {
  emailEntry: string;
  passwordEntry: string;
  error?: string;
}

export default class SignIn extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.updateField = this.updateField.bind(this);
    this.onPasswordKeyEvent = this.onPasswordKeyEvent.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      emailEntry: '',
      passwordEntry: '',
    };
  }

  updateField(ev: React.ChangeEvent<HTMLInputElement>) {
    switch (ev.target.id) {
      case 'email':
        this.setState({
          emailEntry: ev.target.value.trim(),
          error: undefined,
        });
        break;
      case 'password':
        this.setState({
          error: undefined,
          passwordEntry: ev.target.value.trim(),
        });
        break;
    }
  }

  onPasswordKeyEvent(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key === 'Enter') {
      this.login();
    }
  }

  login() {
    const { emailEntry, passwordEntry } = this.state;

    if (!isEmailValid(emailEntry)) {
      return this.setState({
        error: 'Please enter a valid email address',
      });
    }

    if (!isPasswordValid(passwordEntry)) {
      return this.setState({
        error:
          'Password must contain at least 8 characters, one uppercase letter, ' +
          'one lowercase letter, one number, and one special character',
      });
    }

    this.props.signIn(emailEntry);
  }

  render() {
    return (
      <main className="sign-in fullScreen flexContainer centered">
        <div className="card content">
          <div className="flexContainer">
            <img className="brandmark" src={videri_brandmark_blackSvg} alt="brandmark" />
            <span className="title">ORCHESTRATOR</span>
          </div>
          <div className="subtitle">
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
                  onKeyPress={this.onPasswordKeyEvent}
                />

                <div className="error">{this.state.error}</div>

                <button type="button" onClick={this.login}>
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
    // Long regex on single line, don't complain tslint!
    // tslint:disable-next-line
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    'i',
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
    /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/,
  );

  if (password.match(rejectPasswordRegex)) {
    return false;
  }

  return true;
}
