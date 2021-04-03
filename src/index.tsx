import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'redux/store'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import App from './App'
import 'assets/css/reset.css'
import 'assets/css/base.css'

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}><App /></Provider>
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
