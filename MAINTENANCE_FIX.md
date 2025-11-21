# 🔧 维护模式部署问题排查

## 问题：部署后没有显示建置中页面

### 可能的原因：

1. **环境变量没有设置**
2. **环境变量名称不对**
3. **需要重新部署让环境变量生效**

---

## ✅ 解决方案

### 方案一：在部署平台设置环境变量（推荐）

#### 如果使用 Vercel：

1. 进入 Vercel Dashboard
2. 选择你的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加环境变量：
   - **Name**: `MAINTENANCE_MODE`
   - **Value**: `true`
   - **Environment**: 选择所有（Production, Preview, Development）
5. 点击 **Save**
6. **重要**：重新部署一次（Deployments → 点击最新部署的 ... → Redeploy）

#### 如果使用 Netlify：

1. 进入 Netlify Dashboard
2. 选择你的站点
3. 进入 **Site settings** → **Environment variables**
4. 添加环境变量：
   - **Key**: `MAINTENANCE_MODE`
   - **Value**: `true`
   - **Scopes**: 选择所有环境
5. 点击 **Save**
6. **重要**：重新部署（Deploys → 点击最新部署的 ... → Retry deploy）

---

### 方案二：临时硬编码（快速测试）

如果环境变量设置有问题，可以临时在代码中硬编码：

编辑 `src/middleware.ts`，将第 5 行改为：

```typescript
const MAINTENANCE_MODE = true; // 临时硬编码为 true
```

然后重新部署。

**注意**：测试完后记得改回使用环境变量！

---

### 方案三：使用 PUBLIC_ 前缀（某些平台需要）

有些平台需要 `PUBLIC_` 前缀的环境变量：

在部署平台设置：
- **Name**: `PUBLIC_MAINTENANCE_MODE`
- **Value**: `true`

代码已经支持这个了。

---

## 🔍 调试步骤

### 1. 检查环境变量是否设置

在部署平台的 Environment Variables 中确认：
- [ ] `MAINTENANCE_MODE` 存在
- [ ] 值为 `true`（不是 `"true"` 或其他）
- [ ] 选择了正确的环境（Production）

### 2. 检查是否重新部署

设置环境变量后，**必须重新部署**才能生效！

### 3. 检查 middleware 是否执行

可以在 middleware 中添加日志（仅用于调试）：

```typescript
export const onRequest: MiddlewareHandler = async (context, next) => {
  console.log('MAINTENANCE_MODE:', import.meta.env.MAINTENANCE_MODE);
  console.log('PUBLIC_MAINTENANCE_MODE:', import.meta.env.PUBLIC_MAINTENANCE_MODE);
  
  // ... 其余代码
};
```

然后在部署平台的日志中查看。

### 4. 直接访问建置中页面

尝试直接访问：`https://你的域名/coming-soon`

如果这个页面能正常显示，说明页面本身没问题，只是重定向没生效。

---

## 🚀 快速修复步骤

### 最快的方法：

1. **临时硬编码**（最快）：
   - 编辑 `src/middleware.ts`
   - 将 `const MAINTENANCE_MODE = ...` 改为 `const MAINTENANCE_MODE = true;`
   - 提交并重新部署

2. **设置环境变量**（推荐）：
   - 在部署平台设置 `MAINTENANCE_MODE=true`
   - 重新部署

3. **测试**：
   - 访问网站首页
   - 应该自动跳转到 `/coming-soon`

---

## 📝 你使用的是什么部署平台？

请告诉我你使用的平台（Vercel / Netlify / 其他），我可以提供更具体的步骤。

