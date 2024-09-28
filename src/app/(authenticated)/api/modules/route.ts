import { useParseDate } from "@/hooks/useParseDate"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { useVerifyUser } from "@/hooks/useVerifyUser"
import { modulesSchema } from "@/schemas/api/modules"
import { createModule } from "@/services/prisma/modules/create"
import { deleteModule } from "@/services/prisma/modules/delete"
import { getModule } from "@/services/prisma/modules/get"
import { getAllModules } from "@/services/prisma/modules/getAll"
import { updateModule } from "@/services/prisma/modules/update"
import { getTrain } from "@/services/prisma/trains/get"
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

  const { title, description, trainId, lock, open } = await request.json()

  const { success, error } = modulesSchema.safeParse({
    title,
    description,
    trainId,
    lock,
    open
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
    const hasTrain = await getTrain({ id: trainId })

    if (!hasTrain)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Trilha não encontrada."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const openISO = useParseDate(open) ?? undefined

    const module = {
      title,
      description,
      trainId,
      lock,
      open: openISO
    }

    const data = await createModule(module)

    return NextResponse.json(
      {
        statusCode: httpStatus.create.statusCode,
        data,
        success: "Módulo criado com sucesso."
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

  const { title, description, open, lock, trainId } = await request.json()
  const { searchParams } = await new URL(request.url)
  const id = searchParams.get("id")

  if (!id)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID do módulo obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const hasModule = await getModule({ id })

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

    const hasTrain = trainId ? await getTrain({ id: trainId }) : true

    if (!hasTrain)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Trilha não encontrada."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const openConvert = !isNaN(Date.parse(open)) && new Date(open).toISOString()

    if (typeof open === "boolean" || (typeof open === "string" && !openConvert))
      return NextResponse.json(
        {
          statusCode: httpStatus.invalidRequest.statusCode,
          error: "Formato da data de abertura inválida."
        },
        {
          status: httpStatus.invalidRequest.statusCode
        }
      )

    const openResult = openConvert ? openConvert : open
    const module = { id, title, description, open: openResult, lock, trainId }

    const data = await updateModule(module)

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Módulo atualizado com sucesso."
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
        error: "ID do Módulo obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const hasModule = await getModule({ id })

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

    const data = await deleteModule({ id })
    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Módulo deletado com sucesso."
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
    const data = await getAllModules()

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
