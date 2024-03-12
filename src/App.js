import "./App.css";
import NewsOrg from "./components/newsOrg";
import Navbar from "./components/navbar";
import NewsApi from "./components/newsApi";
import Setting from "./components/setting";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/news-org" element={<NewsOrg />} />
        <Route exact path="/api-new" element={<NewsApi />} />
        <Route exact path="/setting" element={<Setting />} />
        
      </Routes>
    </div>
  );
}

export default App;
