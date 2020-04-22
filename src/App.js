import React, {useState} from 'react';
import {CSSTransition} from 'react-transition-group'
import './index.css';

function App() {
  return (
    <NavBar>
      <NavItem icon='😁'/>
      <NavItem icon='😶'/>
      <NavItem icon='🤯'/>

      <NavItem icon='⚔'>

      <DropdownMenu/>

      </NavItem>
    </NavBar>
  );
}
//props has built in property of children
function NavBar(props) {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'> {props.children} </ul> 
    </nav>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false)
  return (
    <li className='nav-item'>
      <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  )
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState('null');

  function calcHeight(el){
    const height = el.offsetHeight;
    setMenuHeight(height)
  }

  function DropdownItem(props) {
    return (
      <a href='#' className='menu-item' onClick={()=>props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='icon-button'>{props.leftIcon}</span>
        {props.children}
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )

  }
  return (
    <div className='dropdown' style={{height: menuHeight}}>
      <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames='menu-primary'>
        <div className='menu' onEnter={calcHeight}>
          <DropdownItem> My Profile </DropdownItem>
          <DropdownItem 
            leftIcon='⚙'
            rightIcon='👉'
            goToMenu='settings'
            >
            Settings 
          </DropdownItem>
        </div>
        
      </CSSTransition>

      <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} classNames='menu-secondary'>
        <div className='menu'>
          <DropdownItem leftIcon='👈' goToMenu='main'> </DropdownItem>
          <DropdownItem> Sub 1 </DropdownItem>
          <DropdownItem> Sub 2 </DropdownItem>
          
        </div>
        
      </CSSTransition>
      
    </div>
  )
}

export default App;
