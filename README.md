Project Title
News Aggregator Dashboard

Description
This React project is a comprehensive dashboard for aggregating news from various sources, providing a unified interface for users to browse, filter, and read news articles. It utilizes Redux for efficient state management and includes features such as dynamic filtering by category, source, and publication date, user preferences for news sources and categories, and a responsive design for accessibility across devices.

Installation
To set up this project locally, follow these steps:


Install the necessary dependencies: npm install


Set up the required environment variables by creating a .env.dev file in the root directory with the following content (replace values with your actual API keys):

REACT_APP_newsApiorg_Base_url=<NewsOrg.org>
REACT_APP_newsApiorgkey=<NewsOrg.org>&<YourNewsOrgAPIKey>
REACT_APP_newsApi_Base_url=<NewsAPI>
REACT_APP_newsApikey=<YourNewsAPIKey> <NewsAPI>


Start the development server: npm start


_______________

Usage
Browsing Articles: Navigate to the dashboard to see the latest news articles from your preferred sources.
Filtering Articles: Use the filter options to narrow down articles by category, source, or publication date.
Setting Preferences: Access the settings page to customize your news sources and categories.
 ---------------

 Environment Variables
To run this project, you will need to add the following environment variables to your .env.dev file:

REACT_APP_newsApiorg_Base_url
REACT_APP_newsApiorgkey
REACT_APP_newsApi_Base_url
REACT_APP_newsApikey
--------------------