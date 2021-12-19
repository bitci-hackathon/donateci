import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import Layout from "../../components/common/layout";
import dynamic from "next/dynamic";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../components/modules/firestore";
import { Dialog, FocusTrap } from "@headlessui/react";
import classNames from "classnames";
const ReactTwitchEmbedVideo = dynamic(
  () => import("react-twitch-embed-video"),
  {
    ssr: false,
  }
);

export default function MyProfile() {
  const { account } = useWeb3React();

  const [user, setUser] = React.useState(null);

  const [userForm, setUserForm] = React.useState({
    id: "",
    is_creator: false,
    name: "",
    surname: "",
    picture_url: "",
    is_signatured: false,
    twitch_address: "",
  });

  React.useEffect(async () => {
    if (!!account) {
      const userDocument = doc(firestore, `users`, account);
      let data = await getDoc(userDocument);
      setUser(data.data());
      //setUserForm(data.data())
    }
  }, [account]);

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    //if(isOpen)
    //{
    setUserForm(user);
    //}
  }, [isOpen]);

  async function handleSave() {
    const userDocument = doc(firestore, `users`, account);

    const user = await getDoc(userDocument);

    if (user.exists()) {
      await setDoc(userDocument, userForm)
        .then(() => {
          setUser(userForm);
          setIsOpen(false);
        })
        .catch((err) => {
          setIsOpen(false);
        });
    }
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    var partialState = {};
    partialState[name] = value;
    setUserForm((prevState) => {
      return { ...prevState, ...partialState };
    });
  };
  return (
    <Layout>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        as="div"
        className={classNames(
          "fixed inset-0 z-10 flex items-center justify-center overflow-y-auto",
          {
            "bg-gray-900/50": isOpen,
          }
        )}
      >
        <div className="flex flex-col bg-gray-800 text-white w-5/12 py-8 px-4 text-center">
          <Dialog.Overlay />

          <Dialog.Title className="text-blue-500 text-3xl">
            Edit Profile
          </Dialog.Title>
          <Dialog.Description className="text-xl m-2">
            Update your profile.
          </Dialog.Description>
          {userForm ? (
            <FocusTrap>
              <div className="px-4 py-5 sm:p-6">
                <div className=" mt-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white-700"
                  >
                    Name
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={userForm.name}
                      onChange={(e) => handleInputChange(e)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 p-2 block w-full rounded-l-md rounded-r-md sm:text-sm  text-black border-gray-300"
                      placeholder="test"
                    />
                  </div>
                </div>
                <div className=" mt-4">
                  <label
                    htmlFor="twitch_address"
                    className="block text-sm font-medium text-white-700"
                  >
                    Twitch Channel Address
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 p-2 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://twitch.com/
                    </span>
                    <input
                      id="twitch_address"
                      type="text"
                      name="twitch_address"
                      value={userForm?.twitch_address}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full p-2 rounded-none rounded-r-md sm:text-sm  text-black border-gray-300"
                      placeholder="test"
                    />
                  </div>
                </div>
                <div className=" mt-4">
                  <label
                    htmlFor="picture_url"
                    className="block text-sm font-medium text-white-700"
                  >
                    Cover Image Url
                  </label>
                  <div className="flex rounded-md shadow-sm">
                    <input
                      id="picture_url"
                      type="text"
                      name="picture_url"
                      value={userForm?.picture_url}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full p-2 rounded-md sm:text-sm  text-black border-gray-300"
                      placeholder="http://"
                    />
                  </div>
                </div>
                <div className=" mt-4">
                  <label
                    htmlFor="surname"
                    className="block text-sm font-medium text-white-700"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="surname"
                      name="surname"
                      value={userForm?.surname}
                      onChange={handleInputChange}
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black p-2 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="About"
                    />
                  </div>
                </div>
              </div>

              <button
                className="w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => handleSave()}
              >
                Save
              </button>
              <button
                className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </FocusTrap>
          ) : (
            ""
          )}
        </div>
      </Dialog>

      <div className="container mx-auto p-5">
        <div className="md:flex no-wrap">
          <div className="w-full md:w-8/12 h-64">
            <ReactTwitchEmbedVideo
              channel={
                user?.twitch_address?.length > 0 ? user?.twitch_address : "asd"
              }
              layout="video"
              width="100%"
              height="480px"
            />
          </div>

          <div className="w-full md:w-4/12 md:mx-2">
            <div className="bg-white">
              <div className="flex w-full flex-wrap">
                <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-gray-800 rounded-lg">
                  <img
                    className="rounded-lg rounded-b-none"
                    src={
                      user?.picture_url?.length > 0
                        ? user?.picture_url
                        : "https://cdnb.artstation.com/p/assets/images/images/033/758/711/small/namocchi-art-chillibackground.jpg?1610487512"
                    }
                  />
                  <div className="flex justify-between -mt-4 px-4">
                    <span
                      className={
                        (user?.is_creator ? "bg-green-600" : "bg-yellow-600") +
                        " inline-block ring-4 ring-gray-800 rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 py-0.5"
                      }
                    >
                      {user?.is_creator ? "Creator" : "Donateci"}
                    </span>
                  </div>
                  <div className="flex justify-end -mt-6 px-4">
                    <a
                      href={"https://twitch.com/" + user?.twitch_address}
                      target={"_blank"}
                      className="inline-block ring-4 bg-purple-500 hover:bg-purple-600 cursor-pointer ring-gray-800 rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 py-0.5"
                    >
                      <FontAwesomeIcon icon={faTwitch} />
                    </a>
                  </div>

                  <div className="py-2 px-4">
                    <h1 className="text-xl w-full font-medium leading-6 tracking-wide text-gray-300 overflow-hidden">
                      {user?.name?.length > 0 ? user?.name : user?.id}
                    </h1>
                  </div>
                  <div className="py-2 px-4">
                    <h2 className="font-medium leading-6 text-gray-300">
                      {user?.surname}
                    </h2>
                  </div>
                  <div className=" w-full  p-5">
                    <button
                      onClick={() => setIsOpen(true)}
                      className=" space-y-6 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
