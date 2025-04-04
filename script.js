
const contractAddress = "0xe0711cc6FbF29F01581EB00149532E767EcAd741";
const abi = [
  {
    "inputs": [{"internalType": "address","name": "_token","type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "_user","type": "address"}],
    "name": "getRewardInfo",
    "outputs": [{"internalType": "uint256","name":"","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalStaked",
    "outputs": [{"internalType": "uint256","name":"","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "_user","type": "address"}],
    "name": "getUserInfo",
    "outputs": [
      {"internalType": "uint256","name": "amount","type": "uint256"},
      {"internalType": "uint256","name": "rewardDebt","type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

let web3;
let contract;
let account;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("walletAddress").innerText = "Connected: " + account;
    contract = new web3.eth.Contract(abi, contractAddress);
    updateStats();
  } else {
    alert("Install MetaMask to use this feature.");
  }
}

async function stake() {
  const amount = document.getElementById("stakeAmount").value;
  await contract.methods.stake(web3.utils.toWei(amount)).send({ from: account });
}

async function withdraw() {
  const amount = document.getElementById("stakeAmount").value;
  await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: account });
}

async function claim() {
  await contract.methods.claim().send({ from: account });
}

async function updateStats() {
  const total = await contract.methods.totalStaked().call();
  const reward = await contract.methods.getRewardInfo(account).call();
  document.getElementById("totalStaked").innerText = web3.utils.fromWei(total);
  document.getElementById("userRewards").innerText = web3.utils.fromWei(reward);
}
