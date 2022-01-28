import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FiStar, FiArrowRight } from 'react-icons/fi';
import { OTPField, OTPProps } from '../src';
import StoryLayout from '../src/StoryLayout';

const meta: Meta = {
  title: 'OTP Field',
  component: OTPField,
  parameters: {
    controls: { expanded: true },
    design: {
      type: 'figma',
    },
  },
};

export default meta;

interface Props extends OTPProps {
  darkMode: boolean;
  noPadding: boolean;
}

const onChangeOtpData = (data: string) => {
  console.log('OTP is :', data);
};

const StoryButton: Story<Props> = (args) => (
  <StoryLayout {...args} >
    <div className="grid grid-cols-1 gap-4 px-0 md:gap-10 md:px-8 md:grid-cols-2">
      <div className="mb-10 xs:w-fit lg:w-1/3">
        <OTPField id={1} {...args} onChangeOtpData={onChangeOtpData} />
      </div>
      <div  className="mb-10 xs:w-fit lg:w-1/3">
        <OTPField
          id={2}
          {...args}
          onChangeOtpData={onChangeOtpData}
          errorMessage="Error Message"
        />
      </div>
      <div  className="mb-10 xs:w-fit lg:w-1/3">
        <OTPField
          id={3}
          {...args}
          onChangeOtpData={onChangeOtpData}
          labelText="Enter OTP"
        />
      </div>
      <div  className="mb-10 xs:w-fit lg:w-1/3">
        <OTPField
          id={4}
          {...args}
          onChangeOtpData={onChangeOtpData}
          labelText="Enter OTP"
          errorMessage="Error Message"
        />
      </div>
    </div>
  </StoryLayout>
);

export const Default = StoryButton.bind({});

Default.args = {
  darkMode: false,
  disabled: false,
  noPadding: false,
  errorMessage: '',
  errorMessageStyle: {},
  label: '',
  labelStyle: {}
};

Default.parameters = {
  controls: { exclude: ['LeadingIcon', 'TrailingIcon', 'IconOnly'] },
};
