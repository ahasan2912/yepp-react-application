import { useState } from "react";
import Banner from "../../components/home/Banner";
import Deals from "./deals/Deals";
import SearchDeals from "./deals/search/SearchDeals";

const Home = () => {
    const [searchText, setSearchText] = useState({});

    const handleSearch = (value) => {
        setSearchText(value);
    }
    return (
        <div>
            <Banner handleSearch={handleSearch} />
            {
                searchText?.query?.length > 0 || searchText?.zipCode?.length > 0 ? <SearchDeals searchText={searchText} /> : <Deals />
            }
        </div>
    );
};

export default Home;