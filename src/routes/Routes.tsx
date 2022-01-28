import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Navbarmenu from '../components/shared/layout/header/Navbarmenu';
import {ModalRequest} from '../components/shared/RequestModal'
import { ThemeProviderEnum, themeVar } from '../variables/Shared'
import { Page404 } from '../pages/Page404'
import {AppContext, IModal} from '../contexts';
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie';
const LoginPage = lazy(() => import('../pages/LoginPage'))
const SignupPage = lazy(() => import('../pages/SignupPage'))
const EmailVerifyPage = lazy(() => import('../pages/EmailVerifyPage'))
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'))
const MainPage = lazy(() => import('../pages/MainPage'))
const LatestPage = lazy(() => import('../pages/LatestPage'))
const RarityPage = lazy(() => import('../pages/RarityPage'))
const UpcomingPage = lazy(() => import('../pages/UpcomingPage'))
const RegisterCollectionPage = lazy(() => import('../pages/RegisterCollectionPage'))


export default function Routes() {
  const [theme, setTheme] = useState({theme: localStorage.getItem('theme')})

  useEffect(() => {
    if (theme.theme === 'dark') {
      themeVar(ThemeProviderEnum.dark)
    } else {
      themeVar(ThemeProviderEnum.light)
    }
  }, [theme])

  const [user, setUser] = useState({
    authenticated: false,
    username: '', 
    email: '',
    exp: 0,
    first_name: '',
    last_name: '',
    account: '',
    photo: '',
    status: ''
  });

  useEffect(()=>{
    const cookies = new Cookies();
    if(cookies.get('token')){
      cookies.set('token', cookies.get('token'));
      if(user.authenticated) return;
      let userdata = jwt(cookies.get('token'));      
      setUser({
        authenticated: true,
        username: userdata["username"], 
        email: userdata["email"],
        exp: userdata["exp"],
        first_name: userdata["first_name"],
        last_name: userdata["last_name"],
        account: userdata['account'],
        photo: userdata['photo'],
        status: userdata['status']
      })
    }
  },[])

  const [modal, setModal] = useState({show: false})

  return (    
      <Suspense fallback={<Navbarmenu />}>
        <AppContext.Provider value={{user, setUser, theme, setTheme, modal, setModal}}>
          <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/latest' exact component={LatestPage} />
            <Route path='/viewcollection/:address/:slug' exact component={RarityPage} />
            <Route path='/upcoming' exact component={UpcomingPage} />
            <Route path='/login' exact component={LoginPage} />
            <Route path='/login/:auth' exact component={LoginPage} />
            <Route path='/register' exact component={SignupPage} />
            <Route path='/email_verify' exact component={EmailVerifyPage} />
            <Route path='/email_verify/:auth' exact component={EmailVerifyPage} />
            <Route path='/forgot_password' exact component={ForgotPasswordPage} />
            <Route path='/listing/collection' exact component={RegisterCollectionPage} />

            <Route path='**' component={Page404} />
          </Switch>
          
          <ModalRequest />
        </AppContext.Provider>
      </Suspense>
  )
}
