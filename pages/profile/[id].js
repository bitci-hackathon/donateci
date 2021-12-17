import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faTwitch } from '@fortawesome/free-brands-svg-icons'
import Layout from '../../components/common/layout'

export default function Profile() {
    return (
     <Layout>
        <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">

                <div className="w-full md:w-3/12 md:mx-2">

                    <div className="bg-white">
                        <div className="flex justify-between">
                            <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-gray-800 rounded-lg">
                                <img
                                    className="rounded-lg rounded-b-none"
                                    src="https://img.gamesatis.com/streamers/937241/kafalarofficial-thumb.jpg"
                                />
                                <div className="flex justify-between -mt-4 px-4">
                                    <span className="inline-block ring-4 bg-green-500 ring-gray-800 rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 pt-0.5">
                                        Online Now
                                    </span>
                                </div>
                                <div className="py-2 px-4">
                                    <h1 className="text-xl font-medium leading-6 tracking-wide text-gray-300">
                                        Kafalarofficial
                                    </h1>
                                </div>
                                <div className="flex flex-row items-end h-full w-full px-4">
                                    <div className="flex border-t border-gray-700 w-full py-4">

                                        <div className="flex items-center justify-center space-x-3">

                                            <a className="bg-purple-500 hover:bg-purple-600 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded" href={""}>

                                                <FontAwesomeIcon  icon={faTwitch} />
                                                <span>Twitch</span>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-9/12 mx-2 h-64">
                    <div className="bg-white p-1 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-white  bg-gray-800 leading-8 p-2 rounded-lg">
                            <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">First Name</div>
                                    <div className="px-4 py-2">Jane</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Last Name</div>
                                    <div className="px-4 py-2">Doe</div>
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
  