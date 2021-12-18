import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faTwitch } from '@fortawesome/free-brands-svg-icons'
import Layout from '../../components/common/layout'
import dynamic from 'next/dynamic'
const ReactTwitchEmbedVideo = dynamic(() => import('react-twitch-embed-video'), {
    ssr: false,
})
export default function Profile() {
    return (
        <Layout>
            <div className="container mx-auto p-5">
                <div className="md:flex no-wrap">
                    <div className="w-full md:w-8/12 h-64">
                        <ReactTwitchEmbedVideo channel="talk2megooseman" layout="video" width="100%" height="480px" />
                    </div>

                    <div className="w-full md:w-4/12 md:mx-2">

                        <div className="bg-white">
                            <div className="flex w-full flex-wrap">
                                <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-gray-800 rounded-lg">
                                    <img
                                        className="rounded-lg rounded-b-none"
                                        src="https://img.gamesatis.com/streamers/937241/kafalarofficial-thumb.jpg"
                                    />
                                    <div className="flex justify-between -mt-4 px-4">
                                        <span className="inline-block ring-4 bg-green-500 ring-gray-800 rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 py-0.5">
                                            Online Now
                                        </span>
                                    </div>
                                    <div className="flex justify-end -mt-6 px-4">
                                        <span className="inline-block ring-4 bg-purple-500 hover:bg-purple-600 cursor-pointer ring-gray-800 rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 py-0.5">
                                            <FontAwesomeIcon icon={faTwitch} />
                                        </span>
                                    </div>

                                    <div className="py-2 px-4">
                                        <h1 className="text-xl font-medium leading-6 tracking-wide text-gray-300">
                                            Kafalarofficial
                                        </h1>
                                    </div>
                                    <div className="py-2 px-4">
                                        <h2 className="font-medium leading-6 text-gray-300">
                                            Kafalar hakkında info
                                        </h2>
                                    </div>
                                    <div className=" w-full  p-5">
                                        <form className="space-y-6" action="#">
                                            <div>
                                                <label htmlFor="name" className="text-sm font-medium block mb-2 dark:text-gray-100">Your Name</label>
                                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-100 dark:text-white"
                                                    placeholder="Your name"
                                                    required="" />
                                            </div>

                                            <div>
                                                <label htmlFor="amount" className="text-sm font-medium block mb-2 dark:text-gray-100">Donate Amount</label>
                                                <input type="text" name="amount" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-100 dark:text-white"
                                                    placeholder="0.0"
                                                    required="" />
                                            </div>

                                            <div>
                                                <label htmlFor="message" className="text-sm font-medium block mb-2 dark:text-gray-100">Message</label>
                                                <textarea type="text" name="message" id="message" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-100 dark:text-white"
                                                    placeholder="your message"
                                                    required="" ></textarea>
                                            </div>

                                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect Wallet</button>

                                        </form>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </Layout>
    )
}
