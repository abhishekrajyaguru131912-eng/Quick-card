import { Link } from "react-router-dom"


export const AccountList = ()=>{
    return(
        <>
            <Link to="/ap/signin" style={{ textDecoration: "none" }}>
                <div className="amazon-account-list text-white">
                    <span>Hello, sign in</span>
                    <h5>Account & Lists</h5>
                </div>
            </Link>
        </>
    )
}
