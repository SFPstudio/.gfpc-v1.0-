# .gfpc-v1.0
[V1.0]
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
# 在UE5中使用本API （务必检查以下步骤）

在Windows环境下使用UE5和Puerts插件调用TypeScript中的API和函数，你需要遵循以下步骤：1. 确保Puerts插件集成确保你的UE5项目已经集成了Puerts插件。如果没有，请按照Puerts的官方文档进行集成。2. 配置TypeScript环境在项目中创建一个  tsconfig.json  文件，用于配置TypeScript编译器的设置。这个文件可以位于项目的根目录或者  Sou rce 目录下。
### json
`{
  "compilerOptions": {
    "target": "ES5",
    "module": "ES6",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "outDir": "./Dist"
  },
  "include": [
    "Scripts/**/*"
  ]
}`
3. 编写TypeScript代码在你的  Scripts  目录下创建  TypeScript_API_UE_Puerts.ts  文件，并编写你的TypeScript代码。4. 编译TypeScript代码在项目根目录下打开命令行工具（例如PowerShell或CMD），运行以下命令来编译TypeScript代码：
### bash
`tsc`
这将根据  tsconfig.json  中的设置编译TypeScript文件，并输出JavaScript文件到  Dist  目录。5. 启动Puerts环境在你的游戏实例（GameInstance）中启动Puerts环境，并加载编译后的JavaScript文件。
### cpp
`
// GameInstance.h
#pragma once

#include "CoreMinimal.h"
#include "GameInstance/PUERTSGameInstance.h"
#include "MyGameInstance.generated.h"

UCLASS()
class YOURPROJECT_API UMyGameInstance : public UPUERTSGameInstance {
  GENERATED_BODY()
public:
  virtual void Init() override;
};

// GameInstance.cpp
#include "MyGameInstance.h"
#include "PuertsJsEnv.h"

void UMyGameInstance::Init() {
  UPUERTSGameInstance::Init();
  FPuertsJsEnv& JsEnv = FPuertsJsEnv::GetOne();
  // 加载编译后的JavaScript文件
  JsEnv.EvalFile(TEXT("$(ProjectDir)/Dist/TypeScript_API_UE_Puerts.js"), TEXT("TypeScript_API_UE_Puerts"));
}
`
6. 调用TypeScript函数在C++代码中，你可以使用Puerts提供的接口来调用TypeScript中的函数。
### cpp
`
// SomeFunction.cpp
#include "MyGameInstance.h"

void SomeFunction(UMyGameInstance* GameInstance) {
  if (GameInstance) {
    // 准备参数
    FString FilePath = TEXT("/path/to/your/file.gfpc");
    GFPCData Data; // 填充数据
    // 调用TypeScript函数
    GameInstance->CallFunction("writeGFPCFile", FilePath, Data);
  }
} `
### 在蓝图中，你可以使用Puerts提供的节点来直接调用这些函数。注意事项• 确保你的TypeScript文件被正确编译，并且可以在Puerts环境中访问。• 确保你的TypeScript函数签名与C++中调用的签名一致。• 使用Puerts时，所有UE的API都可以通过TypeScript/JavaScript访问，就像在蓝图中一样。通过上述步骤，你应该能够在Windows环境下的UE5项目中使用Puerts插件调用TypeScript API(本)了。
