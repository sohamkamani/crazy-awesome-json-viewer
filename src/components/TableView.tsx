import * as React from 'react'

import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'

import JSONView from './JSONView'

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
  render?: ((string, object) => JSX.Element)
}

const generateColumns = (keys: Set<string>): column[] =>
  Array.from(keys).map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
    render: (txt, record) => {
      const val = record[key]
      if (typeof val === 'object' && val !== null) {
        return <JSONView ast={txt} />
      }
      return <span>{String(val)}</span>
    }
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
