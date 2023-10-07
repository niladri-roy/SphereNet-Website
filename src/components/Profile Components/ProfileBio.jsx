import React , { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/auth';

const ProfileBio = ({ userId }) => {

  const [ users , setUsers ] = useState([]);
  const [ auth ] = useAuth();

  const getUserById = async (userId) => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API}/v1/api/users/${userId}`);
      setUsers(response.data.user);

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(userId){
      getUserById(userId);
    }
  }, [userId]);

  return (
    <div className='profile-bio'>
      <div className="bg-g2 p-1 mt-1 bc br c-w">
        {
          users?.bio ? (<>
            <p>
              {users.bio}
            </p>
          </>) : (<>
            {
              auth?.user?._id === userId ? (<>
                <p className=''>
                  Add a bio to tell everyone about yourself.
                </p>
              </>) : (<>
                <p className=''>
                  {users?.username} has not added a bio yet.
                </p>
              </>)
            }
          </>)
        }
      </div>
    </div>
  )
}

export default ProfileBio