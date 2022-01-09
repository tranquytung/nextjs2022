import Head from "next/head";
import React, {useState, useContext, useEffect} from "react";
import Link from "next/link";
import { DataContent } from "../store/global_state";
import { postData } from "../utils/fetch_data";
import Cookies from "js-cookie";
import { useRouter } from 'next/router';


export default function SignIn(){

    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData;
    const {state, dispatch} = useContext(DataContent);

    const {auth} = state;
    const router = useRouter();

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });

        dispatch({type: 'NOTIFY', payload: {}});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        dispatch({type: 'NOTIFY', payload: {loading: true }});

        const res = await postData('auth/login', userData);

        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err }});

        dispatch({type: 'NOTIFY', payload: {success: res.msg }});

        dispatch({type: 'AUTH', payload: {
            token: res.access_token,
            user: res.user
         }});

        Cookies.set('refreshtoken', res.refresh_token,{
            path: 'api/auth/access_token',
            expires: 7
        });

        localStorage.setItem('first_login', true);

    }

    useEffect(() => {
        if(Object.keys(auth).length !== 0) router.push("/")
      }, [auth])

    return(
        <div>
            <Head>
                <title>Sign in page</title>
            </Head>
            <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    name="email" value={email} onChange={handleChangeInput} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    name="password" value={password} onChange={handleChangeInput} />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Login</button>

                <p className="my-2">
                    You don't have an account? <Link href="/register"><a style={{color: 'crimson'}}>Register Now</a></Link>
                </p>
            </form>
        </div>
    )
}