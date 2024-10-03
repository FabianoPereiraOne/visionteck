"use client"
import { Class } from "@/types/class"
import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import styled from "./style.module.scss"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export const EbookComponent = ({ classActive }: { classActive: Class }) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)

  if (!classActive) return <></>

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  const handleTouch = (event: React.TouchEvent) => {
    const { clientX } = event.touches[0]
    const width = window.innerWidth

    if (clientX < width / 2) {
      setPageNumber(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage))
    } else if (clientX > width / 2) {
      setPageNumber(prevPage => (prevPage < numPages ? prevPage + 1 : prevPage))
    }
  }

  return (
    <div className={styled.container}>
      <div className={styled.contentPdf}>
        <Document
          file={classActive?.linkClass}
          onLoadSuccess={onDocumentLoadSuccess}
          loading='Carregando Ebook...'
          onLoadError={error => console.error("Erro ao carregar o PDF:", error)}
        >
          <Page
            pageNumber={pageNumber}
            className={styled.page}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            onTouchStart={handleTouch}
          />
        </Document>
      </div>
    </div>
  )
}
