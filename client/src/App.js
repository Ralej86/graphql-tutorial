import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./components/DisplayData";

function App() {
    const serverUri = "http://localhost:4000/graphql"; // update based on node env
    const cache = new InMemoryCache();
    const client = new ApolloClient({
        uri: serverUri,
        cache,
    });
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <h1>Welcome to the test app!</h1>
                <DisplayData />
            </div>
            ;
        </ApolloProvider>
    );
}

export default App;
