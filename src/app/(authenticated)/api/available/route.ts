import useGenerateAvailable from "@/hooks/useGenerateAvailable"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { useVerifyUser } from "@/hooks/useVerifyUser"
import { createAvailableTime } from "@/services/prisma/availableTime/create"
import { getAllAvailableTimes } from "@/services/prisma/availableTime/getAll"
import { getUser } from "@/services/prisma/users/get"
import { httpStatus } from "@/utils/httpStatus"
import { NextRequest, NextResponse } from "next/server"

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
    const data = await getAllAvailableTimes()

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

export async function POST(request: NextRequest) {
  const { isAdmin } = await useVerifyAdmin(request)
  const { generateAvailable } = await useGenerateAvailable()
  const { userId } = await request.json()

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

  if (!userId)
    return NextResponse.json(
      {
        statusCode: httpStatus.serverError.statusCode,
        error: "UserId é obrigatório."
      },
      {
        status: httpStatus.serverError.statusCode
      }
    )

  try {
    const hasUser = getUser({ id: userId })

    if (!hasUser)
      return NextResponse.json(
        {
          statusCode: httpStatus.invalidRequest.statusCode,
          error: "Usuário não encontrado no sistema."
        },
        {
          status: httpStatus.invalidRequest.statusCode
        }
      )

    const days = generateAvailable()

    await days.forEach(day => {
      day.forEach(async time => {
        await createAvailableTime({
          ...time,
          userId
        })
      })
    })

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
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
