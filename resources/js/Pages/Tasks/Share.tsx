import AutoSuggestMultiple, {
    SuggestionType,
} from "@/Components/Inputs/AutoSuggestMultiple";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ContainerLayout } from "@/Layouts/ContainerLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

type UserType = { name: string; id: number }[];
export default function Show() {
    const { props } = usePage();
    const task_list = props.task_list as { name: string; id: number };
    const users = props.users as UserType;
    const { data, setData, errors, wasSuccessful, patch } = useForm({
        users: [] as number[],
        can_edit: false,
    });
    console.log(errors);
    const setSuggestion = (suggestion: SuggestionType) => {
        setData((prev) => ({
            ...prev,
            users: [...prev.users, suggestion.id as number],
        }));
    };
    const shareTaskList: FormEventHandler = (e) => {
        e.preventDefault();
        patch(`/task-list/${task_list.id}/share`, {
            onSuccess: (payload) => {
                console.log(payload);
            },
        });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sharing task list
                </h2>
            }
        >
            <Head title="Sharing task list" />
            <ContainerLayout>
                <form onSubmit={shareTaskList}>
                    <input
                        type="hidden"
                        name="task_list_id"
                        value={task_list.id}
                    />
                    You are sharing: <b>{task_list.name} </b>task list with:
                    <AutoSuggestMultiple
                        suggestions={users}
                        value={data.users}
                        onChange={setSuggestion}
                    />
                    <div className="flex items-center space-x-6 py-5">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="choice"
                                className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                                checked={data.can_edit}
                                onChange={() =>
                                    setData((prev) => ({
                                        ...prev,
                                        can_edit: !prev.can_edit,
                                    }))
                                }
                            />
                            <span className="text-gray-700">
                                Allow the users to edit <b>{task_list.name}</b>
                            </span>
                        </label>
                    </div>
                    <div className="flex justify-start py-5">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Share
                        </button>
                    </div>
                </form>
            </ContainerLayout>
        </AuthenticatedLayout>
    );
}
