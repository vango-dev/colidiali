// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';
// ----------------------------------------------------------------------
export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.transporterPhoto}
      alt={`${user?.fName} ${user?.lName}`}
      color={
        user?.transporterPhoto
          ? 'default'
          : createAvatar(`${user?.fName} ${user?.lName}`).color
      }
      {...other}
    >
      {createAvatar(`${user?.fName} ${user?.lName}`).name}
    </Avatar>
  );
}
