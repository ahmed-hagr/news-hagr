import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArticlesGrid from "./articles";
import FilterComponent from "./filters";
import { fetchNewsAsync, fetchNewsSourceAsync } from "../store/newsorgSlice";

const NewsOrg = () => {
  const dispatch = useDispatch();
  const { articles, loading, sources } = useSelector((state) => state.newsorg);
  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  useEffect(() => {
    dispatch(fetchNewsAsync({
      category: undefined,
      country: "us",
      keyword: undefined,
      from: undefined,
      domains: undefined,
      type: "top-headlines",
    }));
    dispatch(fetchNewsSourceAsync());
  }, [dispatch]);

  const onSearch = (keyword) => {
    dispatch(fetchNewsAsync({
      category: undefined,
      country: undefined,
      keyword,
      from: undefined,
      domains: undefined,
      type: "everything",
    }));
  };

  return (
    <>
      <FilterComponent
        onSearch={onSearch}
        view="news-org"
        categories={categories}
        sources={sources}
      />
      <ArticlesGrid loading={loading} articles={articles} />
    </>
  );
};

export default NewsOrg;
