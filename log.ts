import dayjs from "dayjs";
import fs from "fs";
// import second from '../../log.txt'
export async function log(str: string) {
  try {
    let file = fs.readFileSync(__dirname + '/log.txt', 'utf-8')
    file += `
----- ${dayjs().format('YYYY-MM-DD HH:mm:ss')} -----
${str}
`
    fs.writeFileSync(__dirname + '/log.txt', file)
  } catch (error) {
    console.log(error);

  }
}