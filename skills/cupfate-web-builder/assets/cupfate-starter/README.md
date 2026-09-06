# 纸杯命运 · CUPFATE

一款简洁、轻量、双语的塔罗娱乐与自我反思网页。

[在线体验](https://glimmer-tarot.huahuamulan1105.chatgpt.site/)

## 功能

- 今日运势与“心中一问”两种模式
- 抽一张或三张大阿尔卡那牌
- 简体中文与英文界面
- 原生分享与复制链接
- PWA 安装及首次完整访问后的离线使用
- 响应式手机和桌面界面

> 塔罗仅供娱乐与自我反思，不预测确定结果，也不替代专业建议。

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

正式构建与测试：

```bash
npm run build
npm test
```

## 项目结构

- `app/`：主要 React 页面、文案和样式
- `public/`：应用图标、分享图、PWA 清单和离线缓存脚本
- `site/`：静态页面版本
- `tests/`：渲染验证
- `.openai/hosting.json`：当前 OpenAI Sites 托管项目配置；其中的项目编号不是密钥，fork 后请替换为自己的托管配置

## 开源与素材

本项目的原创代码、文案和项目自有视觉素材以 [MIT License](LICENSE) 发布。依赖包、字体和运行平台仍分别受其自身许可证及服务条款约束。

项目不提供医疗、法律、金融或其他专业建议，也不保证任何占卜结果的准确性。`CUPFATE` 名称和项目视觉识别的使用不得暗示原作者对衍生项目的认可。

## License

Copyright (c) 2026 CUPFATE contributors. Released under the MIT License.
