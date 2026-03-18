'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// CSS bawaan react-pdf agar text layer & annotation layer tampil benar
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Gunakan worker dari folder public (lebih stabil dari CDN, tidak bergantung jaringan)
// Jalankan: cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/
// atau lihat catatan di bawah komponen ini
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PdfViewerProps {
  pdfUrl: string;
}

export default function PdfViewer({ pdfUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsif: ukur lebar container dan sesuaikan lebar halaman PDF
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) setContainerWidth(width);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }, []);

  const goToPrev = useCallback(() => setPageNumber((p) => Math.max(p - 1, 1)), []);
  const goToNext = useCallback(() =>
    setPageNumber((p) => (numPages ? Math.min(p + 1, numPages) : p)), [numPages]);

  return (
    <div className="flex flex-col items-center w-full gap-4">

      {/* Kontrol Navigasi */}
      {numPages && (
        <div className="flex items-center gap-3">
          <button
            onClick={goToPrev}
            disabled={pageNumber <= 1}
            className="flex items-center gap-1 px-4 py-2 bg-[#0f2c4b] text-white rounded-lg
                       disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a4a7a] transition-colors"
          >
            <ChevronLeft size={16} />
            Sebelumnya
          </button>

          <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
            Halaman {pageNumber} dari {numPages}
          </span>

          <button
            onClick={goToNext}
            disabled={pageNumber >= numPages}
            className="flex items-center gap-1 px-4 py-2 bg-[#0f2c4b] text-white rounded-lg
                       disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a4a7a] transition-colors"
          >
            Selanjutnya
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Area Render PDF */}
      <div
        ref={containerRef}
        className="w-full border border-gray-200 rounded-xl shadow-md overflow-auto bg-white"
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500">
              <Loader2 className="animate-spin" size={32} />
              <p className="text-sm">Memuat dokumen PDF...</p>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center py-20 gap-2 text-red-500">
              <p className="font-semibold">Gagal memuat PDF.</p>
              <p className="text-sm text-gray-500">Pastikan URL valid dan file tersedia.</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={containerWidth}
          />
        </Document>
      </div>

    </div>
  );
}