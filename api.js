document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const downloadButton = document.getElementById('downloadButton');
    const responseDiv = document.getElementById('response');
    const loadingDiv = document.getElementById('loading');
    const emotionTags = document.querySelectorAll('.emotion-tag');

    // 当前生成的图片URL
    let currentImageUrl = '';

    // API配置
    const API_URL = 'https://api.coze.cn/v3/chat';
    const API_TOKEN = 'pat_maVIAzsA5k06Hs13b4oqIvvcffFXbZBjvStHDCzYHYCTe7W5WVhEHGqR5B5BuTHS';
    const BOT_ID = '7461916226898886656';
    const USER_ID = '123456789';

    // 为情绪标签添加点击事件
    emotionTags.forEach(tag => {
        tag.addEventListener('click', () => {
            userInput.value = tag.textContent;
            userInput.focus();
        });
    });

    // 下载图片函数
    async function downloadImage() {
        if (!currentImageUrl) return;

        try {
            // 创建一个临时链接
            const link = document.createElement('a');
            link.href = currentImageUrl;
            link.download = `表情包_${new Date().getTime()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('下载失败:', error);
            alert('下载失败，请重试');
        }
    }

    // 添加下载按钮点击事件
    downloadButton.addEventListener('click', downloadImage);

    // 处理流式数据的函数
    function processStreamData(text) {
        // 将接收到的数据按行分割
        const lines = text.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
            try {
                // 检查是否是事件行
                if (line.startsWith('event:')) {
                    const eventType = line.slice(6).trim();
                    continue;
                }

                // 检查是否是数据行
                if (line.startsWith('data:')) {
                    let data = line.slice(5).trim();
                    
                    // 检查是否是结束标记
                    if (data === '"[DONE]"') {
                        loadingDiv.style.display = 'none';
                        continue;
                    }

                    // 解析JSON数据
                    const jsonData = JSON.parse(data);

                    // 检查是否是message.delta事件的数据
                    if (jsonData.type === 'answer' && jsonData.content) {
                        // 检查是否是图片URL
                        if (jsonData.content.startsWith('http')) {
                            // 保存当前图片URL
                            currentImageUrl = jsonData.content;
                            
                            // 创建图片元素
                            const img = document.createElement('img');
                            img.src = currentImageUrl;
                            img.alt = '生成的表情包';
                            img.className = 'emoji-image';
                            
                            // 清空之前的内容并添加新图片
                            responseDiv.innerHTML = '';
                            responseDiv.appendChild(img);

                            // 显示下载按钮
                            downloadButton.classList.add('visible');
                        } else {
                            responseDiv.textContent = jsonData.content;
                            // 隐藏下载按钮
                            downloadButton.classList.remove('visible');
                        }
                        continue;
                    }
                }
            } catch (error) {
                console.error('Error processing line:', error);
            }
        }
    }

    sendButton.addEventListener('click', async () => {
        // 清空之前的响应
        responseDiv.innerHTML = '';
        // 隐藏下载按钮
        downloadButton.classList.remove('visible');
        // 重置当前图片URL
        currentImageUrl = '';
        
        // 获取用户输入
        const content = userInput.value.trim();
        if (!content) {
            alert('请输入关键词！');
            return;
        }

        // 显示加载动画
        loadingDiv.style.display = 'block';
        
        // 禁用发送按钮，防止重复发送
        sendButton.disabled = true;

        try {
            // 准备请求数据
            const requestData = {
                bot_id: BOT_ID,
                user_id: USER_ID,
                stream: true,
                auto_save_history: true,
                additional_messages: [
                    {
                        role: 'user',
                        content: content,
                        content_type: 'text'
                    }
                ]
            };

            // 发起fetch请求
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // 检查响应状态
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 获取响应的可读流
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = ''; // 用于存储未完成的数据块

            // 循环读取流数据
            while (true) {
                const {value, done} = await reader.read();
                if (done) break;
                
                // 解码数据
                buffer += decoder.decode(value, {stream: true});
                
                // 处理完整的数据块
                processStreamData(buffer);
            }
            
            // 处理最后可能剩余的数据
            buffer += decoder.decode();
            if (buffer) {
                processStreamData(buffer);
            }

        } catch (error) {
            console.error('Error:', error);
            responseDiv.textContent = `发生错误: ${error.message}`;
            loadingDiv.style.display = 'none';
            downloadButton.classList.remove('visible');
        } finally {
            // 重新启用发送按钮
            sendButton.disabled = false;
        }
    });

    // 添加回车键发送功能
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !sendButton.disabled) {
            sendButton.click();
        }
    });
});
