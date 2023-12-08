import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  
} from 'mdb-react-ui-kit';
import {  useNavigate  } from 'react-router-dom';
import useToken from '../components/App/useToken';

export default function Navebar() {
  const [openBasic, setOpenBasic] = useState(false);
  const {token, setToken } = useToken();

  const navigate = useNavigate();

  const login = (event) => {
    navigate('/login')
  }

  const logout = (event) => {
  setToken('');
  navigate('/');
  window.location.reload();
};


  const addStudent = (event) => {
    navigate('/add-student');
  }

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand >Gestion Diplome</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' onClick={() => navigate('/')}>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>

            {token ? <MDBNavbarItem>
              <MDBNavbarLink onClick={addStudent}>Add Student</MDBNavbarLink>
            </MDBNavbarItem> : null }

        {
        !token ?    <>
            <MDBNavbarItem>
              <MDBNavbarLink   tabIndex={-1} aria-disabled='true' onClick={login}>
                Login
              </MDBNavbarLink>
            </MDBNavbarItem>
            </> :
            <>
            <MDBNavbarItem>
              <MDBNavbarLink   tabIndex={-1} aria-disabled='true' onClick={logout}>
                Logout
              </MDBNavbarLink>
            </MDBNavbarItem>
            </>} 

          </MDBNavbarNav>
          

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}