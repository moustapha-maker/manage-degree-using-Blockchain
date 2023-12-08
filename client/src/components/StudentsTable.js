import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import useToken from '../components/App/useToken';
import Button from 'react-bootstrap/Button';


const StudentsTable = ({ students, account }) => {

  const {token, setToken } = useToken();
  const [filterValue, setFilterValue] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);


  useEffect(() => {
    const filtered = students?.filter((student) => {
      const lowerCaseFilter = filterValue.toLowerCase();
      return (
        student?.id.toString().includes(lowerCaseFilter) ||
        student?.cin.toLowerCase().includes(lowerCaseFilter) ||
        student?.name.toLowerCase().includes(lowerCaseFilter) ||
        student?.age.toString().includes(lowerCaseFilter)
      );
    });
    setFilteredStudents(filtered);
  }, [filterValue, students]);

  return (
    <div>
    <div class="input-group" style={{alignContent:'center'}}>
      <div class="form-outline" data-mdb-input-init>
        <input type="search" id="form1" class="form-control" placeholder="Filter"
        onChange={(e) => setFilterValue(e.target.value)} value={filterValue} />
      </div>
    </div>

    <MDBTable align='middle'>
       
      <MDBTableHead>
        <tr>
          <th scope='col'>ID</th>
          <th scope='col'>CIN</th>
          <th scope='col'>Name</th>
          <th scope='col'>Age</th>
          <th scope='col'>Actions</th>
          <th scope='col'>Account</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {filteredStudents?.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.cin}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>
            {!token ? null : <Link to={`/add-degree/${student.id}`}>
               <MDBBtn color='primary' size='sm'>
                  Add Degree
                </MDBBtn>
              </Link> }
              
              <Link to={`/view-degrees/${student.id}`}>
                <Button variant="info" size='sm' className='ms-4'>
                View Degrees
                </Button>
              </Link>
            </td>
            <td>{account}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
    </div>
  );
};

export default StudentsTable;
