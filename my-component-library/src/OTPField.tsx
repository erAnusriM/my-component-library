/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect, FC } from 'react';
import ErrorMessage from './ErrorMessage';
import Label from './Label';
import cls from 'classnames';

interface OtpData {
  id: string | number | null;
}

export interface OTPProps {
  onChangeOtpData: (data: string) => void;
  errorMessage?: string | null;
  errorMessageStyle?: CSSStyleDeclaration;
  disabled?: boolean;
  labelText?:  string | undefined;
  labelStyle?: CSSStyleDeclaration;
  id: any;
}

export const OTPField: FC<OTPProps> = ({
  onChangeOtpData,
  errorMessage,
  errorMessageStyle,
  disabled,
  labelText,
  id,
  labelStyle
}) => {
  const [data, setData] = useState<OtpData[]>([
    { id: '' },
    { id: '' },
    { id: '' },
    { id: '' },
    { id: '' },
    { id: '' },
  ]);

  const otpInputRef = useRef<typeof HTMLInputElement[]>([]);
  otpInputRef.current = [];

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
    const node = document.getElementById(`data-${id}-0`);
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

    const node = document.getElementById(`data-${id}-${tabIndex}`);
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
    <>
    {labelText && 
      <div>
        <Label error={!errorMessage === false} text={labelText} style={labelStyle}/>
      </div>  
    }
      <div className="flex flex-row justify-between h-8 align-middle xs:min-w-full">
        {data &&
          Object.keys(data).map((item, index) => (
            <NumericInput
              key={item}
              id={`data-${id}-${index}`}
              type="tel"
              size={1}
              autoFocus={true}
              value={data[index].id || ''}
              inputRef={otpInputRef}
              onKeyDown={(e: any) => handleOnKeyDown(index, e)}
              onChange={(e: any) => handleOnChange(index, e)}
              fullWidth={true}
              className={cls(
                'first:mr-5 last:mr-0 mr-5 mb-1 block xs:w-1/6 xs:px-3 py-2 border-transparent shadow-none bg-transparent dark:text-gray-400 dark:before:border-b-gray-400 border-b-2 placeholder-slate-400 focus:outline-none border-b-gray-200 focus:ring-0 focus:border-b-success-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none',
                {
                  'border-b-error-500 focus:border-b-error-500':
                    !errorMessage === false,
                }
              )}
              style={{
                textAlign: 'center',
                webkitTextSecurity: 'disc',
                height: '1px',
                fontSize: '36px',
                fontWeight: 'bolder',
                padding: '20px 0px 30px 0px',
                // marginTop: '20px',
                alignContent: 'center',
                alignItems: 'center',
              }}
              disabled={disabled}
              error={errorMessage}
            />
          ))}
      </div>
      <div>
        <ErrorMessage style={errorMessageStyle}>
          {errorMessage || ''}
        </ErrorMessage>
      </div>
    </>
  );
};

const NumericInput = (props: any) => {
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
};

const CustomInput = (props: any) => {
  const { inputRef, ...restProps } = props;

  return <input ref={inputRef} {...restProps} />;
};
