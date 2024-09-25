import Loading from "@/components/loading"
import { DataViewProps } from "@/types/popup"
import { memo, useState } from "react"
import { FiEdit, FiTrash } from "react-icons/fi"
import styled from "./style.module.scss"

const DataView = ({ data, fcEdit, fcDel }: DataViewProps) => {
  const [dataFilter, setData] = useState(data ?? [])

  const handlerSubmitDelete = (item: any) => {
    const id = item?.id
    const list: any = data?.filter((dataItem: any) => dataItem?.id !== id)

    setData(list)
    fcDel(item)
  }

  return (
    <ul className={styled.listView}>
      {dataFilter?.length > 0 ? (
        dataFilter.map((item: { id: string | number; title: string }) => {
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
        })
      ) : (
        <Loading />
      )}
    </ul>
  )
}

export default memo(DataView)
