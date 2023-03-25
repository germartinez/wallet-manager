import { HDNodeWallet, Mnemonic, Wallet } from 'ethers'

// IT WORKS EXACTLY AS https://iancoleman.io/bip39/
// IT GENERATES THE ENCRYPTED WALLET JSON FILE TO STORE IT SOMEWHERE SECURELY

// 1.A. Initialize the mnemonic (vanity EOA mnemonic?) to generate an hdWallet.
const mnemonic = ''
const hdWallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic))

// 1.B. Alternatively, generate an hdWallet from a random mnemonic.
// const hdWallet = Wallet.createRandom()

// 2. Initialize the password that will be used to encrypt the generated wallet.
const passwordToEncrypt = ''

async function generateDerivedAddresses() {
  if (!hdWallet.mnemonic) {
    throw new Error('Invalid mnemonic')
  }

  console.log('\nGIVEN MNEMONIC AND PASSWORD TO ENCRYPT:')
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------')
  console.log(`mnemonic    ${hdWallet.mnemonic.phrase}`)
  console.log(`locale      ${hdWallet.mnemonic.wordlist.locale}`)
  console.log(`password    ${passwordToEncrypt}`)
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------\n')

  const walletIndex = '0'
  const wallet = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(hdWallet.mnemonic.phrase), `m/44'/60'/0'/0/${walletIndex}`)
  console.log(`GENERATED WALLET WITH INDEX ${walletIndex}:`)
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------')
  console.log(`path        ${wallet.path}`)
  console.log(`address     ${wallet.address}`)
  console.log(`publicKey   ${wallet.publicKey}`)
  console.log(`privateKey  ${wallet.privateKey}`)
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------\n')

  const encryptedWallet = await wallet.encrypt(passwordToEncrypt)
  console.log('ENCRYPTED WALLET. COPY AND STORE SECURELY:')
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------')
  console.log(encryptedWallet)
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------\n')

  const decryptedWallet = (await Wallet.fromEncryptedJson(encryptedWallet, passwordToEncrypt)) as HDNodeWallet
  if (!decryptedWallet.mnemonic) {
    throw new Error('Invalid mnemonic from decrypted wallet')
  }
  console.log('TEST DECRYPT:')
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------')
  console.log(`mnemonic    ${decryptedWallet.mnemonic.phrase}`)
  console.log(`path        ${decryptedWallet.path}`)
  console.log(`address     ${decryptedWallet.address}`)
  console.log(`publicKey   ${decryptedWallet.publicKey}`)
  console.log(`privateKey  ${decryptedWallet.privateKey}`)
  console.log('------------------------------------------------------------------------------------------------------------------------------------------------\n')
}

generateDerivedAddresses()
