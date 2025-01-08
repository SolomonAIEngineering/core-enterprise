import type { Meta, StoryObj } from "@storybook/react";
import { SolutionsContent } from "./solutions-content";

const meta = {
  component: SolutionsContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SolutionsContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    domain: "dub.co",
  },
};

export const CustomDomain: Story = {
  args: {
    domain: "custom-domain.com",
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    domain: "dub.co",
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
