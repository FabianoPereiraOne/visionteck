import { useVisionContext } from "@/context"
import { Class } from "@/types/class"
import { Module } from "@/types/module"
import { fetchChangeProgress } from "@/utils/fetch/progress/post"
import { useMemo } from "react"
import { FiHexagon } from "react-icons/fi"
import styled from "./style.module.scss"

export const ModuleComponent = ({ module }: { module: Module }) => {
  const { user, register, setValue } = useVisionContext()

  const classes: Class[] = useMemo(() => {
    const list = module?.classes.map(classItem => {
      const hasProgress = classItem?.progress?.find(progress => {
        const existClass = progress?.classId === classItem?.id
        const existUser = progress?.userId === user?.id
        return existClass && existUser
      })

      if (hasProgress)
        return { ...classItem, completed: hasProgress?.completed }

      return { ...classItem, completed: false }
    })

    return list
  }, [module])

  const handlerChangeStatusClass = async ({
    completed,
    classId,
    userId
  }: {
    completed: boolean
    classId: string
    userId: string
  }) => {
    try {
      const completedAt = new Date().toISOString()
      await fetchChangeProgress({ completed, classId, userId, completedAt })

      setValue(classId, completed)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <li className={styled.container}>
      <p className={styled.title}>
        <FiHexagon />
        {module?.title}
      </p>
      <div className={styled.contentClasses}>
        {classes.map(classItem => {
          return (
            <label key={classItem?.id} className={styled.class}>
              <input
                className={styled.checkbox}
                type='checkbox'
                defaultChecked={classItem?.completed}
                {...register(classItem?.id, {
                  onChange: event =>
                    handlerChangeStatusClass({
                      completed: event?.target?.checked,
                      classId: classItem?.id,
                      userId: `${user?.id}`
                    })
                })}
              />
              <p className={styled.titleClass}>{classItem?.title}</p>
            </label>
          )
        })}
      </div>
    </li>
  )
}
