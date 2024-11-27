// "use client";
// import React, { useEffect } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Sheet from "@/app/local/sheet";
// import { signinAuth } from "../Utils/serviceLogin";
// import { Mail } from "lucide-react";
// let uuid = "23232"; //localStorage.getItem("uuid");
// export default function Home() {
//   const signinAccount = () => {
//     signinAuth().then((response) => {
//       console.log(response);
//     });
//   };
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       {/* START */}
//       <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//         <div className="grid gap-4">
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center"
//               src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
//               alt="gallery-photo"
//             />
//           </div>
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center "
//               src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
//               alt="gallery-photo"
//             />
//           </div>
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center"
//               src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
//               alt="gallery-photo"
//             />
//           </div>
//         </div>
//         <div className="grid gap-4">
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center"
//               src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
//               alt="gallery-photo"
//             />
//           </div>
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center"
//               src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
//               alt="gallery-photo"
//             />
//           </div>
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center "
//               src="https://docs.material-tailwind.com/img/team-3.jpg"
//               alt="gallery-photo"
//             />
//           </div>
//         </div>
//         <div className="grid gap-4">
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center"
//               src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
//               alt="gallery-photo"
//             />
//           </div>
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center "
//               src="https://docs.material-tailwind.com/img/team-3.jpg"
//               alt="gallery-photo"
//             />
//           </div>
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center"
//               src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
//               alt="gallery-photo"
//             />
//           </div>
//         </div>
//         <div className="grid gap-4">
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center"
//               src="https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=687&amp;q=80"
//               alt="gallery-photo"
//             />
//           </div>
//           <div>
//             <img
//               className="h-auto max-w-full rounded-lg object-cover object-center"
//               src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
//               alt="gallery-photo"
//             />
//           </div>
//         </div>
//       </div>
//       {/* //END */}

//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">app/page.tsx</code>
//         </p>
//         {uuid}
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>
//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/appIcon.png"
//           alt="Next.js Logo"
//           width={180 * 2}
//           height={37 * 2}
//           priority
//         />
//       </div>
//       <Button
//         className="bg-white text-black hover:border  hover:border-blue-500 hover:bg-gray-100"
//         onClick={signinAccount}
//       >
//         <img
//           src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
//           className="mr-2 h-4 w-4"
//         />
//         {/* <Mail className="mr-2 h-4 w-4" />  */}
//         Sign in with Google
//       </Button>
//       {/* <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="/dashboard"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Admin{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="/products"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//           Products{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="/Request"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//           Request{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore the Next.js 13 playground.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{' '}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div> */}
//     </main>
//   );
// }

import { Input } from "@/components/ui/input"; // Use ShadCN input
import { Button } from "@/components/ui/button"; // Use ShadCN button
import Link from "next/link";
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div
        className="flex-1 bg-blue-500 text-gray-950 flex flex-col justify-end p-8"
        style={{
          backgroundImage:
            "url('https://cdn.dribbble.com/users/1207383/screenshots/5077105/media/304d2029bee462dd87db1080e0a87d37.png?resize=1600x1200&vertical=center')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="space-y-4 text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold">
            Streamline Your Storage, Optimize Your Operations
          </h1>
          <p className="text-lg">Efficient Storage, Seamless Operations</p>
        </div>
        <div className="flex justify-center">
          <div className="w-40 h-28 bg-blue-300 rounded-md shadow-md transform rotate-12" />
          <div className="w-40 h-28 bg-blue-200 rounded-md shadow-md -ml-12 transform -rotate-6" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Log In</h2>
          <form action="/dashboard">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-gray-700 select-none"
                  >
                    Remember information
                  </label>
                </div>
                <Link href="/forgot-password" className="text-blue-600">
                  Forgot password?
                </Link>
              </div>
            </div>
            <Button className="w-full bg-blue-500 mt-6 rounded-full">
              Login
            </Button>
          </form>
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
