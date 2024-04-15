import React from "react";

const CurrentDateComponent = () => {
  const currentDate = new Date();
  const dateString = currentDate.toDateString();
  const [dayOfWeek, month, day, year] = dateString.split(" ");

  const formattedDateString = `${month} ${day}, ${year}`;

  return formattedDateString;
};

export default CurrentDateComponent;
