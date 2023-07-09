//! key --> 20330c4b-4bdf-4a7f-88f8-8b591bbf4d4f

import React, { useEffect, useState } from "react";
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
      <h1>Top 100 Cryptocurrency Coins</h1>
      <table style={{ borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Symbol
            </th>
            <th style={{ border: "1px solid black" }}>Name</th>
            <th style={{ border: "1px solid black" }}>Market Cap USD</th>
            <th style={{ border: "1px solid black" }}>Price USD</th>
            <th style={{ border: "1px solid black" }}>Change %</th>
          </tr>
        </thead>
        <tbody>
          {crypto.map((coin) => {
            return (
              <tr key={coin.id}>
                <td style={{ border: "1px solid black" }}>{coin.symbol}</td>
                <td style={{ border: "1px solid black" }}>{coin.name}</td>
                <td style={{ border: "1px solid black" }}>
                  {coin.marketCapUsd}
                </td>
                <td style={{ border: "1px solid black" }}>{coin.priceUsd}</td>
                <td style={{ border: "1px solid black" }}>
                  {coin.changePercent24Hr}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Crypto;
