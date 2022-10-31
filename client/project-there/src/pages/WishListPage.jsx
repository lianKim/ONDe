import React from 'react';
import { useParams } from 'react-router-dom';

function WishListPage() {
  const params = useParams();

  return (
    <div>
      <span>params : </span>
      <span>params</span>
    </div>
  );
}

export default WishListPage;
