import { FC} from 'react'

const IndexPage: FC = ({ }) => {

  return (
    <div className={`flex flex-col items-center justify-center h-full w-full animate-fadeIn`}>
      
      <div className="bg-black bg-opacity-10 w-[40%] min-w-[300px] p-2 text-center flex flex-col gap-2">
        <div className="w-full flex justify-center">
          <h1 className="text-2xl">Welcome to TypeIt!</h1>
        </div>
        <div className="h-[1px] mt-1 bg-black m-2"></div>
        <p>I made this simple React app for fun. It offers a small variety of typing-related games.
          Each of them have three difficulty modes: <span className="text-red-700">hard</span>, <span className="text-yellow-700">medium</span> and <span className='text-green-700'>easy</span>. There are currently two different gamemodes:</p>
        <h2 className="text-center text-2xl">Wordfall</h2>
        <p>In this gamemode, words fall down the screen at differing speeds and you must type them before they hit the bottom. The speed at which the words fall can be changed with difficulty.</p>
      </div>
    </div>
  )
}

export default IndexPage

