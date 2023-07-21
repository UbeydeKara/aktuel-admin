// ----------------------------------------------------------------------

export default function Skeleton(theme) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },

      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral,
          "&:after": {
            background: 'linear-gradient(90deg, transparent, rgb(0 0 0 / 8%), transparent)',
          }
        },
      },
    },
  };
}
