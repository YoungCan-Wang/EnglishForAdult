#!/bin/bash

echo "🔧 修复 React Native Android 构建问题..."

# 1. 为 react-native-screens 创建符号链接
echo "📁 为 react-native-screens 创建 ReactAndroid 符号链接..."
cd ../node_modules/react-native-screens/android
mkdir -p node_modules
ln -sf ../../../react-native/ReactAndroid node_modules/ReactAndroid

# 2. 为 react-native-gesture-handler 创建符号链接
echo "📁 为 react-native-gesture-handler 创建 ReactAndroid 符号链接..."
cd ../../../react-native-gesture-handler
mkdir -p node_modules
ln -sf /Users/youngcan/JS/EngLishForAdult/node_modules/react-native/ReactAndroid node_modules/ReactAndroid

# 3. 在项目根目录的 node_modules 中创建 ReactAndroid 符号链接
echo "📁 在项目根目录创建 ReactAndroid 符号链接..."
cd ../../
ln -sf react-native/ReactAndroid ReactAndroid

echo "✅ 符号链接创建完成！"

# 4. 验证符号链接
echo "🔍 验证符号链接..."
echo "检查 react-native-screens:"
ls -la node_modules/react-native-screens/android/node_modules/ReactAndroid/gradle.properties 2>/dev/null && echo "✅ react-native-screens 符号链接正常" || echo "❌ react-native-screens 符号链接失败"

echo "检查 react-native-gesture-handler:"
ls -la node_modules/react-native-gesture-handler/node_modules/ReactAndroid/gradle.properties 2>/dev/null && echo "✅ react-native-gesture-handler 符号链接正常" || echo "❌ react-native-gesture-handler 符号链接失败"

echo "检查项目根目录:"
ls -la node_modules/ReactAndroid/gradle.properties 2>/dev/null && echo "✅ 项目根目录符号链接正常" || echo "❌ 项目根目录符号链接失败"

echo "🎉 修复完成！现在可以运行 './gradlew assembleDebug' 来构建项目。"
