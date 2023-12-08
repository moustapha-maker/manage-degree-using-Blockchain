import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBadge, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate} from 'react-router-dom';
import { Eye } from 'react-bootstrap-icons';


const DegreesTable = ({ degrees }) => {
  const navigate = useNavigate();
  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>ID</th>
          <th scope='col'>Degree Name</th>
          <th scope='col'>Degree File</th>
          <th scope='col'>Mention</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {degrees?.map((degree) => (
          <tr key={degree.id}>
            <td>{degree.id}</td>
            <td>{degree.degreeName}</td>
            <td><Eye onClick={() => navigate(`/view-degree-image/${degree.pathToTheDegree.split("\\").pop()}`)} color="royalblue" size={30} onAnimationStart={true} /> </td>
            <td>{degree.diplomaMention}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default DegreesTable;
