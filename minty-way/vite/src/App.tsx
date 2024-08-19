import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Permissions from "./pages/Permissions";
import Multi from "./pages/Multi";
import MyPage from "./pages/MyPage";
import TokenDetail from "./pages/TokenDetail";
import CreateToken from "./pages/CreateToken";
import Presale from "./pages/Presale";
import PresaleDetail from "./pages/PresaleDetail";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/createToken" element={<CreateToken />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/multi" element={<Multi />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/token/:contractAddress" element={<TokenDetail />} />
          <Route path="/presale" element={<Presale />} />
          <Route path="/presale/:presaleName" element={<PresaleDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
