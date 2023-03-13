import React, { useState } from 'react';
import '../App.css';
import { BasicCommand, NewLine } from './utilCommands';
import { ChatCompletionRequestMessage } from 'openai';
import { sendOverclockedCommand, overclockInfo } from '../api/chatGPT';

export function OverclockedTerminal({changeMode}: {changeMode: any}) {

    // ARE YOU SURE YOU WANT TO DO THIS?
    const [screenState, setscreenState] = useState([
        { value: "Starting overclocking sequence...", content: "WARNING: Overclocking may cause system instability!\nAre you sure you want to continue? (type 'yes')", id: 0, type: "text", active: true },
        { value: "", content:"", id: 1, type: "input", active: true }
    ]);
    const [active, setactive] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatCompletionRequestMessage[]>([{ 'role': 'system', 'content': overclockInfo }]);

    const overclockedEnterSequence = async () => {
        var startup = "Overclocking sequence initiated..."
        setscreenState([{ value: startup, content: "", id: 0, type: "text", active: true }]);
        await new Promise(f => setTimeout(f, 2000));
        let content = "Access Denied. Hacking into mainframe..."
        setscreenState([{ value: startup, content: content, id: 0, type: "text", active: true }]);
        await new Promise(f => setTimeout(f, 6000));
        content = content + "\n\nMainframe Hacked. Root permissions granted. Re-trying overclocking..."
        setscreenState([{ value: startup, content: content, id: 0, type: "text", active: true }]);
        await new Promise(f => setTimeout(f, 2500));
        content = content + "\n\nOverclocking successfull. Loading overclocked system..."
        setscreenState([{ value: startup, content: content, id: 0, type: "text", active: true }]);
        await new Promise(f => setTimeout(f, 5000));
        content = content + "\n\nSystem loadad."
        setscreenState([{ value: startup, content: content, id: 0, type: "text", active: true }]);
        await new Promise(f => setTimeout(f, 1000));
        content = content + "\n\nFATAL ERROR: Overclocking caused system instability. Reverting overclocking..."
        setscreenState([{ value: startup, content: content, id: 0, type: "text", active: true }]);
        await new Promise(f => setTimeout(f, 2000));
        content = content + "\n\nRevert canceled by system. Attempting to recover system..."
        setscreenState([{ value: startup, content: content, id: 0, type: "text", active: true }]);
        await new Promise(f => setTimeout(f, 4000));
        for (let _i = 0; _i < 10; _i++) {
            await new Promise(f => setTimeout(f, 1000));
            content = content + "\n\nERROR: Unknown error. Attempting to recover system..."
            setscreenState([{ value: startup, content: content, id: 0, type: "text", active: true }]);
        }
        await new Promise(f => setTimeout(f, 1000));
        setscreenState([
            { value: "W3lcOme to yo-yo-your perfectly stable normal web-terminal! For commands list, type 'help'.", content: "", id: 0, type: "welcome", active: false },
            { value: "", content:"", id: 1, type: "input", active: true }
        ]);
        setactive(true);
    }
  
    const overclockedExitSequence = async () => {
        var startup = "System override successful. loading original system..."
        setscreenState([{ value: startup, content: "", id: 0, type: "text", active: true }]);
        let content = "Fixing corrupted files..."
        await new Promise(f => setTimeout(f, 3000));
        setscreenState([ { value: startup, content: content, id: 0, type: "text", active: true }]);
        content = content + "\n\nCleanup sequence initiated..."
        await new Promise(f => setTimeout(f, 7000));
        setscreenState([ { value: startup, content: content, id: 0, type: "text", active: true }]);
        content = content + "\n\nCleanup sequence completed. Reverting overclocking..."
        await new Promise(f => setTimeout(f, 2000));
        setscreenState([ { value: startup, content: content, id: 0, type: "text", active: true }]);
        await new Promise(f => setTimeout(f, 1000));
        changeMode();
    }
  
    const handleCommand = (value: string, id: number) => {
        let maxCommands = Math.floor(Math.random() * (70 - 30 + 1)) + 30;
        if (!active) {
            if (value === 'yes') {
                overclockedEnterSequence();
            } else {
                changeMode();
            }
        } else if (chatHistory.length > maxCommands) {
            overclockedExitSequence();
        } else {
            let newScreen = screenState.map((command) => {
                if (command.id === id) {
                    command.type = "text";
                    command.value = value;
                    command.content = "";
                }
                return command;
            });
            setscreenState(newScreen);
            let result = ""
            let history = chatHistory;
            history.push({ 'role': 'user', 'content': value });
            sendOverclockedCommand(history).then(res => {
                result = res.data.choices[0].message?.content || ""
                let newScreen = screenState.map((command) => {
                    if (command.id === id) {
                        command.type = "text";
                        command.value = value;
                        command.content = result;
                        return command;
                    }
                    return command;
                });
                newScreen.push({ value: "", content:"", id: id + 1, type: "input", active: true });
                setscreenState(newScreen);
                history.push({ 'role': 'assistant', 'content': result });
                setChatHistory(history);
            }).catch(error => {
                overclockedExitSequence();
            });
        }
    }
  
    return (
        <div className="terminal" >
            {screenState.map(command => {
                switch (command.type) {
                    case "welcome":
                          return (<><p className="prompt">{command.value}</p></>);
                    case "input":
                        return (<NewLine input={command} handelSubmit={handleCommand} history={screenState}/>);
                    default:
                        return(<BasicCommand command={command.value} content={command.content} />);
                }
            })}
        </div>
    );
  }