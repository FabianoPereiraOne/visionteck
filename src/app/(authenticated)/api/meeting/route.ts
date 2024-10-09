import { useParseDate } from "@/hooks/useParseDate"
import { useVerifyUser } from "@/hooks/useVerifyUser"
import { consultationsSchema } from "@/schemas/api/consultations"
import { createConsultation } from "@/services/prisma/consultations/create"
import { getAllConsultations } from "@/services/prisma/consultations/getAll"
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

  const { userId, date, status, meetingLink, availableTimeId } =
    await request.json()

  const { success, error } = consultationsSchema.safeParse({
    userId,
    date,
    status,
    meetingLink,
    availableTimeId
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
    const dateMeetISO = useParseDate(date)

    if (!dateMeetISO)
      return NextResponse.json(
        {
          statusCode: httpStatus.serverError.statusCode,
          error: "Não foi possível agendar consultoria"
        },
        {
          status: httpStatus.serverError.statusCode
        }
      )

    const consultation = {
      userId,
      date: dateMeetISO,
      status,
      meetingLink,
      availableTimeId
    }

    const data = await createConsultation(consultation)

    return NextResponse.json(
      {
        statusCode: httpStatus.create.statusCode,
        data,
        success: "Consultoria criada com sucesso."
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
    const data = await getAllConsultations()

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
