import React from 'react';
import { Data } from '../Data';
import { BasicCommand } from './utilCommands';

export function CatCommand({input}:{input: any}) {

    const content = () => {
        var command = input.value.split(" ");
        if (command.length === 1) {
            return ("No file specified!");
        }
        else if (command.length > 2) {
            return ("Too many arguments!");
        }
        else {
            if (Data.dir.find((d: { name: any; }) => d.name === input.value.split(" ")[1])) {
                return (Data.dir.find((d: { name: any; }) => d.name === input.value.split(" ")[1]).content);
            }
            else {
                return("File not found!");
            }
        }
    }

    return(<BasicCommand command={input.value} content={content()} />);
}

export function HelpCommand({input}:{input: any}) {

    const content = () => {
        var content = "List of available commands:\n"
        Data.commands.forEach((command: { type: any; description: any; }) => {
            content += "\n- " + command.type + ": " + command.description + "\n";
        });
        return content;
    }

    return(
        <BasicCommand command={input.value} content={content()} />
    );
}

export function LsCommand({input}:{input: any}) {

    const content = () => {
        var content: string[] = []
        Data.dir.forEach((dir: { name: any; content: any; }) => {
            content.push(dir.name);
        });
        return content;
    }

    return(
        <BasicCommand command={input.value} content={content()} />
    );
}