import os
import glob
from PIL import Image
from rembg import remove, new_session

def main():
    src_dir = '/Users/macbook/Desktop/I/dist/frames/Ice cream animation '
    out_dir = 'public/frames'
    os.makedirs(out_dir, exist_ok=True)

    files = sorted(glob.glob(f'{src_dir}/ezgif-frame-*.png'))
    print(f'Found {len(files)} frame files in {src_dir}')

    session = new_session('u2net')

    for target_i in range(1, 51):
        if target_i <= 10:
            fpath = f'{src_dir}/ezgif-frame-{target_i:03d}.png'
        elif target_i == 11:
            fpath = f'{src_dir}/ezgif-frame-010.png'
        else:
            fpath = f'{src_dir}/ezgif-frame-{target_i:03d}.png'

        if not os.path.exists(fpath):
            fpath = files[min(target_i - 1, len(files) - 1)]

        out_webp = f'{out_dir}/frame_{target_i:03d}.webp'
        print(f'[{target_i}/50] Processing {os.path.basename(fpath)} -> {out_webp}...')
        img = Image.open(fpath)
        
        # Remove background using rembg AI
        out = remove(img, session=session)
        
        # Save as WebP with alpha channel
        out.save(out_webp, 'WEBP', quality=95)

    print('SUCCESS: All 50 frames converted to transparent WebP in public/frames!')

if __name__ == '__main__':
    main()
