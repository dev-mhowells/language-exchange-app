import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)

    return (
        <div id="error-page">
            <h1>Oopsy daisy!</h1>
            <p>Sorry, it seems we have encountered an error</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}