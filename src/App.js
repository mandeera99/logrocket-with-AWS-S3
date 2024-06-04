// import logo from './logo.svg';
// import React, { Component } from 'react';
// import './App.css';
// import LogRocket from 'logrocket';

// class App extends Component {
//   componentWillMount() {
//     LogRocket.init('qf8hp3/logrocketpoc');
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Hello world, this is the LogRocket demo. Let's check if the recording correctly works or not.
//           </p>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
import React, { Component } from 'react';
import LogRocket from 'logrocket';
import { uploadToS3 } from './s3Upload';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount() {
    LogRocket.init('qf8hp3/logrocketpoc');
  }

  handleSessionExport = () => {
    LogRocket.getSessionURL(sessionURL => {
      console.log('Session URL:', sessionURL);

      fetch(sessionURL)
        .then(response => response.blob())
        .then(blob => {
          const fileName = `logrocket-session-${Date.now()}.mp4`;
          return uploadToS3(fileName, blob);
        })
        .then(data => {
          console.log('Successfully uploaded to S3:', data);
        })
        .catch(err => {
          console.error('Error uploading to S3:', err);
        });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello world, this is the LogRocket demo. Let's check if the recording correctly works or not.
          </p>
          <button onClick={this.handleSessionExport}>Export Session</button>
        </header>
      </div>
    );
  }
}

export default App;
