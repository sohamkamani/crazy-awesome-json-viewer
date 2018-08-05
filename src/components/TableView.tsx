import * as React from 'react'

import { Table } from 'antd'
import 'antd/dist/antd.css'

const collectAllKeys = (input: any[]): Set<string> => {
  const keys = new Set<string>()
  input.forEach((o) => {
    if (typeof o === 'object' && o != null) {
      Object.keys(o).forEach((key) => keys.add(key))
    }
  })
  return keys
}

interface column {
  title: string
  dataIndex: string
  key: string
  render?: ((string) => JSX.Element)
}

const generateColumns = (keys: Set<string>): column[] =>
  Array.from(keys).map((key) => ({
    title: key,
    dataIndex: key,
    key: key
  }))

const cleanData = (dirtyData: any[]): any[] => dirtyData.filter((datum) => typeof datum === 'object' && datum !== null)

interface tableData {
  data: any[]
}

export const Tbl = ({ data }: tableData) => (
  <Table columns={generateColumns(collectAllKeys(data))} dataSource={cleanData(data)} />
)

export const shouldShowTable = (data: any[]): boolean =>
  data.some((element) => typeof element === 'object' && element !== null)
