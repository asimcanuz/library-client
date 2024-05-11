import React from 'react';
import { Nav } from 'react-bootstrap';
import { SidebarContext } from '../context/SidebarContext';

const Sidebar: React.FC = () => {
    // const { isOpen,toggleSidebar } = React.useContext(SidebarContext);

    const [activeItem, setActiveItem] = React.useState('home');

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    return (
        <Nav className="flex-column">
            <Nav.Item>
                <Nav.Link
                    active={activeItem === 'home'}
                    onClick={() => handleItemClick('home')}
                    
                >
                    Home
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    active={activeItem === 'about'}
                    onClick={() => handleItemClick('about')}
                >
                    About
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    active={activeItem === 'contact'}
                    onClick={() => handleItemClick('contact')}
                >
                    Contact
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Sidebar;