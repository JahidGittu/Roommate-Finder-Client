
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useProfile = () => {
  const { user } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    fullName: '',
    dob: '',
    phone: '',
    address: '',
    email: user?.email || '',
    photo: '',
    gender: '',
    hobbies: '',
  });

  useEffect(() => {
    if (user?.email) {
      fetch(`https://roommate-finder-server-ten.vercel.app/profile?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setProfileData(prev => ({ ...prev, ...data }));
          }
        });
    }
  }, [user?.email]);

  return { profileData, setProfileData };
};

export default useProfile;
