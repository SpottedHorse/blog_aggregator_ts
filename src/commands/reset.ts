import { truncateUsers, getAllUsers } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
  // console.log(cmdName, ' called,,,\nDeleting users table...\n')
  const resetUsers = await truncateUsers();
  // console.log('Deleted: ', result);
  const emptyTable = await getAllUsers();
  // console.log('\nEmpty table: ', emptyTable)
}