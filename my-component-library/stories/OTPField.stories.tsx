import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FiStar, FiArrowRight } from 'react-icons/fi';
import { OTPField, OTPProps  } from '../src';
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
   console.log('OTP is :', data)
}

const StoryButton: Story<Props> = (args) => (
  <StoryLayout {...args} className="space-y-2 md:w-4/6 lg:w-2/4">
   <OTPField {...args} onChangeOtpData={onChangeOtpData} />
   
  </StoryLayout>
);

export const Default = StoryButton.bind({});

Default.args = {
  darkMode: false,
  disabled: false,
  noPadding: false,
  errorMessage: "",
  errorMessageStyle:{}
};

Default.parameters = {
  controls: { exclude: ['LeadingIcon', 'TrailingIcon', 'IconOnly'] },
};
