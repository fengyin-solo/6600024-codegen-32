// 用户角色
export type Role = 'visitor' | 'operator'

// 角色权限定义
export interface RolePermission {
  canSubscribe: boolean
  canAcknowledgeAlarm: boolean
  canClearAlarms: boolean
}

// 角色与权限映射
// 访客(visitor)：仅可查看数据
// 运维人员(operator)：可订阅节点、确认报警、清空事件
export const ROLE_PERMISSIONS: Record<Role, RolePermission> = {
  visitor: {
    canSubscribe: false,
    canAcknowledgeAlarm: false,
    canClearAlarms: false
  },
  operator: {
    canSubscribe: true,
    canAcknowledgeAlarm: true,
    canClearAlarms: true
  }
}

export const ROLE_LABELS: Record<Role, string> = {
  visitor: '访客',
  operator: '运维人员'
}

// OPC-UA 节点类型定义
export interface OPCUANode {
  id: string
  name: string
  nodeId: string
  type: 'Object' | 'Variable' | 'Method' | 'DataType'
  dataType?: string
  value?: any
  unit?: string
  quality?: 'Good' | 'Bad' | 'Uncertain'
  children?: OPCUANode[]
  description?: string
  browseName?: string
}

// 数据值模型
export interface DataValue {
  nodeId: string
  value: number | boolean | string
  quality: 'Good' | 'Bad' | 'Uncertain'
  timestamp: number
  sourceTimestamp?: number
  serverTimestamp?: number
}

// 报警事件
export interface AlarmEvent {
  id: string
  nodeId: string
  nodeName: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info'
  message: string
  timestamp: number
  acknowledged: boolean
  value?: number | boolean | string
  threshold?: number
}

// 订阅配置
export interface SubscriptionConfig {
  nodeId: string
  publishingInterval: number
  samplingInterval: number
  queueSize: number
  discardOldest: boolean
  enabled: boolean
}

// 历史数据点
export interface HistoryDataPoint {
  timestamp: number
  value: number
  quality: 'Good' | 'Bad' | 'Uncertain'
}

// 节点详情
export interface NodeDetail {
  node: OPCUANode
  currentValue?: DataValue
  history?: HistoryDataPoint[]
  subscriptions?: SubscriptionConfig[]
}
