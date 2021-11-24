import React from 'react';
import PropTypes from 'prop-types';
import ProfileCard from '../components/ProfileCard';

function ProfileView({ user, userFromDB, setUserFromDB }) {
  return (
    <div>
      <h2>Profile</h2>
      {
        <ProfileCard user={user} userFromDB={userFromDB} setUserFromDB={setUserFromDB} />
      }
    </div>
  );
}

ProfileView.propTypes = {
  user: PropTypes.any,
  userFromDB: PropTypes.any,
  setUserFromDB: PropTypes.any
};

export default ProfileView;
