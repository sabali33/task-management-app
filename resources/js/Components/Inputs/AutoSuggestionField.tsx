import { FormEventHandler, useState } from "react";
import { SuggestionsType, SuggestionType } from "./AutoSuggestMultiple";

const AutoSuggestField = ({
    suggestions,
    label,
    setData,
    value,
    className,
}: {
    suggestions: SuggestionsType;
    label: string;
    setData: (value: string | number) => void;
    value: string | number;
    className: string;
}) => {
    const [inputValue, setInputValue] = useState(value);
    const [filteredSuggestions, setFilteredSuggestions] =
        useState<SuggestionsType>([]);

    const handleInputChange: FormEventHandler<HTMLInputElement> = (event) => {
        const value = event.currentTarget.value;
        setInputValue(value);

        if (value.trim() === "") {
            setFilteredSuggestions([]);
            return;
        }

        const filtered = suggestions.filter((suggestion) =>
            suggestion.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    };

    const handleSuggestionClick = (suggestion: SuggestionType) => {
        setInputValue(suggestion.name); // Use `name` for display
        setData(suggestion.id);
        setFilteredSuggestions([]);
    };

    return (
        <>
            <label
                htmlFor="auto-suggest"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
            </label>
            <input
                type="text"
                id="auto-suggest"
                className={className}
                placeholder="Type to search..."
                value={inputValue}
                onChange={handleInputChange}
            />
            {filteredSuggestions.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 bg-white shadow-lg">
                    {filteredSuggestions.map((suggestion) => (
                        <li
                            key={suggestion.id} // Use `id` for unique key
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name} {/* Display the `name` */}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default AutoSuggestField;
