import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ThemeProvider} from "./Context.jsx";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </ThemeProvider>
)
