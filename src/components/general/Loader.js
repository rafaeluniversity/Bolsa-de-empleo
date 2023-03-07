import React from 'react';
import { useSelector } from 'react-redux';

export default function Loader() {
  const loadingCount = useSelector(state => state.loadingReducer);
  return (
    <>
      {loadingCount.loading && (
        <div className="preloader-it">
          <div className="loader-pendulums"></div>
        </div>)
      }
    </>
  );
}
