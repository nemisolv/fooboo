import CoverPicture from '@/components/profile/CoverPicture';
import { getUserProfile } from '@/stores/slices/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '@/components/profile/HeaderProfile';
import ProfileTabs from '@/components/profile/ProfileTabs';
import Loader from '@/components/shared/Loader';

export default function Profile() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const { id } = useParams();

  

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CoverPicture />
          <Header id={id} />

          <ProfileTabs />
        </>
      )}
    </div>
  );
}
