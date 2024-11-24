import { TaskItem } from "@/Components/TaskItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ContainerLayout } from "@/Layouts/ContainerLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export type TaskListItemType = {
    id: number;
    name: string;
    description: string;
    user_id: number;
    start_date: string;
    end_date: string;
    status: string;
};
export type TaskItemType = {
    id?: number;
    title: string;
    description: string;
    status: string;
    due_date: string;
    assignee_id: number;
    user_id: number;
    task_list_id: number;
};
export default function Show() {
    const { props } = usePage();
    const task_list_item = props.task_list as TaskListItemType;

    const sub_tasks = props.sub_tasks as TaskItemType[];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Task List Details
                </h2>
            }
        >
            <Head title="Task List Details" />
            <ContainerLayout>
                <div className="w-full max-w-md bg-white rounded-lg">
                    <div className="mb-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">
                            Name
                        </h2>
                        <p className="text-lg font-semibold text-gray-800">
                            {task_list_item.name}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">
                            Description
                        </h2>
                        <p className="text-gray-700">
                            {task_list_item.description}
                        </p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase">
                            User ID
                        </h2>
                        <p className="text-lg font-semibold text-gray-800">
                            {task_list_item.user_id}
                        </p>
                    </div>

                    <div className="flex justify-start">
                        <Link
                            href={`/task-list/${task_list_item.id}/edit`}
                            as="button"
                            method="get"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Edit Details
                        </Link>
                    </div>
                </div>
            </ContainerLayout>
            <ContainerLayout>
                <h2 className="text-xl font-large">Tasks</h2>
                <div className="w-full max-w-md bg-white rounded-lg py-10">
                    <TaskItem tasks={sub_tasks} />
                </div>
            </ContainerLayout>
        </AuthenticatedLayout>
    );
}
