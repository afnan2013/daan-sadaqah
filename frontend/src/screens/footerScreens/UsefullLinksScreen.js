import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getUseFulLinks } from '../../actions/footerActions';
import ScreenContainer from '../../components/ScreenContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const UsefullLinksScreen = () => {
  const usefulLinksList = useSelector((state) => state.usefulLinksList);
  const { loading, error, usefulLinks } = usefulLinksList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUseFulLinks());
  }, [dispatch]);

  return (
    <ScreenContainer>
      <h1>Some Useful Links</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Website</th>
              <th>Link</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {usefulLinks.map((link) => (
              <tr
                key={link.serial}
                style={{
                  color: `${link.fontColor}`,
                  fontSize: `${link.fontSize}`,
                }}
              >
                <td>{link.name}</td>
                <td>
                  <a href={link.url} target="_blank">
                    {link.url}
                  </a>
                </td>
                <td>{link.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </ScreenContainer>
  );
};

export default UsefullLinksScreen;
