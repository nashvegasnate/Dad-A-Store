import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

export default function MyOrders() {
  return (
    <div>
      <Card className='income-cards'>
        <CardBody>
          <CardTitle tag="h3">This is your orders page</CardTitle>
          <CardText>Choose an option</CardText>
          <br />
          <Button className='mt-1' color='info'>Open Orders</Button>
          <Button className='ml-1 mt-1' color='info'>Completed Orders</Button>
        </CardBody>
      </Card>
    </div>
  );
}
