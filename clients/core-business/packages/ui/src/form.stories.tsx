import { AlertCircle, Check, Loader } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import { Form } from './form';

const meta: Meta<typeof Form> = {
    title: 'Components/Form',
    component: Form,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A form component for collecting and validating user input.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
    render: () => (
        <Form onSubmit={(data) => console.log('Form submitted:', data)}>
            <Form.Field
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
            />
            <Form.Field
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
            />
            <Form.Button type="submit">Sign In</Form.Button>
        </Form>
    ),
};

export const WithValidation: Story = {
    render: () => (
        <Form
            onSubmit={(data) => console.log('Form submitted:', data)}
            validate={(values) => {
                const errors: Record<string, string> = {};
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Password is required';
                } else if (values.password.length < 8) {
                    errors.password = 'Password must be at least 8 characters';
                }
                return errors;
            }}
        >
            <Form.Field
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
            />
            <Form.Field
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
            />
            <Form.Button type="submit">Sign In</Form.Button>
        </Form>
    ),
};

export const WithHelpText: Story = {
    render: () => (
        <Form onSubmit={(data) => console.log('Form submitted:', data)}>
            <Form.Field
                name="username"
                label="Username"
                helpText="Choose a unique username for your account"
                placeholder="Enter username"
            />
            <Form.Field
                name="bio"
                label="Bio"
                type="textarea"
                helpText="Tell us a little about yourself"
                placeholder="Write your bio here"
            />
            <Form.Button type="submit">Save Profile</Form.Button>
        </Form>
    ),
};

export const WithCustomFields: Story = {
    render: () => (
        <Form onSubmit={(data) => console.log('Form submitted:', data)}>
            <Form.Field
                name="plan"
                label="Select Plan"
                type="select"
                options={[
                    { value: 'free', label: 'Free' },
                    { value: 'pro', label: 'Pro' },
                    { value: 'enterprise', label: 'Enterprise' },
                ]}
            />
            <Form.Field
                name="notifications"
                label="Notifications"
                type="checkbox"
                options={[
                    { value: 'email', label: 'Email notifications' },
                    { value: 'push', label: 'Push notifications' },
                    { value: 'sms', label: 'SMS notifications' },
                ]}
            />
            <Form.Button type="submit">Save Preferences</Form.Button>
        </Form>
    ),
};

export const WithInitialValues: Story = {
    render: () => (
        <Form
            initialValues={{
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
            }}
            onSubmit={(data) => console.log('Form submitted:', data)}
        >
            <Form.Field
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
            />
            <Form.Field
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
            />
            <Form.Field
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email"
            />
            <Form.Button type="submit">Update Profile</Form.Button>
        </Form>
    ),
};

export const WithLoading: Story = {
    render: () => (
        <Form
            onSubmit={async (data) => {
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log('Form submitted:', data);
            }}
        >
            <Form.Field
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
            />
            <Form.Button type="submit">
                {({ isSubmitting }) => (
                    <>
                        {isSubmitting ? (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </>
                )}
            </Form.Button>
        </Form>
    ),
};

export const WithSuccess: Story = {
    render: () => (
        <Form
            onSubmit={(data) => console.log('Form submitted:', data)}
            status="success"
            message="Your changes have been saved successfully!"
        >
            <Form.Field
                name="name"
                label="Name"
                placeholder="Enter your name"
            />
            <Form.Field
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
            />
            <Form.Button type="submit">
                <Check className="mr-2 h-4 w-4" />
                Save Changes
            </Form.Button>
        </Form>
    ),
};

export const WithError: Story = {
    render: () => (
        <Form
            onSubmit={(data) => console.log('Form submitted:', data)}
            status="error"
            message="There was an error saving your changes. Please try again."
        >
            <Form.Field
                name="name"
                label="Name"
                placeholder="Enter your name"
            />
            <Form.Field
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
            />
            <Form.Button type="submit">
                <AlertCircle className="mr-2 h-4 w-4" />
                Try Again
            </Form.Button>
        </Form>
    ),
};

export const WithCustomLayout: Story = {
    render: () => (
        <Form onSubmit={(data) => console.log('Form submitted:', data)}>
            <div className="grid grid-cols-2 gap-4">
                <Form.Field
                    name="firstName"
                    label="First Name"
                    placeholder="Enter first name"
                />
                <Form.Field
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter last name"
                />
            </div>
            <Form.Field
                name="email"
                label="Email"
                type="email"
                placeholder="Enter email"
            />
            <Form.Field
                name="message"
                label="Message"
                type="textarea"
                placeholder="Enter your message"
            />
            <div className="flex justify-end space-x-2">
                <Form.Button type="button" variant="secondary">Cancel</Form.Button>
                <Form.Button type="submit">Send Message</Form.Button>
            </div>
        </Form>
    ),
};

export const WithFieldGroups: Story = {
    render: () => (
        <Form onSubmit={(data) => console.log('Form submitted:', data)}>
            <Form.Group title="Personal Information">
                <Form.Field
                    name="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                />
                <Form.Field
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                />
            </Form.Group>
            <Form.Group title="Address">
                <Form.Field
                    name="street"
                    label="Street Address"
                    placeholder="Enter street address"
                />
                <div className="grid grid-cols-3 gap-4">
                    <Form.Field
                        name="city"
                        label="City"
                        placeholder="Enter city"
                    />
                    <Form.Field
                        name="state"
                        label="State"
                        placeholder="Enter state"
                    />
                    <Form.Field
                        name="zip"
                        label="ZIP Code"
                        placeholder="Enter ZIP code"
                    />
                </div>
            </Form.Group>
            <Form.Button type="submit">Save</Form.Button>
        </Form>
    ),
}; 