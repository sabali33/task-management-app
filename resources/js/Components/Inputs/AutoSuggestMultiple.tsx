import { FormEventHandler, useState } from "react";

export type SuggestionsType = SuggestionType[];
export type SuggestionType = { id: number | string; name: string };
export const AutoSuggestMultiple = ({
    suggestions,
    value,
    onChange,
}: {
    suggestions: SuggestionsType;
    value: number[];
    onChange: (suggestion: SuggestionType) => void;
}) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] =
        useState<SuggestionsType>([]);
    const [selectedValues, setSelectedValues] = useState<SuggestionsType>([]);

    const handleInputChange: FormEventHandler<HTMLInputElement> = (event) => {
        const value = event.currentTarget.value;
        setInputValue(value);

        if (value.trim() === "") {
            setFilteredSuggestions([]);
            return;
        }

        const filtered = suggestions.filter(
            (suggestion: SuggestionType) =>
                suggestion.name.toLowerCase().includes(value.toLowerCase()) &&
                !selectedValues.some(
                    (selected) => selected.id === suggestion.id
                )
        );
        setFilteredSuggestions(filtered);
    };

    const handleSuggestionClick = (suggestion: SuggestionType) => {
        setSelectedValues([...selectedValues, suggestion]);
        setInputValue("");
        onChange(suggestion);
        setFilteredSuggestions([]);
    };

    const handleRemoveSelected = (id: number | string) => {
        setSelectedValues(
            selectedValues.filter((selected) => selected.id !== id)
        );
    };

    return (
        <div className="max-w-sm mt-10">
            <label
                htmlFor="multi-suggest"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Select Frameworks
            </label>
            <div className="flex flex-wrap gap-2 border border-gray-300 rounded-lg px-4 py-2">
                {selectedValues.map((value) => (
                    <div
                        key={value.id}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
                    >
                        {value.name}
                        <button
                            onClick={() => handleRemoveSelected(value.id)}
                            className="bg-white text-blue-500 rounded-full w-5 h-5 flex items-center justify-center"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    id="multi-suggest"
                    className="flex-grow focus:outline-none text-sm"
                    placeholder="Type to search..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </div>
            {filteredSuggestions.length > 0 && (
                <ul className="border border-gray-300 rounded-lg mt-2 bg-white shadow-lg">
                    {filteredSuggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoSuggestMultiple;
