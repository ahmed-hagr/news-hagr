import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { fetchNewsAsync } from "../store/newsorgSlice";
import { fetchNewsaAPIAsync } from "../store/newsapiSlice";

// Define styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchKeyword("");
  }, [location]);

  const handleSearch = (e) => {
    const trimmedKeyword = searchKeyword.trim();
    if (e.key === "Enter" && trimmedKeyword.length > 0) {
      if (location.pathname === "/news-org") {
        dispatch(fetchNewsAsync({
          category: undefined,
          country: undefined,
          keyword: trimmedKeyword,
          from: undefined,
          type: "everything",
        }));
      } else if (location.pathname === "/api-new" || location.pathname === "/") {
        dispatch(fetchNewsaAPIAsync({
          categories: undefined,
          locale: "us",
          search: trimmedKeyword,
          published_before: undefined,
          domains: undefined,
          type: "all",
        }));
      }
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Type and press enter"
        inputProps={{ "aria-label": "search" }}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleSearch}
      />
    </Search>
  );
};

export default SearchBar;
