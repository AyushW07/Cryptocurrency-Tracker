//! key --> 20330c4b-4bdf-4a7f-88f8-8b591bbf4d4f

import React, { useEffect, useState } from "react";
import "./Crypto.css";

import axios from "axios";

function Crypto() {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets", {
          headers: {
            Authorization: "Bearer 20330c4b-4bdf-4a7f-88f8-8b591bbf4d4f",
          },
          params: { limit: 100 },
        });
        const sortedData = response.data.data.sort(
          (a, b) =>
            parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr)
        );
        setCrypto(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const refresh = setInterval(() => {
      fetchData();
    }, 5000);
    return () => {
      clearInterval(refresh);
    };
  }, []);

  return (
    <div>
      <table className="crypto_table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Market Cap USD</th>
            <th>Price USD</th>
            <th>Change %</th>
          </tr>
        </thead>
        <tbody>
          {crypto.map((coin) => {
            return (
              <tr key={coin.id}>
                <td>{coin.symbol}</td>
                <td>{coin.name}</td>
                <td>{coin.marketCapUsd}</td>
                <td>{coin.priceUsd}</td>
                <td>{coin.changePercent24Hr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Crypto;
