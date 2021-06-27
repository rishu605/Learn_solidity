const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')


const provider = new HDWalletProvider(
  'globe young chair dry melody seek example ankle motor depend beyond try',
  'https://rinkeby.infura.io/v3/45b62170d739409e8f85507fa99644b1'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting to deploy from account', accounts[0])

  result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode, arguments: ['Hi There!']})
  .send({ gas: '1000000', from: accounts[0]})

  console.log('Contract deployed to: ', result.options.address)
}

deploy()