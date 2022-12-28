import useDeviceDetect from '../../../hooks/customHooks'

const InputLayerSelectorAndOpacity = (props) => {
    const { isMobile } = useDeviceDetect();
    const { disabledRangeOpacity = true } = props;
    return (
        <div className="form-check" onClick={(defaultValue) => props.onChange(props.defaultValue)}>
            <fieldset>
                <input 
                    type={props.type}
                    name={props.name}
                    checked={props.checked}
                    //onChange={(ev) => props.onChange(ev.target)}
                    className={props.className}
                    defaultChecked={props.defaultChecked}
                    id={props.id}
                    disabled={props.disabled}
                    value={props.defaultValue}
                    readOnly
                >
                </input>
                <label className="label-layer-name cursor-pointer" htmlFor={props.defaultValue}>{props.layerName}</label>
                {!disabledRangeOpacity && 
                    <input 
                        defaultValue="1" 
                        id ="topoOpacity" 
                        className="opacity ml-5" 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01"
                        onChange={props.onChangeRange}
                        disabled={props.disabledRange}>  
                    </input>
                }
            </fieldset>
        </div>
    )
}

export default InputLayerSelectorAndOpacity;

