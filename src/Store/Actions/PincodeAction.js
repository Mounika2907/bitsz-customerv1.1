import * as actionTypes from './types';
import Axios from 'axios';
// import { toast } from 'react-toastify';


const url = "https://api.postalpincode.in/pincode/";

export const PincodeAction = (code) => {
    return (dispatch) => {
        Axios.get(url + code)
            .then(res => {
                // debugger
                if (res.status === 200) {
                    // const modal = {
                    //     state = res.data.PostOffice.State,
                    //     dist = res.data.PostOffice.District,
                    //     block = res.data.PostOffice.Block
                    // }
                    // console.log(res.data);

                    dispatch({
                        type: actionTypes.PINCODE,
                        payload: res.data[0].PostOffice[0]
                    });
                }
            }
            )
            .catch(
                err => {
                    // toast.error("Error in pincode");
                }
            )
    }
}