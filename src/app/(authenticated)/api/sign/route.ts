import { useCompareHash } from "@/hooks/useCompareHash"
import { useGenerateToken } from "@/hooks/useGenerateToken"
import useSaveTokenAuth from "@/hooks/useSaveTokenAuth"
import { signSchema } from "@/schemas/api/sign"
import { cookieAuth } from "@/schemas/others/config"
import { getUser } from "@/services/prisma/users/get"
import { httpStatus } from "@/utils/httpStatus"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  const { saveTokenAuth } = useSaveTokenAuth()
  const headers = new Headers(request.headers)
  const password = headers.get("password")

  const { success, data, error } = signSchema.safeParse({ email, password })

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
    const user = await getUser({ email: data.email.toLowerCase() })

    if (!user)
      return NextResponse.json(
        {
          statusCode: httpStatus.notFound.statusCode,
          error: "Usuário não está registrado no sistema."
        },
        {
          status: httpStatus.notFound.statusCode
        }
      )

    const match = await useCompareHash(data.password, user.password)

    if (!match)
      return NextResponse.json(
        {
          statusCode: httpStatus.invalidRequest.statusCode,
          error: "Email ou Senha inválidos."
        },
        {
          status: httpStatus.invalidRequest.statusCode
        }
      )

    const isVerify = user.emailVerified
    if (!isVerify) {
      return NextResponse.json(
        {
          statusCode: httpStatus.unAuthorized.statusCode,
          error: "Acesse seu email para confirmar sua conta."
        },
        {
          status: httpStatus.unAuthorized.statusCode
        }
      )
    }

    const token = await useGenerateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      planId: user.plan.id
    })

    await saveTokenAuth(token)

    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        data: { ...user, password: "********" },
        success: "Login efetuado com sucesso."
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

export async function GET() {
  try {
    cookies().delete(cookieAuth)
    return NextResponse.json(
      {
        statusCode: httpStatus.ok.statusCode,
        success: "Sessão finalizada com sucesso."
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
