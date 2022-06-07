import { useState } from "react";
import Web3 from "web3/dist/web3.min.js";

import Token from "./contracts(json)/Token.json";

import "./App.css";

function App() {
  const web3 = new Web3(window.ethereum);

  const [netId, setNetId] = useState(5777);
  const [account, setAccount] = useState();

  //netId
  const getNetId = new Promise((resolve, reject) => {
    const netId = new web3.eth.net.getId();
    resolve(netId);
  }).then((res) => {
    setNetId(res);
  });

  //account

  const getAccount = new Promise((resolve, reject) => {
    const accounts = web3.eth.getAccounts();
    resolve(accounts);
  }).then((accounts) => {
    setAccount(accounts[0]);
  });

  const getBalanceOfFirstAccount = new Promise((resolve, reject) => {

    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[5777].address
    );
    resolve(token);
  }).then((token) => {
    console.log(token.methods.balanceOf('0xE13ed45fff21da1b3f131b440dC396B85891B3D5').call(), 'balance1');
  })
  const getBalanceOfSecondAccount = new Promise((resolve, reject) => {
    const token = new web3.eth.Contract(
      Token.abi,
      Token.networks[netId].address
    );
    resolve(token);
  }).then((token) => {
    console.log(token.methods.balanceOf('0x087Db0e5cB0a58F3600509669f659bcA949c2985').call(), 'balance2');
  })

  const transfer = async () => {
    try{
      const token = new web3.eth.Contract(
        Token.abi,
        Token.networks[5777].address
      );
      token.methods.transfer('0x087Db0e5cB0a58F3600509669f659bcA949c2985', 99999999999999).send({from: '0xE13ed45fff21da1b3f131b440dC396B85891B3D5'})
      console.log(token, 'token')
    } catch(e) {
      console.log('Error, withdraw: ', e)
    }
  }


  return (
    <div className="App">
      <div>netId: {netId}</div>
      <div>account: {account}</div>
      <button onClick={transfer}>Send Money</button>
    </div>
  );
}

export default App;
