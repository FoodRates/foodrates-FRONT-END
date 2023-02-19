import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Main.module.css";

const URL =
  "https://ixuwvr2560.execute-api.us-west-1.amazonaws.com/dev/allmenus";

const Main = () => {
  const [data, setData] = useState(null);
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(URL);
      const [restaurantInfo] = response.data.data;
      setData(response.data.data);
      setRestaurantInfo(restaurantInfo);
    } catch (error) {
      console.log("Error occurred :(", error);
      throw error;
    }
  };

  const innerRenderer = (args, index) => {
    const [data, section] = args;
    return (
      <div key={index} className={styles.innerBox}>
        <p className={styles.menuSection}>{section}</p>
        <br />
        <div>
          {data.map((item, index) => {
            return (
              <div key={index} className={styles.card}>
                <div>
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                </div>
                <div className={styles.price}>
                  <p>{item.price}</p>
                </div>
                <div>
                  <button>Edit</button>
                </div>
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

  const venueInfo = (data) => {
    const { City, Location, Name, PhoneNumber, State, Zipcode } = data;

    return (
      <div>
        <span>{Name}</span>
        <div>
          <span>{Location}</span>
        </div>
        <span>{City}</span>
        <span>{State}</span>
        <span>{Zipcode}</span>
        <div>{PhoneNumber}</div>
      </div>
    );
  };
  return (
    <main className={styles.main}>
      <p>This is a Main landing page.</p>
      {restaurantInfo && venueInfo(restaurantInfo.restaurantInfo)}
      {data && displayMenus()}
    </main>
  );
};

export default Main;
