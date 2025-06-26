#!/bin/bash

# 修复React Native依赖问题的脚本
echo "正在修复React Native依赖问题..."

# 为react-native-gesture-handler复制完整的ReactAndroid目录
echo "复制ReactAndroid到react-native-gesture-handler..."
mkdir -p node_modules/react-native-gesture-handler/node_modules
cp -r node_modules/react-native/ReactAndroid node_modules/react-native-gesture-handler/node_modules/

# 为react-native-screens复制完整的ReactAndroid目录
echo "复制ReactAndroid到react-native-screens..."
mkdir -p node_modules/react-native-screens/node_modules
cp -r node_modules/react-native/ReactAndroid node_modules/react-native-screens/node_modules/

echo "React Native依赖问题修复完成！"
echo "现在可以正常进行Android构建了。"