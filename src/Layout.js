import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
const Layout = () => {
  return (
    <>   <div>
            <nav>
                <ul>
                <li>
                    <Link to="/Search">search</Link>
                </li>
                <li>
                    <Link to="/ShowDetails/123">Tasks</Link>
                </li>
                <li>
                  <Link to="/Seasons">kiran</Link>
                </li>
                </ul>
                
            </nav>
            </div>

            <Outlet />
    </>
  )
};

export default Layout;
