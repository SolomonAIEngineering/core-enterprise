import type { Meta, StoryObj } from "@storybook/react";
import { ProductContent } from "./product-content";
import React from "react";

const meta = {
    component: ProductContent,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ProductContent>;

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