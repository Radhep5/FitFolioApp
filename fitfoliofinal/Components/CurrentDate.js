import React from "react";

const CurrentDateComponent = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDateString = `${month}-${day}-${year}`;

  return formattedDateString;
};

export default CurrentDateComponent;
