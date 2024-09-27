import { useVisionContext } from "@/context"
import { Class } from "@/types/class"
import { Module } from "@/types/module"
import { fetchChangeProgress } from "@/utils/fetch/progress/post"
import { useMemo } from "react"

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
      setValue(classId, completed)
      await fetchChangeProgress({ completed, classId, userId, completedAt })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <li>
      <p>{module?.title}</p>
      <ul>
        {classes.map(classItem => {
          return (
            <li>
              <label key={classItem?.id}>
                <input
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
                {classItem?.title}
              </label>
            </li>
          )
        })}
      </ul>
    </li>
  )
}
