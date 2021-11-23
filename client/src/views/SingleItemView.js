import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { getItemByItemID } from '../helpers/data/itemsData';

export default function SingleItemView() {
  const [item, setItem] = useState({});
  const { itemParam } = useParams();

  useEffect(() => {
    getItemByItemID(itemParam)
      .then(setItem);
  }, []);

  return (
    <div>
      <h3>Single Item View</h3>
      <ItemCard
          itemID={item.itemID}
          itemName={item.itemName}
        />
    </div>
  );
}
