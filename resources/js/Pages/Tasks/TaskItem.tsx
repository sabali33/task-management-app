import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ContainerLayout } from "@/Layouts/ContainerLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function TaskItem() {
    const { props } = usePage();
    const task = props.task as {
        title: string;
        description: string;
        task_list_id: number;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Task Details
                </h2>
            }
        >
            <Head title="Task List Details" />
            <ContainerLayout>
                <Link
                    href={`/task-list/${task.task_list_id}/show`}
                    method="get"
                >
                    Back to all task
                </Link>
            </ContainerLayout>
            <ContainerLayout>
                <p className="px-3">Task Name: {task.title}</p>
                <p className="px-3">Description: {task.description}</p>
                <p className="px-3">Description: {task.task_list_id}</p>
            </ContainerLayout>
        </AuthenticatedLayout>
    );
}
