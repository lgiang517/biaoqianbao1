# AI表情包生成器 v1.0

一个简单易用的AI表情包生成工具，可以根据情绪关键词生成相应的表情包图片。

## 快速开始

你可以通过以下方式使用这个工具：

1. 直接在线使用：
   - 访问：https://lgiang517.github.io/biaoqianbao1
   
2. 查看源代码：
   - GitHub仓库：https://github.com/lgiang517/biaoqianbao1
   
3. 本地运行：
   ```bash
   # 克隆仓库
   git clone https://github.com/lgiang517/biaoqianbao1.git
   
   # 进入项目目录
   cd biaoqianbao1
   
   # 使用浏览器打开index.html文件
   # 或者启动一个本地服务器：
   python -m http.server 8000
   # 然后访问 http://localhost:8000
   ```

## 功能特点

1. 情绪关键词生成
   - 支持自由输入关键词
   - 提供12个常用情绪快捷选项
   - 包括：开心、高兴、喜欢、震惊、疑惑、暴躁、酸了、害怕、期待、无语、可爱、委屈

2. 图片生成与下载
   - 实时生成表情包图片
   - 一键下载生成的图片
   - 自动生成带时间戳的文件名

3. 界面特点
   - 现代简约的设计风格
   - 响应式布局，支持手机和电脑
   - 良好的视觉反馈和动画效果
   - 加载状态提示

## 技术栈

- 前端：HTML5 + CSS3 + JavaScript
- API：Coze API
- 部署：GitHub Pages

## 文件结构

- `index.html`: 主页面文件，包含界面结构和样式
- `api.js`: JavaScript文件，包含所有交互逻辑和API调用
- `README.md`: 项目说明文档

## 使用方法

1. 打开应用：
   - 直接访问在线版本：https://lgiang517.github.io/biaoqianbao1
   或者
   - 在本地打开 `index.html` 文件

2. 生成表情包：
   - 在输入框输入关键词，或点击下方情绪标签
   - 点击"生成表情包"按钮
   - 等待图片生成
   - 点击"下载图片"按钮保存

## 版本历史

### v1.0 (2025-01-21)
- 初始版本发布
- 实现基本的表情包生成功能
- 添加情绪快捷选项
- 支持图片下载
- 优化移动端适配
- 部署到GitHub Pages

## 问题反馈

如果你在使用过程中遇到任何问题，欢迎在GitHub Issues中提出：
https://github.com/lgiang517/biaoqianbao1/issues
