import React from "react";

export const TableHeader = ({headers}:{headers: string[]}) => {
    return <>
        {headers.map((heading, index) => <th key={index} className="py-3 px-6 text-left">{heading}</th>)}
    </>
}
