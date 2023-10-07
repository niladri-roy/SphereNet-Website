import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const EditProfile = ({ userId }) => {
  const [setUsers] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null); // Initialize with null
  const [gender, setGender] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/${userId}`);
      const userData = response.data.user;
      setUsers(userData);
      // Set initial values for form fields based on fetched user data
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setLocation(userData.location || '');
      setDateOfBirth(userData.dateOfBirth ? new Date(userData.dateOfBirth) : null);
      setGender(userData.gender || '');
      setHeadline(userData.headline || '');
      setBio(userData.bio || '');
    } catch (error) {
      console.log(error);
    }
  }

  const formatDateToString = (date) => {
    return format(date, 'MM/dd/yyyy'); // Customize the format as needed
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    try {
      // Create an object with updated user data
      const updatedUser = {
        firstName,
        lastName,
        location,
        dateOfBirth: dateOfBirth ? formatDateToString(dateOfBirth) : null, 
        gender,
        headline,
        bio,
      };

      // Send a PUT request to update the user's profile
      await axios.put(`${process.env.REACT_APP_API}/v1/api/users/${userId}`, updatedUser);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  return (
    <div className='overlay-content pr-1 pl-1'>
      <h4 className='ta-cen edit-profile-heading'>Edit Your Profile Details</h4>
      <div className="edit-profile pt-1">
        <form onSubmit={handleUserUpdate}>
          <div className="edit-profile-form-group">
            <h6>First Name</h6>
            <input 
              type="text" 
              placeholder={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="bg-g4"
            />
          </div>
          <div className="edit-profile-form-group">
            <h6>Last Name:</h6>
            <input 
              type="text" 
              placeholder={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className='bg-g4'
              />
          </div>
          <div className="edit-profile-form-group">
            <h6>Location:</h6>
            <input 
              type="text" 
              placeholder={location} 
              onChange={(e) => setLocation(e.target.value)} 
              className='bg-g4'
              />
          </div>
          <div className="edit-profile-form-group">
            <h6>Date of Birth</h6>
            <DatePicker
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              dateFormat="MM/dd/yyyy"
              isClearable
              popperPlacement="auto"              
            />
          </div>
          <div className="edit-profile-form-group">
            <h6>Gender:</h6>
            <input 
              type="text" 
              placeholder={gender} 
              onChange={(e) => setGender(e.target.value)} 
              className='bg-g4'
              />
          </div>
          <div className="edit-profile-form-group">
            <h6>Headline:</h6>
            <input 
              type="text" 
              placeholder={headline} 
              onChange={(e) => setHeadline(e.target.value)} 
              className='bg-g4'
              />
          </div>
          <div className="edit-profile-form-group">
            <h6>Bio:</h6>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              className='bg-g4'
              placeholder={bio}
            />
          </div>
          <button type="submit" className='pointer'>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
