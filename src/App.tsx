import { Navigate, Route, Routes } from "react-router-dom";
import FollowCards from "./components/FollowCards/FollowCards";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tweets" element={<FollowCards />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
