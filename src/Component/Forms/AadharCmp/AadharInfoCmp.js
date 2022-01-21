import React from 'react'
import Aux from '../../../hoc/Aux';
import { Text } from '../../../View/Language/Language';

const AadharInfoCmp = (props) => {
    return (
        <Aux>
            <div className="col-md-6">
                <div className="details sr1">
                    <h2 className="info-title">
                        <Text tid="adr_details" />
                    </h2>

                    <div className="row m-0">
                        <div className="col-md-12 p-0">
                            <div className="table-responsive aadhar-info">
                                <table className="table info-data mb-0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Text tid="name" />
                                            </td>
                                            <td>{props.data.name}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Text tid="fname" />
                                            </td>
                                            <td>{props.data.fname}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Text tid="dob" />
                                            </td>
                                            <td>{props.data.dob}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Text tid="adr_number" />
                                            </td>
                                            <td>{props.data.uid}</td>
                                        </tr>
                                        {/* <tr>
                                            <td>date of Generation Of XML Packet / QR Code</td>
                                            <td>31-10-1992</td>
                                        </tr> */}
                                        <tr>
                                            <td>
                                                <Text tid="addr" />
                                            </td>
                                            <td>{props.data.address}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Text tid="photo" />
                                            </td>
                                            <td>
                                                <img src={`data:image/png;base64 ,${props.data.pht}`} width="60px" height="60px" alt="no img" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center mt-3">
                                <button type="button" onClick={props.proceed} className="custom-btn">
                                    <Text tid="proceed" />
                                </button>
                            </div>
                        </div>
                        {/* <div className="col-md-2 p-0">
                            <p className="photo-name">PHOTO</p>
                            <img src={`data:image/png;base64 ,${props.data.pht}`} width="60px" height="60px" alt="no img" />
                        </div> */}
                    </div>
                    {/* ))} */}
                </div>
            </div>
        </Aux>
    )
}

export default AadharInfoCmp;
