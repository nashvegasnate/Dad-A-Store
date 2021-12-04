import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProfileCard from '../components/ProfileCard';

const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  padding: 10px;
  margin: 10px;
  z-index: -1;
  `;

function ProfileView({ user, userFromDB, setUserFromDB }) {
  return (
    <div>
      <h2>My Profile</h2>
      <ProfileContainer>
      {
        <ProfileCard user={user} userFromDB={userFromDB} setUserFromDB={setUserFromDB} />
      }
      </ProfileContainer>
    </div>
  );
}

ProfileView.propTypes = {
  user: PropTypes.any,
  userFromDB: PropTypes.any,
  setUserFromDB: PropTypes.any
};

export default ProfileView;
