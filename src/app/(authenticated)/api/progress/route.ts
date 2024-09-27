import { useParseDate } from "@/hooks/useParseDate"
import { useParseNumber } from "@/hooks/useParseNumber"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { useVerifyUser } from "@/hooks/useVerifyUser"
import { progressSchema } from "@/schemas/api/progress"
import { getClass } from "@/services/prisma/classes/get"
import { createProgress } from "@/services/prisma/progress/create"
import { deleteProgress } from "@/services/prisma/progress/delete"
import { getProgress } from "@/services/prisma/progress/get"
import { getAllProgress } from "@/services/prisma/progress/getAll"
import { getProgressByParents } from "@/services/prisma/progress/getProgressByParents"
import { updateProgress } from "@/services/prisma/progress/update"
import { getUser } from "@/services/prisma/users/get"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
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

  const { classId, userId, rating, completed, completedAt } =
    await request.json()

  const { success, error } = progressSchema.safeParse({
    classId,
    userId,
    rating,
    completed,
    completedAt
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
    const hasClass = await getClass({ id: classId })

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

    const hasUser = await getUser({ id: userId })

    if (!hasUser)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Usuário não encontrado."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const hasProgress = await getProgressByParents({ classId, userId })

    if (hasProgress) {
      const progress = {
        id: hasProgress?.id,
        classId,
        userId,
        rating,
        completed,
        completedAt: completed ? useParseDate(completedAt) : null
      }

      const data = await updateProgress(progress)
      return NextResponse.json(
        {
          statusCode: httpStatus.ok.statusCode,
          data,
          success: "Progresso atualizado com sucesso."
        },
        {
          status: httpStatus.ok.statusCode
        }
      )
    }

    const progress = {
      classId,
      userId,
      rating,
      completed,
      completedAt: useParseDate(completedAt)
    }

    const data = await createProgress(progress)

    return NextResponse.json(
      {
        statusCode: httpStatus.create.statusCode,
        data,
        success: "Progresso criado com sucesso."
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

  const { classId, userId, rating, completed, completedAt } =
    await request.json()
  const { searchParams } = await new URL(request.url)
  const id = searchParams.get("id")

  if (!id)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID do Progresso obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  const { success } = completedAt
    ? progressSchema.shape.completedAt.safeParse(completedAt)
    : { success: true }

  if (!success)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "Formato da data de concluído é inválido."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const hasProgress = await getProgress({ id: useParseNumber(id) })

    if (!hasProgress)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Progresso não encontrado."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const hasClass = classId ? await getClass({ id: classId }) : true

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

    const hasUser = userId ? await getUser({ id: userId }) : true

    if (!hasUser)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Usuário não encontrado."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const progress = {
      id: useParseNumber(id),
      classId,
      userId,
      rating,
      completed,
      completedAt: useParseDate(completedAt)
    }

    const data = await updateProgress(progress)

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Progresso atualizado com sucesso."
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
        error: "ID do progresso obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const idConverted = useParseNumber(id)
    const hasProgress = await getProgress({ id: idConverted })

    if (!hasProgress)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Progresso não encontrado."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const data = await deleteProgress({ id: idConverted })

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Progresso deletado com sucesso."
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
    const data = await getAllProgress()

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
