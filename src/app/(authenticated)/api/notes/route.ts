import { useParseNumber } from "@/hooks/useParseNumber"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { useVerifyUser } from "@/hooks/useVerifyUser"
import { notesSchema } from "@/schemas/api/notes"
import { createNote } from "@/services/prisma/notes/create"
import { deleteNote } from "@/services/prisma/notes/delete"
import { getNote } from "@/services/prisma/notes/get"
import { getAllNotes } from "@/services/prisma/notes/getAll"
import { updateNote } from "@/services/prisma/notes/update"
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

  const { title, description, bullet, bulletColor } = await request.json()

  const { success, error } = notesSchema.safeParse({
    title,
    description,
    bullet,
    bulletColor
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
    const note = {
      title,
      description,
      bullet,
      bulletColor
    }

    const data = await createNote(note)

    return NextResponse.json(
      {
        statusCode: httpStatus.create.statusCode,
        data,
        success: "Nota adicionada com sucesso."
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

  const { title, description, bullet, bulletColor } = await request.json()
  const { searchParams } = await new URL(request.url)
  const id = searchParams.get("id")

  if (!id)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "ID da Nota obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  const { success } = bullet
    ? notesSchema.shape.bullet.safeParse(bullet)
    : { success: true }

  if (!success)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: "Formato do bullet é inválido."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const idConverted = useParseNumber(id)
    const hasNote = await getNote({ id: idConverted })

    if (!hasNote)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Nota não encontrada."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const note = {
      id: idConverted,
      title,
      description,
      bullet,
      bulletColor
    }

    const data = await updateNote(note)

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Nota atualizada com sucesso."
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
        error: "ID da Nota obrigatório."
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const idConverted = useParseNumber(id)
    const hasNote = await getNote({ id: idConverted })

    if (!hasNote)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Nota não encontrada."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const data = await deleteNote({ id: idConverted })

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Nota deletada com sucesso."
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
    const data = await getAllNotes()

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
