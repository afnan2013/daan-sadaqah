import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { about } from '../../actions/footerActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';

const AboutScreen = () => {
  
  const about = useSelector((state)=> state.about);
  
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(about)
  });


  return <FormContainer>About Screen</FormContainer>;
};

export default AboutScreen;
