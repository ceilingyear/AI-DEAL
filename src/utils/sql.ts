// 清空table
export function clearTable(name:string) {
  return `truncate table ${name}`
}