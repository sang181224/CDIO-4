function RenderError(props) {
    if (Object.keys(props.err).length > 0) {
        return Object.keys(props.err).map((key, index) => {
            return (
                <li key={key} style={{color: 'red', listStyleType: 'none', fontSize:'14px'}}>{props.err[key]}</li>
            )
        });
    }
}
export default RenderError;