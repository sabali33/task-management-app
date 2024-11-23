import React, {useState} from "react";
import {Rows} from "@/Components/Rows";
export const Table = ({data, tableHeaders}:{data: Array<[]>, tableHeader: string[]}) => {

    return <>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
            <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Task Name</th>
                <th className="py-3 px-6 text-left">Assignee</th>
                <th className="py-3 px-6 text-center">Priority</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.length > 0 && <Rows data={data}/>}
            </tbody>
        </table>
        { data.length < 1 &&
        <p className="text-center text-gray-500 mt-4">No tasks available.</p>
        }
            </>

}
