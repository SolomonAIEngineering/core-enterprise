import type { Meta, StoryObj } from "@storybook/react";
import { Table, useTable } from "./table";
import React from "react";
import { createColumnHelper } from "@tanstack/react-table";

const meta = {
    title: "Components/Table",
    component: Table,
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <div className="w-full max-w-4xl">
                <Story />
            </div>
        ),
    ],
    tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta> & {
    args?: never;
};

// Example data type
type Person = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    status: "active" | "inactive";
};

// Sample data
const sampleData: Person[] = [
    {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 30,
        email: "john@example.com",
        status: "active",
    },
    {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        age: 25,
        email: "jane@example.com",
        status: "inactive",
    },
    // Add more sample data as needed
];

// Column helper
const columnHelper = createColumnHelper<Person>();

// Define columns
const columns = [
    columnHelper.accessor("firstName", {
        header: "First Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
        header: "Last Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("age", {
        header: "Age",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
            <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${info.getValue() === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
            >
                {info.getValue()}
            </span>
        ),
    }),
];
// Basic Table Story
export const Basic: StoryObj<typeof Table> = {
    args: {},
    render: () => {
        const tableInstance = useTable({
            data: sampleData,
            columns,
        });

        return <Table {...tableInstance} />;
    },
};

// Loading State Story
export const Loading: StoryObj<typeof Table> = {
    args: {},
    render: () => {
        const tableInstance = useTable({
            data: sampleData,
            columns,
            loading: true,
        });

        return <Table {...tableInstance} />;
    },
};
// Empty State Story
export const Empty: StoryObj<typeof Table> = {
    args: {},
    render: () => {
        const tableInstance = useTable({
            data: [],
            columns,
            emptyState: <div>No data available</div>,
        });

        return <Table {...tableInstance} />;
    },
};

// Sortable Table Story
export const Sortable: StoryObj<typeof Table> = {
    render: () => {
        const tableInstance = useTable({
            data: sampleData,
            columns,
            sortableColumns: ["firstName", "lastName", "age"],
            onSortChange: ({ sortBy, sortOrder }) => {
                console.log("Sort changed:", { sortBy, sortOrder });
            },
        });

        return <Table {...tableInstance} />;
    },
};

// Paginated Table Story
export const Paginated: StoryObj<typeof Table> = {
    render: () => {
        const [pagination, setPagination] = React.useState({
            pageIndex: 1,
            pageSize: 2,
        });

        const tableInstance = useTable({
            data: sampleData,
            columns,
            pagination,
            onPaginationChange: setPagination,
            rowCount: sampleData.length,
        });

        return <Table {...tableInstance} />;
    },
};

const Button = ({ variant, text, className, onClick, disabled }) => (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button
        className={`${className} ${disabled ? 'opacity-50' : ''}`}
        onClick={onClick}
        disabled={disabled}
    >
        {text}
    </button>
); 