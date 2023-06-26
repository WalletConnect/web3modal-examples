#!/usr/bin/zsh
cd walletconnect-modal-auth-html; rm -rf node_modules; rm package-lock.json; npm install; cd ..;

cd walletconnect-modal-auth-react; rm -rf node_modules; rm package-lock.json; npm install; cd ..;

cd walletconnect-modal-ethereum-provider-html; rm -rf node_modules; rm package-lock.json; npm install; cd ..;

cd walletconnect-modal-ethereum-provider-react; rm -rf node_modules; rm package-lock.json; npm install; cd ..;

cd walletconnect-modal-sign-html; rm -rf node_modules; rm package-lock.json; npm install; cd ..;

cd walletconnect-modal-sign-react; rm -rf node_modules; rm package-lock.json; npm install; cd ..;

cd web3modal-wagmi-html; rm -rf node_modules; rm package-lock.json; npm install; cd ..;

cd web3modal-wagmi-react; rm -rf node_modules; rm package-lock.json; npm install; cd ..;
