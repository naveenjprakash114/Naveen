import os
import glob
from PIL import Image
from rembg import remove, new_session

def main():
    # Target latest user uploaded folder inside public/frames
    src_dir = 'public/frames/ezgif-7450e6528572ce9d-jpg'
    out_dir = 'public/frames'
    os.makedirs(out_dir, exist_ok=True)

    files = sorted(glob.glob(f'{src_dir}/ezgif-frame-*.jpg'))
    print(f'Found {len(files)} uploaded frame files in {src_dir}')

    session = new_session('u2net')

    for i in range(1, 51):
        if i <= len(files):
            fpath = files[i - 1]
        else:
            fpath = files[-1]

        out_webp = f'{out_dir}/frame_{i:03d}.webp'
        print(f'[{i}/50] Processing AI background removal for {os.path.basename(fpath)} -> {out_webp}...')
        img = Image.open(fpath)
        
        # Remove background using rembg u2net model
        out = remove(img, session=session)
        
        # Save as transparent WebP file
        out.save(out_webp, 'WEBP', quality=95)

    print('SUCCESS: All 50 transparent WebP frames generated in public/frames!')

if __name__ == '__main__':
    main()
