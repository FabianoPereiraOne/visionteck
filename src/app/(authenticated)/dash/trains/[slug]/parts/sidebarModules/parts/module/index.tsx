import ButtonAdmin from "@/components/buttonAdmin"
import { useVisionContext } from "@/context"
import useDisplayErrors from "@/hooks/useDisplayErrors"
import { layoutAddClass } from "@/layouts/classes/add"
import { classesSchema } from "@/schemas/api/classes"
import { Class, patchClassProps } from "@/types/class"
import { Module } from "@/types/module"
import { Train } from "@/types/train"
import { fetchCreateClass } from "@/utils/fetch/classes/create"
import { fetchDeleteClass } from "@/utils/fetch/classes/delete"
import { fetchUpdateClass } from "@/utils/fetch/classes/update"
import { fetchChangeProgress } from "@/utils/fetch/progress/post"
import { Role } from "@prisma/client"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"
import { FiHexagon, FiSettings } from "react-icons/fi"
import styled from "./style.module.scss"

export const ModuleComponent = ({
  module,
  listModules,
  fcReload
}: {
  module: Module
  listModules: Module[]
  fcReload: (localTrain?: Train) => Promise<void | NodeJS.Timeout>
}) => {
  const { user, register, setValue, reset, getValues,setClassActive } = useVisionContext()
  const { displayErrors } = useDisplayErrors()
  const [update, setUpdate] = useState(false)
  const isAdmin = user?.type === Role.ADMIN

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

  const resetAllValues = () => {
    setUpdate(false)
    reset()
    fcReload()
  }

  const handlerUpdate = async () => {
    const data = getValues()
    const id = data?.id

    if (!id) return toast.error("Não foi possível atualizar aula.")

    try {
      await fetchUpdateClass(data as patchClassProps).then(() => {
        toast.success("Aula atualizada com sucesso.")
        resetAllValues()
      })
    } catch (error) {
      console.error(error)
      toast.error("Ops! erro ao atualizar aula.")
    }
  }

  const handlerSubmit = async () => {
    const dataCreate = getValues()

    const { success, data, error } = classesSchema.safeParse(dataCreate)

    if (!success) {
      return displayErrors(error?.errors)
    }

    try {
      await fetchCreateClass({ data }).then(() => {
        toast.success("Aula criada com sucesso.")
        resetAllValues()
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar nova aula.")
    }
  }

  const handlerDelete = async (module: Module) => {
    const id = module?.id

    if (!id) return toast.error("Ops! erro ao deletar aula.")

    try {
      await fetchDeleteClass({ id }).then(() => {
        toast.success("Aula deletada com sucesso.")
        resetAllValues()
      })
    } catch (error) {
      console.error(error)
      toast.error("Ops! erro ao deletar aula.")
    }
  }

  const loadSetValues = (classItem: Class) => {
    setValue("id", classItem?.id)
    setValue("title", classItem?.title)
    setValue("description", classItem?.description)
    setValue("linkClass", classItem?.linkClass)
    setValue("type", classItem?.type)
    setValue("moduleId", classItem?.moduleId)
    setUpdate(true)
  }

  return (
    <li className={styled.container}>
      <div className={styled.contentTitle}>
        <p className={styled.title}>
          <FiHexagon /> {module?.title}
        </p>
        {isAdmin && (
          <ButtonAdmin
            reset={reset}
            iconButton={<FiSettings />}
            layout={layoutAddClass({ register, listModules })}
            update={update}
            variant='square'
            fcUpdate={handlerUpdate}
            fcSubmit={handlerSubmit}
            fcDelete={handlerDelete}
            data={classes}
            fcLoadSetValues={loadSetValues}
          />
        )}
      </div>
      <ul className={styled.contentClasses}>
        {classes.map(classItem => {
          return (
            <li key={classItem?.id} className={styled.class}>
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
              <button onClick={() => setClassActive(classItem)} className={styled.linkClass}>
                {classItem?.title}
              </button>
            </li>
          )
        })}
      </ul>
    </li>
  )
}
