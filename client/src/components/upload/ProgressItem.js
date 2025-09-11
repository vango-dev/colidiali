// ----------------------------------------------------------------------
import { Box, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import uploadFileProgress from '../../firebase/uploadFileProgress';
import useAuth from '../../hooks/useAuth';
import Iconify from '../Iconify';
import Image from '../Image';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import useResponsive from '../../hooks/useResponsive';

export default function ProgressItem({ file, isProfileUrl }) {
  const { setTransporterPhoto, setTransporterCompanyPhotos } = useAuth();
  const [imageURL, setImageURL] = useState(null);
  const [progress, setProgress] = useState(0);

  const smUp = useResponsive('up', 'sm');

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + '.' + file?.name.split('.').pop();

      if (isProfileUrl) {
        try {
          const url = await uploadFileProgress(
            file,
            'users_images',
            imageName,
            setProgress
          );
          if (url) {
            setTransporterPhoto(url);
          }
          setImageURL(null);
        } catch (error) {
          console.log('🚀 ~ uploadImage ~ error:', error);
        }
      } else {
        try {
          const url = await uploadFileProgress(
            file,
            'companies_images',
            imageName,
            setProgress
          );
          if (url) {
            setTransporterCompanyPhotos(url);
            console.log('aa');
          }
          setImageURL(null);
        } catch (error) {
          console.log('🚀 ~ uploadImage ~ error:', error);
        }
      }
    };

    setImageURL(URL.createObjectURL(file));

    uploadImage();
  }, [file.isProfileUrl]);

  return (
    imageURL && (
      <ImageListItem
        sx={{
          justifyContent: 'center',
          display: 'flex',
          bottom: isProfileUrl ? 50 : 0,
          marginTop: smUp ? 0 : 8,
        }}
      >
        <Image
          src={imageURL}
          alt='transporter_image'
          loading='lazy'
          sx={isProfileUrl ? profileImage : companyImage}
        />
        <Box sx={isProfileUrl ? backDropProfile : backDropCompany}>
          {progress < 100 ? (
            <CircularProgressWithLabel
              value={progress}
              isProfileUrl={isProfileUrl}
            />
          ) : (
            <>
              <Iconify
                icon='material-symbols:check'
                sx={{ width: 40, height: 40, color: 'lightgreen' }}
              />
            </>
          )}
        </Box>
      </ImageListItem>
    )
  );
}

// BackDrop style
const backDropProfile = {
  position: 'absolute',
  display: 'flex',
  top: 0,
  bottom: 0,
  width: 128,
  height: 128,
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,.5)',
  borderRadius: 10,
};

const backDropCompany = {
  position: 'absolute',
  display: 'flex',
  top: 0,
  bottom: 0,
  width: 80,
  height: 80,
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,.5)',
  borderRadius: 2,
};

const profileImage = {
  width: 128,
  height: 128,
  borderRadius: 10,
  cursor: 'pointer',
};

const companyImage = {
  width: 80,
  height: 80,
  borderRadius: 2,
  cursor: 'pointer',
};
