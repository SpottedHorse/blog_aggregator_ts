import { setUser, readConfig } from "./config";
import { argv } from "node:process";

function main() {
  const registry: CommandsRegistry = {}
  registerCommand(registry, 'login', handlerLogin);
  const args: string[] = argv
  // console.log(args)
  if (args.length <= 3) {
    throw new Error('no arguments provided')
  }
  const cmd = args[2]
  const cmdArgs = args.slice(3)
  runCommand(registry, cmd, ...cmdArgs)
  // const config = readConfig();
  // console.log(config);
}

main();

type CommandHandler = (cmdName: string, ...args: string[]) => void;

function handlerLogin(cmdName: string, ...args: string[]){
  if (!args) {
    throw new Error('login handler requires a username');
  }
  console.log('Login', args)
  const username = args[0]
  setUser(username);
  console.log(`The username '${username}' has been set.`)
};

type CommandsRegistry = Record<string, CommandHandler>

function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler){
  registry[cmdName] = handler;
  return registry;
}

function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  const cmd = registry[cmdName]
  if (!cmd){
    throw new Error('command not found');
  }
  cmd(cmdName, ...args);
}