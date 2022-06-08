import { useState } from "react";
import Web3 from "web3/dist/web3.min.js";

import Token from "./contracts(json)/Token.json";

import "./App.css";

function App() {
  const web3 = new Web3(window.ethereum);

  const [netId, setNetId] = useState(5777);
  const [account, setAccount] = useState();
  const [balance1, setBalance1] = useState(0);
  const [balance2, setBalance2] = useState(0);

  //netId
  new Promise((resolve, reject) => {
    const netId = new web3.eth.net.getId();
    resolve(netId);
  }).then((res) => {
    setNetId(res);
  });

  //account
  new Promise((resolve, reject) => {
    const accounts = web3.eth.getAccounts();
    resolve(accounts);
  }).then((accounts) => {
    setAccount(accounts[0]);
  });

  //balance1
  new Promise((resolve, reject) => {
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[netId].address
    );
    resolve(token);
  }).then((token) => {
    token.methods
      .balanceOf("0xE13ed45fff21da1b3f131b440dC396B85891B3D5")
      .call()
      .then((balance1) => setBalance1(balance1));
  });

  //balance2
  new Promise((resolve, reject) => {
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[netId].address
    );
    resolve(token);
  }).then((token) => {
    token.methods
      .balanceOf("0x087Db0e5cB0a58F3600509669f659bcA949c2985")
      .call()
      .then((balance2) => setBalance2(balance2));
  });

  const transfer = async () => {
    try {
      const token = new web3.eth.Contract(
        Token.abi,
        Token.networks[netId].address
      );
      token.methods
        .transfer(
          "0x087Db0e5cB0a58F3600509669f659bcA949c2985",
          1000000000000000 //1*10^15
        )
        .send({ from: "0xE13ed45fff21da1b3f131b440dC396B85891B3D5" });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="App">
      <div>First Account (Balance 1): {account}</div>
      <div>Balance 1: {balance1} WEI</div>
      <div>Balance 2: {balance2} WEI</div>
      <button onClick={transfer}>
        Send 1*10^15 wei to second account (Balance2)
      </button>
    </div>
  );
}

export default App;
