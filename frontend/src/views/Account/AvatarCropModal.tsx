'use client';

import { useMemo, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import styles from './AvatarCropModal.module.css';

interface AvatarCropModalProps {
  imageSrc: string;
  isSaving: boolean;
  onCancel: () => void;
  onSave: (file: File) => Promise<void>;
}

const createImage = (url: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = url;
});

const getCroppedAvatarFile = async (imageSrc: string, cropArea: Area): Promise<File> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const size = Math.max(256, Math.round(Math.max(cropArea.width, cropArea.height)));
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas context error');
  }

  context.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    size,
    size,
  );

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', 0.92);
  });
  if (!blob) {
    throw new Error('Blob create error');
  }
  return new File([blob], `avatar-${Date.now()}.jpg`, { type: 'image/jpeg' });
};

export const AvatarCropModal = ({
  imageSrc,
  isSaving,
  onCancel,
  onSave,
}: AvatarCropModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const zoomLabel = useMemo(() => `${Math.round(zoom * 100)}%`, [zoom]);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    const file = await getCroppedAvatarFile(imageSrc, croppedAreaPixels);
    await onSave(file);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Обрезка аватарки">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Обрезка аватарки</h2>
          <button type="button" onClick={onCancel} disabled={isSaving}>×</button>
        </div>

        <div className={styles.cropArea}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, croppedArea) => setCroppedAreaPixels(croppedArea)}
          />
        </div>

        <div className={styles.controls}>
          <label htmlFor="avatarZoom">Масштаб: {zoomLabel}</label>
          <input
            id="avatarZoom"
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            disabled={isSaving}
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onCancel} disabled={isSaving}>
            Отмена
          </button>
          <button type="button" className={styles.save} onClick={handleSave} disabled={isSaving || !croppedAreaPixels}>
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarCropModal;
