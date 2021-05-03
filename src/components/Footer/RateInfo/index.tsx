import { Popover, Button } from 'antd'
export default function RateInfo() {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  )
  return (
    <Popover content={content} title="Title" trigger="click">
      <Button>Click me</Button>
    </Popover>
  )
}