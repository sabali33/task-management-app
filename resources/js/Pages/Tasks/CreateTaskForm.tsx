import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ContainerLayout } from "@/Layouts/ContainerLayout";
import { TaskItemType, TaskListItemType } from "./Show";
import { FormEventHandler } from "react";
import AutoSuggestField from "@/Components/Inputs/AutoSuggestionField";

export default function CreateTaskForm({ task }: { task?: TaskItemType }) {
    const { props } = usePage();
    const initialData = task
        ? {
              title: task.title,
              description: task.description,
              status: task.status,
              due_date: task.due_date,
              assignee_id: task.assignee_id,
              user_id: task.user_id,
              task_list_id: task.task_list_id,
          }
        : {
              title: "",
              description: "",
              status: "",
              due_date: "",
              assignee_id: "",
              task_list_id: 0,
              user_id: props.auth.user.id,
          };
    const { data, setData, post, errors, put } = useForm(initialData);

    const task_lists = props.task_list as TaskListItemType[];
    const users = props.users as { id: number; name: string }[];
    console.log(task_lists, users);
    const routePath = task ? `/task/${task.id}/update` : "/task/store";

    const title = task ? "Edit task" : "New Task";

    const requestMethod = task ? put : post;

    const bindInput: FormEventHandler<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    > = (e) => {
        const value = e.currentTarget.value;
        const field = e.currentTarget.getAttribute("name") as string;

        setData({ ...data, [field]: value });
    };

    const setAssignee = (assignee: number | string) => {
        setData({ ...data, assignee_id: assignee as number });
    };

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault();
        requestMethod(routePath, {
            onSuccess: (payload) => {
                console.log(payload);
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {title}
                </h2>
            }
        >
            <Head title="Task List Details" />
            <ContainerLayout>
                <form onSubmit={submitForm}>
                    <input
                        type="hidden"
                        id="user-id"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                        value={data.user_id}
                        onInput={bindInput}
                        name="user_id"
                    />

                    <div className="mb-4">
                        <label
                            htmlFor="task-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Task Name
                        </label>
                        <input
                            type="text"
                            id="task-name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter task name"
                            name="title"
                            value={data.title}
                            onInput={bindInput}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.title}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="task-description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Task Description
                        </label>
                        <textarea
                            id="task-description"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={4}
                            placeholder="Enter task description"
                            defaultValue={data.description}
                            onInput={bindInput}
                            name="description"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500">{errors.description}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <AutoSuggestField
                            suggestions={users}
                            label="Assign to a User"
                            setData={setAssignee}
                            value={data.assignee_id}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.assignee_id && (
                            <p className="text-red-500">{errors.assignee_id}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="due-date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Due Date
                        </label>
                        <input
                            type="date"
                            id="due-date"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                            value={data.due_date}
                            onChange={bindInput}
                            name="due_date"
                        />
                        {errors.due_date && (
                            <p className="text-red-500">{errors.due_date}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                            name="status"
                            defaultValue={data.status}
                            onChange={bindInput}
                        >
                            <option value="">Select status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500">{errors.status}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="tast-list"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Task List
                        </label>
                        <select
                            id="task-list"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                            name="task_list_id"
                            defaultValue={data.task_list_id}
                            onChange={bindInput}
                        >
                            <option value="">Select Task List</option>
                            {task_lists.map((taskList, index) => {
                                return (
                                    <option key={index} value={taskList.id}>
                                        {taskList.name}
                                    </option>
                                );
                            })}
                        </select>
                        {errors.task_list_id && (
                            <p className="text-red-500">
                                {errors.task_list_id}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit Task
                        </button>
                    </div>
                </form>
            </ContainerLayout>
        </AuthenticatedLayout>
    );
}
