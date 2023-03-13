import { ChatCompletionRequestMessage } from 'openai';
import React, { useEffect, useState } from 'react';
import { sendOverclockedCommand } from '../api/chatGPT';
import { BasicCommand } from './utilCommands';

export function DuckCommand({input, disable}:{input: any, disable: any}) {

    const [SearchPrompt, setSearchPrompt] = useState("");

    useEffect(() => {
        if (input.active) {
            var command = input.value.split(" ");
            var prompt = "Opening DuckDuckGo";
            var new_window = false;
            var searchPrompt = "";
            if (command.length > 1) {
                new_window = command[1] === "-n";
                if (new_window) command.splice(1, 1);
                command.splice(0, 1);
                if (command.length > 0) {
                    searchPrompt = searchPrompt + "?q=";
                    command.forEach((word: string) => {
                        searchPrompt = searchPrompt + word + " ";
                    })
                }
            }

            window.open("https://duckduckgo.com/" + searchPrompt, new_window ? "_blank" : "_self");
            setSearchPrompt(prompt);
            disable(input.id);
        }
      }, [input, disable]);

    return(<BasicCommand command={input.value} content={SearchPrompt} />);
}

export function GoogCommand({input, disable}:{input: any, disable: any}) {

    const [SearchPrompt, setSearchPrompt] = useState("");

    useEffect(() => {
        if (input.active) {
            var command = input.value.split(" ");
            var prompt = "Opening Google";
            var new_window = false;
            var searchPrompt = "";
            if (command.length > 1) {
                new_window = command[1] === "-n";
                if (new_window) command.splice(1, 1);
                command.splice(0, 1);
                if (command.length > 0) {
                    searchPrompt = searchPrompt + "search?q=";
                    command.forEach((word: string) => {
                        searchPrompt = searchPrompt + word + " ";
                    })
                }
            }

            window.open("https://www.google.co.il/" + searchPrompt, new_window ? "_blank" : "_self");
            setSearchPrompt(prompt);
            disable(input.id);
        }
      }, [input, disable]);

    return(<BasicCommand command={input.value} content={SearchPrompt} />);
}

export function GptCommand({input, disable}:{input: any, disable: any}) {

    const [SearchPrompt, setSearchPrompt] = useState("Waiting for response...");

    useEffect(() => {
        if (input.active) {
            var command = input.value.split(" ");
            var prompt = "";
            var history: ChatCompletionRequestMessage[] = []
            if (command.length > 1) {
                command.splice(0, 1);
                if (command.length > 0) {
                    command.forEach((word: string) => {
                        prompt = prompt + word + " ";
                    })
                }
                var result = ""
                history = [{ 'role': 'system', 'content': "You are an assitant." }, { 'role': 'user', 'content': prompt }]
                sendOverclockedCommand(history).then(res => {
                    result = res.data.choices[0].message?.content || "No result given."
                    setSearchPrompt(result);
                }).catch(error => {
                    setSearchPrompt("Error! Contact the administrator.");
                });
            } else {
                setSearchPrompt("No prompt given.");
            }
            disable(input.id);
        }
      }, [input, disable]);

    return(<BasicCommand command={input.value} content={SearchPrompt} />);
}