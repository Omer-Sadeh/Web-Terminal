import React, { useEffect, useState } from 'react';

export function BasicCommand({command, content}:{command:string, content:any}) {

    if (content instanceof Array) {
        return(<>
            <p className="prompt"> {command} </p>
            <ul>{content.map((item) => {
                return(
                    <li className="result">{item}</li>
                );
            })}</ul>
        </>);
    }
    else {
        return(<>
            <p className="prompt"> {command} </p>
            <p className="result">{content}</p>
        </>);
    }
    
}

export function NewLine({input, handelSubmit, history}:{input: any, handelSubmit: any, history: any}) {

	const [Value, setValue] = useState("");
	const [ScrollPosition, setScrollPosition] = useState(0);
	const [Blur, setBlur] = useState(false);

	useEffect(() => {
		if (Blur) {
			window.setTimeout(function () { 
				document.getElementById("field")?.focus();
			}, 0);
			setBlur(false);
		}
	}, [Blur]);

	const handelKey = (event: any) => {
		if (event.key === "Enter") {
			handelSubmit(Value, input.id);
			setValue("");
		}
		else if (event.key === "ArrowUp") {
			let lastCommand = history.filter((command: { type: string; }) => command.type !== "input" && command.type !== "welcome");
			if (lastCommand.length > 0) {
				if (ScrollPosition < lastCommand.length - 1) {
					setScrollPosition(ScrollPosition + 1);
				}
				setValue(lastCommand[lastCommand.length - 1 - ScrollPosition].value);
			}
		}
		else if (event.key === "ArrowDown") {
			let lastCommand = history.filter((command: { type: string; }) => command.type !== "input" && command.type !== "welcome");
			if (lastCommand.length > 0) {
				if (ScrollPosition > 0) {
					setScrollPosition(ScrollPosition - 1);
					setValue(lastCommand[lastCommand.length - 1 - ScrollPosition].value);
				}
				else {
					setValue("");
				}
			}
		}
	};

	const handleInputChange = (event: any) => {
		setValue(event.target.value);
		document.getElementById("input")?.scrollIntoView({behavior: 'smooth'});
	}

    return(
        <>
			<p className="prompt new-output" id="input">
				<input
					id="field"
					type="text"
					className="here"
					value={Value}
					onChange={handleInputChange}
					onKeyDown={handelKey}
					autoFocus
					onBlur={() => {setBlur(true)}}
				/>
				{Value}
			</p>
		</>
    );
}
