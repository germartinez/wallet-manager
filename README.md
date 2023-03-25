# Wallet manager

Initialize the required variables in the scripts right before running each of them.

## Install

```
yarn
```

## 1. Generate the mnemonic for given vanity address

The first script can be used to generate the mnemonic for a vanity address.
You can specify a `prefix`, `suffix` and if they are `caseSensitive` or not.

```
yarn play generate-vanity-address-mnemonic
```

## 2. Encrypt the previously generated wallet

Given a `mnemonic` and a `password`, the second script can encrypt the wallet and return an encrypted JSON file.

```
yarn play encrypt-wallet
```

## 3. Decrypt an encrypted wallet

Given an `encryptedWalletJson` and the `password` that was used to encrypt it, the third script can decrypt the wallet and return the mnemonic, private key and some other data.

```
yarn play decrypt-wallet
```
