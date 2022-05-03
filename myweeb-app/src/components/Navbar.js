import User from './pages/User.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Container, Modal, Tab } from 'react-materialize';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Dummies Guide to Weeb
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <NavItem className='ml-auto'>
              <NavItem.Link as={Link} to='/'>
                Animes
              </NavItem.Link>
              {/* if user is logged in show saved anime, liked and disliked and logout */}
              {Auth.loggedIn() ? (
                <>
                  <NavItem.Link as={User} to='/user'>
                    Saved Animes
                  </NavItem.Link>
                  <NavItem.Link onClick={Auth.logout}>Logout</NavItem.Link>
                </>
              ) : (
                <NavItem.Link onClick={() => setShowModal(true)}>Login/Sign Up</NavItem.Link>
              )}
            </NavItem>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <NavItem variant='pills'>
                <NavItem>
                  <NavItem.Link eventKey='login'>Login</NavItem.Link>
                </NavItem>
                <NavItem>
                  <NavItem.Link eventKey='signup'>Sign Up</NavItem.Link>
                </NavItem>
              </NavItem>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
