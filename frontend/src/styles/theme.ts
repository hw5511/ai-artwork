import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  // 커스텀 브레이크포인트 설정
  breakpoints: {
    values: {
      xs: 0,     // 모바일 (small)
      sm: 600,   // 모바일 (large) / 태블릿 (small)
      md: 900,   // 태블릿 (large)
      lg: 1200,  // 데스크톱 (small)
      xl: 1536,  // 데스크톱 (large)
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#cccccc',
    },
    secondary: {
      main: '#ff6b6b',
      light: '#ff9999',
      dark: '#cc5555',
    },
    background: {
      default: '#000000',
      paper: '#0a0a0a',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Noto Sans KR"',
      'Arial',
      'sans-serif',
    ].join(','),
    // 반응형 Typography 스케일링
    h1: {
      fontSize: 'clamp(1.75rem, 4vw, 2.125rem)', // 모바일에서 축소
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 'clamp(1rem, 2vw, 1.125rem)',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)',
      lineHeight: 1.6,
    },
    button: {
      fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)',
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
      lineHeight: 1.4,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 0,
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.3s ease',
          // 모바일에서 패딩 조정
          [theme.breakpoints.down('md')]: {
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              transform: 'none', // 모바일에서 hover 효과 비활성화
              boxShadow: '0 2px 8px rgba(255, 255, 255, 0.05)',
            },
          },
          [theme.breakpoints.up('md')]: {
            '&:hover': {
              boxShadow: '0 4px 16px rgba(255, 255, 255, 0.1)',
              transform: 'translateY(-2px)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          borderRadius: 0,
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.9)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          // 모바일에서 터치 친화적 크기
          [theme.breakpoints.down('md')]: {
            minHeight: '44px',
            padding: '12px 16px',
            fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)',
          },
          [theme.breakpoints.up('md')]: {
            minHeight: '36px',
            padding: '8px 16px',
          },
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        }),
        contained: ({ theme }) => ({
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          [theme.breakpoints.down('md')]: {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }),
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.3)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.6)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            // 모바일에서 입력 필드 크기 조정
            [theme.breakpoints.down('md')]: {
              minHeight: '44px',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
            },
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.6)',
            },
          },
          '& .MuiInputLabel-root': {
            [theme.breakpoints.down('md')]: {
              fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)',
            },
          },
        }),
      },
    },
    // Container 컴포넌트 반응형 설정
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          },
          [theme.breakpoints.between('sm', 'md')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
          },
        }),
      },
    },
    // Grid 컴포넌트 반응형 설정
    MuiGrid: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down('md')]: {
            '&.MuiGrid-item': {
              paddingLeft: theme.spacing(1),
              paddingTop: theme.spacing(1),
            },
          },
        }),
      },
    },
    // IconButton 터치 친화적 크기
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down('md')]: {
            minWidth: '44px',
            minHeight: '44px',
            padding: theme.spacing(1),
          },
        }),
      },
    },
  },
});