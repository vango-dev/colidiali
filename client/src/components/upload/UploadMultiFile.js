import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
//
import BlockContent from './BlockContent';
import RejectionFiles from './RejectionFiles';
import MultiFilePreview from './MultiFilePreview';
import useAuth from '../../hooks/useAuth';
import ProgressList from './ProgresList';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: theme.palette.background.neutral,
  border: `2.5px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

UploadMultiFile.propTypes = {
  error: PropTypes.bool,
  showPreview: PropTypes.bool,
  files: PropTypes.array,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  ...other
}) {
  // console.log('🚀 ~ files:', files);
  const { transporterCompanyPhotos, user, setProfilGallery, profilGallery } =
    useAuth();
  console.log('🚀 ~ profilGallery:', profilGallery);
  // console.log('🚀 ~ transporterCompanyPhotos:', transporterCompanyPhotos);

  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    if (transporterCompanyPhotos || user.images) {
      setGalleryImages(user?.images?.concat(transporterCompanyPhotos));
    }
  }, [transporterCompanyPhotos, user?.images]);

  useEffect(() => {
    if (galleryImages) {
      setProfilGallery(galleryImages);
    }
  }, [galleryImages]);

  const handleRemove = (file) => {
    const filteredGallery = galleryImages.filter((_file) => _file !== file);
    setGalleryImages(filteredGallery);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    ...other,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}
      <Stack direction='row' spacing={2} mt={2}>
        <MultiFilePreview
          files={profilGallery}
          showPreview={showPreview}
          onRemove={handleRemove}
          // onRemoveAll={onRemoveAll}
        />
        {typeof files[0] !== 'string' && <ProgressList {...{ files }} />}
      </Stack>

      {helperText && helperText}
    </Box>
  );
}
