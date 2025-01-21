# AI表情包生成器 v1.0

一个简单易用的AI表情包生成工具，可以根据情绪关键词生成相应的表情包图片。

## 在线演示

你可以通过以下两种方式使用这个工具：

1. GitHub Pages在线演示：
   - 访问：https://[你的GitHub用户名].github.io/emoji-generator
   
2. 本地运行：
   ```bash
   # 克隆仓库
   git clone https://github.com/[你的GitHub用户名]/emoji-generator.git
   
   # 进入项目目录
   cd emoji-generator
   
   # 启动本地服务器
   python -m http.server 8000
   
   # 在浏览器中访问
   http://localhost:8000
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
- 开发环境：本地Python HTTP服务器

## 文件结构

- `index.html`: 主页面文件，包含界面结构和样式
- `api.js`: JavaScript文件，包含所有交互逻辑和API调用
- `README.md`: 项目说明文档

## 使用方法

1. 启动本地服务器：
   ```bash
   python -m http.server 8000
   ```

2. 访问应用：
   - 打开浏览器
   - 访问 http://localhost:8000

3. 生成表情包：
   - 在输入框输入关键词，或点击下方情绪标签
   - 点击"生成表情包"按钮
   - 等待图片生成
   - 点击"下载图片"按钮保存

## API配置

使用 Coze API 进行表情包生成，需要配置以下参数：
- API URL: https://api.coze.cn/v3/chat
- BOT_ID
- API Token

## 版本历史

### v1.0 (2025-01-21)
- 初始版本发布
- 实现基本的表情包生成功能
- 添加情绪快捷选项
- 支持图片下载
- 优化移动端适配
