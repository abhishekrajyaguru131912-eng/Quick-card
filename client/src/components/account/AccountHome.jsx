import Box from "../../static/images/Box._CB485927553_.png";
import Lock from "../../static/images/sign-in-lock._CB485931504_.png";
import Prime from "../../static/images/rc_prime._CB485926807_.png";
import Location from "../../static/images/address-map-pin._CB485934183_.png";
import Payment from "../../static/images/Payments._CB485926359_.png";
import Amz_Payment from "../../static/images/amazon_pay._CB485946857_.png";
import Support from "../../static/images/contact_us._CB623781998_.png";
import { Link } from "react-router-dom";

export const AccountHome = () => {
  return (
    <div className="container mt-4">
      <div className="row">

        <AccountCards 
          img={Box} 
          title="Your Orders" 
          desc="Track, return, or buy again" 
          link="/orders" 
        />

        <AccountCards 
          img={Lock} 
          title="Login & Security" 
          desc="Edit login details" 
          link="/account" 
        />

        <AccountCards 
          img={Prime} 
          title="Prime" 
          desc="View benefits" 
          link="/account" 
        />

        <AccountCards 
          img={Location} 
          title="Your Addresses" 
          desc="Edit addresses" 
          link="/address" 
        />

        <AccountCards 
          img={Payment} 
          title="Payment Options" 
          desc="Manage payments" 
          link="/account" 
        />

        <AccountCards 
          img={Amz_Payment} 
          title="Amazon Pay Balance" 
          desc="Add money" 
          link="/account" 
        />

        <AccountCards 
          img={Support} 
          title="Contact Us" 
          desc="Get help" 
          link="/account" 
        />

      </div>
    </div>
  );
};


const AccountCards = ({ img, title, desc, link }) => {
  return (
    <div className="col-md-4 mb-4">
      <Link to={link} style={{ textDecoration: "none", color: "black" }}>
        <div className="amz-account-card border p-3 h-100">
          <img src={img} alt={title} className="img-fluid" />
          <div className="mt-2">
            <h5>{title}</h5>
            <span className="text-muted">{desc}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};