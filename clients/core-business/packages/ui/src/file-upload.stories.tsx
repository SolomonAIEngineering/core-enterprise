import { AlertCircle, FileText, Image, Upload } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import { FileUpload } from './file-upload';

const meta: Meta<typeof FileUpload> = {
    title: 'Components/FileUpload',
    component: FileUpload,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A file upload component that supports drag and drop functionality.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
    render: () => (
        <FileUpload
            onUpload={(files) => console.log('Uploaded files:', files)}
        />
    ),
};

export const WithCustomIcon: Story = {
    render: () => (
        <FileUpload
            icon={<Upload className="h-12 w-12 text-gray-400" />}
            onUpload={(files) => console.log('Uploaded files:', files)}
        />
    ),
};

export const ImageUpload: Story = {
    render: () => (
        <FileUpload
            icon={<Image className="h-12 w-12 text-gray-400" />}
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
            onUpload={(files) => console.log('Uploaded images:', files)}
        >
            <p className="text-sm text-gray-500">Upload images (max 5MB)</p>
        </FileUpload>
    ),
};

export const DocumentUpload: Story = {
    render: () => (
        <FileUpload
            icon={<FileText className="h-12 w-12 text-gray-400" />}
            accept=".pdf,.doc,.docx"
            maxSize={10 * 1024 * 1024} // 10MB
            onUpload={(files) => console.log('Uploaded documents:', files)}
        >
            <p className="text-sm text-gray-500">Upload documents (PDF, DOC, DOCX - max 10MB)</p>
        </FileUpload>
    ),
};

export const WithError: Story = {
    render: () => (
        <FileUpload
            icon={<AlertCircle className="h-12 w-12 text-red-400" />}
            error="The selected file is too large"
            onUpload={(files) => console.log('Uploaded files:', files)}
        >
            <p className="text-sm text-red-500">Please select a file under 5MB</p>
        </FileUpload>
    ),
};

export const WithLoading: Story = {
    render: () => (
        <FileUpload
            loading={true}
            progress={65}
            onUpload={(files) => console.log('Uploaded files:', files)}
        >
            <p className="text-sm text-gray-500">Uploading... 65%</p>
        </FileUpload>
    ),
};

export const MultipleFiles: Story = {
    render: () => (
        <FileUpload
            multiple
            onUpload={(files) => console.log('Uploaded files:', files)}
        >
            <p className="text-sm text-gray-500">Upload multiple files</p>
        </FileUpload>
    ),
};

export const WithPreview: Story = {
    render: () => (
        <FileUpload
            accept="image/*"
            showPreview
            onUpload={(files) => console.log('Uploaded files:', files)}
        >
            <p className="text-sm text-gray-500">Upload an image to see preview</p>
        </FileUpload>
    ),
};

export const WithCustomValidation: Story = {
    render: () => (
        <FileUpload
            validate={(file) => {
                if (file.size > 1024 * 1024) {
                    return 'File size must be less than 1MB';
                }
                if (!file.type.startsWith('image/')) {
                    return 'Only image files are allowed';
                }
                return null;
            }}
            onUpload={(files) => console.log('Uploaded files:', files)}
        >
            <p className="text-sm text-gray-500">Upload image (max 1MB)</p>
        </FileUpload>
    ),
};

export const WithCustomStyles: Story = {
    render: () => (
        <FileUpload
            className="border-2 border-dashed border-blue-500 bg-blue-50 hover:bg-blue-100"
            activeClassName="border-blue-600 bg-blue-100"
            onUpload={(files) => console.log('Uploaded files:', files)}
        >
            <p className="text-sm text-blue-500">Drop files here or click to upload</p>
        </FileUpload>
    ),
}; 