import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ContainerLayout } from "@/Layouts/ContainerLayout";
import { Head } from "@inertiajs/react";

export default function ErrorPage({ status }: { status: number }) {
    const title = {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden",
    }[status];

    const descriptions: { [props: number]: string } = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    };
    const description = descriptions[status];
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
                <h1>{title}</h1>
                <div>{description}</div>
            </ContainerLayout>
        </AuthenticatedLayout>
    );
}
