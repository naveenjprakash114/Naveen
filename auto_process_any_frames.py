import os
import glob
from PIL import Image
from rembg import remove, new_session

def main():
    # Find all ezgif-frame-*.jpg files across public/frames and dist/frames
    search_paths = [
        'public/frames',
        'public/frames/ezgif-724636762ae01c44-jpg',
        'public/frames/ezgif-7450e6528572ce9d-jpg',
        'dist/frames/ezgif-724636762ae01c44-jpg',
        'dist/frames/ezgif-794a3e20726b320d-jpg',
        'dist/frames/Ice cream animation '
    ]

    files = []
    for p in search_paths:
        if os.path.exists(p):
            found = sorted(glob.glob(f'{p}/ezgif-frame-*.jpg') + glob.glob(f'{p}/*.png') + glob.glob(f'{p}/*.jpg'))
            if len(found) >= 40:
                files = found
                print(f'Using source frame folder: {p} ({len(files)} files)')
                break

    if not files:
        print('CRITICAL: No frame source folder found!')
        return

    out_dir = 'public/frames'
    os.makedirs(out_dir, exist_ok=True)

    session = new_session('u2net')

    for i in range(1, 51):
        if i <= len(files):
            fpath = files[i - 1]
        else:
            fpath = files[-1]

        out_webp = f'{out_dir}/frame_{i:03d}.webp'
        out_jpg = f'{out_dir}/frame_{i:03d}.jpg'
        out_ezgif_jpg = f'{out_dir}/ezgif-frame-{i:03d}.jpg'

        print(f'[{i}/50] Processing AI background removal for {os.path.basename(fpath)}...')
        img = Image.open(fpath)
        
        # Save transparent WebP
        out = remove(img, session=session)
        out.save(out_webp, 'WEBP', quality=95)

        # Save direct fallback JPGs
        img.save(out_jpg, 'JPEG', quality=90)
        img.save(out_ezgif_jpg, 'JPEG', quality=90)

    print('SUCCESS: All 50 WebP and JPG frame fallbacks written directly into public/frames!')

if __name__ == '__main__':
    main()
