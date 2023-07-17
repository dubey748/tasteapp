import React, { useState, useEffect } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Loader = () => {
  return <div>Loading...</div>;
};

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const data = useCart();
  const dispatch = useDispatchCart();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleRemove = (index) => {
    console.log(index);
    dispatch({ type: "REMOVE", index: index });
  };

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("https://tastebackend.onrender.com/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE:::::", response.status);
    console.log(data)
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  if (isLoading) {
    return <Loader />;
  }

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-white">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      {console.log(data)}
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table text-white">
          <thead className=" text-white fs-4">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    {
                      <h1 className="text-white fs-5" onClick={handleRemove}>
                        ×
                      </h1>
                    }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          {
            <button className="btn bg-danger mt-5 " onClick={handleCheckOut}>
              Check Out
            </button>
          }
        </div>
      </div>
    </div>
  );
}
