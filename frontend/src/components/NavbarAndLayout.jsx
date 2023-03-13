import { Outlet, Link, useLoaderData, NavLink } from "react-router-dom";
import { UserContext } from "../context";

const NavbarAndLayout = () => {
  const data = useLoaderData();
  return <>
    <header>
      <div className="home-container">
          <h1><Link to="/" className="home-link">Fast-Typing</Link></h1>
        <nav>
          {data.user && <>
              <span>{data.user}</span>
              <span><NavLink to='settings'>settings</NavLink></span>
              </>
          }
          {!data.user &&<>
              <NavLink to="login/username" className="home-login-link">Log in</NavLink>
              <NavLink to="signup">Sign up</NavLink>
              </>
          }
        </nav>
      </div>
      {data.user&&<nav>
        <Link to='my-records'>My records</Link>
        <Link to='levels'>Levels</Link>
        </nav>}
    </header>
    {data.error&& <div className="error-message">{ data.error }</div>}
      <UserContext.Provider value={{user: data.user, verified: data.verified, email: data.email}}>
        <Outlet />
      </UserContext.Provider>
    <footer>Copyright 2023 Fast-Typing</footer>
  </>
}
  
export default NavbarAndLayout;