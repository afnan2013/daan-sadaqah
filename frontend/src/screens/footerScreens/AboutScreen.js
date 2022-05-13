import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../../actions/footerActions';
import ScreenContainer from '../../components/ScreenContainer';
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
    <ScreenContainer>
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
    </ScreenContainer>
  );
};

export default AboutScreen;
