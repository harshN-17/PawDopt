import React from 'react'
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchVal } from '../../state';

const SearchWidget = () => {
    // const [searchVal, setSearchVal] = useState("");
    const dispatch = useDispatch();
    const searchVal = useSelector((state) => state.seachVal);
  return (
    <div>
      <form>
        <TextField
            id='search-bar'
            className='search-text'
            onInput={(e) => {
                let text = e.target.value.trim();
                dispatch(setSearchVal({searchVal: text}));
                console.log(text)
            }}
            label="Search"
            placeholder='Try Dogs, Young, Labra...'
            value={searchVal}
        />
      </form>
    </div>
  )
}

export default SearchWidget
