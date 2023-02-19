import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Main.module.css";

const URL =
  "https://ixuwvr2560.execute-api.us-west-1.amazonaws.com/dev/allmenus";

const Main = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(URL);
      setData(response.data.data);
    } catch (error) {
      console.log("Error occurred :(", error);
      throw error;
    }
  };

  const innerRenderer = (args, index) => {
    const [data, section] = args;
    return (
      <div key={index} className={styles.innerBox}>
        <p>{section}</p>
        <div>
          {data.map((item, index) => {
            return (
              <div key={index} className={styles.card}>
                <p>{item.title}</p>
                <p>{item.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const displayMenus = () => {
    const menuCategories = Object.keys(data[0]?.menu);
    const menuList = [];

    for (const item of menuCategories) {
      menuList.push([data[0]?.menu[item], item]);
    }

    return menuList.map((item, index) => innerRenderer(item, index));
  };

  return (
    <main className={styles.main}>
      <p>This is a Main landing page.</p>

      {data && displayMenus()}
    </main>
  );
};

export default Main;
