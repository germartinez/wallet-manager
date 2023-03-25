import { HDNodeWallet, Wallet } from 'ethers'

// IT WORKS EXACTLY AS https://iancoleman.io/bip39/
// IT ALLOWS TO DECRYPT A ENCRYPTED WALLET JSON FILE

// 1. Initialize the encrypted wallet JSON file that will be decrypted.
const encryptedWalletJson = {}

// 2. Initialize the password that will be used to decrypt the encrypted wallet JSON file.
const passwordDecrypt = ''

async function generateDerivedAddresses() {
  const stringifiedEncryptedWalletJson = JSON.stringify(encryptedWalletJson)

  const decryptedWallet = (await Wallet.fromEncryptedJson(stringifiedEncryptedWalletJson, passwordDecrypt)) as HDNodeWallet
  if (!decryptedWallet.mnemonic) {
    throw new Error('Invalid mnemonic')
  }
  console.log('\nDECRYPTED WALLET:')
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------')
  console.log(`mnemonic    ${decryptedWallet.mnemonic.phrase}`)
  console.log(`path        ${decryptedWallet.path}`)
  console.log(`address     ${decryptedWallet.address}`)
  console.log(`publicKey   ${decryptedWallet.publicKey}`)
  console.log(`privateKey  ${decryptedWallet.privateKey}`)
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------\n')
}

generateDerivedAddresses()
