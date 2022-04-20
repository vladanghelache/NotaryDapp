import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let require: any;
declare let window: any;

const tokenAbi = require('truffle/build/contracts/Authenticity.json');

@Injectable({
  providedIn: 'root'
})
export class AuthenticityService {
  private account: any = null;
  private readonly web3: any;
  private enable: any;
  private contract: any;
  private authenticityContract: any;
  //
  constructor() {
    console.log("asdfasdfasdfasdfa")
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    } else {
      if (typeof window.web3 !== 'undefined') {
        console.log("okokokko");
        this.web3 = window.web3.currentProvider;

      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      console.log('constructor :: window.ethereum');
      window.web3 = new Web3(window.ethereum);

      console.log('constructor :: this.web3');
      console.log(this.web3);
      this.enable = this.enableMetaMaskAccount();
      this.account = this.getAccount();

      this.contract = require('@truffle/contract');
      console.log("bbbbbbbbbbbbbbbbbbb")
      console.log(this.contract)
      this.authenticityContract = this.contract(tokenAbi);
      this.authenticityContract.setProvider(this.web3);



    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.enable();
    });
    return Promise.resolve(enable);
  }


  private async getAccount(): Promise<any> {

    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {

        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err: any, retAccount: string | any[]) => {

          console.log(retAccount);
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert('authenticity.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('authenticity.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  signDocument(size: number, hash: string, fileExtension:string){
    const that = this;

    return new Promise((resolve, reject) => {

      try {

        that.authenticityContract.deployed().then(function (instance: any) {
          return instance.signDocument(size, hash, fileExtension,{from: that.account});
        }).then(function(status: any) {
          if (status) {
            return resolve ({status: true});
          }
        }).catch(function (error: any) {
          console.log(error);
          return reject('authenticity.service error');
        });
      }
      catch (e){
        console.log(e);
      }


    });
  }

  verifyDocument(hash:string){
    const that = this;

    return new Promise((resolve, reject) => {

      try {

        that.authenticityContract.deployed().then(function (instance: any) {


          return instance.verifyDocument(hash,{from: that.account});
        }).then(function(data: any) {
          if (data) {
            return resolve (data);
          }
        }).catch(function (error: any) {
          console.log(error);
          return reject('authenticity.service error');
        });
      }
      catch (e){
        console.log(e);
      }


    });
  }

  getSignatures(){
    const that = this;

    return new Promise((resolve, reject) => {

      try {

        that.authenticityContract.deployed().then(function (instance: any) {


          return instance.getSignatures({from: that.account});
        }).then(function(data: any) {
          if (data) {
            console.log(data);
            return resolve (data);
          }
        }).catch(function (error: any) {
          console.log(error);
          return reject('authenticity.service error');
        });
      }
      catch (e){
        console.log(e);
      }


    });
  }

}
