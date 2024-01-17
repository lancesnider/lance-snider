import React from "react";

import Button from "./Button";

export default {
  title: "Button",
  component: Button,
  args: {
    href: "https://google.com",
  },
};

const Template = (args) => <div style={{display: 'flex', gap: 16, padding: 24}}>
  <Button {...args} primary>Choose a Company</Button>
  <Button {...args}>Choose a Company</Button>
  <Button {...args} disabled>Choose a Company</Button>
</div>;


export const Default = Template.bind({});
