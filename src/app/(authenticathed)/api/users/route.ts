import { useGenerateHash } from "@/hooks/useGenerateHash"
import { userSchema } from "@/schemas/api/users"
import transporter from "@/services/mail/config"
import { fetchCreateUser } from "@/services/prisma/users/create"
import { httpStatus } from "@/utils/httpStatus"
import { nanoid } from "nanoid"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { name, email, phone, profession } = await request.json()
  const headers = new Headers(request.headers)
  const password = headers.get("password")

  const { success, error } = userSchema.safeParse({
    name,
    email,
    phone,
    profession,
    password
  })

  if (!success)
    return NextResponse.json(
      { statusCode: httpStatus.invalidRequest.statusCode, error: error.errors },
      {
        status: httpStatus.invalidRequest.statusCode
      }
    )

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
