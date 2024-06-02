import ReactDOM from 'react-dom/client'
import './index.css'
import {SelectItemProvider, ThemeProvider} from "./Context.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter} from "react-router-dom";
import App from "./App.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <SelectItemProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </QueryClientProvider>
        </SelectItemProvider>
    </ThemeProvider>
)
