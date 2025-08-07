// frontend/src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import todoService from '../services/todoService';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authService.getProfile();
      setProfile(response.data);
    } catch (error) {
      toast.error('Failed to fetch profile');
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
             // frontend/src/pages/ProfilePage.js (continued)
              {profile?.firstName?.charAt(0)}{profile?.lastName?.charAt(0)}
            </div>
          </div>
          <div className="profile-info">
            <h1>{profile?.firstName} {profile?.lastName}</h1>
            <p className="profile-email">{profile?.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-card">
            <h3>Account Information</h3>
            <div className="profile-field">
              <label>First Name:</label>
              <span>{profile?.firstName}</span>
            </div>
            <div className="profile-field">
              <label>Last Name:</label>
              <span>{profile?.lastName}</span>
            </div>
            <div className="profile-field">
              <label>Email:</label>
              <span>{profile?.email}</span>
            </div>
            <div className="profile-field">
              <label>Member Since:</label>
              <span>{formatDate(profile?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
