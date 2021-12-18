import { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Web3 from "web3";
import Web3Token from "web3-token";
import { useWeb3React } from "@web3-react/core"

export function getCurrentUser() {
    const currentUser = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    };
    return currentUser;
}

export function checkAuth() {
  const authToken = Cookies.get("donateci-auth");
  return authToken == true;
};

export async function login() {
  const web3 = new Web3(window.ethereum);
  try {
    const accounts = await window.ethereum.send("eth_requestAccounts");
    console.log("accounts", accounts.result[0]);
    const address = accounts.result[0];
    const signed_msg = await Web3Token.sign(
      (msg) => web3.eth.personal.sign(msg, address),
      "1h"
    );
    const response = await fetch("api/user", {
      method: "POST",
      body: JSON.stringify({
        signed_msg,
      }),
    });

    if (response.status !== 200) {
      return;
    }

    const { token } = await response.json();
    const one_day = new Date(new Date().getTime() + 3600 * 1000 * 24);
    Cookies.set("donateci-auth", token, { expires: one_day });
    setLoggedin(true);
  } catch (error) {
    alert("Please Install Metamask Wallet");
    return;
  }
};

export function logout() {
  Cookies.remove("donateci-auth");
  setLoggedin(false);
};
