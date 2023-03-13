import React, { useState } from 'react';
import '../App.css';
import { Data } from '../Data';
import { BasicCommand, NewLine } from './/utilCommands';
import { CatCommand, LsCommand, HelpCommand } from './cmdCommands';
import { DuckCommand, GoogCommand, GptCommand } from './searchCommands';

export function Terminal({changeMode}: {changeMode: any}) {

    const [screenState, setscreenState] = useState([
      { value: "Welcome to your web-terminal! For commands list, type 'help'.", content: "", id: 0, type: "welcome", active: false },
      { value: "", content:"", id: 1, type: "input", active: true }
    ]);
  
    const handleCommand = (value: string, id: number) => {
        let res = value.split(" ")[0];
  
        if (res === "clear") {
            setscreenState([
                { value: "", content:"", id: 0, type: "input", active: true }
            ]);
        } else if (res === "overclock") {
            changeMode();
        } else if (Data.commands.find((command: { type: any; }) => command.type === res)) {
            let newScreen = screenState.map((command) => {
                if (command.id === id) {
                    command.type = res;
                    command.value = value;
                    return command;
                }
                return command;
            });
            newScreen.push({ value: "", content:"", id: id + 1, type: "input", active: true });
            setscreenState(newScreen);
        } else {
            let newScreen = screenState.map((command) => {
                if (command.id === id) {
                    command.type = "text";
                    command.value = value;
                    command.content = "'" + res + "' is not recognized as an internal or external command, operable program or batch file.";
                    return command;
                }
                return command;
            });
            newScreen.push({ value: "", content:"", id: id + 1, type: "input", active: true });
            setscreenState(newScreen);
        }
        document.getElementById("input")?.scrollIntoView({behavior: 'smooth'});
    }
  
    const disableCommand = (id: number) => {
        let newScreen = screenState.map((command) => {
            if (command.id === id) {
                command.active = false;
                return command;
            }
            return command;
        });
        setscreenState(newScreen);
    }
  
    return (
        <div className="terminal">
            {screenState.map(command => {
                switch (command.type) {
                    case "welcome":
                        return (<><p className="prompt">{command.value}</p></>);
                    case "input":
                        return (<NewLine input={command} handelSubmit={handleCommand} history={screenState}/>);
                    case "text":
                        return(<BasicCommand command={command.value} content={command.content} />);
                    case "help":
                        return (<HelpCommand input={command} />);
                    case "ls":
                        return (<LsCommand input={command} />);
                    case "cat":
                        return (<CatCommand input={command} />);
                    case "duck":
                        return (<DuckCommand input={command} disable={disableCommand} />);
                    case "goog":
                        return (<GoogCommand input={command} disable={disableCommand} />);
                    case "gpt":
                        return (<GptCommand input={command} disable={disableCommand} />);
                    default:
                        return(<BasicCommand command={command.value} content={"'" + command.type + "' is not implemented yet!"} />);
                }
            })}
        </div>
    );
  }