const TimerBtn = ({ label="sample", handler, disabled=false }) => {
    return <button className={label.toLowerCase().replace(' ','-')} disabled={disabled} onClick={() => handler()}>{label}</button>
}

export default TimerBtn;