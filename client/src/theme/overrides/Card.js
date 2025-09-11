// ----------------------------------------------------------------------
export default function Card(theme) {
  return {
    MuiCard: {
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
