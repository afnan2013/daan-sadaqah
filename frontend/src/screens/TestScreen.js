import React from 'react';
import ScreenContainer from '../components/ScreenContainer';

class TestScreen extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <div
          tabIndex={0}
          onFocus={() => {
            console.log('main', 'focus');
          }}
          onBlur={() => {
            console.log('main', 'blur');
          }}
          style={{
            border: '1px solid coral',
            padding: '10px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Click here 1
        <input
          type="text"
          onFocus={() => {
            console.log('input', 'focus');
          }}
          onBlur={() => {
            console.log('input', 'blur');
          }}
          placeholder="Click here 2"
          style={{ margin: '0 10px', padding: '10px' }}
        /> */}
          Click here 3
        </div>
      </>
    );
  }
}

export default TestScreen;
