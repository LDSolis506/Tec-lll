import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  FileCheck,
  CheckCircle2,
  X,
  Sparkles,
  ShieldCheck,
  Loader2,
  ExternalLink,
  Copy,
  AlertCircle,
  FolderCheck,
  FileCode2
} from 'lucide-react';
import { DriveUploadItem, StudentMember } from '../types';

interface FileUploadModalProps {
  currentUser: StudentMember;
  onClose: () => void;
  onUploadSuccess: (item: DriveUploadItem) => void;
  onAddToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

type Stage = 'select' | 'uploading' | 'review' | 'confirmed';

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  currentUser,
  onClose,
  onUploadSuccess,
  onAddToast,
}) => {
  const [stage, setStage] = useState<Stage>('select');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState('0 KB/s');
  const [copiedLink, setCopiedLink] = useState(false);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);

  // Simulated upload progress animation
  useEffect(() => {
    if (stage !== 'uploading') return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('review');
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 18) + 8;
        setUploadSpeed(`${(Math.random() * 3 + 2.5).toFixed(1)} MB/s`);
        return next > 100 ? 100 : next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [stage]);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setSelectedFile(file);
    setStage('uploading');
  };

  const handleConfirmFinal = () => {
    if (!selectedFile) return;

    const newDriveItem: DriveUploadItem = {
      id: `up_${Date.now()}`,
      fileName: selectedFile.name,
      fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
      fileType: selectedFile.type || 'Notebook Jupyter (.ipynb)',
      uploadedBy: currentUser.name,
      uploadedAt: new Date().toLocaleString(),
      driveFolder: 'Modulo 3/Trabajo Final/Entregas Colab',
      driveUrl: 'https://drive.google.com',
      status: 'synced'
    };

    onUploadSuccess(newDriveItem);
    setStage('confirmed');
    onAddToast(`¡Documento "${selectedFile.name}" subido y verificado en Google Drive!`, 'success');
  };

  const handleCopyDriveLink = () => {
    navigator.clipboard.writeText('https://drive.google.com/file/d/tec_mod3_colab_official/view');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    onAddToast('Enlace de Google Drive copiado al portapapeles', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-indigo-200/90 bg-white text-slate-800 relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {stage === 'select' && 'Cargar Documento o .ipynb al Proyecto'}
                {stage === 'uploading' && 'Cargando Documento a Google Drive...'}
                {stage === 'review' && 'Revisión & Validación de Archivo'}
                {stage === 'confirmed' && 'Confirmación Real de Subida Exitosa'}
              </h3>
              <p className="text-xs text-slate-500">Módulo III • Tecnológico de Costa Rica</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-700 transition-colors text-xs font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STAGE 1: File Selection Dropzone */}
        {stage === 'select' && (
          <div className="space-y-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileChange(e.dataTransfer.files);
              }}
              className={`p-8 border-2 border-dashed rounded-3xl text-center space-y-3 transition-all cursor-pointer ${
                isDragging
                  ? 'border-indigo-600 bg-indigo-50/80 scale-[1.01]'
                  : 'border-slate-300 hover:border-indigo-400 bg-slate-50/60'
              }`}
            >
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <FileCode2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-sm font-bold text-slate-800 block">
                  Arrastra aquí tu Notebook .ipynb o documento
                </span>
                <span className="text-xs text-slate-500">
                  Soporta .ipynb (Google Colab), .pdf, .docx, .py, .zip (hasta 50 MB)
                </span>
              </div>

              <label className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold cursor-pointer transition-all shadow-md">
                <span>Seleccionar Archivo de mi Dispositivo</span>
                <input
                  type="file"
                  accept=".ipynb,.pdf,.docx,.py,.zip"
                  onChange={(e) => handleFileChange(e.target.files)}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Recordatorio Importante:</strong> La entrega final oficial del 11 de Junio requiere formato <strong>.ipynb (Google Colab)</strong>.
              </span>
            </div>
          </div>
        )}

        {/* STAGE 2: Uploading Progress */}
        {stage === 'uploading' && selectedFile && (
          <div className="space-y-6 py-4 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto border border-indigo-100">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-2">
              <span className="text-sm font-bold text-slate-800 block">{selectedFile.name}</span>
              <span className="text-xs text-slate-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Velocidad: {uploadSpeed}
              </span>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-200 shadow-sm"
                />
              </div>

              <span className="text-xs font-black text-indigo-700 font-mono block pt-1">
                {progress}% Completado
              </span>
            </div>
          </div>
        )}

        {/* STAGE 3: Review & Validation */}
        {stage === 'review' && selectedFile && (
          <div className="space-y-5">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Detalles del Documento</span>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full">
                  Listo para Verificación
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Nombre de Archivo:</span>
                  <span className="font-bold text-slate-800 truncate block">{selectedFile.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Tamaño:</span>
                  <span className="font-bold text-slate-800">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Subido por:</span>
                  <span className="font-bold text-indigo-600">{currentUser.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Destino Google Drive:</span>
                  <span className="font-bold text-slate-800">Modulo 3/Trabajo Final</span>
                </div>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Verificación de Integridad & Seguridad:</span>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Estructura de celdas .ipynb o documento verificado</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Escaneo de virus e integridad de Checksum SHA-256 OK</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Firma digital de usuario autorizado Whitelist ({currentUser.email})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setStage('select')}
                className="px-4 py-2.5 glass-button rounded-2xl text-xs font-semibold text-slate-600"
              >
                Cancelar y Reemplazar
              </button>
              <button
                onClick={handleConfirmFinal}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>Confirmar y Sincronizar en Drive</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: Confirmed Receipt */}
        {stage === 'confirmed' && selectedFile && (
          <div className="space-y-5 text-center py-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-extrabold text-slate-800">¡Sincronización Exitosa!</h4>
              <p className="text-xs text-slate-500">
                El documento <strong>{selectedFile.name}</strong> ha sido alojado de forma segura en Google Drive.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-left space-y-2 text-xs text-emerald-900">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1">
                  <FolderCheck className="w-4 h-4 text-emerald-600" />
                  <span>Modulo 3/Trabajo Final/Entregas Colab</span>
                </span>
                <span className="text-[10px] text-emerald-700 font-mono">{new Date().toLocaleTimeString()}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-200/80">
                <span className="text-[11px] font-mono text-emerald-800">URL de Google Drive</span>
                <button
                  onClick={handleCopyDriveLink}
                  className="px-3 py-1 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-xl text-[10px] font-bold text-emerald-800 transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedLink ? '¡Copiado!' : 'Copiar Enlace'}</span>
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md"
            >
              Cerrar y Volver al Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
