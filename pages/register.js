import Head from "next/head";
import React, {useState, useContext, useEffect} from "react";
import Link from "next/link";
import valid from "../utils/valid";
import { DataContent } from "../store/global_state";
import {postData} from '../utils/fetch_data';
import { useRouter } from 'next/router';

export default function Register(){

    const initialState = {name : '', email: '', password: '' , cf_password : ''}
    const [userData, setUserData] = useState(initialState)
    const { name, email, password , cf_password} = userData;

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

        console.log({name, email, password , cf_password})

        const err_msg =  valid(name, email, password , cf_password);

        if(err_msg) return dispatch({type: 'NOTIFY', payload: {error: err_msg }});

        dispatch({type: 'NOTIFY', payload: {loading: true }});

        const res = await postData('auth/register', userData);

        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err }})

        console.log(res);

        return dispatch({type: 'NOTIFY', payload: {success: res.msg }})

    }

    useEffect(() => {
        if(Object.keys(auth).length !== 0) router.push("/")
      }, [auth])

    return(
        <div>
             <Head>
                <title>Register page</title>
            </Head>
            <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp"
                    name="name" value={name} onChange={handleChangeInput} />
                </div>
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
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputCrPassword1"
                    name="cf_password" value={cf_password} onChange={handleChangeInput} />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Register</button>

                <p className="my-2">
                    Already have an account? <Link href="/signin"><a style={{color: 'crimson'}}>Login Now</a></Link>
                </p>
            </form>
        </div>
    )
}