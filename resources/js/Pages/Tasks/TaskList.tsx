import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, InertiaLinkProps, Link, usePage } from "@inertiajs/react";
import { Table } from "@/Components/Table/Table";
import { useTransformToTable } from "@/UseTransformToTable";
import { ContainerLayout } from "@/Layouts/ContainerLayout";

type TaskListType = {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
};
export default function TaskList() {
    const { props } = usePage();

    const taskList = props.task_lists as TaskListType[];

    const rowActions: Array<InertiaLinkProps> = [
        {
            href: "/task-list/%s/edit",
            method: "put",
            as: "button",
            title: "Edit",
        },
        {
            href: "/task-list/%s/view",
            method: "get",
            as: "button",
            title: "View",
        },
        {
            href: "/task-list/%s/delete",
            method: "delete",
            as: "button",
            title: "Delete",
        },
    ];

    const tableData = useTransformToTable({
        data: taskList,
        rowActions: rowActions,
    });
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Task List
                    </h2>
                }
                createNewLink={
                    <Link
                        href="/task-list/create"
                        className="p-6 bg-white"
                        method="get"
                        preserveState
                    >
                        {" "}
                        New Task List
                    </Link>
                }
            >
                <Head title="Task Lists" />

                <ContainerLayout>
                    {
                        <Table
                            data={tableData}
                            tableHeader={[
                                "ID",
                                "Name",
                                "Description",
                                "Task Count",
                                "User",
                                "Actions",
                            ]}
                            noDataLabel={"No Task List available"}
                        />
                    }
                </ContainerLayout>
            </AuthenticatedLayout>
        </>
    );
}
