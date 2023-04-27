import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { abi } from "./constants";

const contractAddress = "0xf56c277E7CAA2E304B69b0F08883e69f9be9dADF";

const GenMint = ({ accounts, setAccounts }) => {

  const isConnected = Boolean(accounts[0]);

  async function verify() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      try {
		const accounts = await window.ethereum.request({ method: 'eth_accounts' })
		const users = await contract.Users(accounts.toString())
    const isApproved = users.isApproved
    if (isApproved === false){
      alert("Certificate not generated!")
      return
    }
    const name = document.getElementById('studentName')
    const userName = users.name
    name.innerHTML = userName
    const age = document.getElementById('studentAge')
    const userAge = users.age
    age.innerHTML = userAge
    const institute = document.getElementById('studentUni')
    const userUni = users.institute
    institute.innerHTML = userUni
    const issuedOn = document.getElementById('studentTime')
    let unixTimestamp = parseInt(users.issuedOn)
      let date = new Date(unixTimestamp * 1000)
      const humanDateFormat = date.toLocaleString()

      issuedOn.innerHTML = humanDateFormat
    
	  } catch (error){
		console.log(error)
	  }
    }
  }

  return (
    <Flex justify="center" align="center" height="80vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="20px" textShadow="0 5px #000000">
            Certification Generation
          </Text>
        </div>

        {isConnected ? (
          <div>

            <Button
              backgroundColor="#008fd4"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="10"
              onClick={verify}
            >
              Generate
            </Button>

            <Text>
                Name = 
            </Text>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="#008fd4"
          >
            Connect your wallet to Verify.
          </Text>
        )}
      </Box>
    </Flex>
  );
};
export default GenMint;
