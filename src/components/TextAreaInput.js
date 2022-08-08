function TextAreaInput(props) {
    return (
      <div className="form-group">
        <label htmlFor={props.id}>{props.label}</label>
        <textarea
          className="form-control"
          id={props.id}
          placeholder={props.placeholder}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
        >
          {props.value}
        </textarea>
      </div>
    );
  }
  
  export default TextAreaInput;