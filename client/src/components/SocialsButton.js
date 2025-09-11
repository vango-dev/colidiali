import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Link, Stack, Button, Tooltip, IconButton } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

SocialsButton.propTypes = {
  initialColor: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.string),
  simple: PropTypes.bool,
  sx: PropTypes.object,
};

export default function SocialsButton({
  initialColor = false,
  simple = true,
  links = {},
  sx,
  ...other
}) {
  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const SOCIALS = [
    {
      name: 'Phone',
      icon: 'ri:phone-fill',
      socialColor: '#00AAEC',
      path: links.phone || 'tel:+1234567890',
    },
    {
      name: 'WhatsApp',
      icon: 'logos:whatsapp-icon',
      socialColor: '#007EBB',
      path: `https://wa.me/${links.whatsApp}?text=${encodeURIComponent(
        'Hello, I would like to chat with you!'
      )}`,
    },

    {
      name: 'FaceBook',
      icon: 'eva:facebook-fill',
      socialColor: '#1877F2',
      path: links.facebook || '#facebook-link',
    },
    {
      name: 'Instagram',
      icon: 'ant-design:instagram-filled',
      socialColor: '#E02D69',
      path: links.instagram || '#instagram-link',
    },
  ];

  return (
    <Stack direction='row' flexWrap='wrap' alignItems='center'>
      {SOCIALS.map((social) => {
        const { name, icon, path, socialColor } = social;
        return simple ? (
          <Link
            key={name}
            onClick={(e) => {
              e.preventDefault();
              handleSocialClick(path);
            }}
            sx={{
              border: '2px solid #E3E3E3',
              borderRadius: '10px',
              marginRight: 1,
              backgroundColor: '#E3E3E3',
            }}
          >
            <Tooltip title={name} placement='top'>
              <IconButton
                color='inherit'
                sx={{
                  ...(initialColor && {
                    color: socialColor,
                    '&:hover': {
                      bgcolor: alpha(socialColor, 0.08),
                    },
                  }),
                  ...sx,
                }}
                {...other}
              >
                <Iconify icon={icon} sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <Button
            key={name}
            href={path}
            color='inherit'
            variant='outlined'
            size='small'
            startIcon={<Iconify icon={icon} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                '&:hover': {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08),
                },
              }),
              ...sx,
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
