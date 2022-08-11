import React from 'react';
import Router from 'next/router';
import Loading from './Loading'; 


Router.onRouteChangeStart = () => {
    <Loading />;

};

Router.onRouteChangeComplete = () => {
    <Loading />;

};

Router.onRouteChangeError = () => {
    <Loading />;

};