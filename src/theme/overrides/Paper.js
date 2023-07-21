// ----------------------------------------------------------------------

export default function Paper(theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },

      variants: [
        {
          props: { variant: 'sweet' },
          style: { backgroundColor: theme.palette.background.paper + "!important",
            borderRadius: 100 },
        },
      ],

      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
      },
    },
  };
}
