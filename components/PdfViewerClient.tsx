'use client';

import dynamic from 'next/dynamic';

// ssr:false wajib ada di Client Component, tidak boleh di Server Component
const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-20 text-gray-500 text-sm">
      Memuat viewer PDF...
    </div>
  ),
});

interface PdfViewerClientProps {
  pdfUrl: string;
}

export default function PdfViewerClient({ pdfUrl }: PdfViewerClientProps) {
  return <PdfViewer pdfUrl={pdfUrl} />;
}
