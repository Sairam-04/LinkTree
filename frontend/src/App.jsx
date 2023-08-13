import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllLinks } from "./store/reducers/linksSlice";
import { CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();

  const allLinks = useSelector((state) => state.links.links.data);

  useEffect(() => {
    dispatch(
      getAllLinks({
        username: "Sairam",
      })
    );
  });

  return (
    <>
      {allLinks.length ? (
        allLinks.map((item, index) => <li key={index}>
          {JSON.stringify(item)}
        </li>)
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default App;
