#!/bin/bash

# 修复React Native依赖问题的脚本
echo "正在修复React Native依赖问题..."

# 为react-native-gesture-handler创建ReactAndroid目录和文件
mkdir -p node_modules/react-native-gesture-handler/node_modules/ReactAndroid
cat > node_modules/react-native-gesture-handler/node_modules/ReactAndroid/gradle.properties << INNER_EOF
VERSION_NAME=0.80.0
react.internal.publishingGroup=com.facebook.react

android.useAndroidX=true
INNER_EOF

# 为react-native-screens创建ReactAndroid目录和文件
mkdir -p node_modules/react-native-screens/node_modules/ReactAndroid
cat > node_modules/react-native-screens/node_modules/ReactAndroid/gradle.properties << INNER_EOF
VERSION_NAME=0.80.0
react.internal.publishingGroup=com.facebook.react

android.useAndroidX=true
INNER_EOF

echo "React Native依赖问题修复完成！"
echo "现在可以正常进行Android构建了。"
