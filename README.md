``` yarn add @kyvg/vue3-notification ethers web3modal mitt sass rollup-plugin-node-polyfills pinia-plugin-persist```
``` yarn add -D @ethersproject/providers @walletconnect/web3-provider typechain @typechain/ethers-v5 @esbuild-plugins/node-globals-polyfill```


add to .gitignore

.env
.env.dev
src/wallet/types/ethers

add to package.json

"postinstall": "typechain --target=ethers-v5 --out-dir=src/wallet/types/ethers \"**/*.abi.json\"",
