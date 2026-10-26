import os
import glob
from PIL import Image
from rembg import remove, new_session

def main():
    src_dir = 'public/frames'
    out_dir = 'public/frames'

    files = sorted(glob.glob(f'{src_dir}/ezgif-frame-*.jpg'))
    print(f'Found {len(files)} frame files directly in {src_dir}')

    if not files:
        print('CRITICAL: No ezgif-frame-*.jpg files found!')
        return

    session = new_session('u2net')

    for i in range(1, 51):
        if i <= len(files):
            fpath = files[i - 1]
        else:
            fpath = files[-1]

        out_webp = f'{out_dir}/frame_{i:03d}.webp'
        print(f'[{i}/50] Removing background for {os.path.basename(fpath)} -> {out_webp}...')
        img = Image.open(fpath)
        
        # AI Background Removal for crisp 3D transparency
        out = remove(img, session=session)
        out.save(out_webp, 'WEBP', quality=95)

    print('SUCCESS: All 50 transparent WebP frames created in public/frames!')

if __name__ == '__main__':
    main()
