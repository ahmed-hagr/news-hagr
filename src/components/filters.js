import React, { useState } from "react";
import { TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import moment from "moment";
import { fetchNewsAsync } from "../store/newsorgSlice";
import { fetchNewsaAPIAsync } from "../store/newsapiSlice";
import { useDispatch } from "react-redux";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const FilterComponent = ({ sources, onSearch, view, categories }) => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDate, setSelectedDate] = useState(moment());
  const [formattedDate, setFormattedDate] = useState(moment(selectedDate).format("YYYY-MM-DD"));
  const [source, setSource] = useState(undefined);

  const handleFilterRequest = (data) => {
    if (view === "news-org") {
      dispatch(fetchNewsAsync(data));
    } else {
      dispatch(fetchNewsaAPIAsync({
        categories: data.category,
        locale: data.country,
        search: undefined,
        published_before: data.from,
        domains: data.domains,
        type: "all/headlines",
      }));
    }
  };

  const handleCategoryChange = (event) => {
    const data = {
      category: event.target.value,
      country: undefined,
      keyword: undefined,
      from: formattedDate,
      domains: source,
      type: "top-headlines",
    };
    handleFilterRequest(data);
    setSelectedCategory(event.target.value);
  };

  const handleSourceChange = (event) => {
    const cleanSource = event.target.value.startsWith("https://")
      ? event.target.value.replace("https://", "")
      : event.target.value;
    setSource(cleanSource);
    const data = {
      category: selectedCategory,
      country: undefined,
      keyword: undefined,
      from: formattedDate,
      domains: cleanSource,
      type: "top-headlines",
    };
    handleFilterRequest(data);
    setSelectedSource(event.target.value);
  };

  const handleDateChange = (newValue) => {
    const date = moment(newValue).format("YYYY-MM-DD");
    setFormattedDate(date);
    setSelectedDate(newValue);
    const data = {
      category: selectedCategory,
      country: undefined,
      keyword: undefined,
      from: date,
      domains: source,
      type: "top-headlines",
    };
    handleFilterRequest(data);
  };

  return (
    <div className="row mx-0 px-3">
      <div className="col-md-3 col-sm-6 mb-3">
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="col-md-3 col-sm-6 mb-3">
        <FormControl fullWidth>
          <InputLabel>Source</InputLabel>
          <Select
            value={selectedSource}
            label="Source"
            onChange={handleSourceChange}
          >
            {sources.map((source, index) => (
              <MenuItem key={source.url || source.domain || index} value={source.url || source.domain}>
                {source.name || source.domain}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="col-md-3 col-sm-6 mb-3">
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker
              value={selectedDate}
              onAccept={handleDateChange}
              label="Filter by date"
              disableFuture
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterComponent;
