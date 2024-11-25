import { TaskItemType } from "@/Pages/Tasks/Show";
import { AppLinkPropsType, useTransformToTable } from "@/UseTransformToTable";
import { Link } from "@inertiajs/react";
import { Table } from "./Table/Table";

export const TaskItem = ({ tasks }: { tasks: TaskItemType[] }) => {
    const rowActions = [
        {
            href: "/task/%s/edit",
            title: "Edit",
            method: "get",
        },
        {
            href: "/task/%s/show",
            as: "button",
            title: "View",
            method: "get",
        },
        {
            href: "/task/%s/delete",
            as: "button",
            title: "Delete",
            method: "delete",
        },
    ] as AppLinkPropsType[];

    const tableData = useTransformToTable({ data: tasks, rowActions });
    const NewTaskLink = ({ label }: { label: string }) => (
        <Link
            href="/task/create"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {label}
        </Link>
    );

    if (tasks.length < 1) {
        return (
            <>
                <p className="py-5">No Task created yet:</p>
                <p>
                    <NewTaskLink label="Create your first Task" />
                </p>
            </>
        );
    }
    return (
        <>
            <div className="py">
                <NewTaskLink label="Create New Task" />
            </div>
            <div className="table-wrap py-5">
                <Table
                    tableHeader={[
                        "ID",
                        "title",
                        "description",
                        "Due Date",
                        "status",
                        "assignee",
                        "creator",
                        "Actions",
                    ]}
                    data={tableData}
                    noDataLabel="No Tasks"
                />
            </div>
        </>
    );
};
