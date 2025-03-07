// 加载中
export function loading() {
    // 定义旋转字符数组
  const spinnerChars = ['|', '/', '-', '\\'];
  let index = 0;
  // 定义定时器，每 200 毫秒执行一次
  const intervalId = setInterval(() => {
    // 清除当前行
    process.stdout.clearLine(0);
    // 将光标移动到行首
    process.stdout.cursorTo(0);
    // 输出当前旋转字符
    process.stdout.write(spinnerChars[index]+' 模型推理中...');
    // 更新索引
    index = (index + 1) % spinnerChars.length;
  }, 200);
  return {
    stop:(msg?:string)=>{
      clearInterval(intervalId);
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      console.log(msg ??'推理完成');
    }
  }
}