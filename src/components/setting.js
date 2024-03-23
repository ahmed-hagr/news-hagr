import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSources, setCategories } from "../store/newsPreferencesSlice";
import { fetchNewsSourcesAPIAsync } from "../store/newsapiSlice";
import MultipleSelectChip from "./multiselect";
import { Button, Snackbar } from "@mui/material";

const Setting = () => {
  const dispatch = useDispatch();
  const { favsources, favcategories } = useSelector(
    (state) => state.newsPreferences
  );
  const { sources } = useSelector((state) => state.newsApi);

  const [selectedSources, setSelectedSources] = useState(favsources);
  const [selectedCategories, setSelectedCategories] = useState(favcategories);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const Categories = [
    "general",
    "science",
    "sports",
    "business",
    "health",
    "entertainment",
    "tech",
    "politics",
    "food",
    "travel",
  ];

  useEffect(() => {
    dispatch(fetchNewsSourcesAPIAsync());
  }, [dispatch]);

  const handleSourceChange = (data) => {
    setSelectedSources(data);
  };

  const handleCategoryChange = (data) => {
    setSelectedCategories(data);
  };

  const handleSavePreferences = () => {
    sessionStorage.setItem("selectedSources", JSON.stringify(selectedSources));
    sessionStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
    dispatch(setSources(selectedSources));
    dispatch(setCategories(selectedCategories));
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <MultipleSelectChip
        selectedData={selectedSources}
        handleChangeData={handleSourceChange}
        label={"Sources"}
        data={sources}
      />
      <MultipleSelectChip
        selectedData={selectedCategories}
        handleChangeData={handleCategoryChange}
        label={"Categories"}
        data={Categories}
      />
      <Button
        variant="contained"
        onClick={handleSavePreferences}
        sx={{ mt: 3 }}
      >
        Save Preferences
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Preferences saved"
      />
    </div>
  );
};

export default Setting;
