'use client'

import { useEffect } from "react";
import { activateAuth } from "./GlobalRedux/Features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CheckAuth() {

    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {

      
        if (localStorage.getItem('access')) {
      
            dispatch(activateAuth())
            
        }
            
    }, [dispatch]);
}

