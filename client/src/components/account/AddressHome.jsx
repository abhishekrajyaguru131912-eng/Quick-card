import { Link } from "react-router-dom";
import logo from "../../static/images/amazon-logo.png";
import { useAuth } from "../../context/AuthContext";

export const AddressCards = (props) => {
    const { user } = useAuth();

    return(
        <>
            <div className="col-sm-4 amz-address-cards mb-3 d-flex align-items-stretch mt-4 mx-4">
                <div className="amz-card-body p-3 card-body border rounded w-100">
                    {(
                        ()=>{
                            if(props.default){
                                return(
                                    <>
                                    <div className="amz-card-header rounded py-2 px-3 border mb-3">
                                        <span className="text-muted">
                                            Default:
                                            <img src={logo} className="img-fluid" alt="logo" style={{width: "40px", marginLeft: "10px"}} />
                                        </span>
                                    </div>
                                    </>
                                )
                            }
                        }
                    )()}
                    <h5 className="mb-3">{user ? user.name : "User Name"}</h5>
                    <span className="text-muted d-block mb-1">{user ? user.email : "Email unavailable"}</span>
                    <span>132, L Street,</span><br />
                    <span>Kingston</span><br />
                    <span>New York 12401</span><br />
                    <span>USA</span><br />
                    <span>Phone number: +17378383838</span><br />
                    <Link to="">Add delivery instructions</Link>
                    <div className="mt-4">
                        <Link to="">Edit</Link>
                        <span className="px-2"> | </span>
                        <Link to="">Remove</Link>
                        <span className="px-2"> | </span>
                        <Link to="">Set as Default</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
