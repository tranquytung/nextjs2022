import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContent } from "../store/global_state";
import Cookie from "js-cookie";

export default function NavBar(){
    const router = useRouter();

    const {state, dispatch} = useContext(DataContent);
    const {auth} = state;

    const isActive = (r) => {
        if(r === router.pathname){
            return " active";
        }else{
            return "";
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/access_token'})
        localStorage.removeItem('first_login')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
        return router.push('/')
    }


    const loggedRouter = () => {
        return(
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.avatar} 
                    style={{
                        borderRadius: '50%', width: '30px', height: '30px',
                        transform: 'translateY(-3px)', marginRight: '3px'
                    }} /> {auth.user.name}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    {/* <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                    </Link> */}
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
            </li>
        )
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbar-brand">E-commerce</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href={'/cart'}>
                                <a className={"nav-link" + isActive('/cart')}>
                                <i className="fas fa-shopping-cart" aria-hidden='true'></i> Cart</a>
                            </Link>
                        </li>

                       {
                           Object.keys(auth).length === 0 ? (
                            <li className="nav-item">
                                <Link href={'/signin '}>
                                    <a className={"nav-link" + isActive('/signin')}>
                                    <i className="fas fa-user" aria-hidden='true'></i> Sign in</a>
                                </Link>
                            </li>
                           ) : loggedRouter()
                       }
                    
                    </ul>
            
                </div>
            </div>
        </nav>
    )
}