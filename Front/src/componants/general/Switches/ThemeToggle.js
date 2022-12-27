import ToggleMode from '@components/General/Switches/ToggleMode'
import React from 'react'
import Image from 'next/future/image'
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useTheme } from 'next-themes';
import Colors from '@constants/AppColors';

const CustomToggleMode = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 70,
  height: 36,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transform: 'translateX(2px)',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(32px)',
      color: Colors.white,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.grey[100],
        opacity: 1,
        border: 0,
      },
      '& .MuiSwitch-thumb': {
        color: 'grey',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: Colors['lime-green'],
      border: `6px solid ${Colors.white}`,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 28,
    height: 28,
    transform: 'translateY(8%)'
  },
  '& .MuiSwitch-track': {
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 10,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left',
      backgroundImage: `url('/images/Navbar/DarkMode.svg')`,
    },
    '&:after': {
      content: "''",
      position: 'absolute',
      width: '120%',
      height: '120%',
      left: -25,
      top: -5,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      backgroundImage: `url('/images/Navbar/WhiteMode.svg')`,
    },
    borderRadius: 36 / 2,
    backgroundColor: Colors.grey,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const CustomToggleModeChecked = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} defaultChecked/>
))(({ theme }) => ({
  width: 70,
  height: 36,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transform: 'translateX(2px)',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(32px)',
      color: Colors.white,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.grey[100],
        opacity: 1,
        border: 0,
      },
      '& .MuiSwitch-thumb': {
        color: Colors.grey,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: Colors['lime-green'],
      border: `6px solid ${Colors.white}`,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 28,
    height: 28,
    transform: 'translateY(8%)'
  },
  '& .MuiSwitch-track': {
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 10,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left',
      backgroundImage: `url('/images/Navbar/DarkMode.svg')`,
    },
    '&:after': {
      content: "''",
      position: 'absolute',
      width: '120%',
      height: '120%',
      left: -25,
      top: -5,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
      backgroundImage: `url('/images/Navbar/WhiteMode.svg')`,
    },
    borderRadius: 36 / 2,
    backgroundColor: Colors.grey,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const ThemeToggle = ({ _className, width, height, expanded }) => {
  
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme;
  if (currentTheme === 'dark') {
    return (expanded ?
      <div><CustomToggleModeChecked sx={{ m: 1 }} onChange={(event) => setTheme(event.target.checked ? "dark": "light")}/></div>
      :
      <div
        className={`flex hover:opacity-50 justify-self-start hover:cursor-pointer`}
        onClick={() => setTheme("light")}>
        <Image
          src={`/images/Navbar/WhiteModeButton.svg`}
          alt={`white-mode-button-icon`}
          width={width}
          height={height} />
      </div>
    )
  } else { 
    return (expanded ?
      <div><CustomToggleMode sx={{ m: 1 }}  onChange={(event) => setTheme(event.target.checked ? "dark": "light")}/></div>
      :
      <div
        className={`flex hover:opacity-50 justify-self-start hover:cursor-pointer`}
        onClick={() => setTheme("dark")}>
        <Image
          src={`/images/Navbar/DarkModeButton.svg`}
          alt={`dark-mode-button-icon`}
          width={width}
          height={height} />
      </div>
    )
  }
}

export default ThemeToggle