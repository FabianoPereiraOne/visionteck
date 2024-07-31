import { useGenerateHash } from "@/hooks/useGenerateHash"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { userCreateSchema } from "@/schemas/api/users"
import transporter from "@/services/mail/config"
import { fetchCreateUser } from "@/services/prisma/users/create"
import { fetchGetUserByID } from "@/services/prisma/users/fetch"
import { fetchGetAllUsers } from "@/services/prisma/users/fetchAll"
import { fetchUpdateUser } from "@/services/prisma/users/update"
import { httpStatus } from "@/utils/httpStatus"
import { nanoid } from "nanoid"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { name, email, phone, profession } = await request.json()
  const headers = new Headers(request.headers)
  const password = headers.get("password")

  const { success, error } = userCreateSchema.safeParse({
    name,
    email,
    phone,
    profession,
    password
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

  const verificationToken = nanoid()

  try {
    const user = {
      name,
      email,
      phone,
      profession,
      verificationToken,
      password: await useGenerateHash(password!)
    }

    const data = await fetchCreateUser(user)

    const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-account?id=${data?.id}&token=${verificationToken}`

    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: email,
      subject: "Verificação de E-mail | Vision Teck",
      html: `Clique <a href="${verificationLink}">aqui</a> para verificar seu email.`
    })

    return NextResponse.json(
      {
        statusCode: httpStatus.create.statusCode,
        data,
        success: "Conta criada! Acesse seu email para confirmar sua conta."
      },
      {
        status: httpStatus.create.statusCode
      }
    )
  } catch (error) {
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const { name, phone, profession, type, status, planID, emailVerified } =
    await request.json()
  const { searchParams } = await new URL(request.url)
  const id = searchParams.get("id")
  const headers = new Headers(request.headers)
  const password = headers.get("password") ?? undefined

  if (!id)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: httpStatus.invalidRequest.error
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const hasUser = await fetchGetUserByID(id)

    if (!hasUser)
      return NextResponse.json(
        {
          statusCode: httpStatus.invalidRequest.statusCode,
          error: "Usuário não registrado no sistema."
        },
        {
          status: httpStatus.invalidRequest.statusCode
        }
      )

    const user = {
      id,
      name,
      phone,
      profession,
      type,
      status,
      planID,
      emailVerified,
      password
    }

    const data = await fetchUpdateUser(user)

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Conta atualizada com sucesso."
      },
      {
        status: httpStatus.ok.statusCode
      }
    )
  } catch (error) {
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = await new URL(request.url)
  const id = searchParams.get("id")

  if (!id)
    return NextResponse.json(
      {
        statusCode: httpStatus.invalidRequest.statusCode,
        error: httpStatus.invalidRequest.error
      },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

  try {
    const user = await fetchGetUserByID(id)
    if (!user)
      return NextResponse.json(
        {
          statusCode: httpStatus.invalidRequest.statusCode,
          error: "Usuário não registrado no sistema."
        },
        {
          status: httpStatus.invalidRequest.statusCode
        }
      )

    const data = await fetchUpdateUser({
      id,
      status: false,
      emailVerified: false
    })
    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data,
        success: "Conta deletada com sucesso."
      },
      {
        status: httpStatus.ok.statusCode
      }
    )
  } catch (error) {
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}

export async function GET(request: NextRequest) {
  const token = new Headers(request.headers).get("Authorization")
  const isAuthorized = await useVerifyAdmin(token)

  if (!isAuthorized)
    return NextResponse.json(
      {
        statusCode: httpStatus.unAuthorized.statusCode,
        error: httpStatus.unAuthorized.error
      },
      {
        status: httpStatus.unAuthorized.statusCode
      }
    )

  try {
    const data = await fetchGetAllUsers()

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
    return NextResponse.json(
      { statusCode: httpStatus.serverError.statusCode, error: error },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }
}
