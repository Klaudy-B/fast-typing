import { Outlet, Link, useLoaderData } from "react-router-dom";
import { UserContext } from "../context";

const NavbarAndLayout = () => {
  const data = useLoaderData();
  return <>
    <header>
      <div className="container">
        <Link to="/">
          <h1>Fast-Typing</h1>
        </Link>
        <nav>
          {data.user && <>
              <span>{data.user}</span>
              <span><Link to='settings'>settings</Link></span>
              </>
          }
          {!data.user && 
            <div>
              <Link to="login">Log in</Link>
              <Link to="signup">Sign up</Link>
            </div>
          }
        </nav>
      </div>
    </header>
    {data.errorMessage&& <div className="error-message">{ data.errorMessage }</div>}
      <UserContext.Provider value={data.user}>
        <Outlet />
      </UserContext.Provider>
    <footer>Copyright 2023 Fast-Typing</footer>
  </>
}
  
export default NavbarAndLayout;