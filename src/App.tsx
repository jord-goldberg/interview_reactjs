import * as React from 'react';
import './App.css';
import Media from './components/media/Media';
import SignIn from './components/signin/SignIn';

interface State {
  user?: string;
}

class App extends React.PureComponent<{}, State> {
  constructor(props: object) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      user: undefined,
    };
  }

  signIn(email: string) {
    this.setState({
      user: email,
    });
  }

  signOut() {
    this.setState({
      user: undefined,
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        {user ? (
          <Media email={user} signOut={this.signOut} />
        ) : (
          <SignIn signIn={this.signIn} />
        )}
      </div>
    );
  }
}

export default App;
