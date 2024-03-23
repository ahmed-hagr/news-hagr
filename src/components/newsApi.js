import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticlesGrid from "./articles";
import FilterComponent from "./filters";
import {
  fetchNewsaAPIAsync,
  fetchNewsSourcesAPIAsync,
} from "../store/newsapiSlice";

const NewsApi = () => {
  const dispatch = useDispatch();
  const { articles, loading, sources } = useSelector((state) => state.newsApi);
  const { favsources, favcategories } = useSelector(
    (state) => state.newsPreferences
  );
  const categories = [
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
    dispatch(
      fetchNewsaAPIAsync({
        categories:
          favcategories?.length > 0 ? favcategories.join(",") : "general",
        locale: undefined,
        search: undefined,
        published_before: undefined,
        domains: favsources?.length > 0 ? favsources.join(",") : undefined,
        type: "all/headlines",
      })
    );
    dispatch(fetchNewsSourcesAPIAsync());
  }, [dispatch, favcategories, favsources]); 

  return (
    <>
      <FilterComponent
        view={"news-api"}
        categories={categories}
        sources={sources}
      />
      <ArticlesGrid loading={loading} articles={articles} />
    </>
  );
};

export default NewsApi;
