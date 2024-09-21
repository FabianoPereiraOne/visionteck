import { useParseNumber } from "@/hooks/useParseNumber"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { useVerifyUser } from "@/hooks/useVerifyUser"
import { collectionsSchema } from "@/schemas/api/collections"
import { createCollection } from "@/services/prisma/collections/create"
import { deleteCollection } from "@/services/prisma/collections/delete"
import { getCollection } from "@/services/prisma/collections/get"
import { getAllCollections } from "@/services/prisma/collections/getAll"
import { updateCollection } from "@/services/prisma/collections/update"
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

  const { title, description, themeColor } = await request.json()

  const { success, error } = collectionsSchema.safeParse({
    title,
    description,
    themeColor
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
    const collection = {
      title,
      description,
      themeColor
    }

    const data = await createCollection(collection)

    return NextResponse.json(
      {
        statusCode: httpStatus.create.statusCode,
        data,
        success: "Coleção criada com sucesso."
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

  const { title, description, themeColor } = await request.json()
  const { searchParams } = await new URL(request.url)
  const idString = searchParams.get("id")

  if (!idString)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID da Coleção obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const id = useParseNumber(idString)
    const hasCollection = await getCollection({ id })

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

    const collection = { id, title, description, themeColor }

    const data = await updateCollection(collection)

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
  const idString = searchParams.get("id")

  if (!idString)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID da Coleção obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const id = useParseNumber(idString)
    const hasCollection = await getCollection({ id })

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

    const data = await deleteCollection({ id })
    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Coleção deletada com sucesso."
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
    const data = await getAllCollections()

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
