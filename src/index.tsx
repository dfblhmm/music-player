import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import App from './App'
import '@/assets/css/reset.css'
import '@/assets/css/base.css'

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
