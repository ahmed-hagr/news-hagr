import axios from "axios";

export const fetchNewsorg = async (
  category,
  country,
  q,
  from,
  domains,
  type
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_newsApiorg_Base_url}${type}`,
      {
        params: {
          apiKey: process.env.REACT_APP_newsApiorgkey,
          category,
          country,
          q,
          from,
          domains,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
};

export const fetchSourcesNewsorg = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_newsApiorg_Base_url}top-headlines/sources`,
      {
        params: { apiKey: process.env.REACT_APP_newsApiorgkey },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
};

export const fetchNewsApi = async (
  categories,
  locale,
  search,
  published_before,
  domains,
  type
) => {
  try {
    console.log(categories);

    const response = await axios.get(
      `${process.env.REACT_APP_newsApi_Base_url}${type}`,
      {
        params: {
          api_token: process.env.REACT_APP_newsApikey,
          categories,
          locale,
          search,
          published_before,
          domains,
          // page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
};
export const fetchNewsApiSources = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_newsApi_Base_url}sources`,
      {
        params: {
          api_token: process.env.REACT_APP_newsApikey,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
};
