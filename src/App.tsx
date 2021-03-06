import { PureComponent } from 'react'
import { Layout } from 'antd'
import HeaderContent from '@/components/Header'
import SiderContent from '@/components/Sider'
import MainContent from '@/components/Main'
import FooterContent from '@/components/Footer'
import './App.scss'
const { Header, Sider, Content, Footer } = Layout
export default class App extends PureComponent {
  render() {
    return (
      <div style={{height: '100%'}}>
        <Layout>
          <Header><HeaderContent/></Header>
          <Layout>
            <Sider width="224px"><SiderContent /></Sider>
            <Content><MainContent/></Content>
          </Layout>
          <Footer><FooterContent/></Footer>
        </Layout>
      </div>
    )
  }
}
