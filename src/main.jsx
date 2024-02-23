import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Game from "./pages/Game/game";
import "./index.css";
import { RecoilRoot } from "recoil";
import Result from "./pages/Result/result";
import Layout from "./Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game/:name" element={<Game />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);
