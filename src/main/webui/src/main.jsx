import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {PostProvider, ThemeProvider} from "./Context.jsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <PostProvider>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </PostProvider>
    </ThemeProvider>
)
