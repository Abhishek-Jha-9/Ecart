import laptop from "./static/productImages/laptop.jpg";
import phone from "./static/productImages/camera.jpg";
import camera from "./static/productImages/phone.jpg";
import Card from "./Card";
import axios from "axios";
// import Razorpay from "razorpay";

import { Box, Stack, Text } from "@chakra-ui/react";
const Home = () => {
  const checkouthandler = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:8000/api/getKey");
      const {
        data: { order },
      } = await axios.post("http://localhost:8000/api/checkout", {
        amount,
      });
      //   console.log(order);
      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Abhishek Jha",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/91289928?v=4",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:8000/api/paymentVerification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Text
        fontSize="3xl"
        fontWeight="bold"
        fontFamily={"monospace"}
        justifyContent="center"
        alignItems="center"
      >
        {" "}
        Products
      </Text>
      <Stack
        direction={["column", "row"]}
        alignItems="center"
        justifyContent="center"
        h={"100vh"}
      >
        <br />
        <Card
          amount={5000}
          img={phone}
          checkouthandler={checkouthandler}
        ></Card>
        <Card
          amount={6000}
          img={laptop}
          checkouthandler={checkouthandler}
        ></Card>
        <Card
          amount={7000}
          img={camera}
          checkouthandler={checkouthandler}
        ></Card>
      </Stack>
    </Box>
  );
};
export default Home;
