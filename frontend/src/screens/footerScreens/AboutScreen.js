import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../../actions/footerActions';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const AboutScreen = () => {
  const aboutSite = useSelector((state) => state.aboutSite);
  const { loading, error, about } = aboutSite;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  return (
    <FormContainer>
      <h1>About Our Website</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div
          style={{
            color: `${about.fontColor}`,
            fontSize: `${about.fontSize}`,
          }}
        >
          {about.aboutText}
        </div>
      )}
    </FormContainer>
  );
};

export default AboutScreen;
