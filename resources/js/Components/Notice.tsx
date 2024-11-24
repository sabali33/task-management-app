import { useState } from "react";

export const Notice = ({ wasSuccessful }: { wasSuccessful: boolean }) => {
    return (
        <>
            {wasSuccessful && (
                <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 text-green-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m0 0a9 9 0 11-9 9 9 9 0 019-9z"
                                />
                            </svg>
                        </div>

                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">
                                Success! Your project has been saved.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
