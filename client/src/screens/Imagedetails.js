import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import Navebar from '../components/navebar';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
const Imagedetails = () => {
  const { imageurl } = useParams();

  return (
    <div>
      <div>
  <Navebar />
</div>

<MDBCard alignment='center'>
      <MDBCardImage src={require(`../assets/${imageurl}`)} width={900} height={600}   position='center' alt='...' />
    </MDBCard>
    </div>
  );
};

export default Imagedetails;
