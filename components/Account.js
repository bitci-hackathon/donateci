import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";

const Account = ({ triedToEagerConnect }) => {
  const { active, error, activate, chainId, account, library, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  const ENSName = useENSName(account);

  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const connect = () => {
    setConnecting(true);

    activate(injected, undefined, true)
      .catch((error) => {
        // ignore the error if it's a user rejected request
        if (error instanceof UserRejectedRequestError) {
          setConnecting(false);
        } else {
          setError(error);
        }
      })
      .then(() => {
        //onLoggedIn(account);
        //console.log(library);
        const msg =
          "We ask you to sign this message to prove ownership of this account: " +
          account +
          " (" +
          Math.floor(new Date().getTime() / 1000) +
          ")";
        /*library.getSigner(account)
          .signMessage(msg)
          .then((signature) => {
              console.log('Success!: '+signature);
              //TODO: firebase
          })
          .catch((error) => {
              window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
          })*/
      });
  };

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <div>
        {isWeb3Available ? (
          <button
            className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-2 rounded-md text-sm font-medium"
            disabled={connecting}
            onClick={() => connect()}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </button>
        ) : (
          <button
            className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-2 rounded-md text-sm font-medium"
            onClick={startOnboarding}
          >
            Install Metamask
          </button>
        )}
      </div>
    );
  }

  return (
    <a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>
  );
};

export default Account;
