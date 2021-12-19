import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import Layout from "../../components/common/layout";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../components/modules/firestore";
import { Redirect } from "react-router-dom";
const ReactTwitchEmbedVideo = dynamic(
  () => import("react-twitch-embed-video"),
  {
    ssr: false,
  }
);
export default function Profile() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = React.useState(null);


  React.useEffect(async () => {
    const { id } = router.query;
    if (!!router.query && !!id) {
      const userDocument = doc(firestore, `users`, id);
      let data = await getDoc(userDocument);

      if (data.exists()) {
        setUser(data.data());
      } else {
        setUser(null);
        if (process.browser){
            router.push('/');
        }
      }
    }
  }, [router.query]);

  return (
    <Layout>
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
                    <form className="space-y-6" action="#">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-sm font-medium block mb-2 dark:text-gray-100"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-100 dark:text-white"
                          placeholder="Your name"
                          required=""
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="amount"
                          className="text-sm font-medium block mb-2 dark:text-gray-100"
                        >
                          Donate Amount
                        </label>
                        <input
                          type="text"
                          name="amount"
                          id="amount"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-100 dark:text-white"
                          placeholder="0.0"
                          required=""
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="text-sm font-medium block mb-2 dark:text-gray-100"
                        >
                          Message
                        </label>
                        <textarea
                          type="text"
                          name="message"
                          id="message"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-100 dark:text-white"
                          placeholder="your message"
                          required=""
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Connect Wallet
                      </button>
                    </form>
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
