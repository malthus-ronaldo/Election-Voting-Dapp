const hre = require("hardhat");

async function main() {
    // Je recupère le contrat
    const Voting = await hre.ethers.getContractFactory("Voting");

    // Je déploie le contrat avec les arguments du constructeur
    const voting_ = await Voting.deploy(["Malthus", "Ronaldo", "Opera"], 60);

    await voting_.deployed();

    console.log(`Voting contract deployed to: ${voting_.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
