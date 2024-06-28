import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

const Searchicon = () => { 
const [search, setSearch] = useState("");
const [searchData, setSearchData] = useState([]);
const [selectedItem, setSelectedItem] = useState(-1);
const handleChange = (e) => {
    setSearch(e.target.value);
    };
const handleClose = () =>{
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
    };

const handleKeyDown = (e) => {
    if (searchData.length > 0) {
        if(e.key === "ArrowUp" && selectedItem > 0) {
            selectedItem((prev) => prev - 1);
        }else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1)
	{
	setSelectedItem((prev) => prev + 1);
        }else if (e.key === "Enter" && selectedItem >= 0) {
                window.open(searchData[selectedItem].show.url);
             }
    else {
            setSelectedItem(-1);
    }
};

    useEffect(() => {
        if(search !== ""){
            fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
            .then((res) => res.json())
            .then((data) => setSearchData(data));
   }
   else{
    setSearchData([]);
   }
    }, [search]);
    return (
        <section className="search_section">
            <div className="search_input_div">
                <input
                    type="text"
                    className="search_input"
                    placeholder="Search..."
                    autoComplete="off"
                    onChange={handleChange}
                    value={search}
                    onKeyDown={handleKeyDown}
                />
                <div className="search_icon">
                        { search === "" ?(<SearchIcon />) : (<CloseIcon onClick={handleClose}/>)
                        }
                 
                </div>
            </div>
            <div className="search_result">
                {
                    searchData.slice (0, 10).map((data, index) => {
                        return <a 
                                    href={data.show.url} 
                                    key={index} 
                                    target="_blank"
                                    className={selectedItem === index 
                                        ? "search_suggestion_line active"
                                        : "search_suggestion_line"}
				>
                        {data.show.name}
	                      </a>
                    })
                }
            </div>
        </section>
    );
};

}
export default Searchicon;



