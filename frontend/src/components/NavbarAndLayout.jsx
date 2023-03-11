import { Outlet, Link, useLoaderData } from "react-router-dom";
import { UserContext } from "../context";

const NavbarAndLayout = () => {
  const data = useLoaderData();
  return <>
    <header>
      <div className="home-container">
          <h1><Link to="/" className="home">Fast-Typing</Link></h1>
        <nav>
          {data.user && <>
              <span>{data.user}</span>
              <span><Link to='settings'>settings</Link></span>
              </>
          }
          {!data.user && 
            <div>
              <Link to="login/username">Log in</Link>
              <Link to="signup">Sign up</Link>
            </div>
          }
        </nav>
      </div>
      {data.user&&<Link to='my-records'>My records</Link>}
    </header>
    {data.error&& <div className="error-message">{ data.error }</div>}
      <UserContext.Provider value={{user: data.user, verified: data.verified, email: data.email}}>
        <Outlet />
      </UserContext.Provider>
    <footer>Copyright 2023 Fast-Typing</footer>
  </>
}
  
export default NavbarAndLayout;