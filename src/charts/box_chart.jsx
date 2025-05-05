
function BoxChart({title, description, primitive_chart}) {
    return (
        <div className="box has-background-white is-flex is-flex-direction-column" style={{
            height: '100%',
            borderRadius: '4px',
            border: '1px solid #ccc'
        }}>
            <div className="is-size-7 has-text-centered">{title}</div>
            <div style={{ width: '100%', height: '30vh' }}>{primitive_chart}</div>
            <div className="is-size-7 has-text-justified">{description}</div>
        </div>

    )
}

export default BoxChart;