import React, { Component } from 'react';
import routes from '../../../routes';
import { Route, Switch, Redirect } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
// import Footer from '../Footer/Footer';
// import Header from '../Header/Header';
import Sidebar from '../SideBar/SideBar';
import { connect } from 'react-redux';
import { UpdateOnlineAction, GetNotificationAction } from '../../../Store/Actions/GenerateAction';
import { GetVcipStatusAction } from '../../../Store/Actions/ProcessAction';
import { ResetRdrAction } from '../../../Store/Actions/UsersActions/UserActions';
import { Text } from '../../../View/Language/Language';
// const $ = window.$;

class Layout extends Component {
    componentDidMount() {
        window.addEventListener("popstate", e => {
            this.props.history.goForward();
        })
        if (sessionStorage.getItem("vcipid")) {
            this.updates();
            // this.loadScripts();
            // this.props.GetVcipStatusAction();
            // this.props.UpdateOnlineAction();
            // this.props.GetNotificationAction();
            // const status = this.props.pincodeRdr?.statuses?.vcipidstatus;
            // if (status === undefined || status === "0") {
            //     return <Redirect to="/" from="*" />
            // }
        }
        //  else {
        //     return <Redirect to="/" from="*" />
        // }
    }

    loadScripts = () => {
        const dynamicScripts = [
            '/js/script.js',
        ];
        for (let i = 0; i < dynamicScripts.length; i++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

    componentWillUnmount() {
        if (sessionStorage.getItem("vcipid")) {
            this.updates();
            // const status = this.props.pincodeRdr?.statuses?.vcipidstatus;
            // if (status === undefined || status === "0") {
            //     return <Redirect to="/" />
            // }
        }
    }

    // menuCollapse = () => {        
    //     $('#sidenav-btn').toggleClass('active-btn');
    //     $('#menu').toggleClass('active-menu');
    //     $('#menudiplsay').toggleClass('active-body');
    // }

    updates = () => {
        // this.props.GetVcipStatusAction();
        this.props.UpdateOnlineAction();
        this.props.GetNotificationAction();
    }


    logout = () => {
        sessionStorage.clear();
        this.props.history.replace("/");
        this.props.ResetRdrAction();
        // this.props.urlPath.push("/");
        window.location.reload(true);
    }

    getRoutes = (routes) => {
        // const status = this.props.pincodeRdr?.statuses?.vcipidstatus;
        // if (status === undefined || status === "0") {
        //     return <Redirect to="" from="*" />
        // } else {
        return routes.map((route, id) => {
            return route.component ? (<Route path={route.path}
                exact={route.exact}
                key={id}
                name={route.name}
                render={props => <route.component {...props} />}
            />) : (null)
        });

        // }
    }

    render() {
        const urlPath = this.props.history;
        const name = sessionStorage.getItem("vcipid");
        return (
            <Aux>
                <Sidebar urlPath={urlPath} logout={this.logout} />
                <main className="user" id="menudiplsay">
                    {name ? (
                        <div className="d-inline py-2 px-3 btn-dark position-absolute" style={{ top: "5px", right: "5px" }}>
                            VCIP ID: {name}
                            {/* <span className="badge badge-light">{name}</span> */}
                        </div>) : (null)}
                    {/* <button className="slide-btn" id="sidenav-btn" onClick={this.menuCollapse}>
                    <i class="fas fa-chevron-circle-down"></i>
                </button> */}
                    <h1 className="title">
                        {/* Customer onboarding process - Video KYC */}
                        <Text tid="title" />
                    </h1>
                    <div className="container">
                        {/* <Header /> */}
                        <Switch>
                            {this.getRoutes(routes)}
                            <Redirect to="/404" from="*" />
                        </Switch>
                        {/* <Footer /> */}
                    </div>
                </main>

                {/* Modal */}
                <div className="modal fade" id="startEnd" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id=""></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5 className="instructions-title pl-0 text-center">
                                    Please note the V-CIP ID for your future reference
                                    <span className="badge badge-primary ml-2"> {name}</span>
                                </h5>
                            </div>
                            <div className="text-center pb-4">
                                <button type="button" className="custom-btn text-white" onClick={this.logout}>Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { pincodeRdr } = state
    return {
        pincodeRdr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UpdateOnlineAction: () => dispatch(UpdateOnlineAction()),
        GetNotificationAction: () => dispatch(GetNotificationAction()),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        ResetRdrAction: () => dispatch(ResetRdrAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
