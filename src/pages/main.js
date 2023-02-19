import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Main.module.css";

const URL =
  "https://ixuwvr2560.execute-api.us-west-1.amazonaws.com/dev/allmenus";

const Main = () => {
  const [data, setData] = useState(null);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(URL);

      setData(response.data);
    } catch (error) {
      console.log("Error occurred :(", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchMenus();
  }, []);
  return (
    <main className={styles.main}>
      {data && console.log("data here: ", data)}
      <p>This is a Main landing page.</p>
    </main>
  );
};

export default Main;
