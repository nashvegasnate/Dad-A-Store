import React from 'react';
import {
  Card, CardBody, CardTitle, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function ItemHeaderCard({
  itemID,
  itemName
}) {
  const history = useHistory();

  // const handleClick = (type) => {
  //   switch (type) {
  //     case 'view':
  //       history.push(`/items/${itemID}`);
  //       break;
  //     default:
  //       console.warn('default');
  //   }
  // };

  return (
    <div>
      <Card className='item-header-cards'>
        <CardBody>
          <CardTitle tag="h3">{itemName}</CardTitle>
          <Button
            color="success"
            onClick={() => handleClick('view')}
            size="sm">
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

ItemHeaderCard.propTypes = {
  itemID: PropTypes.any.isRequired,
  itemName: PropTypes.any.isRequired,
};

export default ItemHeaderCard;
