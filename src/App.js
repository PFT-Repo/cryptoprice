import './App.css';
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from './web/Coin';

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);

  useEffect(()=>{
      Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
         (response)=>{
           setListOfCoins(response.data.coins);
        }
      );
     },[]);


  const [searchWord, setsearchWord] = useState("");
    const filteredCoins=listOfCoins.filter((coin)=>{
        return coin.name.toLowerCase().includes(searchWord.toLowerCase());
      });
  return (
    <div className="App">
       <div className='cryptoSearch'>
          <input type="text" placeholder='Enter a Crypto to search'
          onChange={(e)=>{
            setsearchWord(e.target.value)
          }} />
          </div>
    <div className="cryptoDisplay">
    {filteredCoins.map((coin)=>{
      return(
         <Coin
           name={coin.name}
           icon={coin.icon}
           price={coin.price}
           symbol={coin.symbol}
         />
      );
    })}
  </div>
    </div>
  );
}

export default App;
