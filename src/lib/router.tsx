import { Outlet, createBrowserRouter } from "react-router-dom"
import IndexPage from "../pages/index/IndexPage";
import FallingWord from "../components/fallingwords/FallingWord";
import FallingWordsGame from "../pages/fallingwords/FallingWordsGame";
import WpmGame from "../pages/wpm/WpmGame";
import Navbar from "../components/navigation/Navbar";


const Layout = () => {
    return (
        <main className="bg-cyan-950 w-dvw h-dvh">
            <Navbar />
            <Outlet />
        </main>
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