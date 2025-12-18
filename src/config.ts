import fs from "fs";
import os from "os";
import path from "path";
import { config } from "process";


export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(userName: string){
  const current = readConfig();
  current.currentUserName = userName;
  writeConfig(current)
};

export function validateConfig(rawconfig: any): Config {
  if (!rawconfig.db_url || typeof rawconfig.db_url !== 'string') {
    throw new Error('db_url is required in config file');
  }
  if (
    !rawconfig.current_user_name ||
    typeof rawconfig.current_user_name !== 'string'
  ) {
    throw new Error('current_user_name is required in config file');
  }

  const config: Config = {
    dbUrl: rawconfig.db_url,
    currentUserName: rawconfig.current_user_name
  };

  return config
}

export function readConfig(): Config {
  const fullPath = getConfigFilePath();
  const data = fs.readFileSync(fullPath, 'utf-8');
  const rawConfig = JSON.parse(data);
  return validateConfig(rawConfig);
};

function getConfigFilePath(): string {
  const configFileName = ".gatorconfig.json";
  const homeDir = os.homedir();
  return path.join(homeDir, configFileName);
}

function writeConfig(config: Config) {
  const fullPath = getConfigFilePath();
  const rawConfig = {
    db_url: config.dbUrl,
    current_user_name: config.currentUserName,
  };

  const data = JSON.stringify(rawConfig, null, 2);

  fs.writeFileSync(fullPath, data, {encoding: 'utf-8'});
}