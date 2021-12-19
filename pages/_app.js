import '../styles/globals.css'
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../getLibrary";
import Swal from 'sweetalert2';
import { useEffect } from 'react';

function Donateci({ Component, pageProps }) {

  useEffect(() => {
    window.swal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success  mx-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
      focusCancel: false,
      focusConfirm: false,
      allowEnterKey: false
    });

    window.toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

  }, [])

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default Donateci
