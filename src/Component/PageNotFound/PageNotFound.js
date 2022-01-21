import React from 'react';
import Aux from '../../hoc/Aux';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <Aux>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="jumbotron mt-4 shadow-sm p-3 mb-5 bg-light rounded text-center">
                            <h1 className="display-4">Page Not Found!</h1>
                            <Link to="" className="btn btn-primary btn-lg" role="button">Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default PageNotFound;
