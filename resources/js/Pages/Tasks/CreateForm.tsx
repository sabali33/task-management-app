import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ContainerLayout } from "@/Layouts/ContainerLayout";
import { FormEventHandler } from "react";
import { Notice } from "@/Components/Notice";
import { TaskListItemType } from "./Show";

export default function CreateForm() {
    const { props } = usePage();
    const task_list = props.task_list as TaskListItemType;

    const initialData =
        task_list !== undefined
            ? {
                  taskName: task_list.name,
                  description: task_list.description,
                  startDate: task_list.start_date,
                  endDate: task_list.end_date,
                  status: task_list.status,
              }
            : {
                  taskName: "",
                  description: "",
                  startDate: "",
                  endDate: "",
                  status: "",
              };
    const {
        data,
        setData,
        processing,
        post,
        put,
        errors,
        reset,
        setError,
        isDirty,
        wasSuccessful,
    } = useForm(initialData);

    const routePath = task_list
        ? `/task-list/${task_list.id}/update`
        : "/task-list/store";

    const requestMethod = task_list ? put : post;

    const title = task_list ? "Edit Task List" : "New Task List";

    const bindInput: FormEventHandler<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    > = (e) => {
        const value = e.currentTarget.value;
        const field = e.currentTarget.getAttribute("name") as string;

        setData({ ...data, [field]: value });
    };

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault();
        requestMethod(routePath, {
            onSuccess: (payload) => {
                console.log(payload);
                //setData(initialData);
            },
            onError: (error) => {},
            onProgress: (progress) => {
                console.log(progress);
            },
        });
    };
    console.log(isDirty, errors);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {title}
                </h2>
            }
        >
            <Head title="Task Lists" />
            <ContainerLayout>
                <Notice wasSuccessful={wasSuccessful} />
                <form onSubmit={submitForm}>
                    <div className="mb-4">
                        <label
                            htmlFor="taskName"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Task List Name
                        </label>
                        <input
                            type="text"
                            id="taskName"
                            name="taskName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Task List"
                            required
                            value={data.taskName}
                            onInput={bindInput}
                        />
                        {errors.taskName && <p>{errors.taskName}</p>}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter task list description"
                            required
                            onInput={bindInput}
                            defaultValue={data.description}
                        ></textarea>
                        {errors.description && <p>{errors.description}</p>}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="startDate"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={data.startDate}
                            onChange={bindInput}
                        />
                        {errors.startDate && <p>{errors.startDate}</p>}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="endDate"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.endDate}
                            onChange={bindInput}
                        />
                        {errors.endDate && <p>{errors.endDate}</p>}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="status"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            onChange={bindInput}
                            defaultValue={data.status}
                        >
                            <option value="">Select status</option>
                            <option value="not_started">Not Started</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        {errors.status && <p>{errors.status}</p>}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={processing}
                        >
                            Save Task List
                        </button>
                    </div>
                </form>
            </ContainerLayout>
        </AuthenticatedLayout>
    );
}
