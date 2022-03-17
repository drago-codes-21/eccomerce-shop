import React from "react";
import StripeCheckout from "react-stripe-checkout";
// import { ReactComponent as Logo } from "../../assets/crown.svg";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const pubKey =
    "pk_test_51KZaxISFhFDOlPAfZg8JyvlcuLqQwSBH46b5ibstDLR38I39Ve9rDiP9GFTG2WSvCZdj9YXRqpvtS3NIde36EKRk00nQGUaCnW";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay now"
      name="crown clothing"
      billingAddress
      shippingAddress
      // image={Logo}
      description={`your total is $${priceForStripe}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={pubKey}
    />
  );
};

export default StripeButton;
