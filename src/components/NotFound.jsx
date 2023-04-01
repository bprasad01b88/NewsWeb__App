import React from "react";
import notFound from '../notFound.jpg';

const NotFound = () => {
  return (
    <div className="container my-3">
      <div className="card bg-dark text-white">
        <img src={notFound} className="card-img" alt="..." />
      </div>
    </div>
  );
};

export default NotFound;
