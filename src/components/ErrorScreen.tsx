export default function ErrorScreen(props: {errorMessage: string}) {
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{ props.errorMessage }</i>
            </p>
        </div>
    )
}