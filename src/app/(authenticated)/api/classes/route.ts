import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { useVerifyUser } from "@/hooks/useVerifyUser"
import { classesSchema } from "@/schemas/api/classes"
import { createClass } from "@/services/prisma/classes/create"
import { deleteClass } from "@/services/prisma/classes/delete"
import { getClass } from "@/services/prisma/classes/get"
import { getAllClasses } from "@/services/prisma/classes/getAll"
import { updateClass } from "@/services/prisma/classes/update"
import { getModule } from "@/services/prisma/modules/get"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { isAdmin } = await useVerifyAdmin(request)
  if (!isAdmin)
    return NextResponse.json(
      {
        statusCode: httpStatus.unAuthorized.statusCode,
        error: httpStatus.unAuthorized.error
      },
      {
        status: httpStatus.unAuthorized.statusCode
      }
    )

  const { title, description, linkClass, moduleId, type } = await request.json()

  const { success, error } = classesSchema.safeParse({
    title,
    description,
    linkClass,
    moduleId,
    type
  })

  if (!success) {
    const listErrors = error?.errors ?? []
    const errors = listErrors.map(error => {
      return {
        message: `${error.message}(${error.path[0]})`
      }
    })

    return NextResponse.json(
      { statusCode: httpStatus.invalidRequest.statusCode, error: errors },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )
  }

  try {
    const hasModule = await getModule({ id: moduleId })

    if (!hasModule)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Módulo não encontrado."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const classCreate = {
      title,
      description,
      linkClass,
      moduleId,
      type
    }

    const data = await createClass(classCreate)

    return NextResponse.json(
      {
        statusCode: httpStatus.create.statusCode,
        data,
        success: "Aula criada com sucesso."
      },
      {
        status: httpStatus.create.statusCode
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const { isAdmin } = await useVerifyAdmin(request)
  if (!isAdmin)
    return NextResponse.json(
      {
        statusCode: httpStatus.unAuthorized.statusCode,
        error: httpStatus.unAuthorized.error
      },
      {
        status: httpStatus.unAuthorized.statusCode
      }
    )

  const { title, description, linkClass, moduleId, type } = await request.json()
  const { searchParams } = await new URL(request.url)
  const id = searchParams.get("id")

  if (!id)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID da Aula obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  const { success } = type
    ? classesSchema.shape.type.safeParse(type)
    : { success: true }

  if (!success)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "Tipo de Aula não encontrado."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const hasClass = await getClass({ id })

    if (!hasClass)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Aula não encontrada."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const hasModule = moduleId ? await getModule({ id: moduleId }) : true

    if (!hasModule)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Módulo não encontrado."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const classUpdate = {
      id,
      title,
      description,
      linkClass,
      moduleId,
      type
    }

    const data = await updateClass(classUpdate)

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Aula atualizada com sucesso."
      },
      {
        status: httpStatus.ok.statusCode
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        statusCode: httpStatus.serverError.statusCode,
        error: httpStatus.serverError.error
      },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { isAdmin } = await useVerifyAdmin(request)
  if (!isAdmin)
    return NextResponse.json(
      {
        statusCode: httpStatus.unAuthorized.statusCode,
        error: httpStatus.unAuthorized.error
      },
      {
        status: httpStatus.unAuthorized.statusCode
      }
    )

  const { searchParams } = await new URL(request.url)
  const id = searchParams.get("id")

  if (!id)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID da Aula obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const hasClass = await getClass({ id })

    if (!hasClass)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Aula não encontrada."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const data = await deleteClass({ id })

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Aula deletada com sucesso."
      },
      {
        status: httpStatus.ok.statusCode
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        statusCode: httpStatus.serverError.statusCode,
        error: httpStatus.serverError.error
      },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}

export async function GET(request: NextRequest) {
  const { isUser } = await useVerifyUser(request)
  if (!isUser)
    return NextResponse.json(
      {
        statusCode: httpStatus.unAuthorized.statusCode,
        error: "Faça login no sistema."
      },
      {
        status: httpStatus.unAuthorized.statusCode
      }
    )

  try {
    const data = await getAllClasses()

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: httpStatus.ok.success
      },
      {
        status: httpStatus.ok.statusCode
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}
