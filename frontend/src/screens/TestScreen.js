import React from 'react';
import ScreenContainer from '../components/ScreenContainer';

class TestScreen extends React.Component {

  convertToLocaleString = (string)=> {
    const reverse = string.split('').reverse().join('');
    const arr = [...reverse];
    console.log("reverse  ", arr.length);
    let result = '';
    for(let i=0; i< arr.length; i++){
      if(i >0 && i%3===0){
        result += ",";
      }
      result += arr[i];
      // console.log(result)
    }
    return result.split('').reverse().join('');
  }


  render() {
    const { title } = this.props;

    const fund = this.convertToLocaleString("2221120000");
    console.log(fund)

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
