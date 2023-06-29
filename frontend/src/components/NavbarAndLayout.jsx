import { Outlet, Link, useLoaderData, NavLink } from "react-router-dom";
import { UserContext } from "../context";
import { urls } from "../scripts/helpers";

const NavbarAndLayout = () => {
  const data = useLoaderData();
  return <>
    <header>
      <div className="home-container">
          <h1><Link to={urls.home} className="home-link">Fast-Typing</Link></h1>
        <nav>
          {data.user && <>
              <span>{data.user}</span>
              <NavLink to={urls.settings}>settings</NavLink>
              </>
          }
          {!data.user &&<>
              <NavLink to={`${urls.login}${urls.username}`}className="home-login-link">Log in</NavLink>
              <NavLink to={urls.signup}>Sign up</NavLink>
              </>
          }
        </nav>
      </div>
      {data.user&&<nav>
        <NavLink to={urls.myRecords}>My records</NavLink>
        <NavLink to={urls.levels}>Levels</NavLink>
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