import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Main.module.css";

import { EditMode } from "../dashboard/helpers";

const URL =
  "https://ixuwvr2560.execute-api.us-west-1.amazonaws.com/dev/allmenus";

const vendorId = "x4c-r5q";
const URL_FOR_VENDOR = `https://ixuwvr2560.execute-api.us-west-1.amazonaws.com/dev/menu/${vendorId}`;
const Main = () => {
  const [data, setData] = useState(null);
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [editMode, setEditMode] = useState([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(URL_FOR_VENDOR);
      const { restaurantInfo } = response?.data.data;
      setData(response.data.data);
      setRestaurantInfo(restaurantInfo);
    } catch (error) {
      throw error;
    }
  };

  const handleEdit = (data) => {
    setEditMode(data);
  };

  const onSave = () => {
    console.log("eidtMode", editMode, "\n data: ", data);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditMode((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                {item.id === editMode.id && Object.keys(editMode).length ? (
                  <EditMode
                    title={editMode.title}
                    description={editMode.description}
                    price={editMode.price}
                    onSave={onSave}
                    onChange={handleOnChange}
                  />
                ) : (
                  <>
                    <div>
                      <p>{item.title}</p>
                      <p>{item.description}</p>
                    </div>
                    <div className={styles.price}>
                      <p>{item.price}</p>
                    </div>
                    <div>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const displayMenus = () => {
    const menuCategories = Object.keys(data?.menu);
    const menuList = [];

    for (const item of menuCategories) {
      menuList.push([data?.menu[item], item]);
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
      {restaurantInfo && venueInfo(restaurantInfo)}
      {data && displayMenus()}
    </main>
  );
};

export default Main;
