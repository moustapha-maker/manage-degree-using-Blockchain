import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
 } from 'mdb-react-ui-kit';
import {  useNavigate  } from 'react-router-dom';


async function loginUser(credentials) {
 return fetch('http://localhost:8088/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {

  const navigate = useNavigate();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser({
        username,
        password,
      });

      setToken(token);
      navigate('/');
    } catch (error) {
      if (error.status == 401) {
        setAlert(true);
      } else {
        // Handle other errors if needed
        console.error('Login error:', error);
      }
    }
  };

  return(
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-1'>

          <MDBCol md='4'>
            <MDBCardImage src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Ffr%2Fvectoriel%2F%25C3%25A9tudiants-de-chapeau-et-dipl%25C3%25B4me-de-la-remise-des-dipl%25C3%25B4mes-gm512049844-86962211&psig=AOvVaw1v4053hMG739H1WJzyBhaF&ust=1701788650711000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNDTnPiG9oIDFQAAAAAdAAAAABAD' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
             {alert==true ?? <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5> }

              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg" onChange={e => setUserName(e.target.value)}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={e => setPassword(e.target.value)}/>

              <MDBBtn className="mb-4" type='submit' color='dark' size='lg'>Login</MDBBtn>
              </form>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
);
  
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};