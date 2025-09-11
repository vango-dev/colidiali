// ----------------------------------------------------------------------
export default function Box(theme) {
  return {
    MuiBox: {
      styleOverrides: {
        root: {
          overflow: 'auto', // Enable scroll functionality
          scrollbarWidth: 'none', // For Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // For WebKit browsers
          },
        },
      },
    },
  };
}
