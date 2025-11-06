from PIL import Image
from pathlib import Path

root = Path('public')
for img_path in root.rglob('*'):
    if img_path.suffix.lower() in {'.png', '.jpg', '.jpeg'}:
        dest = img_path.with_suffix('.webp')
        try:
            with Image.open(img_path) as im:
                im.save(dest, 'WEBP', quality=80, method=6)
            print(f'Converted {img_path} -> {dest}')
        except Exception as exc:
            print(f'Failed {img_path}: {exc}')
