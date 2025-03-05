const path = require('path');
const resolve = path.resolve;

module.exports = {
  entry: './src/index.ts',             // 入口文件
  output: {
    filename: 'bundle.ts',			   // 输出文件名
    path: resolve(__dirname, 'dist')   // 输出文件路径
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')   // 别名设置
    }
  }
}
