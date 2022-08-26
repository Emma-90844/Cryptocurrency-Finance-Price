import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import './App.css'


function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // function to fetch coin detail
    const fetchCoins = () => {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        .then((res) => {
          setCoins(res.data);
        })
        .catch((error) => console.log(error));
    };
    fetchCoins();
  }, []);

  // Handle change
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter function
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h className="coin-text">Cryptocurrency Finance Price</h>
        <form>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search a Currency"
            className="coin-input"
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            Symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
