import Alert from 'react-bootstrap/Alert';

function ErrorMessage({ children }) {
    return (
        <Alert variant={'danger'}>
            {children}
        </Alert>
    )
}

export default ErrorMessage