import useClearString from "@/hooks/useClearString"
import { useVerifyAdmin } from "@/hooks/useVerifyAdmin"
import { httpStatus } from "@/utils/httpStatus"
import { mkdir, writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function POST(request: NextRequest) {
  const { clearString } = useClearString()
  const { isAdmin } = await useVerifyAdmin(request)
  if (!isAdmin) {
    return NextResponse.json(
      {
        statusCode: httpStatus.unAuthorized.statusCode,
        error: httpStatus.unAuthorized.error
      },
      {
        status: httpStatus.unAuthorized.statusCode
      }
    )
  }

  const data = await request?.formData()
  const file: File | null = data.get("file") as unknown as File

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      {
        statusCode: httpStatus.serverError.statusCode,
        error: "Falha ao processar arquivo enviado."
      },
      {
        status: httpStatus.serverError.statusCode
      }
    )
  }

  try {
    const timestamp = Date.now()
    const originalFileName = clearString(file?.name)
    const fileExtension = path.extname(originalFileName)
    const fileBaseName = path.basename(originalFileName, fileExtension)
    const newFileName = `${fileBaseName}-${timestamp}${fileExtension}`
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = path.resolve(
      process.cwd(),
      "public",
      "uploads",
      newFileName
    )
    const dir = path.dirname(filePath)
    await mkdir(dir, { recursive: true })

    await writeFile(filePath, buffer)

    return NextResponse.json(
      { statusCode: httpStatus.ok.statusCode, path: `/uploads/${newFileName}` },
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
