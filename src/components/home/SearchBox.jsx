import { useState } from 'react';
import { Search, MapPin, SendHorizontal } from 'lucide-react';

const SearchBox = ({ handleSearch }) => {
    const [formData, setFormData] = useState({
        query: '',
        zipCode: ''
    });

    const handleSearchButton = (e) => {
        e.preventDefault();
        const query = formData?.query;
        const zipCode = formData?.zipCode;
        handleSearch({ query, zipCode });
    };

    return (
        <div className="mt-4 sm:mt-7.5">
            <form
                role="search"
                aria-label="Search local deals"
                onSubmit={handleSearchButton}
                className="flex w-full max-w-185 flex-wrap items-center gap-y-2 rounded-lg bg-white px-2 py-2 shadow-lg sm:flex-nowrap sm:rounded-full sm:px-2 sm:py-1"
            >
                <div className="flex w-full min-w-0 items-center gap-2 border-b border-gray-100 px-2 pb-2 sm:w-auto sm:grow sm:border-b-0 sm:px-4 sm:pb-0 sm:gap-3">
                    <Search className="h-4 w-4 shrink-0 text-gray-400 sm:h-5 sm:w-5" aria-hidden="true" />
                    <label htmlFor="deal-search" className="sr-only">Search deals</label>
                    <input
                        id="deal-search"
                        type="text"
                        placeholder="Search deals...."
                        className="min-w-0 w-full text-sm sm:text-base outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    />
                </div>

                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                <div className="flex min-w-0 flex-1 items-center gap-2 px-2 sm:w-48 sm:flex-none sm:px-4">
                    <MapPin className="h-4 w-4 shrink-0 text-gray-400 sm:h-5 sm:w-5" aria-hidden="true" />
                    <label htmlFor="zip-code-search" className="sr-only">Zip code</label>
                    <input
                        id="zip-code-search"
                        type="text"
                        placeholder="Zip code"
                        className="min-w-0 w-full text-sm sm:text-base outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    className="hidden cursor-pointer sm:block bg-primary hover:bg-secondary text-white text-sm sm:text-base px-4 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-colors">
                    Search
                </button>
                <button
                    type="submit"
                    aria-label="Search deals"
                    className="sm:hidden shrink-0 text-white text-sm px-3 py-2 rounded-full font-medium transition-colors">
                    <SendHorizontal className="w-6 h-6 -rotate-45 text-primary" aria-hidden="true" />
                </button>
            </form>
        </div>
    );
};

export default SearchBox;
