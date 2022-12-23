const InputLayerSelectorAndOpacity = (props) => {
    return (
        <div className="form-check">
            <input 
                type={props.type}
                name={props.name}
                defaultValue={props.defaultValue}
                checked={props.checked}
                onChange={props.onChange}
                className={props.className}
                defaultChecked={props.defaultChecked}
                id={props.id}
                disabled={props.disabled}>
            </input>
            <label className="label-layer-name">{props.layerName}</label>
            <input 
                defaultValue="1" 
                id ="topoOpacity" 
                className="opacity ml-5" 
                type="range" 
                min="0" 
                max="1" 
                step="0.01"
                onChange={props.onChangeRange}
                disabled={props.disabled}>  
            </input>
        </div>
    )
}

export default InputLayerSelectorAndOpacity;

