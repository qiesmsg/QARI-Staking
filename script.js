
const contractAddress = "0x4b3e9dC317eD74B189F8C66f67Fc639A474a4540";
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "depositRewards",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address","name": "","type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardPool",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "user","type": "address"}],
    "name": "getRewardInfo",
    "outputs": [{"internalType": "uint256","name":"","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "user","type": "address"}],
    "name": "getUserInfo",
    "outputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
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
  await contract.methods.stake().send({
    from: account,
    value: web3.utils.toWei(amount)
  });
}

async function withdraw() {
  const amount = document.getElementById("stakeAmount").value;
  await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: account });
}

async function claim() {
  await contract.methods.claim().send({ from: account });
}

async function updateStats() {
  const total = await contract.methods.getUserInfo(account).call();
  const reward = await contract.methods.getRewardInfo(account).call();
  document.getElementById("totalStaked").innerText = web3.utils.fromWei(total);
  document.getElementById("userRewards").innerText = web3.utils.fromWei(reward);
}
