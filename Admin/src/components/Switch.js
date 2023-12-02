import "./switch.css"

export default function MySwitch({isEnable, setIsEnable}) {


    return <label className="switch">
        <input  onChange={(e) => {
            setIsEnable(!isEnable)
        }} type="checkbox" defaultChecked={isEnable}/>
        <span className="slider round"></span>

    </label>
}