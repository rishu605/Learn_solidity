const { doesNotMatch } = require('assert');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const {interface, bytecode} = require('./../compile')

let accounts
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()
  
  

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data:bytecode, arguments:['Hey There!']})
  .send({from: accounts[0], gas: '1000000'})
  

  inbox.setProvider(provider)
})

describe('Inbox', ()=> {
  it('deploys a contract', (done)=> {
    assert.ok(inbox.options.address)
    done()
  })
  it('has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert('Hey There!')
  })

  it('can change the message', async () => {
    await inbox.methods.set_message('It\'s Rishabh here').send({from: accounts[0]})
    const message = await inbox.methods.message().call()
    assert(message, 'It\s Rishabh here')
  })
})