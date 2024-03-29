import Home from "./Home";
import PaymentSuccess from "./PaymentSuccess";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/paymentsuccess" element={<PaymentSuccess />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
