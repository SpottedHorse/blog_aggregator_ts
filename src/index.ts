import { setUser, readConfig } from "./config";

function main() {
  setUser('Alex')
  const config = readConfig();
  console.log(config);
}

main();