import useAuth from "../hooks/useAuth";

const Home = () => {

    const { auth } = useAuth();

    const renderWithUser = () => {
        return (
            <h1>Home, {auth.username}</h1>
        );
    }

    const renderWithoutUser = () => {
        return (
            <h1>Home</h1>
        );
    }


    return (
        <div >
            {auth.username ? renderWithUser() : renderWithoutUser()}
        </div>
    )
}

export default Home;