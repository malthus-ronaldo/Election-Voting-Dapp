let WALLET_CONNECTED = '';
let contractAddress = "0xE312Ab07ACa91206411fBdb72cbeC97b2101d778";
let contractAbi =  [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidateNames",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_durationMinutes",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllVotesOfCandiadates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRemainningTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVotingStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
];
  
const connectMetamask = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        WALLET_CONNECTED = await signer.getAddress();
        var element = document.getElementById("metamasknotification");
        element.innerHTML = "Metamask is connected: " + WALLET_CONNECTED;
    } catch (error) {
        console.error("Error connecting Metamask:", error);
         }
}
    
const checkWalletConnection = () => {
    const element = document.getElementById("metamasknotification");
    if (WALLET_CONNECTED) {
        element.innerHTML = `Metamask is connected: ${WALLET_CONNECTED}`;
    } else {
        element.innerHTML = "Please connect your Metamask wallet.";
    }
};

getAllCandidates = async () => {
    if (WALLET_CONNECTED != 0) {
        var p3 = document.getElementById("p3");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        p3.innerHTML = "please wait, getting candidates from Voting smart contract...";
        var candidates = await contractInstance.getAllVotesOfCandiadates();
        console.log(candidates);
        var table = document.getElementById("myTable");

        for (let i = 0; i < candidates.length; i++) {
            var row = table.insertRow();
            var idCell = row.insertCell();
            var nameCell = row.insertCell();
            var vc = row.insertCell();

            idCell.innerHTML = i;
            nameCell.innerHTML = candidates[i].name;
            vc.innerHTML = candidates[i].voteCount;
        }

        p3.innerHTML = "The candidate list is updated";
    } else {
        var p3 = document.getElementById("p3");
        p3.innerHTML = "Before getting Candidates list, Please connect your metamask wallet !!!";
    }
}
    const voteStatus = async () => {
        if (WALLET_CONNECTED !=0) {
            var status = document.getElementById("status");
            var remainingTime = document.getElementById("time");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const currentStatus = await contractInstance.getVotingStatus();
            const time = await contractInstance.getRemainningTime();
            status.innerHTML = currentStatus == true ? "Voting is still open" : "Voting is closed";
            remainingTime.innerHTML = `Remaining time: ${parseInt(time, 16)} seconds`;
        }
        else {
            var status = document.getElementById("status");
            status.innerHTML = "Please connect your metamask wallet";
    }
    }

    const addVote = async () => {
    if (WALLET_CONNECTED !=0) {
            var name = document.getElementById("vote");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            var cand = document.getElementById("cand");
            cand.innerHTML = "please wait, adding vote to Voting smart contract...";
            const tx = await contractInstance.vote(name.value);
            await tx.wait();
            cand.innerHTML = "Your vote has been added successfully";
        }
        else {
            var cand = document.getElementById("status");
            cand.innerHTML = "Please connect your metamask wallet";
    }
}

    
