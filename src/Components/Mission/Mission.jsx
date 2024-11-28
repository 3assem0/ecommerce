
  import { Fragment } from 'react'
  import { Popover, Transition } from '@headlessui/react'
  import { MenuIcon, XIcon } from '@heroicons/react/outline'
  
  const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
  ]
  
export default function Mission() {
    return (
      <div className="min-h-screen flex flex-col items-center w-[100%] mr-14 justify-center">
      <div className="relative bg-white overflow-hidden ">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
  
            <Popover>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              </div>
  
              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
              
                </Popover.Panel>
              </Transition>
            </Popover>
  
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Mission &</span>{' '}
                  <span className="block text-indigo-600 xl:inline">Vission</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, expedita! Odio quasi dolor repellendus explicabo iste provident facere quisquam maxime, maiores quaerat molestias harum dolores cum! Pariatur sunt enim, distinctio illum unde eaque, ipsum similique debitis porro obcaecati aut quae earum consectetur quia cumque minima vero quibusdam. Ipsam, sunt consequuntur. Quis blanditiis iusto mollitia nulla consequuntur ullam ut sint veniam.
                </p>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, expedita! Odio quasi dolor repellendus explicabo iste provident facere quisquam maxime, maiores quaerat molestias harum dolores cum! Pariatur sunt enim, distinctio illum unde eaque, ipsum similique debitis porro obcaecati aut quae earum consectetur quia cumque minima vero quibusdam. Ipsam, sunt consequuntur. Quis blanditiis iusto mollitia nulla consequuntur ullam ut sint veniam.
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""
          />
        </div>
      </div></div>
    )
  }