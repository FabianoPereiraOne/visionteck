import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { useVerifyUser } from "@/hooks/useVerifyUser"
import { trainsSchema } from "@/schemas/api/trains"
import { getCollection } from "@/services/prisma/collections/get"
import { createTrain } from "@/services/prisma/trains/create"
import { deleteTrains } from "@/services/prisma/trains/delete"
import { getTrain } from "@/services/prisma/trains/get"
import { getAllTrains } from "@/services/prisma/trains/getAll"
import { updateTrain } from "@/services/prisma/trains/update"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { isAdmin } = await useVerifyAdmin()
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

  const { title, description, linkCover, collectionId } = await request.json()

  const { success, error } = trainsSchema.safeParse({
    title,
    description,
    linkCover,
    collectionId
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
    const hasCollection = await getCollection({ id: collectionId })

    if (!hasCollection)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Coleção não encontrada."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const train = {
      title,
      description,
      linkCover,
      collectionId
    }

    const data = await createTrain(train)

    return NextResponse.json(
      {
        statusCode: httpStatus.create.statusCode,
        data,
        success: "Trilha criada com sucesso."
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
  const { isAdmin } = await useVerifyAdmin()
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

  const { title, description, linkCover, collectionId } = await request.json()
  const { searchParams } = await new URL(request.url)
  const id = searchParams.get("id")

  if (!id)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID da Trilha obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const hasTrain = await getTrain({ id })

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

    const train = { id, title, description, linkCover, collectionId }

    const data = await updateTrain(train)

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
  const { isAdmin } = await useVerifyAdmin()
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
        error: "ID da Trilha obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const hasTrain = await getTrain({ id })

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

    const data = await deleteTrains({ id })
    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Trilha deletada com sucesso."
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
  const { isUser } = await useVerifyUser()
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
    const data = await getAllTrains()

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
