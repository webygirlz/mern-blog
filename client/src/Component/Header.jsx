import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import {Navbar, TextInput ,Button, Dropdown, Avatar} from "flowbite-react";
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon}  from 'react-icons/fa';
import {useSelector} from 'react-redux';


function Header() {

  const path = useLocation().pathname;
  const {currentUser} = useSelector(state => state.user);
  return (
    <Navbar className='border-b-2 p-1'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>logo</span>blog
      </Link>
      <form>
      <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray'>
        <AiOutlineSearch/>
      </Button>

      <div className='flex gap-2 md:order-2'>
         <Button className='w-12 h-10 hidden sm:inline' pill>
          <FaMoon/>
         </Button>
         {currentUser?(
          <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt='user' img={currentUser.profilePicture}></Avatar>
        }
          >
          </Dropdown>
         ):(
              <Link to="/sign-in">
              <Button gradientDuoTone='purpleToBlue' outline>
               Sign In
              </Button>
              </Link>
         )}
       
         <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
             <Navbar.Link active={path=== "/"} as={'div'}>
                <Link to="/">
                Home
                </Link>
             </Navbar.Link>
             <Navbar.Link active={path=== "/about"} as={'div'}>
                <Link to="/about">
                About
                </Link>
             </Navbar.Link>
             <Navbar.Link active={path=== "/contactus"} as={'div'}>
                <Link to="/contactus">
                Contact Us
                </Link>
             </Navbar.Link>
         </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
