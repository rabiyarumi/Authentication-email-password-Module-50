import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen '>
            <Navbar></Navbar>
            <div className='flex-grow container mx-auto'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default Layout;