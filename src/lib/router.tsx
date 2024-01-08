import { Outlet, createBrowserRouter } from "react-router-dom"
import IndexPage from "../pages/index/IndexPage";
import FallingWordsGame from "../pages/fallingwords/FallingWordGame";
import WpmGame from "../pages/wpm/WpmGame";
import Navbar from "../components/navigation/Navbar";
import githubLogo from "../assets/images/githublogo.png"
import { useTheme } from "./context/ThemeContext";


const Layout = () => {
    const { theme } = useTheme()

    return (
        <main className="w-dvw h-dvh" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}  >
            <div className="absolute bottom-1 left-1 hover:animate-wiggle w-[90px] overflow-hidden md:bottom-5 md:left-5 ">
                <a href="https://github.com/Rauraurautis/TypeIt" target="_blank"><img src={githubLogo} alt="" /></a>
            </div>
            <Navbar />
            <Outlet />
        </main >
    )
}

export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <h1>Error</h1>,
        children: [
            {
                path: "/",
                element: <IndexPage />,

            },
            {
                path: "/fallingwords",
                element: <FallingWordsGame />
            },
            {
                path: "/wpm",
                element: <WpmGame />
            }
        ]
    }


]);