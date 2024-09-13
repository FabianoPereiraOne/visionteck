import { DataViewProps } from "@/types/popup"
import { memo, useEffect, useState } from "react"
import { FiEdit, FiTrash } from "react-icons/fi"
import styled from "./style.module.scss"

const DataView = ({ fcGetData, fcEdit, fcDel }: DataViewProps) => {
  const [data, setData] = useState([])

  const loadDataPopup = async () => {
    const result = await fcGetData()
    const response = await result.json()
    const list = await response?.data

    setData(list)
  }

  const handlerSubmitDelete = (item: any) => {
    const id = item?.id
    const list = data?.filter((dataItem: any) => dataItem?.id !== id)

    setData(list)

    fcDel(item)
  }

  useEffect(() => {
    loadDataPopup()
  }, [])

  return (
    <ul className={styled.listView}>
      {data?.length > 0 &&
        data.map((item: { id: string; title: string }) => {
          return (
            <li className={styled.row} key={item?.id}>
              <p>&#x2022; {item?.title}</p>
              <div className={styled.btnGroup}>
                <button onClick={() => fcEdit(item)}>
                  <FiEdit />
                </button>
                <button onClick={() => handlerSubmitDelete(item)}>
                  <FiTrash />
                </button>
              </div>
            </li>
          )
        })}
    </ul>
  )
}

export default memo(DataView)
