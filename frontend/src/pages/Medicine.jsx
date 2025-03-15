import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logo from "../assets/Logo.png";
export default function Medicine({ count, setCount,user,setUser }) {
  const swal = withReactContent(Swal);
  const [medicine, setMedicine] = useState("");
  const [resultMedicine, setResultMedicine] = useState("");
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const [load, setLoad] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const Change = (e) => {
    setMedicine(e.target.value);
    console.log(medicine);
  };
  const paymentHandler = async (e, amount, userEmail, medicine, pharmacy_name, userName) => {
    console.log("in payment handler")

    const res = await axios.post(`${baseUrl}/payment/order`, { fees: (Number(amount) * 100) });
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: (Number(amount) * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "MedFolio", // your business name
      description: `Payment for purchasing medicine ${medicine} from ${pharmacy_name}`,
      image: logo,
      order_id: res.data.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
          email: userEmail
        };

        const validateRes = await axios.post(
          `${baseUrl}/payment/order/validate`, body
        );
        if (validateRes.data.msg === 'success') {
          swal.fire({
            title: "Successful!",
            text: "Medicine Purchased successfully",
            icon: "success"
          })
          // book appointment
        }
      },
      prefill: {
        name: userName, // your customer's name
        email: userEmail // Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "MedFolio website",
      },
      theme: {
        color: "#1C4C58",
      },
    };
    let rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert("Payment failed. Please try again");
      setIsPaying(false); // Reset the flag on failure
    });
    rzp1.open();
    e.preventDefault();
  };
  const getData = async () => {
    setLoad(false);
    let med =
      medicine.charAt(0).toUpperCase() + medicine.slice(1).toLowerCase();
    try {
      const response = await axios.get(
        `${baseUrl}/medicine/group?medicine=${
          medicine.charAt(0).toUpperCase() + medicine.slice(1).toLowerCase()
        }`
      );
      console.log(response.data.list);
      if (response.data.list.length == 0) {
        setLoad(true);
        setCheck(true);
      } else {
        setLoad(true);
        setCheck(false);
        setResultMedicine( medicine.charAt(0).toUpperCase() + medicine.slice(1).toLowerCase())
      }
      setData(response.data.list);
      //
    } catch (error) {
      console.log("err");
    }
  };
  useEffect(() => {
    setCount(0);
  }, []);
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div className="w-[80%] flex flex-col justify-start items-center gap-6  h-full p-1 sm:p-4">
        <div className="flex justify-center items-center gap-4 md:gap-3 bg-white w-full sm:w-[25rem] h-[3rem] sm:h-[4rem] rounded-[5rem]">
          <input
            type="text"
            placeholder="Enter the medicine to be searched"
            className="outline-none w-[9rem] sm:w-[17rem] sm:text-[1.1rem] "
            value={medicine}
            onChange={Change}
          />
          <button
            className="hover:scale-110 transition-all ease-linear duration-150"
            onClick={getData}
          >
            <Search />
          </button>
        </div>
        <section className="shadow-lg p-4 h-[90%] overflow-y-scroll w-full rounded-lg bg-blue-50 flex flex-row justify-center items-center flex-wrap gap-6">
          {load == false ? (
            <div className="w-full h-full flex justify-center items-center"><ClipLoader
            color="#1C4C58"
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          /></div>
          ) : check == true ? (
            <div className="text-center text-[3rem] text-[#1C4C58] font-semibold">
              No Results Found
            </div>
          ) : (
            <>
              {data.map((e) => {
                return (
                  <div className="bg-[#BAC9D5] shadow-lg rounded-lg flex flex-col justify-center items-center gap-1 p-1 w-[17rem] h-[20rem] text-[#1C4C58] font-bold">
                    <img
                      src="https://img.etimg.com/thumb/msid-89328630,width-1200,height-900,imgsize-225616,resizemode-8,quality-100/prime/pharma-and-healthcare/rx-for-paracetamol-how-dolo-turned-into-a-hit-with-the-right-dose-of-perception-and-prescription.jpg"
                      alt=""
                      className="w-[12rem] rounded-lg shadow-lg"
                    />
                    <p className="text-center flex justify-center items-center">
                      Medicine : {resultMedicine}
                    </p>
                    <p className="text-center flex justify-center items-center">
                      Shop name : {e.pharmacy_name}
                    </p>
                    <p className="text-center flex justify-center items-center">
                      Price : Rs {e.price}
                    </p>
                    <button className="bg-[#1C4C58] rounded-3xl text-white w-[90%] px-2 py-1 border-[2px] border-[#1C4C58] border-solid hover:bg-white hover:text-[#1C4C58] transition-all duration-150 ease-linear" onClick={(event)=>{paymentHandler(event, e.price, user.email, resultMedicine, e.pharmacy_name, user.fullName)}}>
                      Procced to buy
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </section>
      </div>
    </section>
  );
}
