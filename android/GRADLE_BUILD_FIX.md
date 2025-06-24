# React Native Android 构建问题修复指南

## 问题概述

在构建 React Native 0.80.0 项目时遇到了多个 Gradle 构建错误，主要涉及：

1. `react-native-screens` 无法找到 `ReactAndroid/gradle.properties`
2. `react-native-gesture-handler` 无法找到 `ReactAndroid/cmake-utils/folly-flags.cmake`
3. `react-native-sound` 编译 SDK 版本过低
4. 符号剥离 (symbol stripping) 失败

## 解决方案

### 1. ReactAndroid 路径问题

**问题**: 第三方库的 `resolveReactNativeDirectory()` 函数无法正确找到 React Native 的 ReactAndroid 目录。

**解决方案**: 创建符号链接指向正确的 ReactAndroid 目录：

```bash
# 为 react-native-screens 创建符号链接
cd node_modules/react-native-screens/android
mkdir -p node_modules
ln -sf ../../../react-native/ReactAndroid node_modules/ReactAndroid

# 为 react-native-gesture-handler 创建符号链接
cd ../../../react-native-gesture-handler
mkdir -p node_modules
ln -sf /Users/youngcan/JS/EngLishForAdult/node_modules/react-native/ReactAndroid node_modules/ReactAndroid

# 在项目根目录创建符号链接
cd ../../
ln -sf react-native/ReactAndroid ReactAndroid
```

### 2. 编译 SDK 版本问题

**问题**: `react-native-sound` 使用过低的默认编译 SDK 版本 (26)。

**解决方案**: 在项目根 `build.gradle` 中添加项目级别属性：

```gradle
// 在 build.gradle 中添加
project.ext.compileSdk = 35
project.ext.buildToolsVersion = "35.0.0"
project.ext.targetSdkVersion = 35

// 额外的兼容性属性
compileSdk = 35
buildToolsVersion = "35.0.0"
targetSdkVersion = 35
```

### 3. 符号剥离问题

**问题**: Debug 构建时符号剥离失败，找不到某些 .so 文件。

**解决方案**: 在 `app/build.gradle` 的 debug buildType 中禁用符号剥离：

```gradle
buildTypes {
    debug {
        signingConfig signingConfigs.debug
        debuggable true
        jniDebuggable true
        renderscriptDebuggable true
        // 禁用符号剥离
        packagingOptions {
            doNotStrip "**/*.so"
        }
    }
}
```

### 4. 项目扩展属性

**问题**: 第三方库无法正确读取项目的编译配置。

**解决方案**: 在 `app/build.gradle` 中添加扩展属性：

```gradle
// 在 android 块之前添加
project.ext.REACT_NATIVE_NODE_MODULES_DIR = file("../../node_modules")
```

## 自动化脚本

运行 `./fix_gradle.sh` 脚本可以自动应用所有修复：

```bash
chmod +x fix_gradle.sh
./fix_gradle.sh
```

## 验证构建

修复完成后，运行以下命令验证构建：

```bash
cd android
./gradlew clean
./gradlew app:assembleDebug
```

成功构建后，APK 文件将生成在 `android/app/build/outputs/apk/debug/app-debug.apk`。

## 注意事项

1. 这些修复主要针对 React Native 0.80.0 和相关第三方库版本
2. 符号链接使用绝对路径，确保在不同环境中的兼容性
3. 禁用符号剥离会增加 APK 大小，但对 debug 构建是可接受的
4. 如果更新了 node_modules，可能需要重新运行修复脚本

## 相关文件

- `build.gradle` (项目根目录)
- `app/build.gradle`
- `gradle.properties`
- `fix_gradle.sh` (自动化修复脚本)