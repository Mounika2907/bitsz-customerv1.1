import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import routes from '../../../routes';
import { Route } from 'react-router-dom';

export class BankLayout extends Component {
    getRoutes = (routes) => {
        return routes.map((route, id) => {
            return route.component ? (<Route path={route.path}
                exact={route.exact}
                key={id}
                name={route.name}
                render={props => <route.component {...props} />}
            />) : (null)
        });
    }

    render() {
        return (            
            <Aux>
                {/* <Header /> */}
                {this.getRoutes(routes)}
                {/* <Footer /> */}
            </Aux>
        )
    }
}

export default BankLayout;
