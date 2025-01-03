require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(
    fileUpload({
        extended: true
    })
);  
app.use(express.static(__dirname));
app.use(express.json());
const path = require('path');
const ethers = require('ethers');

var port = process.env.PORT || 3000;

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { abi } = require("./artifacts/contracts/Voting.sol/Voting.json");
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const constractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/addCandidate", async (req, res) => {
    var vote = req.body.vote;
    console.log(vote);
    async function storeDataInBlockchain(vote) {
        console.log("Ajout du candidat: ", vote);
        const tx = await constractInstance.addCandidate(vote);
        await tx.wait();
    }
    const bool = await constractInstance.getVotingStatus();
    if (bool) {
        await storeDataInBlockchain(vote);
        res.send("Candidat ajouté avec succès");
    }
    else {
        res.send("Le vote est terminé");
    }
});

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});