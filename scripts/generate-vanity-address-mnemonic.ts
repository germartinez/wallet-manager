import { HDNodeWallet } from 'ethers'

// IT FINDS MNEMONICS THAT RETURN AN ADDRESS THAT MATCHES THE GIVEN PREFIX AND/OR SUFFIX
// IT IS SLOW BECAUSE IT GENERATES MNEMONICS AND NOT JUST PRIVATE KEYS

// 1. Initialize the prefix of the vanity address, if any. Ex: "0x123". 
let prefix = '0x'

// 2. Initialize the suffix of the vanity address, if any. Ex: "789".
let suffix = ''

// 3. Initialize the variable that will make the prefix and suffix case sensitive or not.
const isCaseSensitive = true

// 4. Initialize the frecuency to update the console output with the current number of trials.
const outputInterval = 1000

async function generateVanityAddress() {  
  let wallet: HDNodeWallet

  if (!prefix.startsWith('0x')) {
    throw new Error('Prefix must start with "0x"')
  }

  if (!isCaseSensitive) {
    prefix = prefix.toLowerCase()
    suffix = suffix.toLowerCase()
  }

  for(let i = 0; true; i++) {
    wallet = HDNodeWallet.createRandom()
    if (!wallet.mnemonic) {
      throw new Error('Invalid mnemonic')
    }

    const walletAddress = (isCaseSensitive) ? wallet.address : wallet.address.toLowerCase()
    const isValidWalletAddress = walletAddress.startsWith(prefix) && walletAddress.endsWith(suffix)

    if (i % outputInterval === 0) {
      console.log(`trials: ${i}`)
    }
    
    if (isValidWalletAddress) {
      console.log('\nSTATISTICS:')
      console.log('------------------------------------------------------------------------------------------------------------------------------------------------')
      console.log(`prefix        "${prefix}"`)
      console.log(`sufix         "${suffix}"`)
      console.log(`caseSensitive ${isCaseSensitive}`)
      console.log(`total trials  ${i}`)
      console.log('------------------------------------------------------------------------------------------------------------------------------------------------\n')
      
      console.log('VANITY ADDRESS GENERATED:')
      console.log('------------------------------------------------------------------------------------------------------------------------------------------------')
      console.log(`address     ${wallet.address}`)
      console.log(`mnemonic    ${wallet.mnemonic.phrase}`)
      console.log('------------------------------------------------------------------------------------------------------------------------------------------------\n')
      break
    }
  }
}

generateVanityAddress()
