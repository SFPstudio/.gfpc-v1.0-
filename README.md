# .gfpc-v1.0
## 运用场景
游戏中玩家坐标的记录
## 基本结构
#[f=每秒记录帧数]
 [秒-帧]_[秒-]_玩家 ID_[x=x_y=y_z=z]_[x=x_y=y_z=z]

 # 写在最后
 我们希望各位大佬在此基础上开发更多可以解析.gfpc文件的工具 谢谢
## 使用
[![pA6vvhq.jpg](https://s21.ax1x.com/2024/11/11/pA6vvhq.jpg)](https://imgse.com/i/pA6vvhq)
# API使用及调用
### readGFPCFile(filePath: string): GFPCData  
：这个函数接受一个文件路径作为参数，读取该路径下的  .gfpc  文件，并返回一个包含解析后数据的对象。
### writeGFPCFile(filePath: string, data: GFPCData): void  
：这个函数接受一个文件路径和一个数据对象作为参数，将数据对象写入到指定的  .gfpc  文件中。
