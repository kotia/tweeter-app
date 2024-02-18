import {QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import {router} from "./components/routes.tsx";
import {queryClient} from "./api.ts";
import {InitialLoader} from "./components/InitialLoader/InitialLoader.tsx";


function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <InitialLoader>
            <RouterProvider router={router} />
        </InitialLoader>
    </QueryClientProvider>
  )
}

export default App
