import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

const Highlights = ({ setValue, initialHighlights = [] }) => {
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const func = () => {
            if (initialHighlights?.length) {
                setTags(initialHighlights);
                setValue("highlights", initialHighlights);
            }
        };
        func();
    }, [initialHighlights, setValue]);

    const handleAddTag = () => {
        if (!tagInput.trim()) return;
        const updated = [...tags, tagInput.trim()];
        setTags(updated);
        setTagInput("");
        setValue("highlights", updated);
    };

    const handleRemoveTag = (index) => {
        const updated = tags.filter((_, i) => i !== index);
        setTags(updated);
        setValue("highlights", updated);
    };

    const notMatchHighlight = initialHighlights?.filter(value => !tags.includes(value));
    setValue("deletedHighlights", notMatchHighlight);

    return (
        <div>
            <label className="block text-base text-[#262626] font-medium mb-2">
                Highlights
            </label>
            <div className="flex items-center justify-center gap-2">
                <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Enter highlights"
                    className="w-full rounded-full border border-slate-300 bg-white px-6 py-4 text-[#262626] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <button
                    type="button"
                    onClick={handleAddTag}
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md transition-all hover:bg-secondary active:scale-95"
                >
                    <Plus size={20} />
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="font-bold text-red-500 transition-colors hover:text-red-600"
                        >
                            x
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Highlights;
