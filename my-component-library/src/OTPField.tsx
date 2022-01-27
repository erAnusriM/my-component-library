/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import {
  makeStyles,
  ThemeProvider,
  // createStyles,
} from '@material-ui/core/styles';
// import { withStyles } from '@material-ui/styles';
import { createTheme as createMuiTheme } from '@material-ui/core';
import ErrorMessage from './ErrorMessage';
import cls from 'classnames';


// const CustomInputField = withStyles({
//   palette: {
//     primary: {
//       main: '#00CE76',
//     },

//     error: {
//       main: '#FC4A43',
//     },
//   },

//   root: {
//     '& .MuiInputBase-input': {
//       borderRadius: 20,
//       borderColor: 'red',
//       border: '1px solid transparent !important',
//       outline: 'none !important',
//     },
//     '& input': {
//       height: 47,
//     },

//     '& .MuiInput-input': {
//       borderRadius: 5,
//       borderColor: 'red',
//       border: '1px solid transparent !important',
//       outline: 'none !important',
//     },
//     '& .MuiOutlinedInput-input:focused': {
//       borderColor: 'green',
//     },
//   },
//   focus: {
//     '& .MuiInput-input': {
//       borderRadius: 5,
//       borderBottom: "red",
//       borderColor: 'red',
//       border: '1px solid transparent !important',
//       outline: 'none !important',
//     },
//   }
// })(Input);

// const inputStyle = makeStyles({
//   root: {
//     '&:hover $notchedOutline': {
//       borderColor: 'orange',
//     },
//   },
//   focused: {},
//   notchedOutline: {},
// });

const theme = (createMuiTheme as any)({
  palette: {
    primary: {
      main: '#00CE76',
    },

    error: {
      main: '#FC4A43',
    },
  },
  overrides: {

  },
});

// const useStyles = makeStyles(() =>
//   createStyles({
//     root: {
//       padding: '0px',
//       '&.Mui-focused': {
//         border: '2px solid green',
//       },
//       '&.MuiInput-focused': {
//         border: '2px solid green',
//       },
//     },
//   })
// );

const pickerStyles = makeStyles({
  root: {
    border: '0px',
    width: '100%',
    height: '1px',
    fontSize: '36px',
    fontWeight: 'bolder',
    padding: '20px 0px 20px 0px',
    marginTop: '20px',
    marginRight: '20px',
    alignContent: 'center',
    alignItems: 'center',
  },
});

interface OtpData {
  id: string | number | null;
}

interface OTPProps {
  onChangeOtpData: (data: string) => void;
  errorMessage: string | undefined;
  errorMessageStyle?: any;
  style?: any;
}

export const OTPField = (props: OTPProps) => {
  const { onChangeOtpData } = props;

  const [data, setData] = useState<OtpData[]>([
    { id: '' },
    { id: '' },
    { id: '' },
    { id: '' },
    { id: '' },
    { id: '' },
  ]);

  const otpInputRef = useRef<typeof Input[]>([]);
  otpInputRef.current = [];

  const pickerClass = pickerStyles();

  useEffect(() => {
    let otp = '';
    let incompleteData = false;
    incompleteData = data.some((item) => {
      if (item.id !== '') {
        otp = `${otp}${item.id}`;
      } else {
        return true;
      }
      return false;
    });

    if (!incompleteData) {
      onChangeOtpData(otp);
    }
  }, [data]);

  useEffect(() => {
    const node = document.getElementById('data-0');
    node?.focus();
  }, []);

  const checkForFocus = (index: number, value: string) => {
    let tabIndex = index;
    switch (value) {
      case 'B':
        tabIndex -= 1;
        break;
      case '':
        break;
      default:
        tabIndex += 1;
    }

    const node = document.getElementById(`data-${tabIndex}`);
    console.log('node is', node);
    node?.focus();
  };

  const onChangeOtp = (index: number, e: any) => {
    const tmpArr = [...data];
    const myVal =
      (e.nativeEvent.data && e.nativeEvent.data.split('', 1)) ||
      (e.nativeEvent.key && e.nativeEvent.key.split('', 1));
    if (myVal) {
      const myData = { id: myVal[0] === 'B' ? '' : myVal[0] };
      tmpArr[index] = myData;
      setData([...tmpArr]);
      checkForFocus(index, myVal[0]);
    }
  };

  const isValid = (str: string) => {
    const res = /^(\s|\d)$/.test(str);
    if (str === 'Backspace') {
      return true;
    }
    if (str === ' ') {
      return false;
    }
    return res;
  };

  const handleOnChange = (index: number, e: any) => {
    const res = isValid(e.nativeEvent.data || e.nativeEvent.key);
    if (res) {
      onChangeOtp(index, e);
    }
  };

  const handleOnKeyDown = (index: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace') {
      onChangeOtp(index, e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: 30
        }}
      >
        {data &&
          Object.keys(data).map((item, index) => (
            <NumericInput
              key={[item]}
              id={`data-${index}`}
              type="tel"
              size={1}
              autoFocus={true}
              value={data[index].id || ''}
              inputRef={otpInputRef}
              inputProps={{
                autoFocus: true,
                style: {
                  textAlign: 'center',
                },
              }}
              onKeyDown={(e: any) => handleOnKeyDown(index, e)}
              onChange={(e: any) => handleOnChange(index, e)}
              fullWidth={true}
              className={cls(
                'focus:outline-none bg-transparent dark:text-gray-400 dark:before:border-b-gray-400',
                pickerClass.root
              )}
            />
          ))}
      </div>
      <div className={cls('py-5', props.errorMessageStyle)}>
        <ErrorMessage>{props.errorMessage}</ErrorMessage>
      </div>
      </ThemeProvider>
  );
};

function NumericInput(props: any) {
  const { onChange, ...restProps } = props;

  const isValid = (str: string) => {
    return /^(\s*|\d+)$/.test(str);
  };

  const handleOnChange = (e: any) => {
    const res = isValid(e.nativeEvent.data);
    if (res) {
      onChange(e);
    }
  };

  return (
    <CustomInput {...restProps} onChange={(e: any) => handleOnChange(e)} />
  );
}

function CustomInput(props: any) {
  const { inputRef, ...restProps } = props;
  return <Input ref={inputRef} {...restProps} />;
}
