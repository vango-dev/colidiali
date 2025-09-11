// ----------------------------------------------------------------------
export default function Grid(theme) {
  return {
    MuiGrid: {
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
